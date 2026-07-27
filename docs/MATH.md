# Mathematics, Theorems and Algorithms

Everything computable in the model, derived rather than asserted. Section numbers are
referenced from `NODE-MODEL.md`.

## 0. Notation

| Symbol | Meaning | Unit |
|---|---|---|
| $L, W$ | tile face dimensions | mm |
| $t$ | tile thickness | mm |
| $\lambda$ | joint density | m of joint per m² |
| $A$ | surface area | m² |
| $J$ | total joint length, $J=\lambda A$ | m |
| $w, d$ | joint width, depth | mm |
| $\rho$ | grout density | kg/L ≡ g/cm³ |
| $\kappa$ | waste factor | — |
| $m$ | material mass per m² | kg/m² |
| $T$ | labour time | min |
| $\alpha$ | area-driven time rate | min/m² |
| $\beta$ | length-driven time rate | min/m |
| $F$ | mobilisation charge | SGD |
| $c_{\text{area}}$ | area price rate | SGD/m² |
| $c_{\text{joint}}$ | joint price rate | SGD/m |
| $r$ | discount rate | /yr |
| $n$ | service life | yr |
| $t_p$ | pot life | min |

---

## 1. Geometry

### 1.1 Theorem 1 — Joint density

> **Theorem.** For any edge-to-edge tiling of the plane by congruent rectangles
> $L \times W$ in which every interior joint is shared by exactly two tiles, the
> joint length per unit area is
> $$\lambda = \frac{L+W}{L\,W}$$
> and this value is **independent of the laying pattern**.

**Proof.** Tile area is $LW$, so tile density is $n = 1/(LW)$ tiles per unit area.
Each tile has perimeter $2(L+W)$. Every joint segment is shared by exactly two tiles,
so the joint length attributable to one tile is $\tfrac{1}{2} \cdot 2(L+W) = L+W$.
Hence $\lambda = n(L+W) = (L+W)/(LW)$. No step used the relative offset of adjacent
rows, so stack bond, running bond, herringbone and basketweave all give the same
$\lambda$. $\blacksquare$

**Units.** With $L,W$ in mm, $\lambda$ comes out in mm/mm² $=$ 1/mm. Multiply by
$10^3$ for m/m²:
$$\lambda\ [\text{m/m}^2] = \frac{L+W}{L\,W}\times 10^{3}$$

| Tile (mm) | $\lambda$ (m/m²) | Relative work |
|---|---|---|
| 1200 × 600 | 2.50 | 0.75× |
| 800 × 800 | 2.50 | 0.75× |
| 600 × 600 | 3.33 | 1.00× (reference) |
| 600 × 300 | 5.00 | 1.50× |
| 300 × 300 | 6.67 | 2.00× |
| 200 × 200 | 10.00 | 3.00× |
| 100 × 100 mosaic | 20.00 | 6.00× |

### 1.2 Corollary — square tiles minimise joint

For a **fixed tile face area** $A_t = LW$, $\lambda = (L+W)/A_t$ is minimised when
$L+W$ is minimised subject to $LW = A_t$. By AM–GM, $L+W \ge 2\sqrt{LW}$ with
equality iff $L=W$. So among tiles of equal area, **square minimises grouting work**.

$$\lambda_{\min} = \frac{2}{\sqrt{A_t}}$$

This explains the 800×800 / 1200×600 coincidence above: $1600/640000 = 1800/720000 = 0.0025$.
The larger rectangle needs 12.5% more face area to match the square's joint density.

### 1.3 Boundary correction

Theorem 1 is exact for an unbounded field. A real surface has a perimeter where tiles
are cut and the joint is replaced by a silicone or edge condition. For a surface of
area $A$ and perimeter $P$:

$$J = \lambda A - \eta P, \qquad \eta \in [0, 1]$$

with $\eta \approx 1$ when the whole perimeter is siliconed rather than grouted.
The correction is $O(P/A)$ and matters only for small surfaces: a 1 m² niche loses
~10% of its joint to the perimeter; a 30 m² floor loses ~2%. The production model
sets $\eta = 0$ and absorbs the difference into $\alpha$, because the perimeter is
*more* work per metre (silicone), not less.

### 1.4 Wall area from geometry

$$A_{\text{wall}} = \big(P_{\text{room}} - \textstyle\sum_i \ell_i\big)\, h - \sum_j A_{\text{opening},j}$$

where $\ell_i$ are wall lengths occupied by full-height fixtures and $h$ is the tiled
height (full height, or shower height ~1.8–2.1 m).

For a rectangular bathroom $a \times b$ tiled to height $h$:
$$A_{\text{wall}} = 2(a+b)h - A_{\text{door}} - A_{\text{window}}$$

A 1.8 × 2.2 m bathroom tiled to 2.4 m gives $2(4.0)(2.4) = 19.2$ m² of wall against
3.96 m² of floor — **the walls are 83% of the work**, which is why "per bathroom"
pricing without a wall specification is meaningless.

### 1.5b Perimeter estimator — masking is not an area cost

Masking and protection scale with the **perimeter** of a room, not its area, yet a flat
$/m² rate charges them as if they were area-driven. For a square-ish room the perimeter
follows from the area alone:

$$P \approx 4\sqrt{A} \quad\Longrightarrow\quad \frac{P}{A} = \frac{4}{\sqrt{A}}$$

