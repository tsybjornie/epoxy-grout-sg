$pages = @(
    @{slug = 'hdb-4-room'; title = '4-Room HDB'; urlTitle = '4-room%20HDB'; size = '90-95 sqm'; bathSize = '~5 sqm'; kitchSize = '~7 sqm'; bp = '488'; kp = '588'; fp = '1088'; bt = '5-6 hours'; kt = '6-7 hours'; ft = '1 day'; sv = 'Save $88'; badge = '4-ROOM HDB SPECIALIST'; hook = 'Singapore''s most common flat type. Premium epoxy grout from $488 - 1-day transformation.'; fq = 'Is my 4-room HDB bathroom big enough for epoxy grout?'; fa = 'Yes! 4-room HDB bathrooms (~5 sqm) are the perfect size for epoxy grouting. Most are completed in 5-6 hours.' },
    @{slug = 'hdb-5-room'; title = '5-Room HDB'; urlTitle = '5-room%20HDB'; size = '110-120 sqm'; bathSize = '~6 sqm (may have 2 bathrooms)'; kitchSize = '~8 sqm'; bp = '488'; kp = '688'; fp = '1288'; bt = '5-7 hours'; kt = '7-8 hours'; ft = '1-2 days'; sv = 'Save $100+'; badge = '5-ROOM HDB SPECIALIST'; hook = 'Larger flat, larger savings. Two bathrooms? We do both. Full home from $1,288.'; fq = 'Do you do both bathrooms in a 5-room HDB?'; fa = 'Absolutely! Most 5-room HDBs have 2 bathrooms. We offer a combined rate for both. WhatsApp us for a package quote.' },
    @{slug = 'condo'; title = 'Condo'; urlTitle = 'Condo'; size = '70-150+ sqm'; bathSize = '~5-8 sqm (varies)'; kitchSize = '~8-12 sqm'; bp = '588'; kp = '788'; fp = '1488'; bt = '5-7 hours'; kt = '6-8 hours'; ft = '1-2 days'; sv = 'Save $120+'; badge = 'CONDO SPECIALIST'; hook = 'Premium condos deserve premium grout. Marble-look, designer-grade epoxy from $588.'; fq = 'Does epoxy grout work with marble-look condo tiles?'; fa = 'Yes! Epoxy grout enhances marble-look tiles beautifully. We match grout colors to complement your tile design for a seamless luxury finish.' },
    @{slug = 'bto'; title = 'BTO Flat'; urlTitle = 'BTO%20flat'; size = 'Varies by room type'; bathSize = 'Standard BTO size'; kitchSize = 'Standard BTO size'; bp = '438'; kp = '538'; fp = '888'; bt = '4-5 hours'; kt = '5-6 hours'; ft = '8-10 hours'; sv = 'Save $88'; badge = 'BTO MOVE-IN SPECIALIST'; hook = 'Moving into your new BTO? Start with epoxy grout from day 1 - never deal with mold or staining.'; fq = 'Should I do epoxy grout before or after moving into my BTO?'; fa = 'BEFORE moving in is ideal! With no furniture to work around, we can complete the job faster and cheaper. Book us during your defect-checking period.' },
    @{slug = 'landed'; title = 'Landed House'; urlTitle = 'Landed%20house'; size = '200-500+ sqm'; bathSize = '6-10+ sqm (multiple)'; kitchSize = '10-20+ sqm'; bp = '688'; kp = '988'; fp = '2488'; bt = '6-8 hours per bathroom'; kt = '8-10 hours'; ft = '2-3 days'; sv = 'Custom package pricing'; badge = 'LANDED PROPERTY SPECIALIST'; hook = 'Multiple bathrooms, large kitchens, outdoor areas. Custom pricing for landed properties from $688.'; fq = 'How many bathrooms can you do in a landed house?'; fa = 'We handle any number of bathrooms. Most landed homes have 3-5 bathrooms. We offer volume discounts - the more bathrooms, the lower the per-unit cost.' },
    @{slug = 'executive'; title = 'Executive HDB Flat'; urlTitle = 'Executive%20HDB'; size = '130-150 sqm'; bathSize = '~6 sqm (2-3 bathrooms)'; kitchSize = '~10 sqm'; bp = '488'; kp = '688'; fp = '1488'; bt = '5-7 hours per bathroom'; kt = '7-8 hours'; ft = '1-2 days'; sv = 'Save $150+'; badge = 'EXECUTIVE FLAT SPECIALIST'; hook = 'The largest HDB flat type. Multiple bathrooms, spacious kitchen. Full home epoxy from $1,488.'; fq = 'How many bathrooms does an Executive HDB typically have?'; fa = 'Executive HDB flats usually have 2-3 bathrooms. We offer a multi-bathroom discount - WhatsApp us with your layout for best pricing.' }
)

