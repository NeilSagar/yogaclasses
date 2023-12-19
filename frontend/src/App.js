import { Route,Routes,BrowserRouter } from "react-router-dom";

import './App.css';
import Signup from "./components/Signup.jsx";
import SignIn from "./components/SignIn.jsx";
import Dashboard from "./components/Dashboard.jsx";
import PrivateComponent from "./components/PrivateComponent.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Signup/>}></Route>
      <Route path="/signin" element={<SignIn/>}></Route>
      <Route element={<PrivateComponent/>}>
        <Route path="/Dashboard" element={<Dashboard/>}></Route>
      </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
