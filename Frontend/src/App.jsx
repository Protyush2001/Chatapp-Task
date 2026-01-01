import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/chat" element={<ProtectedRoute><Chat/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App;
