# Materials, Methods & Specifications

Brands genuinely available in Singapore, the installation methods that apply, and the
specification framework — with **provenance marked on every claim**.

## How to read this document

Research for this register was done on 2026-07-26. Full technical data sheets and
manufacturer PDFs **could not be retrieved**: outbound fetches to manufacturer and
standards-body hosts are blocked by this environment's egress policy (HTTP 403 at the
gateway, including a control test against Wikipedia). Everything below therefore comes
from search-result summaries, which are themselves paraphrases of source documents —
not direct reads.

That is a real limitation and it is marked, not hidden:

| Tag | Meaning |
|---|---|
| **[SG-CONFIRMED]** | A Singapore distributor, SG-domain product page or SG address was found |
| **[INDICATIVE]** | Figure appeared in a search summary of a manufacturer document — plausible, not read at source |
| **[UNVERIFIED]** | Could not be established either way |
| **[CONFLICT]** | Sources disagree; must be resolved before use |

**No figure in section 3 should be printed on a quotation, warranty or website page
until it has been read off the current TDS for the specific product in the tub.**
Section 6 is the worklist for doing that.

---

## 1. Chemistry classes

The commercial decision is chemistry first, brand second. Five classes are relevant.

| Class | What it is | Where it fits |
|---|---|---|
| **2-part epoxy** | Resin + hardener, pre-filled | The default for wet areas. Effectively zero water absorption |
| **3-part epoxy** | Resin + hardener + separate filler | Same performance envelope; filler added on site, so the mix is more error-prone but pack sizing is more flexible |
| **1-part pre-mixed** (urethane / modified acrylic) | Ready to use from the tub, no mixing | No pot life pressure, far easier to apply. Lower chemical and stain resistance than true epoxy. This is what "epoxy-look" often means |
| **Polymer-modified cement** (CG2) | High-performance cementitious | Cheaper, still porous. Legitimate for dry areas; not a wet-area substitute for epoxy |
| **Flexible sealant** (neutral silicone / PU) | Movement accommodation | Mandatory at movement joints, perimeters and changes of plane. **Never grout these** |

**The commercial point:** a customer comparing quotes cannot distinguish class 1 from
class 3 by looking at a finished joint on handover day. That is the whole information
asymmetry (`MATH.md` §6.4). Naming the class *and* the product is the cheapest
available signal.

---

## 2. Brands available in Singapore

### 2.1 Confirmed present

| Brand | Epoxy lines | Chemistry | Evidence |
|---|---|---|---|
| **Mapei** | Kerapoxy, Kerapoxy CQ, Kerapoxy Design | 2-part epoxy | **[SG-CONFIRMED]** mapei.com/sg product pages; Mapei Far East Pte Ltd, Tuas West Road |
| **Laticrete** | SPECTRALOCK PRO Premium, SPECTRALOCK 1 | 3-part epoxy; 1-part pre-mixed | **[SG-CONFIRMED]** LATICRETE South East Asia Pte Ltd, Sungei Kadut; SG-specific TDS paths exist |
| **Sika / Davco** | Davco Epoxy Grout (3-part), Davco Epoxy-Based Coloured Grout (2-part) | 3-part and 2-part | **[SG-CONFIRMED]** sgp.sika.com has dedicated SG pages for the Davco range |
| **Ardex-Quicseal** | ARDEX WA, ARDEX EG 15 | 2-part, solvent-free | **[SG-CONFIRMED]** ARDEX-Quicseal Singapore Pte Ltd, Tuas Ave 4; SG-specific TDS revised Sept 2025 |
| **Weber (Saint-Gobain)** | Weberfill Epoxy Grout | 2-part | **[SG-CONFIRMED]** saint-gobain.sg product page |
| **Bostik** | Epoxy tile grout (3-component) | 3-part | **[SG-CONFIRMED]** for brand presence — bostik.com/singapore tile-grout category page. **[UNVERIFIED]** which specific epoxy SKU is stocked here |

Cementitious lines from the same brands that come up in the same conversations:
Mapei Ultracolor Plus, Laticrete PERMACOLOR, Davco Sanitized Colorgrout / Grout 180 /
70 ECO, weber.color fine. All CG-class, all porous — useful for dry areas, not a
wet-area epoxy substitute.

### 2.2 Not established in Singapore

| Brand | Status |
|---|---|
| **Litokol** (Starlike EVO, EpoxyÉlite EVO) | **[UNVERIFIED]** No SG distributor, dealer or pricing found. Distributors located in US, UK, AU, Scandinavia, China only |
| **Kerakoll** (Fugalite Bio / Eco / Color) | **[UNVERIFIED]** No SG distributor found; dealers in India, UK, AU, HU |