| Room | $A$ (m²) | $P/A$ (m per m²) |
|---|---|---|
| Bathroom floor | 4 | 2.00 |
| Kitchen | 10 | 1.25 |
| Living/dining floor | 32.5 | 0.70 |
| Whole flat | 83.6 | 0.44 |

A bathroom carries **nearly three times** the perimeter intensity of an open living
floor. Charging both at one $/m² rate systematically overprices large open areas — which
is exactly where the tariff was found to be uncompetitive (`COMPETITOR-PRICING.md` §4.3).

Because it is a per-room quantity, $4c_{\text{mask}}\sqrt{A}$ must be summed **per
surface**, never applied to a job total: three 5 m² rooms carry $\sqrt{5}\times3 = 6.7$
units of perimeter against $\sqrt{15} = 3.9$ for one 15 m² room.

### 1.5 Mixed tile sizes

For a job spanning surfaces with different tiles, the area-weighted joint density is
$$\bar\lambda = \frac{\sum_i A_i \lambda_i}{\sum_i A_i}, \qquad J_{\text{total}} = \sum_i A_i \lambda_i$$

Never average the tile dimensions — average the densities. $\lambda$ is convex in
tile size, so averaging dimensions underestimates work (Jensen's inequality).

---

## 2. Material quantity

### 2.1 Mass per unit area

A joint of cross-section $w \times d$ running $\lambda$ metres per m²:

$$V = \lambda \, w \, d \times 10^{-6}\ [\text{m}^3/\text{m}^2], \qquad
m = \rho \, \lambda \, w \, d \times 10^{-3}\ [\text{kg/m}^2]$$

with $\lambda$ in m/m², $w,d$ in mm, $\rho$ in kg/L.

**Worked:** 600×600, $w=3$, $d=10$, $\rho=1.55$:
$$m = 1.55 \times 3.33 \times 3 \times 10 \times 10^{-3} = 0.155\ \text{kg/m}^2$$

### 2.2 Order quantity

$$M_{\text{order}} = \left\lceil \frac{\kappa \sum_i m_i A_i}{k} \right\rceil k$$

for pack size $k$ and waste factor $\kappa \approx 1.15$ (mixing residue, part-used
units, pot-life loss). Two-part epoxy cannot be part-mixed without a scale, so
rounding is **up to whole packs**, and the residual is real cost, not notional.

With multiple pack sizes $k_1 > k_2 > \dots$, minimising cost is an integer program:
$$\min \sum_j c_j x_j \quad \text{s.t.} \quad \sum_j k_j x_j \ge \kappa M, \quad x_j \in \mathbb{Z}_{\ge 0}$$
A greedy largest-first fill is optimal when pack costs are concave in size (they
normally are), otherwise solve exactly — the search space is tiny.

### 2.3 Coverage per pack

$$A_{\text{pack}} = \frac{k}{\kappa \, \rho \, \lambda \, w \, d \times 10^{-3}}$$

A 4 kg unit at the worked example covers $4/(1.15 \times 0.155) = 22.4$ m² of
600×600 — but see §3.4, because you cannot *apply* 22.4 m² inside one pot life.
Coverage and workability are different constraints and the binding one is usually
not coverage.

### 2.4 Colour matching

CIE76 colour difference between tile and grout candidate:
$$\Delta E^*_{ab} = \sqrt{(\Delta L^*)^2 + (\Delta a^*)^2 + (\Delta b^*)^2}$$

Thresholds: $\Delta E < 1$ imperceptible to most observers; $\Delta E < 2$ perceptible
only on direct comparison; $\Delta E > 5$ reads as a different colour. CIEDE2000
($\Delta E_{00}$) is more accurate for near-neutrals — which grout usually is — and
should be preferred where the palette is stored as Lab.

Selection is **not** minimise-$\Delta E$. Deliberate contrast is often correct: the
design target is either match ($\Delta E_{00} < 2$) or clean separation
($\Delta E_{00} > 10$); the ugly zone is $2 < \Delta E_{00} < 10$, where it reads as
a failed match rather than a choice.

---

## 3. Time and process

### 3.1 Labour model

$$T = T_0 + \alpha A + \beta \lambda A = T_0 + \alpha A + \beta J$$

- $T_0$ — mobilisation time (travel, protection, setup, wash-up, disposal)
- $\alpha$ — area-driven: masking, substrate cleaning, haze removal
- $\beta = \beta_{\text{apply}} + \mathbb{1}[\text{regrout}]\,\beta_{\text{remove}}$

Removal dominates: $\beta_{\text{remove}} \approx 1.5\text{–}2.5 \times \beta_{\text{apply}}$
for carbide/oscillating removal on sound cement grout.

### 3.2 Learning curve (Wright)

Unit time on the $n$-th repetition:
$$T_n = T_1 \, n^{b}, \qquad b = \log_2 \ell$$

At learning rate $\ell = 0.90$, $b = -0.152$. Cumulative time for $N$ repetitions:
$$T_{1..N} = T_1 \sum_{n=1}^{N} n^{b} \approx T_1 \frac{N^{\,b+1}}{b+1}$$

Average unit time over $N$ units relative to the first:
$$\frac{\bar T_N}{T_1} \approx \frac{N^{b}}{b+1}$$

For $N=4$ rooms at $\ell=0.9$: $\bar T/T_1 = 4^{-0.152}/0.848 = 0.810/0.848 = 0.955$ —
about 4.5% saving. Across a 10-surface flat: ~8%. This is the honest magnitude of
the multi-room efficiency, and it is what the discount bands in §4.3 approximate.

### 3.3 Pot life and temperature

Two-part epoxy cure is Arrhenius-governed:
$$t_p(T) = t_p(T_{\text{ref}}) \exp\!\left[\frac{E_a}{R}\left(\frac{1}{T} - \frac{1}{T_{\text{ref}}}\right)\right]$$

with $T$ in kelvin. The practical form is the $Q_{10}$ rule:
$$t_p(T) \approx t_p(T_{\text{ref}}) \cdot 2^{-(T - T_{\text{ref}})/10}$$

**Pot life roughly halves per +10 °C.** A product rated 45 min at 23 °C gives about
30 min at 30 °C and ~22 min in an unventilated Singapore bathroom at 35 °C. This is
not a footnote — it is the single largest source of epoxy job failures in a tropical
climate, and it changes batch sizing by a factor of two.

Note that the *reference* pot life is strongly product-dependent — figures from 45 to
120 min appear across the products surveyed in `MATERIALS.md` §3.2. The 45 min used
throughout this document is a deliberately conservative placeholder, not a constant.
Manufacturers quote it at ~23 °C, which is a temperature this trade rarely works at
locally, so the quoted figure should be treated as an upper bound never achieved on
site until measured.

### 3.4 Batch sizing — the binding constraint

Two independent bounds on how much area one mixed batch may cover.

**Pot-life bound.** Available working time is $t_p(T) - t_{\text{mix}} - t_{\text{safety}}$.
Application consumes $\alpha_{\text{apply}} + \beta_{\text{apply}}\lambda$ minutes per m²
per applicator, so with $N_a$ applicators:

$$A_{\text{pot}} = \frac{N_a\big(t_p(T) - t_{\text{mix}} - t_{\text{safety}}\big)}{\alpha_{\text{apply}} + \beta_{\text{apply}}\lambda}$$

**Pack bound.** A full unit must be mixed at the correct ratio:
$$A_{\text{pack}} = \frac{k}{\kappa \rho \lambda w d \times 10^{-3}}$$

$$\boxed{A_{\text{batch}} = \min\big(A_{\text{pot}},\, A_{\text{pack}}\big)}$$

**The conflict.** With $t_p = 45$, $t_{\text{mix}} = 4$, $t_{\text{safety}} = 5$,
$\alpha_{\text{apply}} = 3$ min/m², $\beta_{\text{apply}} = 1.2$ min/m, one applicator,
600×600:
$$A_{\text{pot}} = \frac{36}{3 + 1.2(3.33)} = \frac{36}{7.0} = 5.1\ \text{m}^2$$
against $A_{\text{pack}} = 22.4$ m² for a 4 kg unit. The pot life binds by more than
4×. Three resolutions, and every competent epoxy job uses one of them:

1. **More applicators.** $N_a \ge A_{\text{pack}}/A_{\text{pot}} = 4.4$ — impractical.
2. **Smaller units.** Buy 1–1.5 kg packs, or products supplied in pre-portioned parts.
3. **Weighed part-mixing.** Split the parts by mass on a 0.1 g scale at the exact
   ratio. The common belief that a full unit must always be mixed is **not**
   universally true — at least one major manufacturer explicitly permits proportional
   partial mixing, and no source was found forbidding it outright (`MATERIALS.md`
   §4.5). The operative rule is to hold the ratio precisely and follow the specific
   product's data sheet. A ratio error of a few percent leaves permanently soft or
   brittle grout, so the scale is not optional.

For 300×300 the same calculation gives $A_{\text{pot}} = 36/(3+8.0) = 3.3$ m² — small
tiles shrink the batch, raise the number of mixes, and raise the risk of a missed
clean window. This is a second, independent reason small tiles cost more, beyond the
raw $\lambda$ ratio.

### 3.5 Clean windows — two of them, and they are not the same

A correction worth stating explicitly, because conflating these is a common and
expensive error (`MATERIALS.md` §4.5):

1. **Initial emulsification wash** — water and a white pad, taking off the bulk while
   the material is still emulsifiable. Manufacturer guidance places this during or
   shortly after the working window (one product: about 1 h after installation).
2. **Haze / residue removal** — a dedicated remover applied to whatever the first wash
   missed, *after* cure: 24 h to 7 d depending on product.

Pot life bounds **application** (§3.4). The emulsification wash is a separate, later
operation with its own product-specific window $[\tau_1, \tau_2]$. Per section:

$$p_{\text{miss}} = P\!\left(T_{\text{apply}} + T_{\text{wash}} > \tau_2\right)$$

Sectioning exists to drive $p_{\text{miss}} \to 0$. Once epoxy residue has hardened on
a tile face, remediation happens on the customer's finished surface — an asymmetric
enough outcome to justify a large $t_{\text{safety}}$ and small sections regardless of
what the pot life nominally allows.

### 3.6 Critical path

The process DAG (NODE-MODEL §9.3) with durations $D_i$ gives, forward:
$$ES_i = \max_{j \in \text{pred}(i)} (EF_j), \quad EF_i = ES_i + D_i$$
backward:
$$LF_i = \min_{k \in \text{succ}(i)} (LS_k), \quad LS_i = LF_i - D_i$$
float $= LS_i - ES_i$; the critical path is the zero-float chain, and makespan is
$\max_i EF_i$.

`CureWait` is pure lag — it consumes calendar but no labour. Consequently the
crew-day cost of a job is **not** proportional to its makespan, and jobs should be
interleaved across surfaces so that curing on one overlaps application on another.

### 3.7 Occupancy constraint

For a single-bathroom household, the schedule must satisfy
$$\forall t: \big|\{s \in \text{Bathrooms} : t \in [\text{start}_s, \text{start}_s + D_s + t_{\text{traffic}}]\}\big| < |\text{Bathrooms}|$$

i.e. at least one usable at all times. With one bathroom, the job must fit inside a
single working day plus an overnight cure — which caps the scope that can be sold to
that household, independent of price.

---

## 4. Cost and price

### 4.1 Cost function and the two-part tariff

$$C(A) = F + cA$$

Affine cost ⇒ the efficient tariff is two-part (Oi, 1971): a fixed access charge plus
a usage rate.

$$P = F + \sum_{i}\Big[ c_{\text{haze}}A_i + 4c_{\text{mask}}\sqrt{A_i} + c_{\text{joint}}\lambda_i A_i \Big]$$

summed over surfaces $i$, with the perimeter term from §1.5b. The joint rate carries a
**removal difficulty factor** $\varphi$:

$$c_{\text{joint}} = c_{\text{apply}} + \varphi \, c_{\text{remove}}, \qquad
\varphi = \begin{cases}
0 & \text{new tiles, never grouted}\\
0.55 & \text{recent grout (BTO handover, under ~1 yr)}\\
1.0 & \text{old hardened grout}
\end{cases}$$

A single $\beta_{\text{remove}}$ for all removal was wrong: fresh, soft grout in
600×600 floor joints is not the same work as ten-year-old grout in 300×300 wall joints.
$\varphi$ is the first-order correction; the fuller form would also carry joint width
and wall-versus-floor orientation.

Current constants: $F=150$, $c_{\text{haze}}=10$/m², $c_{\text{mask}}=4$/m of
perimeter, $c_{\text{apply}}=6.00$/m, $c_{\text{remove}}=7.50$/m, $P_{\min}=380$,
waive $F$ above $900$. Note $c_{\text{haze}} + 4c_{\text{mask}}/\sqrt{A} = 18$ at
$A=4$ m², so bathroom pricing is unchanged while large floors fall by 10–26%.

### 4.2 Average cost is strictly decreasing

$$AC(A) = \frac{P(A)}{A} = \frac{F}{A} + c_{\text{area}} + c_{\text{joint}}\lambda,
\qquad AC'(A) = -\frac{F}{A^2} < 0$$

$AC$ is convex and asymptotes to $c_{\text{area}} + c_{\text{joint}}\lambda$. The gap
between the price of a small job and a large one per unit area is entirely $F/A$ —
which is why quantity discounts on this service are arithmetic, not generosity, and
why a "per sqft" quote is meaningless without the job size attached.

### 4.3 Discount bands as a learning integral

The realised marginal cost on the $x$-th unit of area within one visit falls as
$x^{b}$. Total cost over area $A$:
$$C_{\text{learn}}(A) = F + c\!\int_0^{A} x^{b}\,dx \cdot \frac{1}{A^{b}}\Big|_{\text{normalised}} = F + c\,\frac{A}{b+1}\left(\frac{A}{A_0}\right)^{b}$$

The implied discount versus linear pricing is
$$\delta(A) = 1 - \frac{1}{b+1}\left(\frac{A}{A_0}\right)^{b}$$

Evaluated at $\ell = 0.9$ ($b=-0.152$) with $A_0 = 5$ m², this gives roughly 8% at
20 m², 12% at 60 m², 15% at 120 m² — the step bands in production are a piecewise
approximation of this curve, chosen so customers can verify them by hand.

### 4.4 Minimum job

$$P_{\min} = \max\big(C(A_{\min}),\ \text{opportunity cost of the half-day displaced}\big)$$

Publishing $P_{\min}$ is a self-selection device. Expected value per enquiry is
$$\mathbb{E}[\pi \mid \text{lead}] = p_q \cdot \mathbb{E}[\pi \mid \text{qualified}] - c_{\text{quote}}$$
and every unqualified lead contributes $-c_{\text{quote}}$ with no offsetting term.
Raising $p_q$ by publishing the floor strictly dominates.

### 4.5 Margin and sensitivity

$$M(A) = \frac{P(A) - C(A)}{P(A)}$$

Sensitivities that matter operationally:
$$\frac{\partial P}{\partial \lambda} = c_{\text{joint}} A, \qquad
\frac{\partial P}{\partial A} = c_{\text{area}} + c_{\text{joint}}\lambda, \qquad
\frac{\partial P}{\partial w} \approx 0$$

Price is **linear in $\lambda$ and in $A$, and independent of joint width** — because
width changes material mass (small) but not joint length or removal time (large). A
mis-measured tile size is the costliest survey error: getting 600×600 wrong when it
is actually 300×300 understates the job by 2×.

### 4.6 Package vs calculator dominance

A package at price $P_{\text{pkg}}$ covering scope $(A^*, \lambda^*)$ should be
offered only if it is *weakly better for the customer* at that scope:
$$P_{\text{pkg}} \le P(A^*, \lambda^*) + V_{\text{inclusions}}$$
Otherwise the package is a trap that the transparent calculator immediately exposes,
which costs more in credibility than the package earns. Current calibration:

| Scope | Calculator | Package | Verdict |
|---|---|---|---|
| Bathroom 50 sqft, 300×300 | $650 | $488 | package wins |
| Kitchen 95 sqft, 300×300 | $1,007 | $588 | package wins |
| Whole home 180 sqft, 300×300 | $1,664 | $1,488 | package wins |

**But dominance is conditional on $\lambda$, and the condition is not cosmetic.**
Checking a single representative scope is not enough — the test is over the *whole*
scope set, minimised. Tile size swings $\lambda$ by 4× (EQ 1.1: 2.50 m/m² at 1200×600
against 10.0 at 200×200), so a fixed package price cannot dominate across all tile
sizes. Minimising the calculator over every split of the whole-home scope:

| Tile ceiling | min over scope | vs $1,488 |
|---|---|---|
| 200×200 and smaller | $2,244 | dominant |
| **300×300 and smaller** | **$1,587** | **dominant** |
| 600×300 and smaller | $1,259 | **fails** |
| 600×600 and smaller | $930 | fails |
| 1200×600 and smaller | $900 | fails |

The dominance boundary is **300×300**, which is also the standard HDB bathroom and
kitchen tile — so the condition costs nothing in coverage and is now stated on every
package card. Above it the calculator is genuinely cheaper, and the site says so.

Two things this shows about the test itself. First, it must be evaluated at the
**infimum over the scope**, not at a representative point: the mixed-tile row in the
previous calibration passed at $1,555 while the true minimum inside the same scope was
$930. Second, $V_{\text{inclusions}}$ was never load-bearing here — the gap the
condition closes is $558 at 600×600, far more than a tile clean and a silicone bead
are worth. Scope restriction, not inclusion value, is what makes the packages honest.

### 4.7 Bundling (Adams & Yellen)

Customer valuations $V_i$ across rooms are heterogeneous and often negatively
correlated. For a bundle,
$$\operatorname{Var}\Big(\sum_i V_i\Big) = \sum_i \operatorname{Var}(V_i) + 2\sum_{i<j}\operatorname{Cov}(V_i,V_j)$$

Negative covariance shrinks the variance of total valuation, so a single bundle price
sits closer to more customers' willingness to pay than separate prices do — capturing
more surplus at the same average price. **Mixed** bundling (rooms individually *and*
as a package) dominates pure bundling here, because single-room buyers are a large,
real segment that pure bundling would lose entirely.

### 4.8 Optimal price under elasticity

Profit $\pi(P) = (P - c)Q(P)$. First-order condition gives the Lerner rule:
$$\frac{P^* - c}{P^*} = -\frac{1}{\varepsilon}, \qquad \varepsilon = \frac{dQ}{dP}\frac{P}{Q}$$

Equivalently $P^* = \dfrac{c}{1 + 1/\varepsilon}$ for $\varepsilon < -1$. With
$\varepsilon = -2$: $P^* = 2c$. With $\varepsilon = -1.5$: $P^* = 3c$.

The honest caveat: $\varepsilon$ is not measurable at this business's volume (see
§7.4). The tariff should therefore be set from cost plus a target margin, and
elasticity used only as a sanity check on whether a proposed increase is survivable.

