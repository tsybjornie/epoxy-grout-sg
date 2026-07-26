#!/usr/bin/env python3
"""Minimal markdown -> self-contained HTML for the CLEANGROUT note.
Handles only the subset used in that file: h1-h3, tables, ul/ol, fenced code,
blockquote, hr, bold, italic, inline code."""
import html
import re
import sys


def inline(t):
    t = html.escape(t)
    t = re.sub(r'`([^`]+)`', r'<code>\1</code>', t)
    t = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', t)
    t = re.sub(r'(?<![\*\w])\*([^*\n]+)\*(?!\*)', r'<em>\1</em>', t)
    return t


def convert(md):
    out, lines, i = [], md.split('\n'), 0
    while i < len(lines):
        ln = lines[i]

        if ln.startswith('```'):
            i += 1
            buf = []
            while i < len(lines) and not lines[i].startswith('```'):
                buf.append(html.escape(lines[i]))
                i += 1
            i += 1
            out.append('<pre><code>' + '\n'.join(buf) + '</code></pre>')
            continue

        if re.match(r'^\s*\|', ln) and i + 1 < len(lines) and re.match(r'^\s*\|[\s:|-]+\|\s*$', lines[i + 1]):
            def cells(r):
                return [c.strip() for c in r.strip().strip('|').split('|')]
            head = cells(ln)
            i += 2
            body = []
            while i < len(lines) and re.match(r'^\s*\|', lines[i]):
                body.append(cells(lines[i]))
                i += 1
            t = ['<div class="tw"><table><thead><tr>']
            t += ['<th>' + inline(c) + '</th>' for c in head]
            t.append('</tr></thead><tbody>')
            for r in body:
                t.append('<tr>' + ''.join('<td>' + inline(c) + '</td>' for c in r) + '</tr>')
            t.append('</tbody></table></div>')
            out.append(''.join(t))
            continue

        m = re.match(r'^(#{1,4})\s+(.*)$', ln)
        if m:
            lvl = len(m.group(1))
            txt = inline(m.group(2))
            anchor = re.sub(r'[^a-z0-9]+', '-', m.group(2).lower()).strip('-')
            out.append(f'<h{lvl} id="{anchor}">{txt}</h{lvl}>')
            i += 1
            continue

        if re.match(r'^---+\s*$', ln):
            out.append('<hr>')
            i += 1
            continue

        if ln.startswith('>'):
            buf = []
            while i < len(lines) and lines[i].startswith('>'):
                buf.append(lines[i].lstrip('>').strip())
                i += 1
            out.append('<blockquote>' + inline(' '.join(buf)) + '</blockquote>')
            continue

        if re.match(r'^\s*[-*]\s+', ln):
            buf = []
            while i < len(lines) and (re.match(r'^\s*[-*]\s+', lines[i]) or (lines[i].startswith('  ') and lines[i].strip() and buf)):
                if re.match(r'^\s*[-*]\s+', lines[i]):
                    buf.append(re.sub(r'^\s*[-*]\s+', '', lines[i]))
                else:
                    buf[-1] += ' ' + lines[i].strip()
                i += 1
            out.append('<ul>' + ''.join('<li>' + inline(b) + '</li>' for b in buf) + '</ul>')
            continue

        if re.match(r'^\s*\d+\.\s+', ln):
            buf = []
            while i < len(lines) and (re.match(r'^\s*\d+\.\s+', lines[i]) or (lines[i].startswith('   ') and lines[i].strip() and buf)):
                if re.match(r'^\s*\d+\.\s+', lines[i]):
                    buf.append(re.sub(r'^\s*\d+\.\s+', '', lines[i]))
                else:
                    buf[-1] += ' ' + lines[i].strip()
                i += 1
            out.append('<ol>' + ''.join('<li>' + inline(b) + '</li>' for b in buf) + '</ol>')
            continue

        if ln.strip() == '':
            i += 1
            continue

        buf = []
        while i < len(lines) and lines[i].strip() and not re.match(r'^(#{1,4}\s|```|>|\s*[-*]\s|\s*\d+\.\s|---+\s*$|\s*\|)', lines[i]):
            buf.append(lines[i].strip())
            i += 1
        if buf:
            out.append('<p>' + inline(' '.join(buf)) + '</p>')
    return '\n'.join(out)


CSS = """
:root{--bg:#fbfaf8;--ink:#16181c;--mut:#565b63;--rule:#e2ded6;--acc:#c2410c;--code:#f1efea}
@media(prefers-color-scheme:dark){:root{--bg:#131519;--ink:#e8e5df;--mut:#9aa1ab;--rule:#2a2f36;--acc:#ff7038;--code:#1c2026}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);
 font:16px/1.62 system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
 font-variant-numeric:tabular-nums;-webkit-font-smoothing:antialiased}
.wrap{max-width:860px;margin:0 auto;padding:36px 22px 100px}
h1{font-size:clamp(1.7rem,5vw,2.5rem);line-height:1.1;letter-spacing:-.03em;font-weight:750;
 margin:56px 0 18px;padding-top:20px;border-top:3px solid var(--ink);text-wrap:balance}
h1:first-child{margin-top:0;border-top:0;padding-top:0}
h2{font-size:clamp(1.25rem,3.4vw,1.6rem);letter-spacing:-.02em;font-weight:700;margin:40px 0 12px;text-wrap:balance}
h3{font-size:1.05rem;font-weight:660;margin:28px 0 8px}
p{margin:0 0 14px;max-width:68ch}
ul,ol{margin:0 0 16px;padding-left:1.3em;max-width:68ch}
li{margin-bottom:7px}
strong{font-weight:660}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.88em;
 background:var(--code);padding:.12em .38em;border-radius:3px}
pre{background:var(--code);border:1px solid var(--rule);border-left:3px solid var(--acc);
 padding:16px 18px;overflow-x:auto;margin:0 0 20px}
pre code{background:none;padding:0;font-size:.85rem;line-height:1.7}
blockquote{border-left:3px solid var(--acc);margin:0 0 18px;padding:2px 0 2px 16px;
 color:var(--mut);max-width:68ch}
hr{border:0;border-top:1px solid var(--rule);margin:34px 0}
.tw{overflow-x:auto;margin:0 0 22px;-webkit-overflow-scrolling:touch}
table{border-collapse:collapse;width:100%;font-size:.9rem;min-width:420px}
th,td{text-align:left;padding:8px 14px 8px 0;border-bottom:1px solid var(--rule);vertical-align:top}
th{font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:var(--mut);
 font-weight:650;border-bottom:1px solid var(--ink)}
tr:last-child td{border-bottom:0}
@media print{body{background:#fff;color:#000}.wrap{max-width:none;padding:0}
 h1{page-break-before:always}h1:first-child{page-break-before:avoid}
 pre,blockquote,.tw{page-break-inside:avoid}}
"""


def main():
    md = open(sys.argv[1], encoding='utf-8').read()
    body = convert(md)
    doc = ('<!doctype html><html lang="en"><head><meta charset="utf-8">'
           '<meta name="viewport" content="width=device-width,initial-scale=1">'
           '<title>CLEANGROUT — Working Notes</title><style>' + CSS + '</style></head>'
           '<body><div class="wrap">' + body + '</div></body></html>')
    open(sys.argv[2], 'w', encoding='utf-8').write(doc)
    print(f'wrote {sys.argv[2]} ({len(doc):,} bytes)')


main()
