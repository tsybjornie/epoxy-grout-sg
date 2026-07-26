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

## 1C. Chemistry — compounds, functions, hazards

Researched 26 Jul 2026 from search summaries; **no SDS or standard was read in full**
(egress policy blocks the hosts). Every compound below appeared in a named product's SDS
via search summary unless marked otherwise.

### 1C.1 Part A — the resin side

| Component | Typical compound | Function | Why it matters to us |
|---|---|---|---|
| Base resin | **DGEBA / BADGE**, CAS **1675-54-3** | Crosslinking backbone | The thing that makes the joint waterproof and chemical-resistant |
| Co-resin | Phenol-novolac / BPF-type oligomer, CAS **9003-36-5** | Cuts viscosity, raises chemical resistance | Usually blended with DGEBA — neither dominates |
| Reactive diluent | **BDDGE** CAS 2425-79-8; glycerol triglycidyl ether; C13–C15 alkyl glycidyl ethers | Viscosity control | **Low-MW diluents are often *more* aggressive skin sensitisers than DGEBA** — "low viscosity" is not "safer" |
| Filler | Crystalline silica / quartz, CAS **14808-60-7** | Bulk, hardness, abrasion resistance, shrinkage control | Its **particle size is why CQ won't pack into joints under ~3 mm** |
| Coloured quartz | Sintered/ceramic-fired **or** resin-coated with colourfast pigment | Colour carried in aggregate | Two different quality tiers. Cheap product is surface-dyed and fades; premium is fired or pre-coated |
| Pigment | TiO₂ CAS 13463-67-7, iron oxides, carbon black | Opacity and colour | — |
| Rheology modifier | Fumed silica (1–5%, up to 6–10% for true non-sag); organoclay | Thixotropy | Non-sag on walls — though in a heavily filled grout much of it comes from **filler packing** itself |

> **Correction to a common shorthand:** CAS 9003-36-5 is *not* "bisphenol-F diglycidyl
> ether". It is the phenol/formaldehyde/epichlorohydrin **oligomer**. Pure DGEBF is
> 2095-03-6 and is essentially never what appears on a commercial SDS.

### 1C.2 Part B — the hardener, where the hazard sits

Real grout hardener SDSs show **cycloaliphatic amines and polyamide adducts**, not the
cheap aliphatics:

| Class | Examples seen in named grout SDSs |
|---|---|
| Cycloaliphatic amines | **Isophorone diamine (IPDA)** CAS 2855-13-2; hydrogenated MDA (PACM); **trimethylhexamethylene diamine (TMD)** |
| Polyamide / amidoamine adducts | Tall-oil / tetraethylenepentamine polyamide (Ardex EG 15 Part B) |
| Non-reactive diluent | **Benzyl alcohol** CAS 100-51-6 — **primarily a diluent/plasticiser**, not principally an accelerator. Being non-reactive it can **migrate out over time**, causing shrinkage and greasy surfaces |
| Accelerator | **DMP-30** CAS 90-72-2. A *tertiary* amine — **zero active N–H, so it contributes nothing to stoichiometry**, it only catalyses |

**TETA and DETA — de-emphasise.** The archetypal cheap aliphatic polyamines are volatile,
strongly alkaline, worst for blush and worst for skin. Branded grout hardeners use them
as *precursors to adducts*, not free.

**Nonylphenol (CAS 25154-52-3 / 84852-15-3) — get the framing right.** It is a
**legitimate historical accelerator being designed out**, not an invented adulterant —
the Danish EPA describes it plainly as used "as a hardener when laying out an epoxy
floor". Cheap workshops continuing the practice are following a legacy route reputable
formulators abandoned.

> **Do not say "nonylphenol is banned in the EU."** It is **SVHC-listed** (endocrine
> disruptor, environmental) and **restricted under REACH Annex XVII entry 46 for
> specified uses** — a use-specific restriction, and epoxy hardener is not obviously one
> of the enumerated uses. What drove "nonylphenol-free" hardeners is commercial
> supply-chain screening more than direct prohibition. **[UNVERIFIED — ECHA blocked; the
> single highest-risk claim in this document, confirm from the regulation text]**

**GHS classification splits between the two parts:**

| | Typical classification |
|---|---|
| **Part A** | Skin Irrit. 2 (H315), Eye Irrit. 2 (H319), **Skin Sens. 1 (H317)**, Aquatic Chronic 2 (H411). Irritant, **not** corrosive |
| **Part B** | Escalates to **Skin Corr. 1B/1C (H314)** — severe burns — plus **Skin Sens. 1 (H317)** |

