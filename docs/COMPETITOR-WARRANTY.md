# Competitor Warranty Research — 27 July 2026

Commissioned to answer one question: **is 5 years too long, when the trade
"usually does 1 year only"?**

**Method and its limit.** Six independent search sweeps — Singapore grouting,
adjacent Singapore trades, Malaysia, material manufacturers, statute, and
accreditation schemes — followed by an adversarial pass told to refute every
weakly-sourced claim. 142 findings raised, **95 VERIFIED**, 38 hearsay, 9
inferred; 22 refuted and dropped.

WebFetch is blocked by network policy, so **nothing below was read off a live
page**. Everything rests on search-result summaries. VERIFIED means the summary
clearly reproduced the company's own page or listing.

---

## 1. The finding that outranks the question

> **CORRECTION, 27 July 2026.** This section originally reported
> `epoxygrout.sg` as a competitor. **It is ours.** The owner confirmed it after
> this research was written. The search sweep found a live Singapore grouting
> site it did not recognise and classified it as competition — a false positive
> that the adversarial pass did not catch, because the claim was internally
> consistent and correctly sourced. It was simply about us. The finding below is
> rewritten; the original wording is preserved in git history.

**We own two live domains with substantially the same content, and every page
was canonicalising to the one Vercel does not serve.**

Until commit `b8d135c`, **80 references across 18 files** — canonical tags,
`og:url`, sitemap `<loc>`, `robots.txt` and schema `url` — pointed at
`epoxygrout.sg`. Vercel serves `cleangrout.sg`. Now unified there.

That it is our own domain makes this **less alarming and no less urgent**. The
damage was never "handing content to a competitor" — it is duplicate content
across two properties we own, which splits link equity between them and lets
Google choose which to rank. Search engines resolve that badly and arbitrarily,
and the site being canonicalised *away from* the one actually being served meant
the wrong copy was nominated as authoritative.

**Outstanding decision:** `epoxygrout.sg` should 301-redirect to
`cleangrout.sg`, or be added to the Vercel project as an alias. Leaving two
independently-serving copies of the same business online is the one
configuration that helps neither. See `CLEANGROUT-NOTES.md` §9 item 10.

---

## 2. The owner's instinct is right — about a different trade

Singapore renovation splits hard in two, and grouting sits on the far side of
the split from where the "1 year" memory comes from.

| Tier | Typical warranty | Source |
|---|---|---|
| General renovation, carpentry, ID | **12 months** | CaseTrust mandatory minimum [VERIFIED] |
| Tiling | **12 months** | Ager Flooring, TM Tiling, Floor Fitters [VERIFIED] |
| HDB BTO defects liability | 1 year from key collection | HDB [VERIFIED] |
| **Wet-area waterproofing** | **3–10 years** | see below [VERIFIED] |

**Wet-area specialists, Singapore:**

| Firm | Term |
|---|---|
| Hydroseal (trading since 1995) | 1–10 years, scaled to scope |
| Revo-seal | **5 years standard** |
| Waterproof & Roofing SG | up to 5 years |
| Atlas Works | 3 years, marketed as "industry-leading" |

**Grouting competes against waterproofing, not against carpentry.** A customer
with a black shower joint is deciding between us and a waterproofer. Our 5 years
sits *inside* that band — level with Revo-seal, below Hydroseal's top tier.

---

## 3. What grouting firms actually publish

Of **~16 named Singapore tile-grouting firms**, **11 publish no findable
warranty at all.** They compete on "free quote", accreditations and
years-in-business. ADR Construction publishes a buyer's guide telling customers
to ask contractors about warranties — without stating its own.

The ones that do publish:

| Firm | Term | Notes |
|---|---|---|
| Regrout SG | **2 months** | Argues defects surface in 7–14 days, so a long term is unnecessary |
| Smart-Home SG | 1 year | Workmanship only |
| Just Clean Lah | 12 months | **Covers materials *and* workmanship** — rare |
| Workers.com.sg | 2 years | |
| **Grout Pro-Tech** | **2 years** | Workmanship only. See §3.1 |
| Le Fong | min. 2 years | 10 years on roof replacement |
| Grouting Contractor SG | 1–10 years | Product warranty, 10-year headline |
| The Grout Guy | 10 years | Waterproof warranty on full shower regrouts |

Malaysia is the same shape: of three named grouting specialists (Grout Lab,
Dr Grout, MAXCLEAN) **none states a term**. Malaysian *waterproofers* do:
Mr Plumber 5yr material + 2yr workmanship, Hin Construction 10 years, VH
Waterproofing 4 years extendable to 30 via a paid programme, KL1 Plumber
10–25 years sold as a paid upgrade tier.

### 3.1 Grout Pro-Tech's 2 years is narrower than it looks

Their terms page, clause by clause [VERIFIED]:

- **Tile-to-tile joints ONLY.** Explicitly excludes tile-to-anything-else:
  sanitary ware, furniture, piping, plastic, metal, **silicone**, marble, wood.
- Workmanship only — no material cover.
- Clock starts from the **balance-due date**, not completion.
- Excludes repairs, tile replacement, goodwill adjustments, add-ons.
- 1 month on grout sealing; **7 days** on grout cement powder.

