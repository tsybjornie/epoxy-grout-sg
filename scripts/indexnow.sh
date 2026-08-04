#!/usr/bin/env bash
# Submit every sitemap URL to IndexNow (Bing / Copilot / Yandex index).
# Run from anywhere with internet: bash scripts/indexnow.sh
# Safe to re-run after publishing new pages — engines dedupe submissions.
set -euo pipefail

HOST="cleangrout.sg"
KEY="7c87495cfe0d38ce8bfacc84ba46b6bc"

urls=$(curl -s "https://${HOST}/sitemap.xml" | grep -o '<loc>[^<]*' | sed 's/<loc>//' | sed 's/&/\\&/g')
list=$(printf '"%s",' $urls)
list="[${list%,}]"

curl -s -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "{\"host\":\"${HOST}\",\"key\":\"${KEY}\",\"keyLocation\":\"https://${HOST}/${KEY}.txt\",\"urlList\":${list}}" \
  -w "\nHTTP %{http_code} — 200/202 means accepted\n"
