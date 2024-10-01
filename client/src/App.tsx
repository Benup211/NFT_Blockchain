import Buy from "./pages/Buy";
import CreateNFT from "./pages/createNFT";
import { Home } from "./pages/home";
import SignIn from "./pages/signin";
import SignUp from "./pages/Signup";
import Navbar from "./components/common/navbar";
import Footer from "./components/common/footer";


export const App=()=>{
  return(
    <>
    <Navbar/>
    {/* <Home/> */}
    {/* <SignIn/> */}
    {/* <SignUp/> */}
    {/* <CreateNFT/>  */}
    <Buy/>
    <Footer/>
    


    </>
  );
}