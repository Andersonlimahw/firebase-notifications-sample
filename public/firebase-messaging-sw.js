// This a service worker file for receiving push notifitications.
// See `Access registration token section` @ https://firebase.google.com/docs/cloud-messaging/js/client#retrieve-the-current-registration-token

// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');


// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBhQ7OF9QZMLfaeioCdU3xND5Hp77ANdWY",
  authDomain: "lemon-firebase-samples.firebaseapp.com",
  databaseURL: "https://lemon-firebase-samples-default-rtdb.firebaseio.com",
  projectId: "lemon-firebase-samples",
  storageBucket: "lemon-firebase-samples.appspot.com",
  messagingSenderId: "944120575676",
  appId: "1:944120575676:web:f0d77661d0be758b2342b9",
  measurementId: "G-4C7DDL9BLG"
};


firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// Handle incoming messages while the app is not in focus (i.e in the background, hidden behind other tabs, or completely closed).
messaging.onBackgroundMessage(function(payload) {
  console.log('Notifications: Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});