foreach ($p in $pages) {
    $html = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Epoxy Grout $($p.title) Singapore | From `$$($p.bp)</title>
    <meta name="description" content="Professional epoxy grout for $($p.title) in Singapore. Bathroom from `$$($p.bp), kitchen from `$$($p.kp). $($p.size) property. 10-year warranty.">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"Service","name":"Epoxy Grout for $($p.title)","provider":{"@type":"LocalBusiness","name":"CLEANGROUT","telephone":"+6598004317","areaServed":"Singapore"},"serviceType":"Epoxy Grout Application","offers":[{"@type":"Offer","name":"$($p.title) Bathroom","price":"$($p.bp)","priceCurrency":"SGD"},{"@type":"Offer","name":"$($p.title) Kitchen","price":"$($p.kp)","priceCurrency":"SGD"},{"@type":"Offer","name":"$($p.title) Full Home","price":"$($p.fp)","priceCurrency":"SGD"}]}
    </script>
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much does epoxy grout cost for a $($p.title)?","acceptedAnswer":{"@type":"Answer","text":"For a $($p.title), bathroom epoxy grout starts from `$$($p.bp), kitchen from `$$($p.kp), and full home from `$$($p.fp)."}},{"@type":"Question","name":"$($p.fq)","acceptedAnswer":{"@type":"Answer","text":"$($p.fa)"}}]}
    </script>
    <style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#0A0A0A;color:#fff}.hero{padding:80px 20px 60px;text-align:center;max-width:900px;margin:0 auto}.hero h1{font-size:clamp(28px,5vw,48px);font-weight:900;line-height:1.1;margin-bottom:16px}.hero h1 span{color:#D32F2F}.hero p{font-size:18px;color:#aaa;margin-bottom:30px}.cta-btn{display:inline-block;background:#D32F2F;color:#fff;padding:16px 40px;border-radius:12px;font-weight:800;font-size:16px;text-decoration:none;transition:transform .2s}.cta-btn:hover{transform:scale(1.05)}.section{max-width:900px;margin:0 auto;padding:40px 20px}.section h2{font-size:28px;font-weight:800;margin-bottom:20px}.pricing-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px;margin:30px 0}.price-card{background:#111;border:1px solid #222;border-radius:12px;padding:24px;text-align:center}.price-card h3{font-size:18px;margin-bottom:8px}.price-card .price{font-size:36px;font-weight:900;color:#D32F2F;margin:12px 0}.price-card .price small{font-size:14px;color:#777}.price-card ul{list-style:none;text-align:left;font-size:13px;color:#aaa;margin-top:16px}.price-card ul li{padding:6px 0;border-bottom:1px solid #1a1a1a}.faq{margin:40px 0}.faq-item{background:#111;border:1px solid #222;border-radius:8px;margin-bottom:8px;padding:16px 20px}.faq-item h4{font-size:15px;margin-bottom:8px}.faq-item p{font-size:13px;color:#aaa;line-height:1.6}.specs-table{width:100%;border-collapse:collapse;margin:20px 0}.specs-table th,.specs-table td{padding:12px 16px;text-align:left;border-bottom:1px solid #222;font-size:13px}.specs-table th{color:#D32F2F;font-weight:700}.specs-table td{color:#ccc}.cross-links{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;margin:20px 0}.cross-links a{display:block;background:#111;border:1px solid #222;border-radius:8px;padding:12px 16px;color:#fff;text-decoration:none;font-size:13px;font-weight:600;transition:border-color .2s}.cross-links a:hover{border-color:#D32F2F}.badge{display:inline-block;background:#D32F2F;color:#fff;font-size:10px;padding:3px 8px;border-radius:4px;font-weight:700}footer{text-align:center;padding:40px 20px;color:#555;font-size:12px}footer a{color:#D32F2F;text-decoration:none}</style>
</head>
<body>
    <div class="hero">
        <p style="color:#D32F2F;font-weight:700;font-size:14px;margin-bottom:12px">$($p.badge)</p>
        <h1>Epoxy Grout for <span>$($p.title)</span></h1>
        <p>$($p.hook)</p>
        <a href="https://wa.me/6598004317?text=Hi!%20I%20have%20a%20$($p.urlTitle)%20and%20need%20epoxy%20grout.%20Can%20I%20get%20a%20quote?" class="cta-btn">WhatsApp for Free Quote</a>
    </div>
    <div class="section">
        <h2>$($p.title) Pricing</h2>
        <div class="pricing-grid">
            <div class="price-card"><h3>Bathroom</h3><div class="price">`$$($p.bp) <small>nett</small></div><ul><li>Full grout removal and replacement</li><li>Anti-mold epoxy application</li><li>$($p.bt) completion</li><li>10-year warranty</li></ul></div>
            <div class="price-card"><h3>Kitchen</h3><div class="price">`$$($p.kp) <small>nett</small></div><ul><li>Backsplash + floor grout</li><li>Oil and stain resistant</li><li>$($p.kt) completion</li><li>10-year warranty</li></ul></div>
            <div class="price-card" style="border-color:#D32F2F"><span class="badge">BEST VALUE</span><h3>Full Home</h3><div class="price">`$$($p.fp) <small>nett</small></div><ul><li>Bathroom + Kitchen combo</li><li>$($p.sv)</li><li>$($p.ft) completion</li><li>10-year warranty</li></ul></div>
        </div>
    </div>
    <div class="section">
        <h2>Specifications</h2>
        <table class="specs-table">
            <tr><th>Detail</th><th>$($p.title)</th></tr>
            <tr><td>Property Size</td><td>$($p.size)</td></tr>
            <tr><td>Bathroom Size</td><td>$($p.bathSize)</td></tr>
            <tr><td>Kitchen Size</td><td>$($p.kitchSize)</td></tr>
            <tr><td>Bathroom Time</td><td>$($p.bt)</td></tr>
            <tr><td>Full Home Time</td><td>$($p.ft)</td></tr>
            <tr><td>Warranty</td><td>10 years</td></tr>
        </table>
    </div>
    <div class="section faq">
        <h2>FAQ - $($p.title) Epoxy Grout</h2>
        <div class="faq-item"><h4>How much does epoxy grout cost for a $($p.title)?</h4><p>Bathroom from `$$($p.bp), kitchen from `$$($p.kp), full home from `$$($p.fp). No hidden charges.</p></div>
        <div class="faq-item"><h4>$($p.fq)</h4><p>$($p.fa)</p></div>
        <div class="faq-item"><h4>Do I need to move out during the work?</h4><p>No! We only work on grout lines. No furniture needs to be moved. Just avoid the treated area for 24 hours.</p></div>
    </div>
    <div class="section">
        <h2>Other Property Types</h2>
        <div class="cross-links">
            <a href="/property-types/hdb-3-room.html">3-Room HDB</a>
            <a href="/property-types/hdb-4-room.html">4-Room HDB</a>
            <a href="/property-types/hdb-5-room.html">5-Room HDB</a>
            <a href="/property-types/condo.html">Condo</a>
            <a href="/property-types/bto.html">BTO Flat</a>
            <a href="/property-types/landed.html">Landed House</a>
            <a href="/property-types/executive.html">Executive Flat</a>
        </div>
        <h2 style="margin-top:30px">Our Services</h2>
        <div class="cross-links">
            <a href="/services/epoxy-grout.html">Epoxy Grout Application</a>
            <a href="/services/polyurea.html">Polyurea Coating</a>
            <a href="/services/silicone.html">Silicone Application</a>
            <a href="/services/mapei.html">Mapei Epoxy Grout</a>
        </div>
    </div>
    <div style="text-align:center;padding:40px 20px">
        <a href="https://wa.me/6598004317?text=Hi!%20I%20have%20a%20$($p.urlTitle).%20Quote%20please!" class="cta-btn">Get Your Free Quote</a>
    </div>
    <footer><p>2026 CLEANGROUT Singapore | <a href="/">Home</a> | <a href="/faq.html">FAQ</a></p></footer>
</body>
</html>
"@
    $path = "c:\Users\Tina\Desktop\epoxy\property-types\$($p.slug).html"
    [System.IO.File]::WriteAllText($path, $html, [System.Text.Encoding]::UTF8)
    Write-Host "Created: $($p.slug).html"
}
Write-Host "All property pages created!"
