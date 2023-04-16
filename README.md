## Create and manage dashboards with the Guimaker mobile app
Guide: https://guimaker.app

## Project: Display a picture taken with a webcam
Project description: https://guimaker.pro/demoprojects


## Project setup
- Download the project to your pc
- Copy your database config to the firebase-config.json file
- Edit the environment variables in dash.env
- Copy the project folder to the Raspberry Pi
- Run the setup.sh script to complete the setup

## 1 Copy the Firebase database config to firebase-config.json
- Log in to the Firebase console
- Go to Project Settings, then scroll down
- Copy the curly brackets and key-value pairs to the the firebase-config.json 

setup.sh will wrap the keys with double quotes to make the firebase-config.json a valid json file
 
## 2 Edit the key-filename.json file
This file is required for uploading pictures/images to the cloud storage
- In the Firebase console go to Project Settings > Service accounts > Firebase Admin SDK. 
- Scroll down then click on the "Generate new private key"
- Copy the download to the key-filename.json file located under the app folder

!['key-filename.json'](images/key.png)
 

## 3 Edit dash.env
Complete or edit the values for:
- EMAIL=
- PASSWORD=
- DASHBOARD_NAME=

- CAMERA_BUTTON_LABEL="Take Picture"
- PICTURE_NAME=app/picture.jpg
- KEY_FILENAME=app/key-filename.json

- STORAGE_PICTURE_NAME=images/doorpic.jpg
- STORAGE_BUCKET= 
- METADATA=image/jpg
- FIREBASE_CONFIG=firebase-config.json

BUCKET_NAME is the value of "storageBucket" in the firebase-config.json file

## 4 Copy the project folder to the raspberry Pi
Let's say:
- The destination folder on the Pi is /home/pi
- The Pi ip address is 10.0.0.30
- username is 'pi'
Run:  scp -r camera pi@10.0.0.30:/home/pi

## 5 Run the setup.sh script to complete the setup
SSH to the raspberry, cd to your project folder then run:
bash setup.sh

The script will:
- Set the project name to the project folder name
- Set the project description
- Install fswebcam
- Install the dependencies
- Add executable permissions to dash.js
- Add the project folder path to dash.env
- Rename the following files to:
  - dash.js        > camera.js
  - dash.env       > camera.env
  - dash.service   > camera.service

- Replace 'dash' with the project folder name (camera) in package.json, package-lock.json 
  - "name": "dash" 
  - "main": "dash.js"

- Wrap the firebase-config.json keys with double quotes

- Configure the service by updating
  - project description
  - path2dash.js
  - dash-identifier
  - user-name
  - path2dash.env

- Move camera.service fie to /etc/systemd/system
- Enable the camera service to start at boot time
- Start the camera service
- Check the camera service status
 
## Troubleshoot the setup
Check that the path and filenames are correctly spelled in:
  - camera.env
  - camera.service

Keep in mind that Dashboard names created in the mobile app are case sensitive