### 4.9 GST

$$P_{\text{gross}} = P_{\text{net}}(1 + \tau), \qquad \tau = 0.09$$

Quote net with $\tau$ shown separately. Quoting gross to a residential customer and
net to a contractor on the same tariff creates an apparent 9% inconsistency between
two customers who will eventually talk to each other.

---

## 5. Lifetime cost

### 5.1 Equivalent annual cost

Annuity factor:
$$a(n,r) = \frac{1 - (1+r)^{-n}}{r}, \qquad EAC = \frac{P}{a(n,r)}$$

At $r = 5\%$: $a(3) = 2.7232$, $a(15) = 10.3797$, $a(20) = 12.4622$.

| Option | $P$ | $n$ | $EAC$ |
|---|---|---|---|
| Cement grout, re-done on failure | $300 | 3 | **$110.2** |
| Epoxy grout | $488 | 15 | **$47.0** |
| Hack and re-tile | $3,500 | 20 | **$280.8** |

### 5.2 Indifference price

Epoxy beats the cement replacement cycle on $EAC$ iff
$$\frac{P_e}{a(15,r)} < \frac{P_c}{a(3,r)} \implies P_e < P_c \frac{a(15)}{a(3)} = 300 \times 3.812 = \$1,144$$

**Epoxy is the cheaper option per year of service at any price below $1,144** for a
bathroom whose cement alternative is $300 every 3 years. The entire "epoxy is
expensive" objection lives in a price band that does not exist.

