import styles from './App.module.css'

import { useEffect, useState } from 'react'

interface Message {
  role: string;
  content: string;
}



const App = () => {

  const [value, setValue] = useState('')
  const [message, setMessage] = useState<Message | null>(null)
  const [previousChats, setPreviousChats] = useState<{title: string, role: string, content: string}[]>([])
  const [currentTitle, setCurrentTitle] = useState<string | null>(null)

  const getMessages = async () => {  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: value }],
      }),
    }
    try {
      const response = await fetch('http://localhost:8000/completions', options)
      const data = await response.json()
      if (data.choices && data.choices.length > 0) {
        setMessage(data.choices[0].message)
      } else {
        console.error('Unexpected response format:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }

  }

useEffect(() => {
  if (!currentTitle && value && message) {
    setCurrentTitle(value);
  }
  if (currentTitle && value && message) {
    setPreviousChats([...previousChats, {title: currentTitle, role: "user", content: value}, {title: currentTitle, role: message.role, content: message.content}]);
    setValue('');
    setMessage(null);
  }
}, [message, currentTitle, previousChats, value]);


const createNewChat = () => {
  setMessage(null)
  setValue("")
  setCurrentTitle(null)
 }

const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)

const uniqueTitles = Array.from (new Set(previousChats.map(previousChat => previousChat.title)))

interface HandleClickProps {
  uniqueTitle: string;
}

const handleClick = ({ uniqueTitle }: HandleClickProps) => {
  setCurrentTitle(uniqueTitle);
  setValue("");
};



  return (
    <div className={styles.app}>
      <section className={styles.sidebar}>
<button className={styles.button} onClick={createNewChat}>
 + New Chat
</button>
<ul className={styles.history}>
  
    {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick({ uniqueTitle })}>{uniqueTitle}</li>)}


</ul>

</section>

      <section className={styles.main}>
        <h1>
         ChatGPT
        </h1>
        <ul className={styles.feed}>
      {currentChat.map((chatMessage, index) => (
        <li key={index}>
          <p className={styles.role}>{chatMessage.role}</p>
          <p className={styles.chatMessage}>{chatMessage.content}</p>
        </li>
      ))}
          
        </ul>
        <div className={styles.bottomSection}>
          <div className={styles.inputContainer}>
            <input value={value} placeholder="Type your message here" onChange={(e)=>setValue(e.target.value)}/>

          </div>
          <button className={styles.submit} onClick={getMessages}>submit</button>
        </div>
        </section>
    </div>
  )
}

export default App
