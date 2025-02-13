import { useState } from "react";
import Assistant from "./Assistants/Googleai";
import Chat from "./Components/Chat/Chat";
import styles from "./app.module.css";
import Control from "./Components/Controls/Control";  
import Loader from "./Loader/loader";



function App() {
  const assistant = new Assistant();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (message) => {
    console.log('Adding message:', message);
    setMessages((prevMessages) => [...prevMessages, message])
  }

  const handleContentSend = async (content) =>{
    addMessage({
      content, 
      role: 'user'})
      setIsLoading(true);
    try {
      const result = await assistant.chat(content, messages)
      addMessage({
        content: result, 
        role: 'assistant'})
    } catch (error) {
      addMessage({
        content: 'Sorry, I couldnt process your request. Please try again!', 
        role: 'system'})
    }finally{
      setIsLoading(false);
    }
}

  return (
      <div className={styles.App}>
       {isLoading && <Loader/>}
        <header className={styles.Header}>
        <img className={styles.Logo} src="/robot.png"/>
       <h2 className={styles.Title}>AI ChatBot</h2>
       </header>
       <div className={styles.ChatContainer}> 
        <Chat messages = {messages} /> 
        </div>
        <Control isDisabled={isLoading} onSend={handleContentSend} />
      </div>
  )
}

export default App
