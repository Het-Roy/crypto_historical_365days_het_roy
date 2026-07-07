import json
import re
import sys

transcript_path = r'C:\Users\HP\.gemini\antigravity\brain\390cf717-0bde-4e90-abca-eb223082c18d\.system_generated\logs\transcript_full.jsonl'

data_text = ''
with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            step = json.loads(line)
            if step.get('type') == 'USER_INPUT':
                data_text = step.get('content', '')
                break
        except Exception as e:
            pass

# Now we need to remove the OCR headers/footers
# Example: ==Start of OCR for page 1==
# ==Screenshot for page 1==
# ==End of OCR for page 1==

cleaned_lines = []
for line in data_text.split('\n'):
    if line.startswith('==Start of OCR') or line.startswith('==End of OCR') or line.startswith('==Screenshot') or line.startswith('==Start of PDF') or line.startswith('==End of PDF') or line.startswith('Printable Version of Uploaded File'):
        continue
    # skip empty lines or the initial prompt stuff
    if '<USER_REQUEST>' in line or '</USER_REQUEST>' in line or 'using this dataset' in line or '<ADDITIONAL_METADATA>' in line or 'The current local time is' in line or '</ADDITIONAL_METADATA>' in line or '<USER_SETTINGS_CHANGE>' in line or 'The user changed setting' in line or '</USER_SETTINGS_CHANGE>' in line:
        continue
    cleaned_lines.append(line)

cleaned_text = '\n'.join(cleaned_lines)
# Clean up any weird concatenations like "volu\nme":
# It seems some strings might be split across lines. Let's just write it as is first.
with open('extracted_dataset.json', 'w', encoding='utf-8') as f:
    f.write(cleaned_text)

print('Extracted', len(cleaned_text), 'characters')
