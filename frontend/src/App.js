import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Sign_up from "./components/Sign_up";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/signup" element={ <Sign_up/> }> </Route>
        <Route path="/login" element={ <Login/> }></Route>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
