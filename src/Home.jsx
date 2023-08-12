import { useDispatch,useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser,setRoom,checkLoggin } from './actions/userAction';
import './Home.css';

const themes = [
  {
      background: "#1A1A2E",
      color: "#FFFFFF",
      primaryColor: "#0F3460"
  },
  {
      background: "#461220",
      color: "#FFFFFF",
      primaryColor: "#E94560"
  },
  {
      background: "#192A51",
      color: "#FFFFFF",
      primaryColor: "#967AA1"
  },
  {
      background: "#F7B267",
      color: "#000000",
      primaryColor: "#F4845F"
  },
  {
      background: "#F25F5C",
      color: "#000000",
      primaryColor: "#642B36"
  },
  {
      background: "#231F20",
      color: "#FFF",
      primaryColor: "#BB4430"
  }
];

const Home = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated} = useSelector(state => state.user)
  const { isRoom} = useSelector(state => state.room)
  useEffect(() => {
    if (isAuthenticated === true && isRoom === true) {
        navigate("/chatroom")
    }
}, [isAuthenticated, navigate,isRoom]);
useEffect(()=>{
  dispatch(checkLoggin());
},[]);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    roomid: '',
    key: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setRoom(formData));
    dispatch(loginUser(formData));
  };

  const [selectedTheme, setSelectedTheme] = useState(themes[0]);

  const setTheme = (theme) => {
    setSelectedTheme(theme);
  };

  const displayThemeButtons = () => {
    return themes.map((theme, index) => (
      <div
        key={index}
        className="theme-btn"
        style={{ background: theme.background }}
        onClick={() => setTheme(theme)}
      ></div>
    ));
  };

  return (
    <div className="container">
      <section className="container">
        <div className="login-container">
          <div className="circle circle-one"></div>
          <div className="form-container">
            <img
              src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
              alt="illustration"
              className="illustration"
            />
            <h1 className="opacity">SWEETCHAT</h1>
            <form onSubmit={handleSubmit}>
            <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="NAME"
            onChange={handleInputChange}
            />
            <input
            type="text"
            name="username"
            value={formData.username}
            placeholder="USERNAME"
            onChange={handleInputChange}
            />
            <input
            type="text"
            name="roomid"
            value={formData.roomid}
            onChange={handleInputChange}
            placeholder="ROOM ID"
            />
            <input
            type="text"
            name="key"
            value={formData.key}
            onChange={handleInputChange}
            placeholder="KEY"
            />
              <button className="opacity" type="submit">ENTER</button>
            </form>
          </div>
          <div className="circle circle-two"></div>
        </div>
        <div className="theme-btn-container">{displayThemeButtons()}</div>
      </section>
    </div>
  );
};

export default Home;