### 5.3 Payback period

Solve $P_e / a(n,r) = EAC_c$ for $n$:
$$a(n,r) = \frac{P_e}{EAC_c} = \frac{488}{110.2} = 4.428
\implies 1-(1.05)^{-n} = 0.2214
\implies n = \frac{\ln(1/0.7786)}{\ln 1.05} = 5.13\ \text{yr}$$

**Epoxy pays back against cement in about 5.1 years** and is free for the remaining
~10 years of its life.

### 5.4 Cost of delay

With progression hazard $h$ from cosmetic to structural state:
$$\mathbb{E}[C(t)] = e^{-ht}C_{\text{now}} + (1 - e^{-ht})C_{\text{escalated}}$$
$$\frac{d\,\mathbb{E}[C]}{dt} = h\,e^{-ht}\big(C_{\text{escalated}} - C_{\text{now}}\big) > 0$$

The derivative is largest at small $t$ and the cost gap is order-of-magnitude
($\sim$$600 cosmetic vs $\sim$$3{,}500 once the membrane is involved), so expected
cost rises fastest early. Stating this is accurate; dressing it as a deadline is not.

---

## 6. Risk, warranty and signalling

### 6.1 Failure distribution

Model joint failure with a Weibull survival function:
$$S(t) = \exp\!\left[-\left(\frac{t}{\eta}\right)^{m}\right], \qquad
h(t) = \frac{m}{\eta}\left(\frac{t}{\eta}\right)^{m-1}$$

