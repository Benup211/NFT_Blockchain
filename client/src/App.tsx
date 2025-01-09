import { Routes, Route } from "react-router-dom";
import { ClientRoute } from "./routes";
import { Footer,Navbar } from "./components/common";
import { Toaster } from "react-hot-toast";
export const App = () => {
    return (
        <div>
            {!location.pathname.startsWith("/signin") && !location.pathname.startsWith("/signup") && <Navbar/>}
            <Routes>
                <Route path="/*" element={<ClientRoute />} />
            </Routes>
            {!location.pathname.startsWith("/signin") && !location.pathname.startsWith("/signup") && <Footer/>}
            <Toaster />
        </div>
    );
};