**The point that matters for the crew:** the *corrosive* hazard sits on Part B, but
**sensitisation sits on both** — and sensitisation is the one that ends careers. It is
irreversible and dose-independent once established. Gloves are not optional.

### 1C.3 Cure chemistry, and why the ratio is not negotiable

Nucleophilic ring-opening of the oxirane by the amine nitrogen. **Each active amine
hydrogen consumes exactly one epoxide** — primary amine = 2 active H, secondary = 1,
**tertiary = 0**. The hydroxyls generated autocatalyse, which is why epoxy cure
accelerates as it runs.

$$\text{phr} = \frac{\text{AHEW} \times 100}{\text{EEW}}$$

> **Correction to a plausible-sounding error:** off-ratio in **either** direction lowers
> crosslink density and Tg. It is **one failure mode reached from two sides**, not two
> different problems. What differs is the residue: excess resin leaves **unreacted
> epoxide** (soft, tacky — and the sensitising species); excess amine leaves **free amine**
> that plasticises, migrates to the surface, and feeds blush.

In practice the ratio error rarely comes from weighing. It comes from **splitting a kit**,
**not scraping the hardener pot out**, and **incomplete mixing**, which creates localised
off-ratio zones even when the bulk ratio is right.

### 1C.4 Amine blush — and why Singapore is not the risk case people assume

Primary amines are hygroscopic and react with atmospheric **CO₂ + moisture** to form
ammonium carbamate salts that exude as a greasy or cloudy surface film.

> **Correction:** the classic risk window is **RH above ~70% *and* surface temperature
> below ~15 °C**. Singapore reliably meets the humidity half and **essentially never
> meets the cold half** — and fast tropical cure is *protective*, because the further
> polymerisation has advanced the less amine is available to react.

So **do not claim "tropical climate = high blush risk."** The real local triggers are
**condensation on cool surfaces** (air-conditioned rooms, chilled slabs, fresh concrete)
and **poor ventilation in enclosed wet areas**. In a filled grout it shows up as surface
haze, a greasy film resisting the wash-off stage, and patchy colour rather than a full
coating blush. **[INDICATIVE — extrapolated from coatings; no grout-specific literature
found]**

### 1C.5 Why white yellows — three mechanisms, not two

1. **UV photo-oxidation** of the DGEBA aromatic backbone → quinone structures.
2. **Amine curing agent contribution** — residual amine and ionic by-products discolour.
3. **Hygrothermal thermo-oxidation — requires no UV at all.** Carbonyl formation in the
   backbone under heat and moisture.

**Mechanism 3 is the one that matters here**, and it is why white grout yellows in a
**windowless Singapore bathroom**. Any explanation resting only on UV cannot account for
our own most common field observation.

### 1C.6 The non-epoxy alternatives, chemically

| Product | Chemistry | Cure | Why resistance is lower |
|---|---|---|---|
| Pre-mixed "urethane" (Bostik TruColor) | Waterborne polyurethane dispersion, colour-coated quartz | **Water evaporation and coalescence**, not stoichiometric crosslinking — evidenced by its 3-day/7-day water-exposure schedule | Coalesced film has far lower crosslink density and retains **hydrophilic surfactants** needed to stabilise the dispersion |
| Polyurea | Isocyanate + **amine-terminated** polyether | Seconds | Amine-termination is what makes it urea rather than urethane |
| Polyaspartic | Aliphatic polyisocyanate + polyaspartic ester (a **sterically hindered secondary amine**) | Minutes — hindrance deliberately slows it to a workable pot life | Formally a **subclass of polyurea**. Aliphatic isocyanate is why it is UV-stable |
| Furan | Acid-catalysed autocondensation of furfuryl alcohol | Thermoset | **Carbon filler is not stylistic** — carbon is why furan survives hydrofluoric acid; silica does not |
| Cement (CG) | Portland cement, graded sand, **VAE/EVA redispersible polymer**, **cellulose ethers (HEMC/HPMC)** | Hydration | Polymer forms a film through the matrix giving flexibility and reduced permeability; cellulose ethers are **water-retention agents** so cement can finish hydrating against absorbent tile |

> **CG1 vs CG2 are performance classes, not composition classes.** The standard specifies
> test outcomes, not polymer content. You may say "CG2 achieves reduced abrasion (A)
> and/or water absorption (W), usually via polymer modification" — you may **not** say
> "CG2 means it contains redispersible polymer".

### 1C.7 Certification claims — three to never make

- **"HACCP-certified grout" does not exist.** EC 852/2004 regulates **food businesses**,
  not building products; HACCP is a management system applied to an operation. The honest
  claim is that a grout is *suitable for* premises operating under HACCP, or *meets the
  Annex II surface criteria* (impervious, non-absorbent, easy to clean). Genuine food
  **contact** is a different instrument entirely — EC 1935/2004.
