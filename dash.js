/**
 * Project entry point
 **/

import fs from 'fs'
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set, onChildChanged } from 'firebase/database';
import { process_data } from './app/app.js';

//Declarations
const PROJECT_FOLDER = process.env.PROJECT_FOLDER
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const DASHBOARD_NAME = process.env.DASHBOARD_NAME;
const FIREBASE_CONFIG = process.env.FIREBASE_CONFIG;

const DASHBOARD_NODE = '4/' + DASHBOARD_NAME;
const FEEDBACK_NODE = '/2';
let status = 0;

// Initialize Firebase
const wc = fs.readFileSync(PROJECT_FOLDER + FIREBASE_CONFIG);
const webConfig = JSON.parse(wc);
const app = initializeApp(webConfig);

const firebase = getDatabase();
const auth = getAuth();

// Authenticate Firebase
signInWithEmailAndPassword(auth, EMAIL, PASSWORD)
    .then((userCredential) => {
        listento_dashboard();
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
    });

// Reset the feedback node
const reset_feedbacknode = () => {
    set(ref(firebase, FEEDBACK_NODE), {
        "controlName": '',
        "dashboard": '',
        "status": ''
    });
}

// Send a feedback
const send_feedback = (data) => {
    let controlName = data.val().controlName;
    status = (status == 0) ? 1 : 0 // Forces feedback node update               

    set(ref(firebase, FEEDBACK_NODE), {
        "controlName": controlName,
        "dashboard": DASHBOARD_NAME,
        "status": status
    });
}

// Listen to / Process incoming data
const listento_dashboard = () => {
    const dashboard_ref = ref(firebase, DASHBOARD_NODE);
    reset_feedbacknode();
    console.log("Listening to: " + DASHBOARD_NAME);

    onChildChanged((dashboard_ref), (data) => {

        try {
            if (data.val().controlName === process.env.CAMERA_BUTTON_LABEL) {
                process_data(data);
            }
            print_to_console(data)
            //send_feedback(data);

            // Alternatively add a delay to send_feedback(data) if the node is updated to fast 
            // for the app to pick up the updates

            setTimeout(function () {
                send_feedback(data);
            }, 500);

        } catch (error) {
            console.error('Error occurred while processing data:', error);
        }
    }, (error) => {
        console.error('Error occurred while listening to dashboard:', error);
    });
}

const print_to_console = (data) => {
    var dashboard = data.ref.parent.key;  // Get the dashboard name
    var controlName = data.val().controlName;
    var payload = data.val().payload;
    var type = data.val().type;

    console.log("---");
    console.log(" Dashboard: " + dashboard);
    console.log(" Control:   " + controlName);
    console.log(" Type:      " + type);
    console.log(" payload:   " + payload);
}