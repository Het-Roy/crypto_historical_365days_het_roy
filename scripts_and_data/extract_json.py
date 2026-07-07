import json

transcript_path = r'C:\Users\HP\.gemini\antigravity\brain\390cf717-0bde-4e90-abca-eb223082c18d\.system_generated\logs\transcript_full.jsonl'

data_text = ''
with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            step = json.loads(line)
            if step.get('type') == 'USER_INPUT':
                content = step.get('content', '')
                if 'add this datasset in backend' in content or 'coin_id' in content:
                    data_text = content
        except Exception as e:
            pass

# Find the first [ and the last ]
start = data_text.find('[')
end = data_text.rfind(']')
if start != -1 and end != -1:
    json_str = data_text[start:end+1]
    
    # We need to clean up any line breaks inside strings or OCR artifacts.
    # Actually, the user just pasted a valid JSON array! Let's try parsing it.
    try:
        data = json.loads(json_str)
        with open(r'c:\Users\HP\OneDrive\Desktop\crypto_historical\dataset.json', 'w', encoding='utf-8') as out:
            json.dump(data, out, indent=2)
        print(f"Successfully extracted {len(data)} items to dataset.json")
    except Exception as e:
        print("Error parsing JSON:", e)
        # Just write the raw text so we can inspect
        with open(r'c:\Users\HP\OneDrive\Desktop\crypto_historical\dataset_raw.txt', 'w', encoding='utf-8') as out:
            out.write(json_str)
else:
    print("Could not find JSON array in transcript.")
