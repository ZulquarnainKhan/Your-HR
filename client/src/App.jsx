import Home from './pages/Home';
import Login from './pages/login';
import Signup from './pages/signup';
import UploadResume from './pages/UploadResume';
import { BrowserRouter, Routes, Route } from "react-router-dom";
  function App() {
    return (
      <div>
        <BrowserRouter>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/uploadResume" element={<UploadResume />} />
            {/* Add additional routes here if needed */}
          </Routes>
          
        </BrowserRouter>
      </div>
    );
  }
  
  export default App;