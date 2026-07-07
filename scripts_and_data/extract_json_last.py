import json

transcript_path = r'C:\Users\HP\.gemini\antigravity\brain\390cf717-0bde-4e90-abca-eb223082c18d\.system_generated\logs\transcript_full.jsonl'

data_text = ''
with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            step = json.loads(line)
            if step.get('type') == 'USER_INPUT':
                content = step.get('content', '')
                if '[' in content and 'coin_id' in content and 'daily_return' in content:
                    data_text = content
        except Exception as e:
            pass

if not data_text:
    print("Could not find the dataset in transcript.")
    exit(1)

start = data_text.find('[')
end = data_text.rfind(']')

if start != -1 and end != -1:
    json_str = data_text[start:end+1]
    
    # We may need to fix newlines that break strings
    json_str = json_str.replace('\n', '')
    
    try:
        data = json.loads(json_str)
        with open(r'c:\Users\HP\OneDrive\Desktop\crypto_historical\dataset.json', 'w', encoding='utf-8') as out:
            json.dump(data, out, indent=2)
        print(f"Successfully extracted {len(data)} items to dataset.json")
    except Exception as e:
        print("Error parsing JSON:", e)
        with open(r'c:\Users\HP\OneDrive\Desktop\crypto_historical\dataset_raw.txt', 'w', encoding='utf-8') as out:
            out.write(json_str)
else:
    print("Could not find JSON array bounds in text.")