Ours covers the joint *and* carries a separate 1-year silicone term, which
theirs excludes outright. **Scope, not just length, is the comparison.**

---

## 4. The legal point that settles it

**There is no statutory minimum warranty for grouting in either country.**
Cutting to 1 year would be perfectly legal. It would also **not reduce our
exposure**, which is the part the question misses.

| Instrument | Period | What it means |
|---|---|---|
| **Limitation Act 1959 s 6 (SG)** | **6 years** | To sue for breach of contract, *regardless of any shorter contractual warranty* |
| Limitation Act ss 24A/24B | 3 yrs from knowledge, 15-yr longstop | Latent damage |
| Small Claims Tribunal | 2 yrs to file, $20k cap | Renovation contracts expressly eligible |
| CPFTA Lemon Law | — | **Goods only. Does not apply to services at all** |
| CCCS renovation guide | none prescribed | Explicit negative finding |
| Consumer Protection Act 1999 (MY) s 53 | no fixed duration | Statutory guarantee of reasonable care and skill on *services* — **stronger than Singapore** |
| CPA 1999 (MY) s 6 | — | Statutory rights **cannot be excluded by contract at all** |

**A customer can sue us for six years whether we write 1 or 5.** A warranty does
not cap liability; it only decides whether a failure is handled as a goodwill
repair or as a claim. Shortening it saves $39 of reserve and forfeits the whole
signal, while leaving the legal exposure untouched.

---

## 5. Accreditation

**Exactly one Singapore scheme mandates a warranty: CaseTrust, at 12 months**
[VERIFIED, case.org.sg]. Critically, **CaseTrust Gold requires the same 12
months** — Gold's uplift is director certification, low-formaldehyde options and
a stronger standard contract, *not* a longer warranty.

So 12 months is the ceiling any Singapore accreditation body asks for, and it is
a floor, not a cap. Nothing stops a firm offering more, and CCCS prescribes no
minimum.

---

## 6. Can we pass through a manufacturer warranty?

Short answer: **no, and it would not cover what ours covers.**

The headline numbers are real: Mapei, Laticrete and Custom Building Products all
publish **Lifetime system warranties**; Ardex offers 25/10/5-year tiers. Three of
them cover **labour**, not just replacement material — Mapei reimburses
"reasonable and substantiated material and labour costs" capped at the original
per-square-foot installation cost.

Why we cannot use them:

1. **They are system warranties.** The long tier unlocks only when *every*
   product in the installation — mortar, membrane, grout — is from that one
   brand. A regrouter replaces the joint in someone else's installation and can
   never satisfy that.
2. **Ardex's term is set by the lowest-tier product used.** Their epoxy grouts
   sit in the 25-year band, but one non-Ardex component drops the whole system.
3. **Standalone product terms are short.** Sika SikaTile-825 epoxy grout: **1
   year from purchase** [VERIFIED, product data sheet]. Laticrete baseline: 1
   year. Mapei base tier: 1 year, **replacement product only, explicitly no
   labour**.
4. **Mapei Singapore publishes no warranty findable at all** — so we cannot
   claim a Mapei warranty here even at the base tier. Kerapoxy's "Lifetime
   Limited product guarantee" is US documentation.

**Do not print a manufacturer warranty on our paperwork.** Ours is a workmanship
warranty we underwrite. That is what it should say.

---

## 7. Where this lands

**Keep 5 years on every job, 1 year on silicone.** The 7-year whole-home tier
has been dropped — see `WARRANTY-DECISION.md` §4. The research below argues for
the *length*; the tiering was a separate decision and it lost on a different
axis, namely that a warranty which grows with job size implies the small job is
built worse.

| Argument | Weight |
|---|---|
| Grouting failures from bad workmanship surface at 12–36 months; a 1-year term covers **0%** of that window | decisive |
| We are exposed for **6 years by statute anyway** — a short warranty saves reserve, not liability | decisive |
| Our band is the **waterproofing** band (3–10 yrs), not the carpentry band (12 mo) | strong |
| **11 of 16** SG grouting firms publish nothing — any number is a differentiator | strong |
| Cost is **$40 on a $1,074 job**; 27 referrals fund a hundred-job book | strong |
| 10-year claims already exist in this market (The Grout Guy, GCS, KL1) — 5 is not an outlier | moderate |
| Credibility discount: at 90% annual survival, 5 yrs delivers ~3.7 effective years | the reason **not** to go past 7 |

**Two moves worth considering**, both evidenced above:

- **Sell length as a paid tier.** VH Waterproofing extends 4 years to 30 via a
  paid "Seal Care Programme"; KL1 sells 10–25 years as an upgrade. Our own
  numbers say 7 years costs $76 against 5 years' $40 — a $36 delta that could be
  a priced extension rather than a giveaway.
- **Make it transferable and say so.** Rezt+Relax markets a fully transferable
  lifetime warranty on carpentry hardware. Transferability costs nothing — the
  hazard is unchanged — and converts a warranty into a resale argument. Ours is
  already transferable; the site should lead with that harder.

**What would change the answer:** real claims data. Every probability here rests
on assumed Weibull parameters (η=25, m=2). After ~30 jobs, refit them.
