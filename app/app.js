/*** 
 * Take and ulpload a picture to firebase storage.
***/
import fs from 'fs'
import { execSync } from 'child_process'
import { Storage } from '@google-cloud/storage'


export const process_data = (data) => {
  take_picture()
  upload_picture()
}

const take_picture = () => {

  const PROJECT_FOLDER = process.env.PROJECT_FOLDER
  const PICTURE_NAME = process.env.PICTURE_NAME

  const exec = execSync
  exec('sudo fswebcam -S 20 ' + PROJECT_FOLDER + PICTURE_NAME, function (error, stdout, stderr) {
    if (error) {
      console.log('Error taking picture: ' + error)

    } else {
      console.log('Picture taken successfully')
      console.log('Uploading the picture')
    }
  })
}

const upload_picture = () => {

  const PROJECT_FOLDER = process.env.PROJECT_FOLDER
  const PICTURE_NAME = process.env.PICTURE_NAME
  const STORAGE_PICTURE_NAME = process.env.STORAGE_PICTURE_NAME
  const STORAGE_BUCKET = process.env.STORAGE_BUCKET
  const METADATA = process.env.METADATA
  const KEY_FILENAME = process.env.KEY_FILENAME

  const storage = new Storage({
    keyFilename: PROJECT_FOLDER + KEY_FILENAME
  });

  const bucket = storage.bucket(STORAGE_BUCKET);
  const file = bucket.file(STORAGE_PICTURE_NAME);

  fs.createReadStream(PROJECT_FOLDER + PICTURE_NAME)
    .pipe(file.createWriteStream({
      metadata: { contentType: METADATA }
    }))
    .on('error', function (err) {
      console.log("there was a problem"); console.log(err);
    })
    .on('finish', function () {
      // The file upload is complete.
      console.log("check the storage");
    });
}