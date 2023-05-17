import { requestNotificationPermission } from "../../services/firebase/notifications/firebaseNotification";
import { useEffect } from 'react';

// Reference: https://developer.mozilla.org/en-US/docs/Web/API/Notification
export const Sample = () => {

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  async function handleNotifications() {
      return new Notification("🔔 New lemon notification.", {
        image: 'assets/images/image_sample.jpeg', 
        body: 'This is a notification sample'
      });
  }

  return (<>
    <button onClick={handleNotifications}>
      🔔 Send notification
    </button>
  </>)
}