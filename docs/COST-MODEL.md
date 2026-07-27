# Cost-Up Pricing

How to derive the tariff constants from what we actually spend on equipment,
materials and labour — instead of calibrating them to what the market charges.

Every step refers back to an equation in `MATH.md`. Nothing new is invented here; this
document only supplies the **cost side** of relations already derived there.

---

## 0. What this fixes

The tariff currently in production —

$$P(A) = \underbrace{150}_{F} + \underbrace{18}_{c_{\text{area}}} A + \big(\underbrace{6.00}_{c_{\text{apply}}} + \underbrace{7.50}_{c_{\text{remove}}}\big)\lambda A$$

— was fitted so that its output landed near market rates and near the existing
$488 / $588 / $1,488 packages (`MATH.md` §4.1, §4.6). That makes it *competitive* and
*checkable*, but it says nothing about whether any of it is **profitable**. Those four
constants have never been reconciled against a cost.

This document derives them from the bottom up. The structure is fixed by `MATH.md`
EQ 4.1 — an affine cost function forces a two-part tariff — so the only question is
what numbers belong in the four slots.

---

## 1. The bridge equation

`MATH.md` EQ 3.1 gives job time as

$$T = T_0 + \alpha A + \beta \lambda A$$

and EQ 4.1 gives price the same shape:

$$P(A) = F + \big(c_{\text{area}} + c_{\text{joint}}\lambda\big) A$$

The two are the same expression. Multiply the time model by an all-in hourly rate and
add the things consumed rather than worked:

$$\boxed{\;C(A) \;=\; \underbrace{R\frac{T_0}{60} + K_{\text{job}}}_{F_{\text{cost}}}
\;+\; \underbrace{\left(R\frac{\alpha}{60} + k_A\right)}_{c_{\text{area,cost}}} A
\;+\; \underbrace{\left(R\frac{\beta}{60} + k_J\right)}_{c_{\text{joint,cost}}} \lambda A \;}$$

where

| Term | Meaning | Unit |
|---|---|---|
| $R$ | all-in crew hourly rate (§2) | SGD/h |
| $K_{\text{job}}$ | per-job consumables — protection, disposal | SGD |
| $k_A$ | consumables per m² — pads, sponges, masking | SGD/m² |
| $k_J$ | consumables per joint metre — **material and blades** (§3) | SGD/m |

**This is the whole method.** Everything else is populating $R$, $K_{\text{job}}$,
$k_A$ and $k_J$ from real invoices.

---

## 2. The all-in crew rate $R$

### 2.1 Loaded labour

$$w = \frac{C_{\text{annual per installer}}}{D_{\text{billable}} \times h_{\text{day}}}$$

$C_{\text{annual}}$ is fully loaded — wage, CPF, levy, insurance, training, paid leave.
$D_{\text{billable}}$ is **days actually on a job**, not days employed. The gap between
them is the single most under-counted cost in this trade: travel days, quoting visits,
weather, gaps between bookings and admin are all paid and none are billable.

Crew labour is $w \times n_{\text{crew}}$.

### 2.2 Capital recovery — reuse EQ 5.1

The annuity factor already derived for the customer-facing lifetime comparison
(`MATH.md` EQ 5.1) applies unchanged to our own assets:

$$EAC = P \cdot \frac{r}{1-(1+r)^{-n}}$$

Applied to the van and to each tool. The same equation that proves epoxy is cheaper per
year than cement proves what a multi-tool costs us per year. Add running costs that
don't amortise (fuel, road tax, insurance, servicing) directly.

$$\text{day rate}_{\text{asset}} = \frac{EAC(P, n, r) + C_{\text{running,annual}}}{D_{\text{billable}}}$$

### 2.3 Overhead

$$\text{day rate}_{\text{oh}} = \frac{12 \, C_{\text{monthly overhead}}}{D_{\text{billable}}}$$

Phone, marketing, accounting, storage, licences, insurance — everything that runs
whether or not we work today.

### 2.4 Assemble

$$R = w \, n_{\text{crew}} + \frac{\text{day rate}_{\text{van}} + \text{day rate}_{\text{tools}} + \text{day rate}_{\text{oh}}}{h_{\text{day}}}$$

Allocating the day-rates **by time** rather than per job is what makes $R$ usable in
EQ 3.1 — a job that takes twice as long absorbs twice the overhead, which is correct.

