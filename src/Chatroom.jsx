import { useState,useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, postMessage, getNewMessages,checkLoggin } from "./actions/userAction";
import ChatMessage from "./ChatMessage";
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Chatroom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { room,isRoom } = useSelector((state) => state.room);
  const [message, setMessage] = useState("");
  const { chat, timestamp } = useSelector((state) => state.chat);
  const {user,isAuthenticated }= useSelector((state) => state.user);
  const chatContainerRef = useRef(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [isNewChatPosted, setIsNewChatPosted] = useState(false);
  const prevChatLength = useRef(chat?.length); // Initialize the ref

  // console.log("initial",timestamp);
  // window.scrollTo(0, document.body.scrollHeight);
  
  useEffect(() => {
    dispatch(checkLoggin());
    dispatch(getMessages(room));
    // console.log("aftergetmessage",timestamp);
    const timeout=setTimeout(()=>{
      window.scrollTo(0, document.body.scrollHeight);
    },1000);
    return()=>clearTimeout(timeout);
  }, [dispatch, room]);
  useEffect(() => {
    if (isAuthenticated !=true || isRoom !=true) {
        navigate("/")
    }
}, [isAuthenticated, navigate,isRoom]);
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getNewMessages(room.roomid, timestamp));
      // console.log("updated",timestamp);
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch, timestamp]);

  useEffect(() => {
    if (isNewChatPosted || (chat?.length > 0 && chat?.length != prevChatLength.current)) {
      scrollToLastMessage();
      setIsNewChatPosted(false);
    }
  }, [chat, isNewChatPosted]);

  const handleScroll = () => {
    const container = chatContainerRef.current;
    // Check if the user is manually scrolling up or down
    const isScrolledToBottom =
      container.scrollHeight - container.clientHeight <= container.scrollTop + 1;

    // Update the isUserScrolling flag based on the user's scroll position
    setIsUserScrolling(!isScrolledToBottom);
  };

  const scrollToLastMessage = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    dispatch(postMessage(room.roomid, message, user.username));
    setIsNewChatPosted(true);
    setMessage("");
  };

  return (
    <div className="mostouter" >
      <div className="nn">
        <h2>Chatroom</h2>
        <div className="outerbody" 
        ref={chatContainerRef}
        onScroll={handleScroll}>
          {chat?.length > 0 ? (
            chat.map((msg) => (
              <ChatMessage
                key={msg._id}
                username={msg.username}
                chat={msg}
                currentUser={user}
                // chatContainerRef={chatContainerRef}
              />
            ))
          ) : (
            <div>No messages yet.</div>
          )}
        </div>
      </div>
      <div
        style={{
          position:"sticky",
          bottom: "0",
          padding: "10px",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          placeholder="Type your message..."
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatroom;