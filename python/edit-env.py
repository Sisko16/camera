'''
Append FIREBASE_CONFIG to the dash.env file 
'''
import sys
path = sys.argv[1]
   
with open ('dash.env', "a") as file:
    file.write(f"\nFIREBASE_CONFIG={path}/firebase-config.json")