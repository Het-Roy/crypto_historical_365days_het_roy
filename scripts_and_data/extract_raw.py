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

with open(r'c:\Users\HP\OneDrive\Desktop\crypto_historical\inspect_content.txt', 'w', encoding='utf-8') as out:
    out.write(data_text)
