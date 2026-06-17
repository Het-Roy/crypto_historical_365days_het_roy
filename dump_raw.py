import json

transcript_path = r'C:\Users\HP\.gemini\antigravity\brain\390cf717-0bde-4e90-abca-eb223082c18d\.system_generated\logs\transcript_full.jsonl'

chunks = []
with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            step = json.loads(line)
            if step.get('type') == 'USER_INPUT':
                content = step.get('content', '')
                if 'coin_id' in content and 'aave' in content and 'price_ma7' in content:
                    chunks.append(content)
        except:
            pass

big = max(chunks, key=len)

# Write the raw content so we can inspect it
with open(r'c:\Users\HP\OneDrive\Desktop\crypto_historical\raw_big_chunk.txt', 'w', encoding='utf-8') as f:
    f.write(big)
print('Written raw_big_chunk.txt, length:', len(big))
print('First 300 chars:')
print(repr(big[:300]))
