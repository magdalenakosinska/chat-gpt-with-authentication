import styles from './App.module.css'

import { useState } from 'react'

const App = () => {

  const [value, setValue] = useState('')
  const [message, setMessage] = useState(null)

  const getMessages = async () => {  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({message:"hello, how are you?"})
    }
    try {
      const response = await fetch('http://localhost:8000/completions', options)
      const data = await response.json()
      setMessage(data.choices[0].message)
    } catch (error) {
      console.error('Error:', error);
    }

  }


  return (
    <div className={styles.app}>
      <section className={styles.sidebar}>
<button className={styles.button}>
 + New Chat
</button>
<ul className={styles.history}>
  <li>blabla</li>
</ul>
      </section>

      <section className={styles.main}>
        <h1>
         ChatGPT
        </h1>
        <ul className={styles.feed}>
          
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