$m > 1$ means wear-out (increasing hazard), which matches grout. With $\eta = 25$ yr,
$m = 2$:
$$F(7) = 1 - e^{-(7/25)^2} = 1 - e^{-0.0784} = 7.5\%$$

### 6.2 Warranty reserve

$$R = F(n)\cdot K \cdot (1+\phi)$$
for rework cost $K$ and admin loading $\phi$. A 7-year warranty on a $1{,}488$ job
with $K \approx 0.6P$ and $\phi = 0.2$:
$$R = 0.075 \times 893 \times 1.2 = \$80 \approx 5.4\%\ \text{of price}$$

That is the true cost of the warranty. It must be reserved per job, not paid from
whatever is in the account when a claim arrives.

### 6.3 Warranty as a separating signal (Spence)

Types $\theta \in \{G, B\}$ with failure probabilities $q_G \ll q_B$. Cost of
offering an $n$-year warranty is $q_\theta(n)K$. The **single-crossing condition**
$$\frac{\partial}{\partial n}\big[q_B(n)K\big] > \frac{\partial}{\partial n}\big[q_G(n)K\big]$$
holds whenever $q_B$ dominates $q_G$ in hazard. A separating equilibrium exists at
any $n^*$ where
$$\underbrace{\Delta P}_{\text{price premium the signal earns}} > q_B(n^*)K
\quad\text{and}\quad \Delta P > q_G(n^*)K$$
i.e. the warranty is profitable for $G$ and ruinous for $B$.