- **"Anti-mould certified to ISO 22196"** — ISO 22196 is **bacterial**, and building
  materials are scope-excluded. See §3.2b.
- **NSF/ANSI 61 for pool or tile grout.** NSF 61 is a **drinking water** standard. No
  tile grout was found certified to it, and **swimming pools are out of scope entirely** —
  pool water is not drinking water. The right route for pools is chemical resistance plus
  ISO 13007 RG / ANSI A118.3.

Legitimate and useful: **EMICODE EC1 / EC1PLUS** (VOC emissions; EC1PLUS is the stricter
class and avoids the extra 28-day formaldehyde declaration), **GREENGUARD Gold**, and in
Singapore the **SGBP certification** run by the Singapore Green Building Council — which
is the one that feeds **BCA Green Mark** points, and is distinct from the Singapore Green
Labelling Scheme. Note LEED v4 requires **both** an emissions evaluation **and** a VOC
*content* limit — EC1PLUS alone does not satisfy the credit.

**ASTM methods** for chemical-resistant grouts: **C579** compressive, **C580** flexural
and modulus, **C267** chemical resistance, **C531** shrinkage and thermal expansion.
**ASTM C395 was withdrawn in 2021** — do not cite it.

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

EN 12808 test-method parts: **-1** chemical resistance of reaction resin mortars (note:
this part is specific to reaction-resin, not cementitious); **-2** abrasion; **-3**
flexural and compressive strength; **-4** shrinkage; **-5** water absorption.

> **[CONFLICT — currency]** **BS EN 13888-2:2022 "Grouts for ceramic tiles — Test
> methods"** now exists, and its contents are the EN 12808 set. EN 13888 appears to have
> been restructured into Part 1 (requirements) + Part 2 (test methods), **absorbing the
> EN 12808 series**. Citing "EN 13888 + EN 12808-1..5" may be the superseded structure.
> Confirm with BSI before printing either on a document.

> **[CONFLICT]** EN 13888 was revised in 2022. Whether the thresholds above reflect the
> 2022 or the superseded 2009 revision could not be determined. ISO 13007-3's numeric
> alignment with EN 13888 is assumed, not confirmed.

**ANSI** (US, quoted by Laticrete and Bostik):

| Standard | Covers |
|---|---|
| **A118.3** | Chemical-resistant, water-cleanable tile-setting and grouting **epoxy** |
| **A118.5** | Furan resin grout |
| **A118.6** | Standard cement grouts |
| **A118.7** | **High-Performance Cement Grouts** (2019) — the older "polymer-modified" title is superseded |
| **A118.8** | Modified Epoxy **Emulsion** Mortar/Grout — an epoxy emulsion in a cementitious system, with **much lower chemical resistance** than a true A118.3 epoxy. Conflating the two is a consequential specification error |

**A118.3 is the one that matters** — it is the claim to ask a competitor's quote for.

### 3.2 Product figures

Every number here is **[INDICATIVE]**. Blank cells are **[UNVERIFIED]** — not zero, not
assumed.

| Product | Joint width | Pot life | Compressive | Flexural | Traffic | Full cure |
|---|---|---|---|---|---|---|
| **Ardex EG 15** | 1.5–15 mm | 60 min | ≥ 60 N/mm² | ≥ 30 N/mm² | 24 h | 7 d |
| **Mapei Kerapoxy CQ** | ≥3 mm EU (to 10 mm non-sag) | 45 min @ 23 °C | 49 N/mm² | 38 N/mm² | 24 h | see §3.2b |
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

### 3.2b Mapei Kerapoxy range — the standardisation decision

All Mapei epoxy grouts sit under the **Kerapoxy** name, 2-part (resin + hardener,
pre-dosed) except Kerapoxy SP.

| Product | For | Joint width | Packs |
|---|---|---|---|
| **Kerapoxy CQ** | **Our default.** Residential bath/kitchen regrouting | ≥3 mm EU / to 10 mm non-sag | **3 kg**, 10 kg (3 colours) |
| Kerapoxy (141) | Industrial; also works as adhesive | ≥3 mm | 2, 5, 10 kg |
| **Kerapoxy Easy Design** | **Second SKU.** Fine joints, glass mosaic | **1–15 mm** | 3 kg |
| Kerapoxy IEG / IEG CQ | Food industry surfaces | ≥3 mm | — |
| Kerapoxy SP | 3-component, heavy chemical duty | ≥5 mm | 10 kg, pot life only 20 min |

