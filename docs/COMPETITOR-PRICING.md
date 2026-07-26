# Competitor Price Intelligence

How to find what competitors charge in Singapore and Malaysia, how to make their
numbers comparable to ours, and what our defensible position actually is.

Findings are in §4. The method in §1–§3 is repeatable — run it quarterly.

---

## 1. Why raw competitor prices are not comparable

This is the whole problem, and it is also the opportunity.

A competitor quoting **"$8 per square foot"** has told you almost nothing, because by
Theorem 1 (`MATH.md` EQ 1.1) the work inside a square foot varies by **2.67×** across
common tile sizes:

| Tile (mm) | λ (m joint per m²) | What "$6/sqft" really is | What "$10/sqft" really is |
|---|---|---|---|
| 1200 × 600 | 2.50 | $25.83 per joint metre | $43.06 per joint metre |
| 600 × 600 | 3.33 | $19.38 | $32.29 |
| 600 × 300 | 5.00 | $12.92 | $21.53 |
| 300 × 300 | 6.67 | $9.69 | $16.15 |
| 200 × 200 | 10.00 | $6.46 | $10.76 |

Two firms advertising the identical per-sqft rate can be delivering work that differs by
a factor of nearly three. **A per-square-foot price is not a price** unless tile size and
scope come with it.

The same applies to us — and it is worth being honest about. Our own published tariff,
which is a single fixed rule, produces effective rates from **$5.11 to $17.96 per sqft**
depending on job size and tile:

| Job (sqft) | 1200×600 | 600×600 | 600×300 | 300×300 | 200×200 |
|---|---|---|---|---|---|
| 40 | $8.56 | $9.60 | $11.69 | $13.78 | $17.96 |
| 80 | $6.68 | $7.73 | $9.82 | $11.91 | $16.09 |
| 110 | $6.17 | $7.22 | $9.31 | $11.40 | $15.58 |
| 250 | $5.41 | $6.45 | $8.54 | $10.63 | $14.81 |
| 500 | $5.11 | $6.15 | $8.24 | $10.33 | $14.51 |

