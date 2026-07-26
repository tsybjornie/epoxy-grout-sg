# CLEANGROUT — Optimisation Model

The formal basis for the rebuilt site: the physical model of the job, the cost
and pricing model derived from it, the economics of why the price schedule has
the shape it has, the game-theoretic reasons the guarantees exist, and the
behavioural mechanisms the page is built around.

Every number shown to a customer on the site is produced by the model below.
Nothing is decorative.

---

## 1. Physical model of the job

### 1.1 Joint density

Tiles of face dimensions $L \times W$ (mm) laid in a grid. Each tile owns half
of each of its four bounding joints, so joint length per tile is $L + W$ mm and
tile area is $LW$ mm². Joint density is therefore

$$\lambda(L,W) \;=\; \frac{L + W}{L\,W} \times 10^{3} \quad \text{(metres of joint per m² of surface)}$$

| Tile | $\lambda$ (m/m²) |
|---|---|
| 300 × 300 | 6.67 |
| 600 × 300 | 5.00 |
| 600 × 600 | 3.33 |
| 1200 × 600 | 2.50 |
| 800 × 800 | 2.50 |

$\lambda$ is the single variable that drives both material and labour. It is
the reason a 1200×600 toilet costs less per m² than a 300×300 one, and the
reason a quote given in "per sqft" alone is meaningless without the tile size.

### 1.2 Material quantity

A joint of width $w$ and depth $d$ (mm) filled with epoxy of density
$\rho$ (g/cm³ ≈ kg/L) consumes

$$m \;=\; \lambda \cdot w \cdot d \cdot \rho \times 10^{-3} \quad \text{(kg per m²)}$$

For 600×600, $w=3$, $d=10$, $\rho=1.55$: $m = 3.33 \times 3 \times 10 \times 1.55 \times 10^{-3} = 0.155$ kg/m².

Waste factor $\kappa = 1.15$ (mixing residue, part-used units, pot-life loss on
two-part epoxy). Ordered mass $M = \kappa \, m A$, rounded up to the unit size
of the product actually used.

### 1.3 Labour time

Time decomposes into an area-driven part and a length-driven part:

$$T \;=\; T_0 \;+\; \alpha A \;+\; \beta \,\lambda A$$

- $T_0$ — mobilisation: travel, protection sheeting, tool setup, wash-up, disposal.
- $\alpha$ — area-driven minutes/m²: masking, substrate cleaning, and epoxy haze
  removal (the step that makes epoxy slower than cement — haze must come off
  within the working window or it is permanent).
- $\beta$ — minutes per linear metre of joint: raking out, packing, tooling.
  $\beta$ splits into $\beta_{\text{apply}}$ and, for re-grouting only,
  $\beta_{\text{remove}}$, which is the dominant term on existing tiles.

$\lambda A$ is total linear joint metres — the true unit of work. A 5 m²
toilet in 300×300 mosaic contains 33 m of joint; a 5 m² toilet in 1200×600
contains 12.5 m. Same area, 2.7× the work.

---

## 2. Cost and price model

### 2.1 Two-part tariff

Because $T_0$ and the trip exist whether the job is 3 m² or 60 m², the cost
function is affine, not proportional:

$$C(A) \;=\; F \;+\; c\,A$$

with $F$ the fixed mobilisation cost and $c$ the marginal cost per m². The
efficient and standard pricing response to an affine cost function is a
**two-part tariff** (Oi, 1971): a fixed access charge plus a usage rate.

$$P(A) \;=\; F \;+\; \big(c_{\text{area}} \;+\; c_{\text{joint}} \cdot \lambda\big) A$$

where

$$c_{\text{joint}} \;=\; \begin{cases} c_{\text{apply}} & \text{new tiles, no existing grout} \\ c_{\text{apply}} + c_{\text{remove}} & \text{re-grout over existing joints} \end{cases}$$

This is the schedule published on the site. It is the whole price list: three
constants and one table of $\lambda$.

### 2.2 Average cost declines — which is why bundles are honest

$$AC(A) \;=\; \frac{P(A)}{A} \;=\; \frac{F}{A} \;+\; c_{\text{area}} + c_{\text{joint}}\lambda$$

$AC'(A) = -F/A^2 < 0$. Average cost is strictly decreasing in area. A whole-home
job is genuinely cheaper per m² than a single bathroom — the discount is not a
promotion, it is $F$ being amortised. Displaying $AC(A)$ makes the bundle
credible instead of arbitrary, and it is the correct answer to "why is one
bathroom $488 but three areas only $1,488".