> **Units discipline.** $\alpha$ and $\beta$ must be **elapsed crew-minutes**, not
> person-minutes, because $R$ is already a whole-crew rate. Two installers working
> together halve the elapsed time per m². Mixing the two conventions double-counts
> labour and is the easiest way to get this wrong.

---

## 3. Materials and equipment as $k_J$

### 3.1 Material cost is naturally per joint metre

From `MATH.md` EQ 2.1, mass per unit area is $m = \rho\lambda w d \times 10^{-3}$.
Divide by $\lambda$ and the $\lambda$ cancels — **material cost is per metre of joint,
not per square metre**:

$$k_{\text{material}} = P_{\text{kg}} \cdot \kappa \cdot \rho \cdot w \cdot d \times 10^{-3} \quad [\text{SGD/m of joint}]$$

with $P_{\text{kg}}$ the delivered price per kg, $\kappa$ the waste factor (EQ 2.2),
$\rho$ density, $w$ and $d$ joint width and depth in mm.

That the $\lambda$ cancels is the reason material belongs in $c_{\text{joint}}$ and not
$c_{\text{area}}$ — and it is why the tariff's structure was right even when its
numbers weren't.

**Worked** at $P_{\text{kg}} = 26$, $\kappa = 1.15$, $\rho = 1.55$, $w = 3$, $d = 10$:

$$k_{\text{material}} = 26 \times 1.15 \times 1.55 \times 3 \times 10 \times 10^{-3} = \$1.39/\text{m}$$

> $\rho$ is **unverified for every product surveyed** (`MATERIALS.md` §3.3). Material
> cost is linear in $\rho$, so this figure inherits that uncertainty directly.

### 3.2 Blade wear is also per joint metre

Grout removal consumes carbide or diamond blades at a rate proportional to joint length
— the same variable that drives $\beta_{\text{remove}}$:

$$k_{\text{blade}} = \frac{P_{\text{blade}}}{L_{\text{blade}}} \quad [\text{SGD/m}]$$

A $22 carbide blade lasting 35 m costs $0.63/m; a $40 diamond blade lasting 120 m costs
$0.33/m. **The cheaper blade is the more expensive one per metre** — and it is slower,
so it also inflates $\beta_{\text{remove}}$ and therefore the labour term. Blade choice
hits the tariff twice.

### 3.3 Splitting apply and remove

$$k_{J,\text{apply}} = k_{\text{material}} + k_{\text{float wear}}, \qquad
k_{J,\text{remove}} = k_{\text{blade}} + k_{\text{vac consumables}}$$

$$c_{\text{apply,cost}} = R\frac{\beta_{\text{apply}}}{60} + k_{J,\text{apply}}, \qquad
c_{\text{remove,cost}} = R\frac{\beta_{\text{remove}}}{60} + k_{J,\text{remove}}$$

Note material sits entirely in **apply**. Re-grouting and new-tile work consume the same
material per metre; only the removal term differs. That is the cost-side justification
for the two rates the site publishes.

---

## 4. From cost to price

### 4.1 Markup

$$P_{\text{constant}} = \frac{C_{\text{constant}}}{1 - m}$$

applied to each of the four constants at target gross margin $m$. Gross margin here is
before owner's time on quoting, warranty reserve and tax.

### 4.2 Not the Lerner rule — yet

`MATH.md` EQ 4.8 gives the profit-maximising price as
$\frac{P^*-c}{P^*} = -\frac{1}{\varepsilon}$. It cannot be used: $\varepsilon$ is
unidentified at this volume (`MATH.md` §7.4 — resolving one 30% effect needs ~7,560
visits). Cost-plus with a target margin is the only defensible method available, and
EQ 4.8 serves as a sanity check, not a setter.

### 4.3 Warranty reserve is a cost, not profit

`MATH.md` EQ 6.2 gives $R_{\text{reserve}} = F(n) \cdot K \cdot (1+\phi)$ — about 5.4%
of price at a 7-year warranty. It must be subtracted from gross margin before the
remainder is called profit. A job at 40% gross margin is nearer 34% once reserved.

### 4.4 Minimum job

`MATH.md` EQ 4.4 sets $P_{\min}$ at the opportunity cost of the capacity displaced. In
cost terms, for a job occupying $T_{\text{job}}$ hours:

