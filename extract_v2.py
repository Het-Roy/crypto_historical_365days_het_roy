import json, re

transcript_path = r'C:\Users\HP\.gemini\antigravity\brain\390cf717-0bde-4e90-abca-eb223082c18d\.system_generated\logs\transcript_full.jsonl'

all_text_chunks = []
with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            step = json.loads(line)
            if step.get('type') == 'USER_INPUT':
                content = step.get('content', '')
                if 'coin_id' in content and 'aave' in content and 'price_ma7' in content:
                    all_text_chunks.append(content)
        except:
            pass

# Use the larger chunk (second one)
big_chunk = max(all_text_chunks, key=len)
print(f'Using chunk of length {len(big_chunk)}')

# Extract all JSON objects with coin_id
pattern = r'\{\s*\"coin_id\"\s*:.*?\}'
# Use a line-by-line approach instead
# Split into lines, find object boundaries
lines = big_chunk.replace('\r\n', '\n').replace('\r', '\n').split('\n')

records = []
current_obj = []
in_obj = False
brace_count = 0

for line in lines:
    stripped = line.strip()
    if stripped == '{':
        in_obj = True
        brace_count = 1
        current_obj = ['{']
    elif in_obj:
        current_obj.append(line)
        brace_count += stripped.count('{') - stripped.count('}')
        if brace_count <= 0:
            obj_str = '\n'.join(current_obj)
            try:
                obj = json.loads(obj_str)
                if 'coin_id' in obj and 'date' in obj:
                    records.append(obj)
            except Exception as e:
                pass
            in_obj = False
            current_obj = []
            brace_count = 0

print(f'Extracted {len(records)} records')
if records:
    dates = sorted([r['date'] for r in records])
    print(f'Date range: {dates[0]} to {dates[-1]}')

with open(r'c:\Users\HP\OneDrive\Desktop\crypto_historical\full_aave_dataset.json', 'w') as f:
    json.dump(records, f, indent=2)
print('Saved!')
