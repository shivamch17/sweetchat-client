import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import Home from './Home';
import Chatroom from './Chatroom';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatroom" element={<Chatroom />} />
        </Routes>
    </Router>
  );
};

export default App;
