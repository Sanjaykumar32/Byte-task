import logo from './logo.svg';
import './App.css';
import {BrowserRouter ,Routes , Route} from "react-router-dom"
import SignUp from './signUp';
import SignInSide from './signIn';
import PermanentDrawerLeft from './list';

function App() {
  return (
   <>
    <BrowserRouter>
  
  <Routes>
    <Route path="/" element={<SignUp/>}></Route>
     <Route path="/SignIn" element={<SignInSide/>}></Route>
     <Route path="/Signup" element={<SignUp/>}></Route>
     <Route path="/list" element={<PermanentDrawerLeft/>}></Route>
  </Routes>
 
 </BrowserRouter>
 
    
   </>
  );
}

export default App;
