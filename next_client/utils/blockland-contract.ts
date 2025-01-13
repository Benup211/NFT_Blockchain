import { ethers,JsonRpcProvider } from "ethers";
import BlocklandABI from "./ABI/Blockland.json";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_NETWORK_URL);

export const getBlocklandContract = async(signer: ethers.Signer) => {
    const contract = new ethers.Contract(contractAddress, BlocklandABI.abi,signer);
    console.log("contract", contract);
    return contract;
};
