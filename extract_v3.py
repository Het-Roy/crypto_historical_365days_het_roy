import json, re

# Read the raw chunk
with open(r'c:\Users\HP\OneDrive\Desktop\crypto_historical\raw_big_chunk.txt', 'r', encoding='utf-8') as f:
    text = f.read()

# Normalize line endings
text = text.replace('\\r\\n', '\n').replace('\\r', '\n').replace('\\n', '\n')

# The objects are separated by commas. 
# Find the content between <USER_REQUEST> and the end
# Strip XML tags
text = re.sub(r'<[^>]+>', '', text)
text = text.strip()

print('After strip, first 200 chars:')
print(repr(text[:200]))

# Try to wrap in array and parse
# The data seems to be comma-separated objects without array brackets
# Wrap with [ ] to make it a valid array
wrapped = '[' + text.rstrip(',').rstrip() + ']'
# But there might be trailing text after the last }

# Find all balanced {} objects
records = []
i = 0
while i < len(text):
    if text[i] == '{':
        depth = 0
        j = i
        while j < len(text):
            if text[j] == '{':
                depth += 1
            elif text[j] == '}':
                depth -= 1
                if depth == 0:
                    obj_str = text[i:j+1]
                    try:
                        obj = json.loads(obj_str)
                        if 'coin_id' in obj:
                            records.append(obj)
                    except:
                        pass
                    i = j + 1
                    break
            j += 1
        else:
            i += 1
    else:
        i += 1

print(f'Found {len(records)} records')
if records:
    dates = sorted([r['date'] for r in records])
    print(f'Date range: {dates[0]} to {dates[-1]}')
    
with open(r'c:\Users\HP\OneDrive\Desktop\crypto_historical\full_aave_dataset.json', 'w') as f:
    json.dump(records, f, indent=2)
print('Saved!')