**Consequence:** $n^*$ must exceed the mode of the failure distribution, or the
signal carries no information. For grout, most true failures surface at 12–36 months,
so a 2-year warranty is nearly free for a bad operator and separates nothing. Only
$n \ge 5$ starts doing work.

### 6.4 Lemons condition (Akerlof)

If quality is unobservable at purchase and buyers pay the expected-quality price
$\bar P = \mathbb{E}[V]$, then any supplier with cost $c_\theta > \bar P$ exits.
Iterating, quality converges to the minimum sustainable level. Epoxy grouting has
exactly the required structure: workmanship quality is invisible at handover and
reveals itself at 6–24 months. Verifiable evidence nodes (named product + receipt,
dated photos, written warranty, published tariff) are the only escape, because they
move quality from unobservable to observable **before** payment.

### 6.5 Winner's curse

With $k$ bidders each observing cost signal $c_i = c + \epsilon_i$, $\mathbb{E}[\epsilon]=0$,
the winning bid is $\min_i c_i$, so
$$\mathbb{E}[c_{\min}] = c - \mathbb{E}\big[\max_i(-\epsilon_i)\big] < c$$
The expected shortfall grows with $k$ and with $\operatorname{Var}(\epsilon)$. For
$k=5$ and normal errors, $\mathbb{E}[\min] \approx c - 1.16\sigma$.

The cheapest of five quotes is, in expectation, the one that most underestimated the
job — and the recovery paths available to an underbidder are all quality reductions.
Reducing $\sigma$ (by asking tile size, removal depth, product name) is what makes a
quote comparison meaningful.

---

## 7. Demand and the funnel

### 7.1 Revenue identity

$$\text{Revenue} = V \cdot r_{qs} \cdot r_{qc} \cdot r_{b} \cdot \bar{P} \cdot (1+\eta)$$

$V$ visits, $r_{qs}$ quote-start, $r_{qc}$ quote-complete, $r_b$ book, $\bar P$
average value, $\eta$ referral multiplier. Multiplicative ⇒ elasticity of revenue
with respect to any stage is exactly 1, so **the correct target is whichever stage
is furthest below its achievable ceiling**, not whichever is smallest.

### 7.2 Response latency

Let $p(\Delta)$ be booking probability given first-response delay $\Delta$. The
mechanism is first-mover anchoring: the first credible quote defines the comparison
set. Model as a competing-risks race against $k-1$ rival quoters with response times
$\Delta_j$:
$$p_{\text{first}} = P\big(\Delta < \min_j \Delta_j\big) = \prod_j S_j(\Delta)$$
An on-page instant quote sets $\Delta = 0$, giving $p_{\text{first}} = 1$ — a
structural advantage no competitor's reply speed can beat.

### 7.3 Lead scoring

$$p_i = \sigma(\mathbf{w}^\top \mathbf{x}_i), \quad \sigma(z) = \frac{1}{1+e^{-z}}$$

with features: quoted total, scope completeness, area, property type, channel,
tile size known, preferred date proximity. Rank by expected value net of effort:
$$\text{priority}_i = \frac{p_i \cdot \text{margin}_i}{c_{\text{follow-up},i}}$$

### 7.4 Experiment sizing — and why not to run one

Per-arm sample for a two-proportion test:
$$n = \frac{2\big(z_{\alpha/2} + z_{\beta}\big)^2 \bar p(1-\bar p)}{\delta^2}$$