$$P_{\min} = \frac{R \, T_{\text{job}} + K_{\text{job}}}{1-m}$$

The published $380 minimum is only correct if a minimum-sized job genuinely takes a
fraction of a day. If it consumes a full day once travel is counted, $P_{\min}$ must
rise to a full day of $R$ — otherwise every small job is subsidised by a large one.

---

## 5. What the structure already tells us

Two conclusions follow from the *shape* of the equations, before any real numbers are
entered — they hold across any plausible input range.

### 5.1 Material grade is nearly free

Material is $k_{\text{material}} \approx \$1.39$ of a $13.50 published joint rate:
roughly **10% of the price of the work it sits in**. On a 68 m bathroom job at $1,254,
material is about $95, or **7.6% of the invoice**. Across the four reference jobs the
figure sits between 6.0% and 7.6% — it does not move much, which is the point.

Therefore: moving from a budget epoxy to the best available at +50% material cost adds
about $0.70/m — **4–5% of price** — while being the entire physical basis of a 5–7 year
warranty and the separating signal in `MATH.md` EQ 6.2.

A competitor cutting material grade to win on price is saving 4% of the invoice and
forfeiting the only defensible claim they have. **We should never be the firm that
economises on material**, and the arithmetic says we can afford not to be.

### 5.2 Labour dominates, so productivity is the only real lever

Since $R\beta/60 \gg k_J$, the joint rate is essentially a labour rate. A 20%
improvement in $\beta_{\text{remove}}$ — a better blade, better dust extraction, a
second person on the tool — moves cost more than any material negotiation could. This
is also why $\alpha$ and $\beta$ are the two parameters most worth measuring
(`MATH.md` §11.1).

---

## 6. Measuring $\alpha$, $\beta$ and $T_0$

The model cannot be populated without these, and they are the cheapest thing to collect:

On each job record — **start and stop time for each of**: travel and setup ($T_0$),
raking out, applying, washing and haze removal; plus the surface area and tile size
(which give $A$ and $\lambda$ via EQ 1.1).

Then fit by least squares across jobs:

$$T_i = T_0 + \alpha A_i + \beta J_i + \epsilon_i$$

A linear regression of recorded time on $A$ and $J$ returns all three constants at once,
with residuals that show which job types are mis-modelled. **Twenty jobs is enough to
beat the current estimates.** Until then every number downstream carries the uncertainty
flagged in `MATH.md` §11.

---

## 7. Order of operations

1. Collect one month of invoices: van, tools, materials, blades, overhead, payroll.
2. Time-log 20 jobs as in §6; regress for $T_0$, $\alpha$, $\beta$.
3. Compute $R$ (§2), $k_J$ and $k_A$ (§3).
4. Derive $F$, $c_{\text{area}}$, $c_{\text{apply}}$, $c_{\text{remove}}$ (§1, §4.1).
5. Compare against the published tariff. Where derived > published, we are selling
   below target margin on that term.
6. Re-check the package dominance condition (`MATH.md` EQ 4.6) — packages must stay at
   or below what the tariff yields for the same scope.
7. Only then change published prices.

**Do not change the site's tariff before step 2 is done.** The current numbers are at
least market-consistent; replacing them with numbers derived from guessed $\alpha$ and
$\beta$ would trade a known approximation for an unknown one.

---

## 8. The other two services

The grout tariff is cost-derived. The silicone and polyurea prices on the service pages
were not — they were round numbers with nothing behind them. This section fixes silicone
and explains why polyurea gets no published price at all.

### 8.1 Backing out $R$ from the tariff we already publish

We cannot measure $R$ yet (§6 is still open), but the published grout tariff already
*implies* one, and using that implied value keeps every service on the same cost basis
instead of inventing a second one.

At target gross margin $m = 0.45$, the published $c_{\text{apply}} = \$6.00/\text{m}$
decomposes as

$$c_{\text{apply}}(1-m) = R\frac{\beta_{\text{apply}}}{60} + k_{\text{material}}$$

so with $k_{\text{material}} = \$1.39$ (§3.1) and $\beta_{\text{apply}} = 2.5$ min/m:

$$R = \frac{(6.00 \times 0.55 - 1.39) \times 60}{2.5} = \boxed{\$45.84/\text{hr}}$$

**Sanity check, and it is the real test of this number.** Feed $R$ back into the
*other* published rate and see what $\beta_{\text{remove}}$ it implies:

