import React,{useState, useEffect, useRef} from 'react'
import {db,auth} from '../fb'
import Sendmessage from './Sendmessage'
import Signout from './Signout'

function Chat() {
  const scroll = useRef()
  const [messages,setMessages] = useState([])
  useEffect(() => {
    db.collection("messages").orderBy('createdAt').limit(50).onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => doc.data()))
    })
  },[])
  return (
    <div>
        <Signout />
        
        <div className="msgs">
          {messages.map(({id, text, photoURL, uid}) => (
            <div>
              <div key={id}  className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                  <img src={photoURL} alt="" />
                  <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
        <Sendmessage scroll={scroll} />
        <div ref={scroll}></div>
    </div>
  )
}

export default Chat