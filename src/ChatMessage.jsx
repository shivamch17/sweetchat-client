import PropTypes from "prop-types";
function convertUtcToIst(utcDateTimeString) {
  const utcDateTime = new Date(utcDateTimeString);
  const istDateTime = new Date(utcDateTime.getTime() + 5.5 * 60 * 60 * 1000);

  let hours = istDateTime.getUTCHours();
  let minutes = istDateTime.getUTCMinutes();

  const amOrPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  const istTime = `${hours}:${minutes} ${amOrPm}`;
  return istTime;
}

const ChatMessage = ({ username, chat, currentUser }) => {
  const istTime = convertUtcToIst(chat.createdAt);
  const isCurrentUser = username === currentUser.username;
  return (
    <div
      style={{
        width: "80vw",
        background: "#1a1a2e;",
        display: "flex",
        justifyContent: isCurrentUser ? "right" : "left",
      }}
    >
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "30px",
          height: "30px",
          border: "2px solid black",
          borderRadius: "50px",
          verticalAlign: "center",
          fontSize: "20px",
          marginTop: "3px",
        }}
      >
        <strong>{currentUser.username[0].toUpperCase()}</strong>
      </div> */}
      <div
        style={{
          background: isCurrentUser ? "#DCF8C6" : "#EFEFEF",
          padding: "1vw",
          minHeight: "50px",
          marginBottom: "1px",
          margin:'2px',
          borderRadius: "10px",
          width: "30vw",
          position:'relative',
          wordWrap: "break-word",
        }}
      >
        <p style={{
                    padding:'2px',
                    color: '#000000',
                    wordWrap: "break-word",
        }}>
          {chat.chat}
          </p>
        <span style={{
                    position:'absolute',
                    right: '2px',
                    bottom: '2px',
                    fontSize:'12px',
                    color: '#000000',
                    marginTop:'2px',
                    padding:'2px',
                    opacity:0.8,
                    wordWrap: "break-word",
        }}>
          {istTime}
          </span>
      </div>
      {/* <div ref={chatContainerRef}></div> */}
    </div>
  );
};

ChatMessage.propTypes = {
  username: PropTypes.string.isRequired,
  chat: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default ChatMessage;