### 2.3 Learning curve within a job

Wright's law: unit cost of the $n$-th repetition falls as $n^{b}$ with
$b = \log_2(\ell)$ for learning rate $\ell$. With $\ell = 0.90$,
$b = -0.152$. Across the rooms of one flat the crew repeats an identical
operation, so realised marginal cost on later rooms falls. The site's quantity
discount schedule (−8% ≥ 30 m², −12% ≥ 60 m², −15% ≥ 100 m²) is a step
approximation to $\int_0^A c\,x^{b}\,dx / (cA)$ over that range, not a
number picked to look generous.

### 2.4 Reservation price and the floor

A job is refused below $P_{\min}$ = the price at which the opportunity cost of
the crew-day is not recovered. Publishing $P_{\min}$ as a stated minimum
callout removes the single largest source of wasted enquiries (sub-scale jobs),
which is a direct improvement in expected value per lead:

$$\mathbb{E}[\pi \mid \text{lead}] = p(\text{qualify}) \cdot \mathbb{E}[\pi \mid \text{qualified}] - c_{\text{quote}}$$

Every unqualified lead is a pure $-c_{\text{quote}}$ term. Self-selection via a
published floor raises $p(\text{qualify})$ without touching the numerator.

---

## 3. Lifetime cost — the comparison that actually decides the sale

The customer's real choice is not "epoxy vs cement" at a point in time; it is
between recurring and non-recurring cost streams. Compare on **equivalent
annual cost**:

$$EAC \;=\; P \cdot \frac{r}{1 - (1+r)^{-n}}$$

with $r$ a discount rate (5%) and $n$ the service life in years.

| Option | $P$ | $n$ | $EAC$ |
|---|---|---|---|
| Cement grout, re-done as it fails | ~$300 | 3 | ~$110/yr |
| Epoxy grout | ~$550 | 15 | ~$53/yr |
| Strip and re-tile | ~$3,500 | 20 | ~$281/yr |

Epoxy wins on $EAC$ by roughly 2× against cement and 5× against re-tiling, even
though it loses on sticker price. Presenting $EAC$ converts a
present-biased comparison into the one that is actually true, and it is the
mathematically correct rebuttal to "cement is cheaper".

### 3.1 The cost of waiting

Failed grout is not static. Water reaching the substrate through open joints
produces a repair whose cost jumps discontinuously once it becomes a
waterproofing or screed job. Expected cost of delay over horizon $t$:

$$\mathbb{E}[C_{\text{delay}}(t)] \;=\; \big(1 - e^{-h t}\big)\,C_{\text{escalated}} \;+\; e^{-h t} C_{\text{now}}$$

with $h$ the hazard rate of progression from cosmetic to structural. The site
states this qualitatively with real numbers rather than as an alarm: the
downside is genuinely convex in time, and saying so is accurate, not pressure.

---

## 4. Information economics — why the guarantees exist

### 4.1 The market is a lemons market

Akerlof (1970). The buyer cannot distinguish a correctly applied epoxy joint
from a badly applied one at handover — both look identical on day one. Failure
appears at 6–24 months. With quality unobservable at purchase, buyers rationally
pay only the average-quality price, high-quality suppliers exit, and quality
collapses to the minimum. This is precisely the observed state of the local
grouting market, and it is why price-shopping on this service so often ends
badly.

### 4.2 Warranty as a separating signal

Spence (1973). A signal separates types only if it is **cheaper for the high
type to send**. Let $q$ be the failure probability and $K$ the rework cost. The
expected cost of an $n$-year warranty is $q_n K$. For a competent applicator
$q$ is small, so the warranty is nearly free; for an incompetent one it is
ruinous. The single-crossing condition holds, so a warranty long enough that a
bad operator cannot afford to offer it is a **credible** signal. A 2-year
warranty is weak (below typical failure onset); the separating warranty must
extend past the failure distribution's mode. This is why the rebuilt site leads
with a longer written warranty and states the rework terms explicitly — an
unstated warranty carries no information.

### 4.3 Other costly signals deployed

- **Named products with batch-level specificity.** Cheap to state, expensive to
  fake once a customer can check the receipt on site. Low signalling cost only
  for firms actually buying that material.
- **Fixed price in writing before work starts.** A firm intending to pad the
  bill mid-job cannot commit to this. Credible commitment in the Schelling
  sense: it removes the firm's own future option, which is exactly what makes it
  worth something to the buyer.
- **Named, dated, addressed work photos** rather than stock imagery. Verifiable
  in principle, therefore informative.

### 4.4 Ambiguity aversion