Detecting a 30% lift on a 5% baseline ($\delta = 0.015$, $\bar p = 0.0575$) at
$\alpha=0.05$, power 0.8:
$$n = \frac{2(2.80)^2(0.0575)(0.9425)}{0.000225} \approx 3{,}780\ \text{per arm}$$

**7,560 visits to resolve one button.** At this traffic level, A/B testing is not a
decision procedure. Decisions must be made on mechanism (does this remove a real
source of ambiguity or friction?) and validated on the only high-signal metric
available: quote-to-booking rate, measured in cohorts of months.

### 7.5 Bayesian conversion estimate

With a $\text{Beta}(\alpha_0, \beta_0)$ prior and $s$ successes in $N$ trials:
$$p \mid \text{data} \sim \text{Beta}(\alpha_0 + s,\ \beta_0 + N - s)$$
$$\mathbb{E}[p] = \frac{\alpha_0+s}{\alpha_0+\beta_0+N}$$

At low $N$ this is the correct way to read early results — a 2-from-5 week is
$\text{Beta}(2+2, 8+3) \Rightarrow \mathbb{E}[p]=0.27$ against a $\text{Beta}(2,8)$
prior of 0.20, not the 40% the raw ratio suggests.

### 7.6 Capacity and queueing

Little's law: $L = \Lambda W$ — leads in progress equal arrival rate × handling time.
Crew capacity is a hard bound:
$$\text{jobs/week} \le \frac{H_{\text{crew}}}{\bar T_{\text{job}}}$$
Beyond it, additional demand raises $W$, which raises $\Delta$ in §7.2, which
*reduces* conversion. Marketing spend past capacity has negative marginal return.

---

## 8. Scheduling and routing

### 8.1 Crew-day bin packing

Assign jobs of duration $T_i$ to days of capacity $H$:
$$\min \#\text{days} \quad \text{s.t.} \sum_{i \in \text{day}_k} T_i \le H$$
NP-hard; first-fit-decreasing is within $\tfrac{11}{9}\text{OPT}+\tfrac{6}{9}$ and is
more than adequate at this scale.

### 8.2 Regional batching (VRP)

Clarke–Wright savings for pairing jobs on one run from depot $0$:
$$s(i,j) = d(0,i) + d(0,j) - d(i,j)$$
Merge highest-saving feasible pairs subject to day capacity, then 2-opt within routes.
For Johor Bahru the causeway crossing is a large fixed $d(0,i)$, so $s$ is dominated
by the crossing term — mathematically forcing JB jobs to batch, which is why JB
scheduling is genuinely less flexible.

### 8.3 Mobilisation attribution

When $n$ jobs share one run, the true fixed cost per job is $F/n$, not $F$. Charging
full $F$ on a batched day is a real (if invisible) margin gain; the honest version is
to let the volume bands in §4.3 return it to the customer who created the batch.

---

## 9. Quality control

### 9.1 Acceptance sampling

To assert with confidence $1-\gamma$ that the defect rate is below $p$ after
inspecting $n$ joints with zero defects:
$$(1-p)^n \le \gamma \implies n \ge \frac{\ln \gamma}{\ln(1-p)}$$
For $p = 5\%$, $\gamma = 0.05$: $n \ge 58.4 \Rightarrow$ **inspect 59 joints**.
A handover walk that checks a dozen joints supports no such claim.

### 9.2 Removal depth criterion

$$d_{\text{removed}} \ge \max\big(2w,\ \tfrac{2}{3}d_{\text{joint}},\ d_{\min,\text{product}}\big)$$

**Provenance:** the two-thirds figure is widespread trade consensus and nothing found
contradicts it, but it could **not** be located as an explicit clause in the TCNA
Handbook or BS 5385 (`MATERIALS.md` §4.6). It is therefore our stated workmanship
standard, not a code minimum, and must not be described as "required by standard".

Insufficient depth is the dominant cause of epoxy re-grout failure: the new material
keys into old cement rather than the tile edge, and the failure plane is the old
grout. It is also invisible at handover — which is precisely why it is worth
photographing (an evidence node) rather than promising.

### 9.3 Mix ratio tolerance

For parts A:B at nominal ratio $R$, a mass error $\epsilon$ gives actual ratio
$R(1+\epsilon)$. Manufacturer tolerance is typically within ±2–3% by mass; beyond it
the crosslink density is wrong and the cured grout is permanently soft or brittle.
This is the binding argument against eyeballing a part-mix (§3.4, resolution 3):
a 0.1 g scale is a $20 tool that protects a $1,500 job.

---

## 10. Algorithms

### ALG-1 — Quote
```
input : rooms[{surface_area_sqft, tile(L,W), mode}], tariff, bands
output: itemised price

J_total ← 0 ; A_total ← 0 ; items ← []
for each room:
    A   ← sqft / 10.7639                        # m²
    λ   ← (L + W) / (L·W) · 1000                # Thm 1
    J   ← A · λ
    rate← c_apply + (mode = regrout ? c_remove : 0)
    cost← c_area·A + rate·J
    items.append(...) ; A_total += A ; J_total += J
work  ← Σ items.cost
δ     ← max{ band.d : A_total ≥ band.threshold } or 0     # §4.3
net   ← work·(1-δ)
mob   ← net ≥ waive ? 0 : F
total ← max(net + mob, min_job)                            # §4.4
return items, total, A_total, J_total
```
Complexity $O(n)$. Deterministic, so the quote is reproducible and defensible.

