import AddExpense from "./components/AddExpense";
import Dashboard from "./components/Dashboard";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import ManageExpense from "./components/ManageExpense";
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
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/add-expense" element={<AddExpense/>}></Route>
        <Route path="/manage-expense" element={<ManageExpense/>}></Route>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