Ellsberg (1961). Buyers penalise *unknown* distributions more than merely bad
known ones. A quote reading "from $488, subject to site inspection" is an
ambiguous lottery; a quote reading "$612 fixed, or free if we find something on
site that changes it" is a known one. Under ambiguity aversion the second wins
even at a higher stated number. This is the single strongest argument for the
instant itemised quote engine being the site's centrepiece.

---

## 5. Game-theoretic structure

### 5.1 The quotation game

Buyers collect $k$ quotes. If all sellers quote vaguely ("from $X"), the buyer
cannot rank them and defaults to the lowest headline number — a **race to the
bottom in stated prices**, decoupled from delivered quality. The dominant
deviation is to be the only seller quoting a *complete, itemised, fixed* number:
it changes the buyer's comparison basis from headline to total, which the
vague quoters lose on once site fees, minimum charges, and material grades
surface. Being the transparent one is a best response precisely *because* the
others are not.

### 5.2 Winner's curse

Common-value auction logic (Capen et al., 1971). Across $k$ bidders on a job of
uncertain true cost, the winner is systematically the one who most underestimated
it. The customer's cheapest quote is the one most likely to have mis-scoped the
job — and the recovery path for a bidder who underbid is to cut material grade,
skip removal depth, or abandon. Stating this explains "cheapest quote" losses to
the customer in a way that is true and not merely self-serving.

### 5.3 Repeated game and reputation

One-shot: cheat dominates. Repeated with public reviews: cooperation sustains if
$\delta \geq \frac{\pi_{\text{cheat}} - \pi_{\text{coop}}}{\pi_{\text{cheat}} - \pi_{\text{punish}}}$.
A firm visibly investing in a durable, searchable identity (named business,
reviews, warranty registry, long-lived site) reveals a high $\delta$ — it has
made itself vulnerable to punishment, which is only rational if it intends to
cooperate. Visible permanence *is* the signal.

### 5.4 Bundling

Adams & Yellen (1976). Valuations across rooms are heterogeneous and negatively
correlated (someone who cares about the kitchen may not care about the guest
bath). Bundling reduces the variance of total valuation, letting a single price
capture more surplus than separate prices. Mixed bundling — offering rooms
individually *and* as a home package — dominates pure bundling here, because it
also serves single-room buyers rather than losing them.

---

## 6. Behavioural mechanisms in the page

Each is tied to a specific element; none is used as decoration.

**Anchoring (Tversky & Kahneman, 1974).** The first number the page shows is the
cost of the alternative the customer is actually avoiding (re-tiling, ~$3,500),
not the package price. All subsequent prices are evaluated against it.

**Prospect theory (Kahneman & Tversky, 1979).** $v(x)$ is steeper in losses:
$-v(-x) > v(x)$, with $\lambda \approx 2.25$. Renovation is framed as loss
avoidance (stopping the damage) rather than gain acquisition (nicer joints),
which is worth roughly a factor of two in perceived magnitude for the same
dollar amount.

**Left-digit effect (Thomas & Morwitz, 2005).** Perceived magnitude is
disproportionately set by the leading digit; $488$ reads far below $512$, not
5% below. Price points sit just under digit boundaries.

**Weber–Fechner.** Perceived difference scales with $\log(P_2/P_1)$. Tier gaps
are set in ratio, not in dollars, so that adjacent tiers feel evenly spaced.

**Asymmetric dominance / decoy (Huber, Payne & Puto, 1982).** The three-tier
grid includes an option dominated by the target tier on every dimension. Its
purpose is to make the target's superiority *transitive and visible*, which
reliably shifts share toward the target. The decoy is a real, purchasable
option — a fake one is a lie and also fails, because customers do buy it.

**Centre-stage effect.** In a symmetric row of three, the middle position gains
share independently of content. Target tier sits centre.

**Hick's law / choice overload (Iyengar & Lepper, 2000).** Decision time grows
as $T = a + b\log_2(n+1)$, and beyond ~6 options conversion falls outright. Top
level is 3 choices. Everything else is progressive disclosure.

**Endowed progress (Nunes & Drèze, 2006).** A quote form shown as 20% complete
on arrival is completed materially more often than one shown at 0%, for
identical remaining work. The quote engine opens with the first step pre-filled.

**Goal-gradient (Hull, 1932; Kivetz et al., 2006).** Effort accelerates near
completion. The progress indicator is non-linear — later steps advance it more —
so the terminal segment feels close.

**Zeigarnik effect.** Incomplete tasks stay in memory. A partially built quote
is saved to `localStorage` and restored on return, keeping the task open.