Both are frequently name-dropped in local marketing. If we cannot buy them, we must not
list them — an unsourceable brand on a quote is a claim that fails the first time a
customer asks for the receipt.

### 2.3 Sourcing implication

Six suppliers with confirmed local presence is more than enough for a defensible
material policy. The right posture is **two named primaries plus one fallback**, chosen
on availability and pack sizing (see §4.3 — pack size is a bigger operational
constraint than brand), with the specific product named on every quote.

---

## 3. Specifications

### 3.1 Standards framework

**EN 13888 / ISO 13007-3** classify grouts:

- **CG** = cementitious grout; **CG1** normal, **CG2** improved
- **W** suffix = reduced water absorption; **A** suffix = high abrasion resistance
- **RG** = reaction resin grout (epoxy). Single class — there is no RG1/RG2

Only **abrasion resistance and water absorption** differentiate CG2 from CG1.
**[INDICATIVE]**

Threshold values found **[INDICATIVE]** — these came from manufacturer summary tables,
not the standard's own text:

| Property | Test | CG1 | CG2 | RG |
|---|---|---|---|---|
| Abrasion resistance | EN 12808-2 | < 2000 mm³ | < 1000 mm³ | — |
| Shrinkage | EN 12808-4 | < 2 mm/m | < 1.5 mm/m | ≤ 1.5 mm/m |
| Water absorption, 30 min | EN 12808-5 | ≤ 5 g | ≤ 2 g | — |
| Water absorption, 240 min | EN 12808-5 | ≤ 10 g | ≤ 5 g | — |
| Flexural strength | EN 12808-3 | ≥ 2.5 N/mm² | ≥ 2.5 N/mm² | — |
| Compressive strength | EN 12808-3 | ≥ 15 N/mm² | ≥ 15 N/mm² | ≥ 15 N/mm² |

EN 12808 test-method parts: **-1** chemical resistance of reaction resin mortars;
**-2** abrasion; **-3** flexural and compressive strength; **-4** shrinkage;
**-5** water absorption.

> **[CONFLICT]** EN 13888 was revised in 2022. Whether the thresholds above reflect the
> 2022 or the superseded 2009 revision could not be determined. ISO 13007-3's numeric
> alignment with EN 13888 is assumed, not confirmed.

**ANSI** (US, quoted by Laticrete and Bostik):

| Standard | Covers |
|---|---|
| **A118.3** | Chemical-resistant, water-cleanable tile-setting and grouting **epoxy** |
| **A118.5** | Furan resin grout |
| **A118.6** | Standard cement grouts |
| **A118.7** | High-performance polymer-modified cement grouts |
| **A118.8** | Modified epoxy emulsion grout |

**A118.3 is the one that matters** — it is the claim to ask a competitor's quote for.

### 3.2 Product figures

Every number here is **[INDICATIVE]**. Blank cells are **[UNVERIFIED]** — not zero, not
assumed.

| Product | Joint width | Pot life | Compressive | Flexural | Traffic | Full cure |
|---|---|---|---|---|---|---|
| **Ardex EG 15** | 1.5–15 mm | 60 min | ≥ 60 N/mm² | ≥ 30 N/mm² | 24 h | 7 d |
| **Mapei Kerapoxy / CQ** | ≥ 1 mm (CQ to 10 mm) | 45 min, ~30 min open | — | — | — | — |
| **Laticrete SPECTRALOCK PRO Premium** | — | **[CONFLICT]** 80 or 120 min @ 21 °C | > 27.5 N/mm² @ 7 d | tensile > 7.6 N/mm² | 2–24 h | — |
| **Davco Epoxy-Based Coloured Grout** | 1–5 mm | — | > 45 N/mm² **[CONFLICT]** | — | — | — |
| **Weberfill Epoxy Grout** | — | — | — | — | — | — |
| **ARDEX WA** | — | — | — | — | — | — |

Notes on what these figures actually mean for us:

- **Ardex EG 15 states an application temperature ceiling of +30 °C.** Singapore ambient
  in an unventilated bathroom routinely exceeds that. This is an operational
  constraint, not fine print — see §4.4.
- **Pot life is not 45 minutes across the board.** The figure ranges from 45 to 120
  minutes across products. Our batch-sizing model (`MATH.md` §3.4) uses 45 min as a
  *conservative reference*; the real figure must come from the product actually used,
  and it changes batch area by more than 2×.
