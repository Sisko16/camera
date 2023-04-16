#!/bin/bash

echo "Setting the project name to the folder name "$PWD
project_name=$(basename $PWD)

echo "Setting the project description: "
project_description='Webcam'

echo "Install fswebcam"
sudo apt-get install fswebcam 

echo "Installing dependencies"
npm install

echo "Adding executable permissions to dash.js"
chmod +x dash.js

echo "Adding the project folder path to dash.env"
echo $'\n'PROJECT_FOLDER=$PWD/ >> dash.env

echo "Renaming dash.* files to " $project_name".*"
mv *.js $project_name.js  
mv *.env $project_name.env  
mv *.service $project_name.service

echo "Replacing 'dash' with" $project_name "in package.json & package-lock.json" 
python3 ./python/edit-packages.py $project_name

echo "Wrapping the firebase-config.json keys with double quotes"  
python3 ./python/edit-firebase-config.py

echo "Configuring " $project_name".service"
python3 ./python/edit-service.py $USER $PWD $project_name $project_description

echo "Moving "$project_name".service" "to /etc/systemd/system"
sudo mv $project_name.service /etc/systemd/system

echo "Enabling and starting" $project_name".service"
sudo systemctl enable $project_name
sudo systemctl start $project_name

echo "Checking the "$project_name".service" "status"
sudo systemctl status $project_name