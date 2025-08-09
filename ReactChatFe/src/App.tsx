import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import MemberList from "./components/MemberList";
import ChatRoomList from "./components/ChatRoomList";
import ChatService from "./components/ChatService";
import Layout from "./components/Layout.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="members" element={<MemberList />} />
          <Route path="chatrooms" element={<ChatRoomList />} />
          <Route path="chat" element={<ChatService />} />
        </Route>
        {/* 인증 관련 페이지는 Layout 없이 독립적으로 렌더링 */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
