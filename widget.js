/* CLEANGROUT floating widget — FAQ chat + WhatsApp, on every public page.
   Self-contained: injects its own styles and DOM, no dependencies, no
   backend. Answers come from the published tariff and FAQ; anything it
   cannot match hands off to WhatsApp. */
(function () {
  if (window.__cgWidget) return
  window.__cgWidget = true

  var WA = 'https://wa.me/6598004317?text=' +
    encodeURIComponent("Hi CLEANGROUT, I'd like a price for epoxy grouting.")

  /* ── Knowledge: [keywords, answer, optional link] ── */
  var QA = [
    [['price', 'cost', 'how much', 'expensive', 'charge', 'quote'],
      'Every price is published. The tariff: $150 mobilisation (waived above $900) + $10/m² + $4/m perimeter + a per-metre joint rate ($5.04–$14.74 by condition). Typical: bathroom $488, kitchen $588, kitchen + 2 bathrooms $1,488. Try the instant calculator — no form to fill in.',
      ['/quote.html', 'Open the calculator →']],
    [['package', 'bundle', 'promo'],
      'Three fixed packages (300×300 tile or smaller): Single Bathroom $488 · Kitchen $588 · Kitchen + 2 Bathrooms $1,488. All include the 5-year written warranty.',
      ['/#packages', 'See the packages →']],
    [['cure', 'dry', 'shower', 'walk', 'how long', 'water', 'use toilet'],
      'Walk on it after 24 hours. Showers and water after 72 hours. Full chemical cure in about 7 days. In a new BTO before move-in, the 72-hour wait costs you nothing.'],
    [['warranty', 'guarantee'],
      '5-year written warranty on every epoxy job, any size — covering cracking, discolouration and mould in the treated joints. Most of the trade offers 2 years.',
      ['/warranty.html', 'Warranty terms →']],
    [['bto', 'new flat', 'key collection', 'move in', 'renovation'],
      'A new BTO with joints still open is the cheapest possible time — no old grout to remove, so it prices roughly 40% below re-grouting. Tell your tiler to leave the joints open.',
      ['/blog/bto-epoxy-grout-before-move-in.html', 'Read the BTO guide →']],
    [['colour', 'color', 'white', 'black', 'gold', 'grey'],
      'Every colour is the same price. One colour per continuous surface (changes at doorways); each room, bathroom and feature wall can differ. Confirm ~3 days before works — epoxy cannot be tinted on site.',
      ['/blog/epoxy-grout-colours-how-to-choose.html', 'Colour guide →']],
    [['deposit', 'pay', 'payment', 'paynow'],
      'A 50% deposit confirms your booking and reserves the date. The balance is due on completion — after a joint walkthrough of the finished work with the photo record of every joint. PayNow, bank transfer or cash.'],
    [['jb', 'johor', 'malaysia', 'causeway'],
      'Yes — Johor Bahru also can. JB jobs are quoted in advance on WhatsApp before the team crosses the Causeway.'],
    [['block', 'neighbour', 'neighbor', 'discount', 'cheaper'],
      'The block rate: 2+ units in the same block booking within the same fortnight — 2 units get 5% off each, 3 or more get 8% off each. One trip serves everyone; the saving is passed on.'],
    [['kit kat', 'kitkat', 'mosaic', 'feature wall', 'small tile', 'subway'],
      'Small tile is mostly joint: a 150×50 kit-kat wall carries ~27 m of joint per m² vs 3.3 m on a 600×600 floor — same rate per metre, just more metres. That is why feature walls cost more.',
      ['/blog/why-small-tiles-cost-more-to-grout.html', 'See the math →']],
    [['epoxy', 'cement', 'difference', 'better', 'mould', 'mold'],
      'Cement grout is porous — it absorbs water and soap, which is why it blackens. Two-part epoxy is non-porous with 0% absorption: nothing for mould to feed on. Per year of service it is cheaper: ~$47/yr vs ~$110/yr for cement.',
      ['/blog/epoxy-vs-cement-grout.html', 'Full comparison →']],
    [['brand', 'product', 'mapei', 'kerapoxy', 'ardex', 'sika'],
      'Two-part epoxy only: Mapei Kerapoxy, Ardex or Sika, mixed on site against the pot life. Receipt and batch numbers shown before work starts.'],
    [['clean', 'maintain', 'maintenance'],
      'Barely any. Mild detergent and a soft mop; avoid abrasive pads and bleach on the joints. Nothing soaks in, so the colour you choose is the colour you keep.',
      ['/blog/how-to-maintain-epoxy-grout.html', 'Maintenance guide →']],
    [['skirting'],
      'Skirting joints are included in every room — covered by the perimeter component of the tariff, no extra charge.']
  ]

  var CHIPS = [
    ['How much does it cost?', 'price'],
    ['When can I shower?', 'cure'],
    ['Warranty?', 'warranty'],
    ['New BTO — best timing?', 'bto'],
    ['Do I pay a deposit?', 'deposit'],
    ['Johor Bahru?', 'jb']
  ]

  /* ── Styles ── */
  var css = '' +
    '#cg-fab{position:fixed;right:18px;bottom:18px;z-index:9990;display:flex;flex-direction:column;gap:12px;align-items:flex-end;font-family:Manrope,system-ui,-apple-system,sans-serif}' +
    '@media (max-width:767px){#cg-fab{bottom:86px}}' +
    '.cg-btn{width:54px;height:54px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 30px rgba(20,18,12,.28);transition:transform .2s}' +
    '.cg-btn:hover{transform:scale(1.07)}' +
    '#cg-chat-btn{background:rgba(23,26,32,.92);backdrop-filter:blur(10px)}' +
    '#cg-wa-btn{background:#25D366;text-decoration:none}' +
    '#cg-panel{position:fixed;right:18px;bottom:150px;z-index:9991;width:min(340px,calc(100vw - 36px));max-height:min(520px,calc(100vh - 170px));display:none;flex-direction:column;background:rgba(255,255,255,.92);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.7);border-radius:18px;box-shadow:0 24px 70px rgba(20,18,12,.25);overflow:hidden;font-family:Manrope,system-ui,-apple-system,sans-serif}' +
    '@media (max-width:767px){#cg-panel{bottom:218px}}' +
    '#cg-panel.open{display:flex}' +
    '#cg-head{padding:14px 18px;background:#171A20;color:#fff}' +
    '#cg-head b{font-size:13px;letter-spacing:.08em}' +
    '#cg-head span{color:#B9BDC4}' +
    '#cg-head p{margin:3px 0 0;font-size:11px;color:#9BA0AA}' +
    '#cg-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:8px}' +
    '.cg-m{max-width:86%;padding:9px 13px;border-radius:14px;font-size:12.5px;line-height:1.55}' +
    '.cg-bot{background:#F1EEE7;color:#2A2D33;border-bottom-left-radius:4px;align-self:flex-start}' +
    '.cg-user{background:#171A20;color:#fff;border-bottom-right-radius:4px;align-self:flex-end}' +
    '.cg-m a{color:#9A7B24;font-weight:700;text-decoration:none}' +
    '#cg-chips{display:flex;flex-wrap:wrap;gap:6px;padding:0 14px 10px}' +
    '.cg-chip{border:1px solid #DDD8CC;background:#fff;border-radius:999px;padding:5px 11px;font-size:11px;color:#2A2D33;cursor:pointer;font-family:inherit}' +
    '.cg-chip:hover{border-color:#9A7B24}' +
    '#cg-form{display:flex;gap:8px;padding:10px 14px 14px;border-top:1px solid #E8E4DA}' +
    '#cg-in{flex:1;border:1px solid #DDD8CC;border-radius:999px;padding:9px 14px;font-size:12.5px;font-family:inherit;outline:none;background:#fff;color:#2A2D33}' +
    '#cg-in:focus{border-color:#9A7B24}' +
    '#cg-send{border:none;background:#171A20;color:#fff;border-radius:999px;padding:0 16px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit}'

  var style = document.createElement('style')
  style.textContent = css
  document.head.appendChild(style)

  /* ── DOM ── */
  var waSvg = '<svg viewBox="0 0 24 24" width="26" height="26" fill="#fff"><path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.83 9.83 0 0 0 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.73-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.6.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z"/></svg>'
  var chatSvg = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5c0 4.14-4.03 7.5-9 7.5-1.05 0-2.06-.15-3-.43L3.5 20l1.17-3.5A6.9 6.9 0 0 1 3 11.5C3 7.36 7.03 4 12 4s9 3.36 9 7.5Z"/><path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01"/></svg>'

  var fab = document.createElement('div')
  fab.id = 'cg-fab'
  fab.innerHTML =
    '<button id="cg-chat-btn" class="cg-btn" aria-label="Quick answers chat">' + chatSvg + '</button>' +
    '<a id="cg-wa-btn" class="cg-btn" href="' + WA + '" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">' + waSvg + '</a>'
  document.body.appendChild(fab)

  var panel = document.createElement('div')
  panel.id = 'cg-panel'
  panel.innerHTML =
    '<div id="cg-head"><b>CLEAN<span>GROUT</span></b><p>Quick answers — from the published tariff. Not a human; for a real quote, WhatsApp us.</p></div>' +
    '<div id="cg-msgs"></div>' +
    '<div id="cg-chips"></div>' +
    '<form id="cg-form"><input id="cg-in" type="text" placeholder="Ask about price, curing, warranty…" maxlength="200"><button id="cg-send" type="submit">Ask</button></form>'
  document.body.appendChild(panel)

  var msgs = panel.querySelector('#cg-msgs')
  var chipsBox = panel.querySelector('#cg-chips')

  function add(kind, html) {
    var d = document.createElement('div')
    d.className = 'cg-m ' + (kind === 'user' ? 'cg-user' : 'cg-bot')
    d.innerHTML = html
    msgs.appendChild(d)
    msgs.scrollTop = msgs.scrollHeight
  }

  function esc(s) {
    return s.replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]
    })
  }

  function answer(q) {
    var lq = q.toLowerCase()
    var best = null, bestScore = 0
    for (var i = 0; i < QA.length; i++) {
      var score = 0
      for (var k = 0; k < QA[i][0].length; k++) {
        if (lq.indexOf(QA[i][0][k]) !== -1) score += QA[i][0][k].length
      }
      if (score > bestScore) { bestScore = score; best = QA[i] }
    }
    if (best) {
      var html = esc(best[1])
      if (best[2]) html += '<br><a href="' + best[2][0] + '">' + best[2][1] + '</a>'
      add('bot', html)
    } else {
      add('bot', 'That one deserves a real person — send it to us on WhatsApp and we reply in minutes.' +
        '<br><a href="' + WA + '" target="_blank" rel="noopener noreferrer">Open WhatsApp →</a>')
    }
  }

  CHIPS.forEach(function (c) {
    var b = document.createElement('button')
    b.type = 'button'
    b.className = 'cg-chip'
    b.textContent = c[0]
    b.addEventListener('click', function () {
      add('user', esc(c[0]))
      answer(c[1])
    })
    chipsBox.appendChild(b)
  })

  panel.querySelector('#cg-form').addEventListener('submit', function (e) {
    e.preventDefault()
    var inp = panel.querySelector('#cg-in')
    var q = inp.value.trim()
    if (!q) return
    add('user', esc(q))
    answer(q)
    inp.value = ''
  })

  var opened = false
  document.getElementById('cg-chat-btn').addEventListener('click', function () {
    panel.classList.toggle('open')
    if (panel.classList.contains('open') && !opened) {
      opened = true
      add('bot', 'Hi! Ask me anything about epoxy grouting — prices, curing times, colours, the warranty. Everything I say comes from our published tariff.')
      if (window.va) window.va('event', { name: 'faq_chat_open' })
    }
  })

  document.getElementById('cg-wa-btn').addEventListener('click', function () {
    if (window.va) window.va('event', { name: 'whatsapp_click' })
  })
})()