**Why CQ over plain Kerapoxy.** Plain Kerapoxy is sand-filled and coloured through the
resin, so over-washing during cleanup **bleaches the joint**. CQ uses colour-coated
quartz — colour lives in the aggregate, so it **cleans back to its original colour**.
It is also **non-sag to 10 mm**, which matters because most of a bathroom regrout is
vertical, and carries **BioBlock** bacteriostatic technology. **[INDICATIVE]**

> ⚠ **Correction on the BioBlock claim.** ISO 22196 is an **antibacterial** test, and says
> nothing about **mould**, which is fungal. Its scope also covers "antibacterial-treated
> plastics and other non-porous surfaces" and **explicitly excludes building materials**
> except where used in the same manner as treated articles — so a grout claim sits in a
> carved-out grey zone. **Do not market Kerapoxy CQ as "anti-mould certified".** The
> defensible claim is that epoxy is non-absorbent, so it gives mould nothing to feed on —
> which is a property argument, not a certification.

**Verified specifications — Kerapoxy CQ** (search summaries of Mapei-hosted documents):

| Property | Value |
|---|---|
| Compressive strength (EN 12808-3) | 49 N/mm² |
| Flexural strength | 38 N/mm² |
| Abrasion (EN 12808-2) | 147 mm³ |
| Water absorption (EN 12808-5) | **0.05 g** |
| Shrinkage (EN 12808-4) | 0.80 mm/m |
| **Mix density** | **1.60 kg/L** |
| Mix ratio | pre-dosed **A:B = 9:1** |
| Pot life | 45 min **at +23 °C, 50% RH** |
| Foot traffic | ~24 h |
| Application temp | **+16 to +32 °C**, maintained 72 h |
| Classification | EN 13888 **RG** · ISO 13007-3 RG · **ANSI A118.3** |

> The **1.60 kg/L** figure supersedes the 1.55 placeholder used earlier — material mass
> and cost rise 3.2% wherever that was applied.

**Three constraints that bite here:**

1. **Joint width ≥3 mm.** Installers report the quartz **does not pack reliably into
   finer joints**. Rectified large-format tile is often laid at 2 mm. **Measure the joint
   on survey** — below ~3 mm the correct product is Kerapoxy Easy Design (1–15 mm), not
   CQ. This belongs in `ALG-5` as a hard filter, not a preference.
2. **Application ceiling +32 °C.** A Singapore bathroom in the afternoon routinely
   exceeds it — the same problem already flagged for Ardex EG 15 at +30 °C. Combined with
   the Q₁₀ rule (`MATH.md` EQ 3.2), the real working window is far shorter than 45 min.
3. **Pre-dosed 9:1 means no partial mixing without weighing.** Mapei publishes a separate
   *Mixing Partial Units of Grout* document, which confirms part-mixing is sanctioned but
   requires a scale. That resolves the open question in §4.5 for this brand.

**Known criticisms — reported plainly** (installer forums, **[INDICATIVE]**):

- **The cleanup window is the number one complaint.** "Once you've mixed Kerapoxy CQ,
  you're against the clock." Needs multiple buckets of clean water and a stack of white
  emulsifying pads — epoxy clogs pads almost immediately.
- **Epoxy haze is a recurring, expensive failure.** Mapei publishes a whole *Removing
  Grout Haze* document, which tells you how common it is. The trap: over-washing to clear
  haze **lightens the joint**, so you are squeezed from both sides. Textured porcelain is
  the worst case.
- **White epoxy yellows** — industry-wide, not Mapei-specific, caused by amber pigment in
  the hardener ageing. Reported even in rooms with no natural light. **Commercial
  consequence: do not offer brilliant white in kitchens.** Steer to off-white or light
  grey and the most likely callback disappears.
- Slower and fussier to install than cementitious grout.
- Colour varies between batches — Mapei's own troubleshooting guide says use one batch
  per area, so **record batch codes per job** (which is also the counterfeit control).

**Versus the alternatives.** CQ's non-sag behaviour is a genuine advantage over Litokol
Starlike, which installers report "keeps slipping out" on vertical work. Laticrete
SPECTRALOCK is 3-part and has a reputation as more forgiving on cleanup, but **no direct
installer comparison was found** — treat that as under-researched.

### 3.2c China variants — relevant if stock is Asia-sourced

Mapei manufactures epoxy at **Guangzhou Conghua**, so Asian stock may be Chinese-made
rather than Italian. The Chinese Kerapoxy 141 datasheet classifies against **both**
China's **JC/T 1004-2017《陶瓷砖填缝剂》** and EN 13888, as class **RG** — the Chinese
standard uses the same CG/RG split, sub-dividing RG into solvent-type (RG I) and
water-based (RG II). Conceptually aligned, which is a useful answer if a client
questions Chinese-made stock. **[INDICATIVE]**