- **Davco's ">45 N/mm²" may belong to the cementitious Colour Grout line rather than the
  epoxy line** — the two were adjacent in the source. Do not quote it.
- **SPECTRALOCK's working-time conflict (80 vs 120 min) is unresolved** and matters
  directly: it is the difference between two batch plans.

### 3.3 Density and coverage

Grout density ρ is the input to every material quantity calculation (`MATH.md` §2.1)
and it was **[UNVERIFIED] for every product above**. The working assumption of
ρ ≈ 1.55 kg/L is a typical epoxy value, not a sourced one. Since
mass scales linearly in ρ, a 10% error here is a 10% error in every material order.

**This is the single highest-value figure to verify**, because it is used on every job.

---

## 4. Installation methods

### 4.1 Method A — first-time grouting (new tiles, open joints)

The cheapest possible time to specify epoxy: no removal stage, roughly 40% below
re-grouting on our tariff.

1. Confirm joints are clear to full depth and free of adhesive squeeze-out
2. Confirm tiles are set and adhesive cured per the adhesive's own TDS
3. Vacuum joints; confirm dry
4. Apply grout release to porous, unglazed or textured tiles **before** grouting
5. Mix → apply diagonally with a hard rubber epoxy float → compact fully → tool
6. Initial emulsification wash, then second wash (see §4.5 — two separate operations)
7. Silicone to movement joints, perimeters and changes of plane
8. Protect from water for the product's stated cure period

### 4.2 Method B — full re-grout (removal + replacement)

1. Protect, sheet furniture, set up dust extraction
2. **Rake out to depth** — see §4.6
3. HEPA-vacuum; wash joints; **dry fully**
4. Steps 4–8 as Method A

### 4.3 Method C — spot repair, and what it isn't

Legitimate for isolated damage on an otherwise sound installation. It is **not** a
cheaper version of Method B: a partial epoxy re-grout leaves a visible colour and
texture boundary, and the surrounding cement continues failing on its own schedule.

### 4.4 Environment

Manufacturer guidance found **[INDICATIVE]**: substrate and ambient 18–30 °C for 48 h
before and after placement; ambient held above 16 °C for 48 h during cure (Laticrete).
Ardex EG 15 states +10 to +30 °C for application.

The tropical problem: **the upper bound is the binding one here, not the lower**. Pot
life roughly halves per +10 °C (`MATH.md` §3.3), so an unventilated bathroom at 33–35 °C
can cut a 45-minute working time to around 22 minutes. Practical controls: work early,
ventilate or cool the room, keep unmixed product out of the sun, mix smaller batches,
and treat the manufacturer's stated pot life as an upper bound never achieved on site.

### 4.5 Mixing, and the two cleaning windows

**Mixing.** The common belief that a full unit must always be mixed is **not**
universally true. **[INDICATIVE, needs primary confirmation]** Laticrete's own FAQ
permits proportional partial mixing — "½ Part A, ½ Part B, ½ Part C" — provided ratios
are held exactly. No manufacturer source was found that forbids partial mixing
outright. The operative rule is therefore: **hold the ratio precisely, by weight, and
follow the specific product's TDS** — not "always mix the whole tub". A 0.1 g scale is
the enabling tool, and ratio error leaves permanently soft or brittle grout.

**Two distinct cleaning operations — do not conflate them:**

| | Initial emulsification wash | Haze / residue removal |
|---|---|---|
| When | During the working window; Laticrete guidance ~1 h after installation **[INDICATIVE]** | After cure — 24 h to 7 d |
| What | Water + white scrub pad, removes the bulk while still emulsifiable | Dedicated epoxy haze remover on what the first wash missed |
| If missed | Residue hardens on the tile face | Progressively harder; heavy cured residue may need product-strength stripper |

Quoting one window's figure for the other operation is a real error, and it is the
mistake most likely to damage a customer's finished tiles.

### 4.6 Removal depth

Working criterion (`MATH.md` §9.2):

```
d_removed ≥ max( 2w , ⅔ · d_joint , d_min,product )
```

> **[UNVERIFIED as a codified standard]** The "two-thirds of joint depth" figure is
> widespread trade consensus and was **not contradicted** by anything found — but it
> could not be located as an explicit clause in the TCNA Handbook or BS 5385. Treat it
> as our stated workmanship standard, not as a cited code minimum. Describing it as
> "required by standard" would be a claim we cannot support.

Insufficient depth is the dominant cause of epoxy re-grout failure: the new material
keys into residual cement instead of the tile edge, so the failure plane is the old
grout. It is invisible at handover — which is precisely why it belongs in a photograph
(an evidence node) rather than a promise.

