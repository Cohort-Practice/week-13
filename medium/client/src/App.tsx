import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateBlog from "./pages/CreateBlog";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create" element={<CreateBlog />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