**But the specs diverge:**

| Parameter | EU | US | China |
|---|---|---|---|
| CQ colours | 19 | 40 | 17 |
| CQ minimum joint | ≥3 mm | to 10 mm non-sag | **from 1 mm** |

The **1 mm vs 3 mm contradiction is unresolved** — either the Chinese formulation uses
finer quartz or it is spec drift in translation. **Do not assume a datasheet downloaded
from mapei.com/gb describes the tub you bought locally.** Ask Mapei Singapore which
origin their stock is and for the matching TDS revision.

**Parallel import is a bigger risk than outright counterfeiting**: genuine product made
for another market means different colour numbering, possibly a different joint-width
spec, and stock potentially near its 24-month shelf life — degraded Part B gives soft,
under-cured joints. Buying from Mapei Tuas or a listed dealer removes the question.

### 3.3 Density and coverage

Grout density ρ is the input to every material quantity calculation (`MATH.md` §2.1)
and it was **[UNVERIFIED] for every product above**. The working assumption of
ρ = **1.60 kg/L is now verified for Kerapoxy CQ** (§3.2b), superseding the 1.55
placeholder. It remains unverified for the other products listed. Since
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

## 1B. Grout types worldwide — and how to tell real epoxy from "epoxy-like"

Researched 26 Jul 2026, WebSearch summaries only.

### 1B.1 Genuine reactive-resin grouts

| Type | Where it is the norm | Notes |
|---|---|---|
| **2-part epoxy** — resin + hardener, filler pre-blended | Europe / Italy | Mapei Kerapoxy, Litokol Starlike EVO, Kerakoll Fugalite, Sopro DFX |
| **3-part epoxy** — resin + hardener + separate coloured filler | USA, Australia, Gulf | Laticrete SPECTRALOCK PRO, Ardex EG 15, Davco, Weber weberepox. One liquid pack serves every colour |
| **Coloured-quartz epoxy** (环氧彩砂) | China mass market; premium elsewhere | Surface-coloured sintered quartz, so nothing bleeds into porcelain, glass or stone. Kerapoxy CQ, Starlike EVO |
| **Furan resin** (ANSI A118.5) | US and Indian industrial | Reactive resin but **not epoxy**. Beats epoxy on organic acids — dairies, breweries, acid-brick floors. **Cannot be water-cleaned**: tile must be wax-masked and cleaned with solvent. Never residential |
| **Potassium silicate** | Extreme chemical service | Fully **inorganic**. Chimneys, stacks, acid-proof brick. No relevance to tiling — don't let a supplier conflate it |

### 1B.2 Marketed alongside epoxy but **not** epoxy

This is where a cheaper competing quote usually differs, and no customer can tell:

- **1-part pre-mixed urethane** — Bostik TruColor (water-based urethane), Custom Fusion Pro. Ready to use, no pot life, ~50% faster, never needs sealing. **Lower chemical and stain resistance than true epoxy.**
- **Polyurea** — common in Korea's re-grouting trade as the budget option; Korean sources put its life at **~5 years against "semi-permanent" for Kerapoxy**.
- **Hybrid resin-cement** — Kerakoll **Fugabella Color** sits between cementitious and epoxy by the manufacturer's own description. Not an RG epoxy.
- **Modified epoxy emulsion** (ANSI **A118.8**) — its own, weaker class. An "epoxy emulsion" grout is not an A118.3 epoxy.

> **⚠ The name trap:** Laticrete **SPECTRALOCK PRO** is a 3-part epoxy. Laticrete
> **SPECTRALOCK 1** is a **pre-mixed single component** — same family name, different
> product class.

### 1B.3 The screening rule

> **A genuine 100%-solids epoxy is two or three components mixed on site with a defined
> pot life.** Anything supplied **pre-mixed in a single tub, ready to use, is by
> definition not a 2-part epoxy** — it is urethane, polyurea or an emulsion.

Second test: a real epoxy tile grout carries **EN 13888 / ISO 13007-3 class RG** *or*
**ANSI A118.3**. A product quoting only a manufacturer's internal test, or a national
*adhesive* standard, has not been assessed against any grout specification at all.

### 1B.4 Standards by region

