'''
Edit package.json, package-lock.json
change name:dash to name:project_name
change main:dash.js to project_name.js
'''
import sys
import re

project_name = sys.argv[1]
actual_project_name = 'dash'

pattern = r'"dash(\.js)*"'

def edit_project_name_in(package_name):

    with open(package_name) as file:
        lines = file.read()
        lines = re.sub(pattern, '"'+project_name+'"', lines)

    with open(package_name, 'w') as file:
        file.write(lines)


edit_project_name_in('package.json')
edit_project_name_in('package-lock.json')