### 4.7 Where grout must never go

Movement accommodation is required, per BS 5385-3 and TCNA EJ171 **[INDICATIVE,
secondary sources only]**, at:

- the perimeter of the tiled area, including door thresholds
- changes of plane — floor-to-wall, internal corners
- junctions between dissimilar substrates
- junctions with sanitaryware and fixtures
- intermediate field joints in large areas

These take a flexible sealant — neutral-cure silicone or PU — never rigid grout of any
class. Epoxy in a movement joint will crack, and the crack is the customer's evidence
that the job was done wrong.

> **[CONFLICT]** Field movement-joint spacing: BS 5385-3:1989 is commonly quoted at
> 8–10 m; a 2024 revision is cited elsewhere at 3–5 m. Unresolved. Do not publish a
> spacing figure until the current edition is confirmed.

### 4.8 When to refuse the job

Feeding `ALG-8` (`MATH.md` §10). Grout does not fix any of these, and taking the job
converts someone else's defect into our warranty claim:

- drummy or loose tiles — grout will not hold a tile down
- failed waterproofing membrane or a leak presenting below
- structural or substrate cracking
- joints narrower than the product minimum
- porous or unglazed tile with no grout release available

---

## 5. Singapore operating rules

**[CONFLICT — resolve before relying on this]**

An HDB-hosted renovation guideline gives general renovation as **9am–6pm, Monday to
Saturday**, with **no work on Sundays or public holidays**. One HDB PDF summary
indicates **noisy work** (tile cutting, drilling, removal of wall and floor finishes —
which includes power-tool grout removal) is **not permitted on Saturdays, Sundays or
public holidays**. Several third-party contractor sites additionally describe noisy work
as restricted to 9am–5pm weekdays with a 1–2pm quiet hour; **that detail could not be
traced to an official HDB source** and must not be repeated as fact.

Because grout removal is unambiguously noisy work, the conservative operating
assumption is **weekdays only** — which directly constrains scheduling (`ALG-4`) and
should be confirmed against a current hdb.gov.sg page or town council circular before
it is quoted to a customer.

**Permits:** HDB approval is required for works affecting structural elements and floor
finishes, explicitly including hacking and re-tiling. **Re-grouting without tile removal
is not addressed** in any source found — **[UNVERIFIED]** in both directions. Check
directly with HDB rather than assuming either way.

---

## 6. Verification worklist

Everything above that must be confirmed against a primary document before it appears on
a quotation, a warranty certificate or the website. Ordered by consequence.

| # | Item | Why it matters | Source needed |
|---|---|---|---|
| 1 | Density ρ for our chosen products | Used in every material order; linear error | TDS |
| 2 | Pot life at 30–35 °C, not just at 23 °C | Sets batch size; the tropical case is the real one | TDS + manufacturer technical support |
| 3 | Partial-mix permission, per product | Determines whether pack size is a hard constraint | TDS / manufacturer written confirmation |
| 4 | SPECTRALOCK working time, 80 vs 120 min | Two different batch plans | Primary TDS |
| 5 | Davco compressive strength — epoxy or cement line? | Currently unusable as quoted | Sika SG product page |
| 6 | HDB noisy-work days and hours | Legal scheduling constraint | hdb.gov.sg / town council |
| 7 | Whether re-grouting needs an HDB permit | Customer-facing answer we currently cannot give | HDB directly |
| 8 | EN 13888 revision — 2022 vs 2009 thresholds | Any standards claim we print | BSI / distributor |
| 9 | BS 5385-3 current movement-joint spacing | 8–10 m vs 3–5 m unresolved | Current BS edition |
| 10 | Litokol / Kerakoll SG availability | Whether they can be offered at all | Direct enquiry to brands |
| 11 | Bostik's specific SG epoxy SKU | Fallback supplier viability | Bostik SG |
| 12 | Pack sizes and SGD trade pricing, all primaries | Feeds ALG-2 and the tariff's material component | Distributor quotes |

Items 1–3 are the ones that change what we do on site tomorrow. Items 6–7 are the ones
with legal exposure. The rest are accuracy of claims.

**How to close them:** the fastest route is a distributor visit or a written enquiry to
each of the four confirmed SG entities — Mapei Far East, Laticrete South East Asia,
ARDEX-Quicseal Singapore and Sika Singapore. All four maintain local technical support,
and a written answer from them is a better source than any PDF, because it is
specific to what they will actually sell us.