| Market | Standard | Epoxy class | Versus EN 13888 |
|---|---|---|---|
| Europe | **EN 13888** | **RG** — one class, no subdivision | Baseline |
| International | **ISO 13007-3** | RG | Effectively identical |
| USA | **ANSI A118.3** | A118.3 | **Structurally different** — ANSI splits grout across five specs (A118.3 epoxy, .5 furan, .6 cement, .7 polymer cement, .8 epoxy emulsion). EN puts all reactive resins in one RG. A118.3 also makes *water-cleanability* a defining requirement |
| China | **JC/T 1004-2017** | RG I solvent / RG II water-based | RG-aligned but subdivided |
| Japan | **None found** | — | JIS A 5209 covers tiles, A 5548/5557 adhesives. **No JIS grout standard located** |
| India | **None found** | — | IS 15477 is adhesives only, ISI-mandatory. **Grout appears uncovered**; Indian epoxies market against ANSI or EN by the maker's own claim |
| Australia / NZ | **AS ISO 13007** adopted | RG | Equivalent |
| Gulf | GSO adopts ISO/EN texts | presumed RG | **[UNVERIFIED]** GSO adoption confirmed for 13007-1 (adhesives) only. In practice Gulf datasheets cite ANSI A118.3 |

### 1B.5 How different countries actually use it

The residential-versus-specialist divide is sharp, and one market is worth studying:

- **South Korea — epoxy is the residential default.** A dedicated **줄눈시공** re-grouting trade exists, epoxy grouting before move-in is near-standard in new apartments, consumer pricing is published (₩200,000–600,000 per bathroom, 1–2 days), and **Kerapoxy is a household brand name**. This is the closest thing anywhere to the market we are trying to build here.
- **Japan — specialist only.** Cement is explicitly mainstream; epoxy is scoped to factories and medical facilities.
- **Australia — both at once.** Commercial/industrial via Davco and Ardex, plus 3.25 kg DIY epoxy kits sold in Bunnings.
- **USA — displaced in residential** by pre-mixed urethane "stain-proof" grouts.
- **Italy — design-led.** Sold on colour, glitter and metallic effects as much as chemistry, with 40–60 colour ranges.
- **India and China — rapid consumerisation**, far ahead of Japan or continental Europe.

### 1B.6 World price levels — is Singapore expensive?

Roughly **S$3/kg (India, 10 kg trade pack) to S$40/kg (UK, 1.5 kg consumer pack)** — a
13× spread that is **mostly pack size and channel, not quality**. The developed-market
trade band clusters tightly:

| Market | Product | ≈ SGD/kg |
|---|---|---|
| Australia | Dunlop Easy Clean 3.25 kg (Bunnings) | S$25 |
| USA | Laticrete SPECTRALOCK PRO unit | S$25 |
| Australia | Ardex EG 15 A+B+C | S$22 |
| USA | Custom CEG-Lite 2 gal | ~S$11 |
| India | Ardex Endura 10 kg trade | S$3–5 |
| UK | Kerakoll Fugalite 1.5 kg consumer | S$38–40 |

**Benchmarks for our own buying:** S$18–26/kg is *typical by developed-world standards*.
Above ~S$30/kg is a small-pack or thin-distribution premium. **Below ~S$8/kg** is either
genuine Indian/Chinese bulk or **not a 100%-solids epoxy — check the component count.**
The Malaysian Kerapoxy retail price of **S$15–16/kg is below the developed-market band**,
i.e. good value rather than suspicious.

### 1B.7 No code mandates epoxy anywhere

Searches for a code requirement found the opposite: **USDA and FDA explicitly decline to
endorse or approve any flooring product or brand**, publishing performance criteria
(no microbial harbourage, cleanability, structural integrity) and leaving material choice
open. Epoxy gets specified because it *satisfies* those criteria, not because any code
names it. The nearest code hook is IBC §2103.2.3.4 recognising furan as a material class
— recognition, not a mandate.

**Treat any claim that epoxy is "code-required" as a sales claim unless a clause is
cited** — including if we are ever tempted to make it ourselves.

---

## 4B. Mapei sourcing — researched 26 Jul 2026

Decision taken: standardise on Mapei. This is where to buy it.

### Singapore — buy direct

**Mapei Far East Pte Ltd**, 28 Tuas West Road, Singapore 638383 · **+65 6862 3488**
· Mon–Fri 8.30am–6pm. **[SG-CONFIRMED]**

They sell **direct, including walk-in and self-collection** — no trade account or minimum
order value found. Order by emailing a PO. Delivery S$64.20 incl. GST under S$800
ex-GST; free above that, so self-collection is the sensible default for single jobs.

Pack sizes on the SG catalogue:

| Product | Packs |
|---|---|
| Kerapoxy | 2 kg (12×2 kg box), 5 kg, 10 kg |
| Kerapoxy CQ | **3 kg** standard; 10 kg only in white 100, sea blue 283, cream 290 |

