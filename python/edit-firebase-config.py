'''
Convert the firebase-config to a json format 
'''
import json


firebaseConfig = 'firebase-config.json'

# Remove empty lines and the curly braces
# Add quotation marks to the keys
with open(firebaseConfig) as file:
    
    lines = file.readlines()
    lines = [line.strip() for line in lines if len(line.strip()) > 0][1:-1]
    lines = ['"' + line.replace(':', '":', 1) + '\n' for line in lines]
    
with open(firebaseConfig, 'w') as file:
    file.writelines( ['{\n'] + lines + ['}'])
   

# Optional: Add indentation to the file
with open(firebaseConfig) as file:
    data = json.load(file)

with open(firebaseConfig, 'w') as file:
    json.dump(data, file, indent=4)