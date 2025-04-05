import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import Home from './Pages/Home';
import Payment from './Pages/Payment';
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <div style={{width:"100vw"}}>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>}/>
      </Routes>
     </BrowserRouter>     
   </div>
  );
}

export default App;
