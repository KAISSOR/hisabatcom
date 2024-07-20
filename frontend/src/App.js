 import { React } from "react";
 import {BrowserRouter , Route , Routes , Navigate } from "react-router-dom";
 import Main from './components/Pages/Main'
 import Register from './components/Pages/Register'
 import Test from './components/Pages/Test'
 

 function App() {
    const user = localStorage.getItem("token")

      return(
        <BrowserRouter>
        <Routes>
        {user && <Route path="/" exact element={<Main/>} />}
        <Route path="/register" exact element={<Register/>} />
        <Route path="/test" exact element={<Test/>} />
        <Route path="/" exact element={<Navigate replace to = "/register" />} />
        </Routes>
        </BrowserRouter>

      )
 }

 export default App;