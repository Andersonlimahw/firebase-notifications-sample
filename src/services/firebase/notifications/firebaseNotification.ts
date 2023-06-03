import { toast } from "react-toastify";
import { app } from "../firebaseConfig";
import {
  MessagePayload,
  getMessaging,
  getToken,
  onMessage,
} from "firebase/messaging";

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);

const PUBLIC_API_KEY = "BHk7kelwUm8Mpp-bmF1gaoMJ4sL5nVwebSWDUuY8bhiNHXsWxuc6UnBQ5D_YF6hRDdH6F8EqYpmi-5VVMyWtbSs";

const notificationStatus : any = {
  "denied": () =>  toast("Please enable notifications.", {
    type: "error",
    delay: 999999,
    pauseOnHover: true,
    autoClose: false,
    closeButton: true,
  }),
  "granted": () =>  null,
};

export function requestNotificationPermission() : Promise<boolean> {
  console.log("Requesting permission...");
  return Notification.requestPermission()
    .then((permission) => {
      console.log("Requesting permission... result", permission);
      // Handle status with literal objects
      notificationStatus[permission]();
      return true;
    })
    .catch((ex) => {
      throw new Error(`Notifications disabled: ${ex}`);
    });
}


export const requestForToken = () => {
  const hasPermission = requestNotificationPermission().then((data) => data);
  if (!hasPermission) {
    return;
  }
  return getToken(messaging, { vapidKey: PUBLIC_API_KEY })
    .then(async (currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
        // Configurar o serviço de ouvinte de mensagens Firebase Cloud Messaging
        console.log("Notifications : currentToken => ", currentToken);        
      } else {
        // Show permission request UI
        console.log(
          "Notifications : No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.error("An error occurred while retrieving token. ", err);
      // ...
    });
};

export const onMessageListener = (): Promise<MessagePayload> =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log(
        "[Notifications]: payload",
        payload,
        " messaging: ",
        messaging
      );
      resolve(payload);
    });
  });


