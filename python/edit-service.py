'''
Edit *.service
  
'''
import sys

user = sys.argv[1]
path = sys.argv[2]
project_name = sys.argv[3]
project_description = sys.argv[4]

service = f'{project_name}.service'

with open(service) as file:
    lines = file.read()
    lines = lines.replace('project-description', project_description)
    lines = lines.replace('path2dash.js', path + '/' + project_name + '.js')
    lines = lines.replace('dash-identifier', project_name)
    lines = lines.replace('user-name', user)
    lines = lines.replace('path2dash.env', path + '/' + project_name + '.env')

with open(service, 'w') as file:
    file.write(lines)
