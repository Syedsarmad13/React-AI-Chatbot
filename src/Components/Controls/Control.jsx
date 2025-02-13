import { useEffect, useRef, useState } from "react";
import styles from "./Control.module.css";
import TextareaAutosize from 'react-textarea-autosize';

const Control = ({ isDisabled = false, onSend}) => {
  const textareaRef = useRef(null);
  const [content, setContent] = useState("");

  useEffect(()=>{
    if (!isDisabled) {
      textareaRef.current.focus();
    }
  }, [isDisabled])

  const handleContentChange = (event) => {
    setContent(event.target.value);
  }
  
  const handleContentSend = () => {
    if(content.length > 0){
        onSend(content);
        setContent("")
    }
  }

  const handleEnterPress = (event) =>{
    if(event.key === 'Enter' && !event.shiftKey){
        event.preventDefault();
        handleContentSend();
    }
  }

    return ( 
    <div className={styles.Controls}>
        <div className={styles.TextAreaContainer}>
            <TextareaAutosize
            ref={textareaRef}
            className={styles.TextArea} 
            placeholder="Message AI Chatbot"
            disabled={isDisabled}
            value={content}
            minRows={1}
            maxRows={5}
            onChange={handleContentChange}
            onKeyDown={handleEnterPress} />
        </div>
        <button className={styles.Button} disabled={isDisabled} onClick={handleContentSend}>
            <SendIcon/>
        </button>
    </div> );
}

function SendIcon () {
    return(
    <svg xmlns="http://www.w3.org/2000/svg" 
    height="24px" 
    viewBox="0 -960 960 960" 
    width="24px" 
    fill="#5f6368">
    <path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z"/>
    </svg>
)
}
 
export default Control;