Also listed: Kerapoxy IEG, Kerapoxy Easy Design, Ultracolor Plus (cementitious),
Ultracare Kerapoxy Cleaner.

> **No Singapore dollar price exists publicly for Mapei epoxy grout — none, in any pack
> size, from any source.** Shopee SG, Lazada SG, Carousell, Horme and Selffix all return
> nothing. **[UNVERIFIED]** One phone call to 6862 3488 closes the single biggest gap in
> our cost model.

### Malaysia / Johor Bahru

**Mapei JB office: 44-01 Jalan Anggerik Emas 4, Taman Anggerik Emas, 81200 Johor Bahru
· +607-595 3032.** **[SG-CONFIRMED]** Mapei Malaysia HQ is in Petaling Jaya.

Retail prices found **[INDICATIVE — search summaries, sellers not vetted]**:

| Listing | Pack | Price | Per kg | SGD/kg @ 3.168 |
|---|---|---|---|---|
| Kerapoxy A+B (Shopee) | 5 kg | RM 259.00 | RM 51.80 | **S$16.35** |
| Kerapoxy (Lazada) | 5 kg | RM 245.00 | RM 49.00 | S$15.47 |
| Kerapoxy (Shopee) | 5 kg | RM 244.90 | RM 48.98 | S$15.46 |

No 2 kg or 10 kg RM price found. JB-area Mapei stockist confirmed: **Yong Hup Heng
Machinery Hardware**. Wholesale channel: Man Kian Hardware (Puchong, Selangor).

### Is crossing the causeway worth it? Probably not

**[INDICATIVE — verify with Singapore Customs before acting]**

- Land imports into Singapore pay **9% GST on CIF value with no relief threshold**. The
  S$400 relief is air/postal only.
- Traveller allowances (S$100/S$600) cover **personal use only**. Job stock is commercial
  goods and does not qualify.
- Commercial import needs a **Customs permit filed via TradeNet before arrival**, plus a
  Malaysian export declaration.

So MY retail at S$15.46–16.35/kg becomes **S$16.85–17.82/kg** landed before permit
handling, fuel, tolls, VEP and your own time. GST-registered businesses reclaim the
import GST as input tax, but the paperwork burden is per trip. **Unless Mapei Far East
quotes materially above ~S$18/kg, the causeway run is not worth it.**

> **Unresolved and important:** the dangerous-goods classification of Kerapoxy is
> **[UNVERIFIED]**. Competitor SDSs class epoxy Part A as UN Class 9; Mapei's own SDS was
> not obtainable. Whether either country restricts carrying it across the checkpoints
> could not be determined. Ask Mapei to email the SDS and check the transport section
> before planning any cross-border run.

### Fallback supply

**Davco (Sika)** is the easiest off-the-shelf epoxy in both markets — the only brand with
a real Singapore consumer retail presence (Lazada SG), and Velocitydiy in Skudai stocks
Sika grout for walk-in JB purchase. No prices published. ARDEX and Laticrete: no SG or MY
distributor could be identified.

### Counterfeit risk

No reports of counterfeit or grey-market Mapei in Southeast Asia surfaced, and no Mapei
authentication scheme was found — **absence of evidence, not evidence of absence.** The
mitigation doesn't depend on resolving it: buy from Mapei Tuas or Mapei JB directly.
Treat unvetted Shopee/Lazada marketplace sellers with more caution.

### Two phone calls close most of this

**Mapei Far East +65 6862 3488** — SGD price per pack size, trade terms, walk-in stock,
and ask them to email the Kerapoxy SDS. **Mapei JB +607-595 3032** — RM trade price and
the JB dealer list. That settles the price gap, the part-mixing question and the
dangerous-goods question in an afternoon, faster than any further web research.

---

## 4C. Buying channels — marketplaces and direct-from-China

Researched 26 Jul 2026, WebSearch summaries only.

### 4C.1 Shopee / Lazada / Carousell

| Platform | Mapei epoxy grout | Other epoxy grout |
|---|---|---|
| Shopee SG | **None found** | Davco Epoxy Coloured Grout kit (400 ml, price not surfaced) |
| Lazada SG | **None found** | Davco Epoxy Coloured Grout + application gun |
| Carousell SG | **None** | Only *services* — contractors selling labour, not product |
| Qoo10 SG | None | None |
| Shopee / Lazada MY | Kerapoxy **5 kg RM239–259** = **S$15.10–16.35/kg** | Davco Colour Grout (cementitious, ~RM4/kg — not epoxy) |

**No official Mapei, Davco or Sika storefront was found on any SG or MY marketplace.**
The Malaysian Kerapoxy listings are third-party sellers.

