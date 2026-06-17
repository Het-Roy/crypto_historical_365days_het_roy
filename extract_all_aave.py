import json, sys

transcript_path = r'C:\Users\HP\.gemini\antigravity\brain\390cf717-0bde-4e90-abca-eb223082c18d\.system_generated\logs\transcript_full.jsonl'

all_records = []

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            step = json.loads(line)
            if step.get('type') == 'USER_INPUT':
                content = step.get('content', '')
                # Find all JSON objects containing coin_id
                if 'coin_id' in content and 'aave' in content:
                    # Find all [ ... ] blocks
                    # Try to extract individual records
                    import re
                    # Find all { ... } objects that have coin_id
                    pattern = r'\{[^{}]*"coin_id"[^{}]*\}'
                    matches = re.findall(pattern, content, re.DOTALL)
                    for m in matches:
                        try:
                            obj = json.loads(m)
                            if 'coin_id' in obj and 'date' in obj and 'price' in obj:
                                all_records.append(obj)
                        except:
                            pass
        except:
            pass

# Deduplicate by coin_id + date
seen = set()
unique = []
for r in all_records:
    key = (r.get('coin_id'), r.get('date'))
    if key not in seen:
        seen.add(key)
        unique.append(r)

print(f'Found {len(unique)} unique records')

# Show date range
dates = sorted([r['date'] for r in unique])
if dates:
    print(f'Date range: {dates[0]} to {dates[-1]}')

with open(r'c:\Users\HP\OneDrive\Desktop\crypto_historical\full_aave_dataset.json', 'w') as f:
    json.dump(unique, f, indent=2)

print('Saved to full_aave_dataset.json')
