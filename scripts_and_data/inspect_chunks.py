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

print(f'Found {len(all_text_chunks)} USER_INPUT chunks with AAVE data')
for i, c in enumerate(all_text_chunks):
    print(f'  Chunk {i}: length={len(c)}, preview={c[:80].strip()}')