**Kerapoxy CQ — our chosen product — was not found on any marketplace in either
country.** Only plain Kerapoxy 5 kg. So for the product we actually want, the online
channel does not exist and the question is moot.

### 4C.2 The GST hurdle that settles it

Shopee's own help documentation states it **does not issue tax invoices on behalf of
third-party sellers** — it can only invoice its own service fees. For a GST-registered
business that means **no input-tax claim on the material**.

Consequence: an authorised supplier at headline price $X$ costs $X/1.09$ net of
reclaimed GST, while a marketplace seller at price $Y$ costs $Y$ outright.

$$\frac{X}{1.09} > Y \quad\Longrightarrow\quad Y < 0.917X$$

**A marketplace price must be more than 8.3% below the authorised price merely to break
even** — before provenance, batch code, shelf life or warranty exposure enter the
calculation.

### 4C.3 The risk break-even

Material is only 4–10% of invoice, so the saving is small while a rework is not:

| Job | Material | Save 50% | One rework | Break-even risk rise |
|---|---|---|---|---|
| Bathroom floor | $22 | $11 | $331 | **+2.8 pts** |
| Bathroom + shower | $60 | $30 | $644 | **+3.9 pts** |
| Kitchen | $30 | $15 | $458 | **+2.7 pts** |
| Whole home | $82 | $41 | $921 | **+3.7 pts** |
| BTO whole flat | $260 | $130 | $1,582 | **+6.8 pts** |

Baseline 7-year failure probability is 7.5% (EQ 6.2). If cheaper material raises it by
more than **2.7–6.8 percentage points**, the saving is gone. Degraded hardener produces
joints that look perfect at handover and fail at 12–24 months — exactly inside warranty.

**Policy: buy grout from Mapei Tuas or an authorised dealer. Use marketplaces freely for
consumables** — pads, sponges, buckets, masking, blades — where provenance is irrelevant
and the savings are real.

### 4C.4 Direct from China (1688 / Taobao / Alibaba) — a false economy

The 环氧彩砂 category is large and mature (~3,600 listings on 1688 alone), dominated by
德高 Davco, 马贝 Mapei, 西卡 Sika, 立邦 Nippon, 东方雨虹, 卓高 and a long tail of
anonymous factories. Reliable RMB/kg pricing could **not** be established.

Five compounding reasons not to do it:

1. **Dangerous-goods freight.** Epoxy resin is commonly **UN3082, Class 9, PG III,
   marine pollutant**; amine hardeners are typically **Class 8 corrosive**. DG cargo needs
   approved forwarders, UN-rated packaging and DG documentation. Courier and small-parcel
   routes are heavily restricted — the economics only work above roughly 500 kg.
2. **Bulk conflicts with shelf life.** Two-part epoxy keeps ~24 months and degrades
   thereafter; hardener oxidises and cure becomes unreliable. Buying enough to justify DG
   freight means holding stock that ages before you use it.
3. **NEA Hazardous Substances Licence.** If the resin or hardener contains a substance in
   Part I of the Second Schedule of the EPMA, import requires an NEA HS Licence — approved
   storage site plus a competency interview. Whether this product's chemistry triggers it
   needs a CAS-number check. **[UNVERIFIED]**
4. **Documented quality fraud in the home market.** Chinese trade press reports small
   workshops adding nonylphenol and hexamethylenediamine to mask cheap raw materials; a
   seizure of tens of thousands of counterfeit units over hazardous-substance limits; and
   testing that found flexural strength of **2.7 MPa against a ≥10 MPa requirement**. Real
   and documented, not hypothetical. **[INDICATIVE]**
5. **Statutory warranty sits on us regardless.** Singapore's Housing and Building Act
   imposes non-excludable warranties on the contractor — **2 years, 6 years for major
   defects** — whatever material was used. There is no practical recourse against an
   anonymous 1688 factory. **All the liability transfers to us and none of the risk
   transfers away.**

**And the cost argument collapses anyway:** Mapei already manufactures epoxy at
**Guangzhou Conghua**. Buying Kerapoxy through Singapore distribution may well be buying
Chinese-made product — with certification, a data sheet, local technical support and a
manufacturer standing behind it. The China cost base is already in the price.

### 4C.5 If Chinese product is ever considered: RG I vs RG II

JC/T 1004-2017 splits reaction-resin grout into **RG I solvent-type** and **RG II
water-based**. For occupied residential work, **RG II is the better choice**: lower VOC
and odour, and a working time around 40 min against roughly 15 min for solvent-type,
which is far more forgiving. Solvent off-gassing in an occupied flat is a genuine
complaint driver. **[INDICATIVE]**

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
