import React,{useState} from 'react'
import {db,auth} from '../fb'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function Sendmessage({scroll}) {
  const [msg,setMsg] = useState('')
  async function sendMessage(e){
      e.preventDefault()
      const {uid, photoURL} = auth.currentUser

      await db.collection('messages').add({
          text: msg,
          photoURL,
          uid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      setMsg('')
      scroll.current.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <div>
        <form onSubmit={sendMessage}>
            <div className="sendMsg">
                <input style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} value={msg} type="text" onChange={(e) => setMsg(e.target.value)} placeholder="Message..."/>
                <button style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px'}} type="submit">Send</button>
            </div>
        </form>
    </div>
  )
}

export default Sendmessage