**IKEA effect (Norton, Mochon & Ariely, 2012).** Valuation rises with own
labour invested. The customer *builds* their own quote room by room rather than
receiving one, which raises both valuation and commitment to the number.

**Peak-end rule (Kahneman et al., 1993).** Experience is remembered by its peak
and its end. The page's peak is the instant itemised quote; the end is a
single clear commitment, not a wall of links.

**Fitts's law.** $MT = a + b\log_2(2D/W)$. Primary action is a persistent
full-width bottom bar on mobile: $D$ minimal from thumb rest, $W$ maximal.

**Processing fluency.** Ease of reading is misattributed to truth. High
contrast, one typeface, short lines, no jargon without immediate translation.

**Von Restorff isolation.** Exactly one element on any screen carries the accent
colour: the primary action. Isolation is destroyed by using an accent twice.

**Social proof / information cascade (Banerjee, 1992).** Observed choices are
treated as evidence about quality. Recent, specific, locatable jobs
("4-room in Yishun, 1200×600, last Tuesday") are informative; a review count is
not.

**Scarcity (Cialdini).** Only real constraints are stated — actual remaining
installer-days in the current window. A countdown that resets, or a promo banner
still reading "OFFER ENDED", destroys the credibility of every other claim on
the page. This was the single most damaging element on the previous site and is
removed outright.

**Hyperbolic discounting.** $D(t) = 1/(1+kt)$: present costs are weighted far
above future ones. Payment is structured so the present outlay is small
(deposit) with the balance on completion, and the *time to value* is stated in
days.

**Cognitive load / miscomprehension.** Every technical term is followed
immediately by its consequence in plain language ("pot life 45 min — once mixed,
it must be on the wall inside 45 minutes or it is scrap").

---

## 7. Funnel arithmetic

$$\text{Revenue} = V \cdot r_{\text{quote}} \cdot r_{\text{book}} \cdot \bar{P} \cdot (1 + \eta)$$

$V$ visitors, $r_{\text{quote}}$ quote-start rate, $r_{\text{book}}$ quote→booking,
$\bar{P}$ average job value, $\eta$ referral/repeat multiplier.

The multiplicative structure means the binding constraint is whichever term is
lowest, and improvements compound. Ranked by leverage for this business:

1. $r_{\text{book}}$ — dominated by quote ambiguity and response latency. An
   itemised fixed number delivered instantly attacks both. Highest leverage.
2. $\bar{P}$ — dominated by attach rate of additional rooms. The per-room quote
   builder makes adding a room a one-tap decision at the moment of highest
   intent, and $AC'(A)<0$ means each added room is honestly cheaper.
3. $r_{\text{quote}}$ — dominated by friction at the first step. Zero required
   fields before a number is shown; contact details are requested *after* value
   is delivered, not before.
4. $\eta$ — warranty registration creates a legitimate reason for future contact.
5. $V$ — the existing location/problem/property-type page set already addresses
   this and is retained and linked.

Response latency deserves separate note: conversion on inbound trade enquiries
falls sharply with time-to-first-reply, and the effect is largely a
**first-mover** one — the first credible quote anchors the comparison set, and
later quotes are evaluated against it rather than on their own terms. An
instant on-page number is a structural advantage no competitor reply speed can
match.

---

## 8. What the model says to change

Direct consequences of the above, all implemented in the rebuild:

1. **Remove the expired promotional banner.** A visible "OFFER ENDED" is a
   negative signal that contaminates every other claim (§6, scarcity).
2. **Replace "from $X" with an instant itemised fixed quote.** Attacks ambiguity
   aversion (§4.4), the quotation game (§5.1), and $r_{\text{book}}$ (§7).
3. **Price on joint metres, not floor area.** Tile size is the dominant cost
   driver (§1.1) and quoting without it is guesswork.
4. **Add a new-tiles (no removal) service line.** Roughly half the marginal
   cost, and the previous site had no offer for it at all despite receiving
   enquiries for exactly that.
5. **Publish the tariff.** $F$, $c_{\text{area}}$, $c_{\text{joint}}$, the
   $\lambda$ table, the minimum callout. Credible commitment (§4.3) plus
   self-selection (§2.4).
6. **Show $AC(A)$ declining.** Makes the bundle honest rather than arbitrary (§2.2).
7. **Lead with $EAC$, not sticker price** (§3).
8. **Lengthen and specify the warranty** past the failure mode (§4.2).
9. **Ask for contact details only after the number is on screen** (§7).
10. **State only real scarcity** (§6).
