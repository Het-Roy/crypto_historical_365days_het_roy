import json

transcript_path = r'C:\Users\HP\.gemini\antigravity\brain\390cf717-0bde-4e90-abca-eb223082c18d\.system_generated\logs\transcript_full.jsonl'

data_text = ''
with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            step = json.loads(line)
            if step.get('type') == 'USER_INPUT':
                content = step.get('content', '')
                if '==Start of PDF==' in content:
                    data_text = content
                    break
        except Exception as e:
            pass

if not data_text:
    print("Could not find the dataset in transcript.")
    exit(1)

lines = data_text.split('\n')
cleaned_lines = []
for line in lines:
    if line.startswith('==Start of OCR') or line.startswith('==End of OCR') or line.startswith('==Screenshot') or line.startswith('==Start of PDF') or line.startswith('==End of PDF') or line.startswith('Printable Version of Uploaded File'):
        continue
    if '<USER_REQUEST>' in line or '</USER_REQUEST>' in line or 'using this dataset' in line or '<ADDITIONAL_METADATA>' in line or 'The current local time is' in line or '</ADDITIONAL_METADATA>' in line or '<USER_SETTINGS_CHANGE>' in line or 'The user changed setting' in line or '</USER_SETTINGS_CHANGE>' in line:
        continue
    cleaned_lines.append(line)

cleaned_text = '\n'.join(cleaned_lines)

start = cleaned_text.find('[')
end = cleaned_text.rfind(']')

if start != -1 and end != -1:
    json_str = cleaned_text[start:end+1]
    
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
