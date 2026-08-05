/* CLEANGROUT quote API — the published tariff, computable by machines.
   Same math as the homepage calculator and tariff.html:
     price = $10 x area(m2) + $4 x perimeter(m) + rate x joint(m), per room
     joint = lambda x area, lambda = (L+W)/(LxW) x 1000  (tile sides in mm)
     perimeter ~ 4 x sqrt(area), charged per room
     mobilisation $150, waived when room subtotal exceeds $900; minimum job $380
   Rates per metre of joint (floor; wall = floor x 1.30):
     new (never grouted) 5.04 | recent (BTO-age) 8.51 | old (hardened) 11.34
   No GST is charged; CLEANGROUT is not GST-registered. */

const RATES = { new: 5.04, recent: 8.51, old: 11.34 };
const SQFT_PER_M2 = 10.7639;

function computeRoom(room, idx) {
  const tile = String(room.tile || '600x600').toLowerCase().replace(/\s/g, '');
  const m = tile.match(/^(\d{2,4})x(\d{2,4})$/);
  if (!m) throw new Error(`room ${idx}: tile must look like "600x600" (mm), got "${room.tile}"`);
  const L = Number(m[1]), W = Number(m[2]);

  let areaM2 = Number(room.area_m2);
  if (!areaM2 && room.sqft) areaM2 = Number(room.sqft) / SQFT_PER_M2;
  if (!areaM2 || areaM2 <= 0 || areaM2 > 500) throw new Error(`room ${idx}: provide area_m2 or sqft (0-500 m2)`);

  const condition = String(room.condition || 'old').toLowerCase();
  if (!RATES[condition]) throw new Error(`room ${idx}: condition must be new, recent or old`);

  let wf = Number(room.wall_fraction ?? 0);
  if (Number.isNaN(wf) || wf < 0 || wf > 1) throw new Error(`room ${idx}: wall_fraction must be 0-1`);

  const lambda = (L + W) / (L * W) * 1000;          // m of joint per m2
  const joint = lambda * areaM2;                     // m
  const perimeter = 4 * Math.sqrt(areaM2);           // m
  const rate = RATES[condition] * (1 + 0.30 * wf);   // walls at x1.30
  const price = 10 * areaM2 + 4 * perimeter + rate * joint;

  return {
    name: room.name || `Room ${idx + 1}`,
    tile: `${L}x${W} mm`,
    condition,
    wall_fraction: wf,
    area_m2: round2(areaM2),
    lambda_m_per_m2: round2(lambda),
    joint_m: round2(joint),
    perimeter_m: round2(perimeter),
    rate_per_m: round2(rate),
    components: {
      area_component: round2(10 * areaM2),
      perimeter_component: round2(4 * perimeter),
      joint_component: round2(rate * joint)
    },
    price_sgd: round2(price)
  };
}

function round2(n) { return Math.round(n * 100) / 100; }

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  if (req.method === 'OPTIONS') return res.status(204).end();

  let rooms;
  try {
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      rooms = body.rooms;
    } else {
      const q = req.query || {};
      if (q.rooms) rooms = JSON.parse(q.rooms);
      else if (q.sqft || q.area_m2) rooms = [{ sqft: q.sqft, area_m2: q.area_m2, tile: q.tile, condition: q.condition, wall_fraction: q.wall_fraction, name: q.name }];
    }
    if (!Array.isArray(rooms) || rooms.length === 0 || rooms.length > 30) {
      return res.status(400).json({
        error: 'Provide 1-30 rooms. GET: ?sqft=40&tile=300x300&condition=old&wall_fraction=0 or ?rooms=[...]. POST: {"rooms":[{"sqft":40,"tile":"300x300","condition":"old","wall_fraction":0}]}',
        conditions: Object.keys(RATES),
        tariff: 'https://cleangrout.sg/tariff.html'
      });
    }

    const lines = rooms.map(computeRoom);
    const subtotal = round2(lines.reduce((s, l) => s + l.price_sgd, 0));
    const mobilisation = subtotal > 900 ? 0 : 150;
    const total = round2(Math.max(subtotal + mobilisation, 380));

    return res.status(200).json({
      currency: 'SGD',
      lines,
      subtotal_sgd: subtotal,
      mobilisation_sgd: mobilisation,
      mobilisation_note: mobilisation === 0 ? 'waived (subtotal above $900)' : 'applies (waived above $900)',
      minimum_job_sgd: 380,
      total_sgd: total,
      gst: 'No GST is charged; CLEANGROUT is not GST-registered.',
      warranty: '5-year written warranty on every job.',
      note: 'Indicative price computed from the published tariff at https://cleangrout.sg/tariff.html. Final price is confirmed in writing before works start. Existing-epoxy removal is quoted after inspection only.',
      book: 'https://wa.me/6598004317'
    });
  } catch (e) {
    return res.status(400).json({ error: e.message, tariff: 'https://cleangrout.sg/tariff.html' });
  }
};