$$\beta_{\text{remove}} = \frac{(7.50 \times 0.55 - 0.63) \times 60}{45.84} = 4.57 \text{ min/m}$$

Four and a half minutes to rake out a metre of hardened cement grout, clean it and
vacuum it is a believable figure — and nothing in the derivation forced it to be. The
two published rates were set independently, so their agreeing on one crew rate is
evidence the tariff is at least internally coherent. $R = \$45.84/\text{hr}$ for a
two-person crew is about $23/hr each fully loaded, which is where an SG crew sits.

> This inherits the uncertainty in $\beta_{\text{apply}}$ directly: $R$ is inversely
> proportional to it. Measuring $\beta$ (§6) fixes $R$ too — one more reason it is the
> highest-value thing to collect.

### 8.2 Silicone

Silicone is a **linear-metre** service, like grout, but on room perimeters and fixture
edges rather than tile joints. There is no $\lambda$ and no area term — the customer
counts metres directly.

**Material.** A 300 ml cartridge of neutral-cure sanitary silicone at a tooled 6×6 mm
bead consumes about 20 ml/m. At a waste factor of 1.25 that is 25 ml/m, so
**12 m per cartridge**. At $15 a cartridge:

$$k_{\text{sil}} = \frac{15}{12} = \$1.25/\text{m}$$

**Labour.** Replacement is five distinct operations, and the cut-out dominates:

| Operation | min/m |
|---|---|
| Cut both sides, peel, scrape the residue | 1.5 |
| Solvent-wipe and dry the substrate | 1.0 |
| Mask both sides | 1.5 |
| Gun and tool the bead | 1.5 |
| Pull the masking while wet | 0.5 |
| **Total $\beta_{\text{sil,replace}}$** | **6.0** |

New bead onto a clean substrate skips the first two: $\beta_{\text{sil,new}} = 3.5$.

**Rates.**

$$c_{\text{sil,replace}} = \frac{45.84 \times 6.0/60 + 1.25 + 0.30}{0.55} = \$11.15 \to \textbf{\$11.20/m}$$

$$c_{\text{sil,new}} = \frac{45.84 \times 3.5/60 + 1.25 + 0.20}{0.55} = \$7.50 \to \textbf{\$7.50/m}$$

**The mobilisation term is what actually matters here.** Silicone is a small job. At
14 m — a typical bathroom: shower screen, tray or kerb, basin, internal corners — the
work is $157. Add the $150 mobilisation and it is $307, which is under the $380
minimum job, so a standalone silicone visit prices at the minimum.

| Scope | Metres | As an add-on to grout work | As a standalone visit |
|---|---|---|---|
| One bathroom | 14 | **$157** | **$380** (minimum job) |
| Kitchen | 7 | **$78** | **$380** (minimum job) |
| Kitchen + one bathroom | 21 | **$235** | **$385** |
| Whole unit — 2 baths, kitchen, window and door frames | 45 | **$504** | **$654** |

The gap between the two columns *is* the mobilisation charge, and it is the honest
argument for bundling: the van trip costs what it costs whether we lay 7 m or 45 m.
The previously published $188 / $288 / $388 were **below cost as standalone visits** in
the first two cases — we would have been paying to attend.

### 8.3 Polyurea — no published price

Polyurea gets no tariff, and the service pages now route to a site survey. Three
reasons, in order of seriousness:

1. **It is a waterproofing membrane, not a finish.** The failure mode is water reaching
   the structure, and the consequential loss is the room, not the coating. Nothing in
   `WARRANTY-DECISION.md` — which is built around a grout joint failing visibly and
   being re-cut — transfers to that risk. A 5-year waterproofing warranty at a
   guessed price is the largest uncovered liability the site could carry.
2. **Price is dominated by substrate condition**, which cannot be assessed remotely.
   Falls, existing membrane, crack width, moisture content and primer choice each swing
   the job more than area does. There is no $A$-and-$J$ decomposition to publish.
3. **We have no material cost, no coverage rate and no $\beta$ for it.** Every input
   the grout tariff has, this does not.

If polyurea becomes a real line of work, it needs its own §1–§4 — its own $R$ is fine,
but it needs measured coverage per litre, measured application time, and a warranty
reserve computed against *water ingress*, not grout failure.
