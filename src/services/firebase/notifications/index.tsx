import { MessagePayload, NotificationPayload } from "firebase/messaging";
import { requestForToken, onMessageListener } from "./firebaseNotification"
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { create } from "../firebaseService";

interface ISignatureInput {
  accepted: boolean;
  user: string;
}

async function transmitSignature({ accepted , user } : ISignatureInput) {
  console.log('[FirebaseNotifications]: transmitSignature => ', accepted, user);
  await create({
    collectionName: 'notifications', 
    payload: {
      accepted: accepted,
      user: user,
      status: 'sent'
    }
  });
}

export const FirebaseNotifications = () => {
  const [notification, setNotification] = useState<NotificationPayload>();

  

  function ToastDisplay() {
    return (
      <div>
        <p><strong>{notification?.title}</strong></p>
        <p>{notification?.body}</p>
        <span>
          {notification?.image && (
            <img
              src={notification.image}
              alt={notification.title}
            />)
          }
        </span>
        <span>
          <button onClick={() => transmitSignature({
            accepted : true, 
            user: 'lemon-acceped'
          })}>
            Accept
          </button>

          <button onClick={() => transmitSignature({
            accepted : false, 
            user: 'lemon-refuse'
          })}>
            Refuse
          </button>
        </span>
          
      </div>
    );
  }
  
  const notify = () => toast(<ToastDisplay />, { type: 'success' });

  useEffect(() => {
    if (notification?.title) {
      notify()
    }
  }, [notification]);

  requestForToken();

  onMessageListener()
    .then((payload: MessagePayload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body
      });
    })
    .catch((err) => console.log('onMessageListener: failed: ', err));

  return (
    <ToastContainer />
  )
}

export default FirebaseNotifications;