### ALG-2 — Material order
```
input : rooms, product(ρ, pack_kg[]), joint(w,d), κ
mass ← Σ_i ρ·λ_i·w·d·1e-3·A_i                 # §2.1
need ← κ·mass
for k in sort(pack_kg, desc):                  # concave pack costs ⇒ greedy optimal
    x_k ← floor(need / k) ; need -= x_k·k
if need > 0: x_smallest += 1                   # round up
return {k: x_k}, total_cost, leftover
```

### ALG-3 — Batch plan
```
input : surface(A, λ), product(t_p@23°C, pack_kg), env(T), crew(N_a)
t_p    ← t_p_ref · 2^(-(T-23)/10)                          # §3.3
window ← t_p - t_mix - t_safety
A_pot  ← N_a·window / (α_apply + β_apply·λ)
A_pack ← pack_kg / (κ·ρ·λ·w·d·1e-3)
A_b    ← min(A_pot, A_pack)
if A_pack > A_pot:
    warn("pack oversized for pot life: need ⌈A_pack/A_pot⌉ applicators,
          smaller packs, or weighed part-mix")
return ceil(A / A_b) batches of A_b, each with its own wash window
```

### ALG-4 — Schedule
```
input : jobs, crew calendar, occupancy constraints
build DAG per job (NODE-MODEL §9.3)
CPM forward/backward pass → ES, EF, LS, LF, float, makespan     # §3.6
interleave surfaces so CureWait lag on one overlaps ApplyPack on another
bin-pack labour hours into crew-days (FFD)                       # §8.1
enforce: sole_facility ⇒ ≤1 bathroom out of service at a time    # §3.7
enforce: noisy ops only within permitted hours
```

### ALG-5 — Product selection
```
input : joint(w), exposure, tile(body, porosity), palette target Lab
eligible ← { line ∈ ProductLine :
               line.joint_min ≤ w ≤ line.joint_max
             ∧ exposure.chemical ⊆ line.chemical_profile.full
             ∧ exposure.thermal.max ≤ line.temp_service.max
             ∧ (tile.porosity > threshold ⇒ grout_release required) }
rank by: availability, then cost/m², then min ΔE00(colour, target)   # §2.4
return top-k with the constraint that failed for each rejected line
```
Returning *why* a product was rejected is what makes this usable on site.

### ALG-6 — Route a day
```
savings s(i,j) = d(0,i)+d(0,j)-d(i,j)  for all pairs      # §8.2
sort desc; merge feasible pairs under day-hour capacity
2-opt each route until no improvement
```

### ALG-7 — Lead triage
```
p_i        ← σ(w·x_i)                                       # §7.3
priority_i ← p_i · margin_i / follow_up_cost_i
serve in descending priority; escalate any lead where Δ (age) exceeds
the response-latency threshold, since p decays with Δ        # §7.2
```

### ALG-8 — Feasibility gate
```
input : site survey
if substrate.soundness = drummy ∨ Failure.membrane_failure
   ∨ Failure.structural_movement ∨ Failure.leak_below:
      return REFER_OUT("this is not a grouting job") with the reason
if joint.width < product.joint_min:  return NO_PRODUCT_FITS
if tile.porosity > threshold ∧ no grout_release available: return BLOCK
if surface is a movement joint: route to silicone/PU, never grout
else: PROCEED
```
This gate runs **before** pricing. A job that fails it should never receive a number.

### ALG-9 — Colour match
```
input : tile Lab, palette[Lab], intent ∈ {match, contrast}
compute ΔE00(tile, c) for all c ∈ palette
if intent = match   : return {c : ΔE00 < 2} sorted asc
if intent = contrast: return {c : ΔE00 > 10} sorted desc
never return 2 < ΔE00 < 10 — it reads as a failed match       # §2.4
```

### ALG-10 — Warranty reserve
```
F_n ← 1 - exp(-(n/η)^m)                                       # §6.1
R   ← F_n · K · (1+φ)
book R per job at completion; release on warranty expiry
recalibrate (η, m) from Claim nodes annually                  # §6.2
```

---

## 11. Where the model is weakest

Stated plainly, because a model whose limits are unstated is being oversold.

1. **$\alpha$, $\beta$, $\eta$, $m$ are estimates, not measurements.** They should be
   fitted from `COMM.Job.actual_h` and `COMM.Claim` once enough jobs exist. Until
   then the tariff is calibrated to market prices, not to observed cost.
2. **The learning rate $\ell = 0.9$ is conventional**, not measured for this crew.
3. **Elasticity is unidentified** at current volume (§7.4). Any claim about the
   profit-maximising price is currently unfalsifiable.
3b. **$\varphi = 0.55$ for recent grout is an estimate**, not a measurement. It is the
   single constant now standing between us and the BTO floor segment, so it is the first
   thing to calibrate from job time logs (`COST-MODEL.md` §6).
4. **Boundary correction is folded into $\alpha$** rather than modelled (§1.3), which
   slightly overprices very small surfaces and underprices very large ones.
5. **Material density $\rho$ and pot life $t_p$ are product-specific** — every number
   in §2 and §3.3 must be read off the current technical data sheet, not from here.
   As of this revision, $\rho$ is **unverified for every product surveyed**
   (`MATERIALS.md` §3.3). Since material mass is linear in $\rho$, a 10% error there is
   a 10% error in every material order placed. It is the highest-value figure to
   confirm.
