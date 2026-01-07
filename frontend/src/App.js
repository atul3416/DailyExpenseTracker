import Sign_up from "./components/Sign_up";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Sign_up/>}>

        </Route>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