Two effects are stacked here: λ across the columns (EQ 1.1) and declining average cost
down the rows (EQ 4.2, $AC'(A) = -F/A^2 < 0$). **Anyone quoting a single per-sqft rate
for all jobs is either guessing or excluding something** — and that is a checkable claim
we can make about any quote a customer shows us.

---

## 2. Normalising a competitor quote

Convert any quote to **dollars per linear metre of joint**, the only basis on which two
grouting prices are comparable.

Given a competitor price $P$ for a job of $S$ square feet on tile $L \times W$:

$$A = \frac{S}{10.7639}, \qquad \lambda = \frac{L+W}{LW}\times10^3, \qquad J = A\lambda$$

$$\text{their rate} = \frac{P}{J} \quad [\text{SGD per joint metre}]$$

Compare against our published joint rate — $13.50/m re-grout, $6.00/m new tile — after
subtracting an assumed mobilisation if they charge one separately.

**Scope adjustments before comparing.** A quote is only comparable once these are equalised:

| Check | Why it moves the number |
|---|---|
| Removal included? | Removal is ~56% of our joint rate. Excluding it roughly halves the price |
| Walls or floor only? | A bathroom's walls are ~83% of its surface (`MATH.md` EQ 1.3) |
| Coverage cap | "From $488" with a 50 sqft cap is a different product from an uncapped price |
| Real 2-part epoxy? | 1-part pre-mixed urethane is cheaper and not the same material (`MATERIALS.md` §1) |
| Warranty length | Under ~5 years it carries no information (`MATH.md` EQ 6.2) |
| Site / transport fee | Often quoted separately, i.e. their $F$ is hidden |
| GST in or out | 9% |
| Minimum charge | Determines whether the headline rate applies to a small job at all |

---

## 3. Where to look

WebFetch to company sites and PDFs is blocked by this environment's egress policy, so
research runs on **search-result summaries**. That constrains depth but not coverage.

**Singapore**
- Search: `epoxy grout singapore price`, `regrouting service singapore cost`,
  `epoxy grouting HDB bathroom price`, `grout replacement singapore $`,
  `epoxy grout per sqft singapore`, `bathroom regrouting package singapore`
- Marketplaces and portals: Carousell, Facebook Marketplace, Qanvast, Renotalk,
  HomeRenoGuru, Recommend.sg
- Forums often carry real transacted prices rather than advertised ones — more useful,
  less verifiable

**Malaysia / Johor Bahru**
- Search: `epoxy grout price malaysia`, `harga epoxy grouting`, `kos grouting tandas`,
  `regrouting service johor bahru price`, `epoxy grout per kaki persegi`
- Marketplaces: Mudah, Carousell MY, Recommend.my, ServisHero, Kaodim, Facebook groups

**Record for each competitor:** name, URL, price format, the numbers, what is included,
coverage cap, whether tile size is mentioned at all, product named, warranty, minimum
charge, and whether new-tile work is distinguished from re-grouting.

**Tag every figure** VERIFIED (the company's own page or listing) or HEARSAY (forum,
blog, aggregator). Prices that cannot be found are themselves a finding: a market that
hides price is a market where an instant published quote is a differentiator.

---

## 4. Findings — 26 July 2026

Gathered via WebSearch summaries. WebFetch returned 403 on every competitor domain
tested, so **no figure below was read off a live page** — all are as reported by search
summaries. Tagged VERIFIED (from the company's own page/listing) or HEARSAY
(aggregator, blog, guide article).

### 4.1 Singapore — the market hides its prices

Of about nine named Singapore competitors, **only two publish any price at all.**
GroutSG, Tricoat, 2ezBuilders, ADR Construction, Grout.sg and Le Fong all push to
"free quote" or "free site assessment" with no number in searchable content.

| Competitor | Price | Scope | Status |
|---|---|---|---|
| **Grout Pro-Tech** | $550 | 1 HDB BTO bathroom floor | VERIFIED |
| | $850 | Kitchen + yard floor | VERIFIED |
| | $950 | 4-room living/dining/walkway floor | VERIFIED |
| | $1,380 | 5-room living/dining/walkway floor | VERIFIED |
| JMJ Construction | $500 minimum | Undefined scope | VERIFIED (minimum only) |
| Floor Fitters | from $8/m² basic; $15/m² comprehensive | General tiling price list | VERIFIED |
| Aggregator guide | $1.60–$2.10/sqft, tiered by tile size | Non-bathroom areas | HEARSAY |
| Guide articles | $15–$18/sqft "hybrid/premium" | Unclear | HEARSAY |

Grout Pro-Tech is the **only** competitor with a structured, published ladder — removal
included, 2-year in-house warranty, stated before GST.

**Extremes.** Lowest defined scope price: **$550** for one HDB bathroom floor (or a $500
minimum with no scope attached). Highest verified package: **$1,380**. Headline per-sqft
claims span **$1.60 to $18** — a 11× spread — but almost none of that range comes from
two sellers' own numbers side by side; it is stitched from guide articles with lead-gen
incentives. Three separate "typical market rate" claims ($7–15, $3–8, $6–12 per sqft)
are mutually inconsistent, which is the signature of recycled SEO content rather than
observed pricing.

**Format prevalence — more useful than the prices:**

| Practice | Prevalence |
|---|---|
| Publishes any price | 2 of ~9 |
| States a warranty | 1 of ~9 (2 years) |
| Mentions tile size | 2 sources, one of them an aggregator |
| Names the grout product used | **0 found** |
| Prices by linear metre of joint | **0 found** |
| Separates new-tile from re-grouting | **0 found** |

### 4.2 Malaysia / Johor Bahru — mostly a different product

The JB "epoxy" market that publishes prices is largely **epoxy flake floor coating and
toilet waterproofing**, not tile-joint re-grouting:

| Provider | Price | Actually is | SGD ≈ |
|---|---|---|---|
| toiletwaterproofing.my | from RM950 | Toilet epoxy waterproofing, 2-yr warranty | ~$300 |
| EFS Trading (JB) | from RM850 | Epoxy flake toilet floor, 1-yr warranty | ~$268 |
| epoxyflake.my | from RM150 | Teaser/minimum, scope unclear | ~$47 |
| Clickbina guide | RM6–28/sqft | Epoxy **floor coating**, not joint grout | ~$1.90–8.85 |

Dedicated re-grouting specialists — Dr Grout (KL), LM Polishing (JB), Southern Epoxy —
**publish nothing at all**. Kaodim, ServisHero, Mudah and Carousell MY surfaced no
priced listings.

**Conclusion: a like-for-like JB comparison cannot be built from public data.** No
Malaysian source gives a per-sqft rate for tile-joint grouting, new or re-grout, and
none distinguishes the two. Malaysian epoxy grout material prices are all "quote on
request" — no RM/kg figure could be verified for Mapei, Davco, ARDEX or Laticrete.
Rate used for conversions: **1 SGD ≈ 3.17 MYR**.

### 4.3 Where we actually sit

Our published tariff against the only verified competitor ladder, re-grout, across
plausible tile sizes:

| Scope | Theirs | Ours 600×600 | Ours 300×600 | Ours 300×300 |
|---|---|---|---|---|
| 1 bathroom floor (40 sqft) | $550 | **$384** −30% | **$468** −15% | $551 level |
| Kitchen + yard (120 sqft) | $850 | $852 level | $953 +12% | $1,204 +42% |
| 4-rm living/dining (350 sqft) | $950 | $1,885 **+98%** | $2,558 **+169%** | $3,231 **+240%** |
| 5-rm living/dining (450 sqft) | $1,380 | $2,423 **+76%** | $3,288 **+138%** | $4,154 **+201%** |

**We are competitive on bathrooms and badly uncompetitive on large open floors.**

### 4.4 The problem this exposes in our own model

Their $950 for a 350 sqft floor is **below our modelled cost** for the same job
(`COST-MODEL.md` gives ~$1,031). Either their cost base is lower, or — more likely —
our $\beta_{\text{remove}}$ is wrong for this job type.

`MATH.md` EQ 3.1 uses a **single** $\beta_{\text{remove}}$ for all removal. That cannot
be right. Raking fresh, soft BTO grout out of 600×600 floor joints is nothing like
raking ten-year-old grout out of 300×300 bathroom wall joints, yet the tariff charges
the same rate per metre. The model needs a condition-and-format dimension:

$$\beta_{\text{remove}} = \beta_0 \cdot f(\text{grout age}) \cdot g(\text{joint width}) \cdot h(\text{orientation})$$

Walls are slower than floors (working overhead, no body weight behind the tool), narrow
joints are slower per metre than wide ones, and aged grout is slower than fresh. Until
that is measured (`COST-MODEL.md` §6), the tariff over-charges the easy end of the range
— which is precisely the BTO whole-floor segment we have live enquiries for.

---

## 5. What this makes defensible

Our position does not rest on being cheapest. It rests on four things the price survey
either confirms or refutes, and each is checkable rather than a slogan:

1. **An instant fixed itemised number, with no site visit and no form first.** If the
   market quotes "from $X" and requires an inspection, then by EQ 7.3 we set $\Delta = 0$
   and win the anchoring race outright — the first credible quote defines the comparison
   set that every later quote is judged against.
2. **A published tariff a customer can check by hand.** Three constants and a table.
   This is a credible commitment in the Schelling sense: it removes our own ability to
   move the number later, which is precisely what makes it worth something.
3. **Pricing on joint metres, not square feet.** Technically correct (EQ 1.1), and it
   turns the ambiguity in §1 from our problem into the competitor's problem.
4. **A warranty longer than the failure mode.** Most of this market offers 1–2 years,
   which sits below the 12–36 month window where real grout failures surface — so it
   separates nothing (EQ 6.2). Ours has to exceed that window to carry information.

And one thing the cost model already settled (`COST-MODEL.md` §5.1): material is
**6–12% of invoice value**, so being the firm that uses the best named product costs
about 4% of price. We never need to compete downward on material, and any competitor
who does is saving almost nothing while forfeiting their only defensible claim.
