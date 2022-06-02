import './App.css';
import Chat from './components/Chat.js';
import Signin from './components/Signin.js';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from './fb.js';

function App() {
  const [user] = useAuthState(auth)
  return (
    <>
      {user ? <Chat /> : <Signin />}
    </>
  );
}

export default App;
