import { Routes, Route } from "react-router-dom";
import {
    HomePage,
    BuyPage,
    CreateNFTPage,
    NFTDescriptionPage,
    SignInPage,
    SignUpPage,
} from "../pages";
export const ClientRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/buy" element={<BuyPage />} />
            <Route path="/create" element={<CreateNFTPage />} />
            <Route path="/nft/:id" element={<NFTDescriptionPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
        </Routes>
    );
};
