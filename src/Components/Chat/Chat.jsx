import { useEffect, useMemo, useRef } from 'react';
import styles from './Chat.module.css';
import Markdown from 'react-markdown';

const WELCOME_MESSAGE_GROUP = [
  {
  role: 'assistant',
  content: ' Hello! How can I assist you?'
}];

const Chat = ({ messages }) => {
const messageEndRef = useRef(null)
const messagesGroup = useMemo(() => messages.reduce((groups, message) => {
  if(message.role === 'user') groups.push([]);
    groups[groups.length-1].push(message);
    return groups
    }, []),
  [messages])

  useEffect(()=>{
    messageEndRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])
  return (
  <div className={styles.Chat}>
    {[WELCOME_MESSAGE_GROUP, ...messagesGroup].map((messages, groupIndex)=>(
        // Group
      <div key={groupIndex} className={styles.Group}>
        {messages.map(({ role, content }, index) => (
          // Message
      <div key={index} className={styles.Message} data-role={role}>
        {typeof content === 'string' ? (
          <Markdown>{content}</Markdown>
        ) : (
          <div>Invalid content</div>
        )}
      </div>
    ))}
      </div>
    ))}
    <div ref={messageEndRef}/>
  </div>
  )}
export default Chat;
