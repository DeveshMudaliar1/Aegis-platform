#!/bin/bash# Usage: ./test_aegis.sh

API_URL="http://localhost:8000"

FRONTEND_ORIGIN="http://localhost:3000"echo "🛡️ Starting Aegis Technical Audit..."

response=$(curl -s -I -H "Origin: 
𝐹
𝑅
𝑂
𝑁
𝑇
𝐸
𝑁
𝐷
𝑂
𝑅
𝐼
𝐺
𝐼
𝑁
"
−
𝑋
𝐺
𝐸
𝑇
"
FRONTEND
O
	​

RIGIN"−XGET"
API_URL/")if echo "$response" |

grep -q "200 OK"; thenecho "✅ Backend Online"elseecho "❌ CRITICAL: Backend Unreachable"exit 1fiif echo "$response" | grep -q "access-control-allow-origin: $FRONTEND_ORIGIN";thenecho "✅ CORS: Origin Whitelisted"elseecho "❌ CRITICAL: CORS Headers Invalid"fi# 2. Test VIX Logic (Zero Division Defense)

chaos_response=
(
𝑐
𝑢
𝑟
𝑙
−
𝑠
−
𝑋
𝑃
𝑂
𝑆
𝑇
"
(curl−s−XPOST"
API_URL/inject-chaos" \

-H "Content-Type: application/json" \

-d '{"target_table": "users", "chaos_type": "column_rename"}')

vix=$(echo $chaos_response | sed -n 's/.*"vix_score":([0-9.]*).*/\1/p')echo "✅ VIX Score Calculated: $vix"