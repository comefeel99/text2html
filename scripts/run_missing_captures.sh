#!/bin/bash

# 스크립트 경로 정의
CAPTURE_SCRIPT="scripts/capture_slides.cjs"

# 처리할 HTML 파일 목록
FILES=(
    "output/2025_saas_security_v2_20260130/3_html_result.html"
    "output/cybertruck_vs_f150_v2_20260130/3_html_result.html"
    "output/handdrip_coffee_trends_v2_20260130/3_html_result.html"
    "output/spacex_starship_mars_v2_20260130/3_html_result.html"
)

# 반복 실행
for FILE in "${FILES[@]}"; do
    if [ -f "$FILE" ]; then
        echo "Processing $FILE..."
        node "$CAPTURE_SCRIPT" "$FILE"
    else
        echo "Warning: File not found: $FILE"
    fi
done

echo "일괄 처리 완료."
