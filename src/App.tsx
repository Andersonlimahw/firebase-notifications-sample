import './App.css'
import { Sample } from './pages/Sample'
import FirebaseNotifications from './services/firebase/notifications'

function App() {

  return (
    <>
      <Sample />
      <FirebaseNotifications />
    </>
  )
}

export default App
