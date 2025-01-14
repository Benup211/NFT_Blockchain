import { ethers } from "ethers";
import BlocklandABI from "./ABI/Blockland.json";

/**
 * Transfer an NFT to another address.
 *
 * @param {string} contractAddress - The address of the deployed NFT contract.
 * @param {string} tokenId - The ID of the NFT to transfer.
 * @param {string} to - The recipient's address.
 * @param {string} signerPrivateKey - The private key of the sender (caller must own or be approved).
 * @param {string} providerUrl - The URL of the Ethereum provider (e.g., Infura or Hardhat localhost).
 * @returns {Promise<string>} - The transaction hash of the transfer.
 */

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
const escrowAddress = process.env.NEXT_PUBLIC_ESCROW_ADDRESS!;
const privateEscrowKey = process.env.NEXT_PUBLIC_PRIVATE_ESCROW_ADDRESS!;
const providerUrl = process.env.NEXT_PUBLIC_NETWORK_URL!;
export async function transferNFT(
    tokenId: any | ethers.Overrides,
    to: any | ethers.Overrides,
) {
    try {
        // Set up provider and signer
        const provider = new ethers.JsonRpcProvider(providerUrl);
        const signer = new ethers.Wallet(privateEscrowKey, provider);

        console.log("signer", signer);

        // ABI for the transferNFT function in the contract
        const abi = BlocklandABI.abi;

        // Connect to the contract
        const contract = new ethers.Contract(contractAddress, abi, signer);

        // Execute the transfer
        const tx = await contract.transferNFT(signer.address, to, tokenId);

        // Wait for the transaction to be mined
        await tx.wait();

        return tx.hash;
    } catch (error) {
        console.error("Error transferring NFT:", error);
        throw error;
    }
}

export async function transferSellerNFT(
    tokenId: any | ethers.Overrides
) {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
            contractAddress,
            BlocklandABI.abi,
            signer
        );
        const tx = await contract.transferNFT(signer.address, escrowAddress, tokenId);
        await tx.wait();
        return tx.hash;
    } catch (error) {
        console.error("Error transferring NFT:", error);
        throw error;
    }
}

/**
 * Transfer ETH to another address using the browser's provider (e.g., MetaMask).
 *
 * @param {string} to - The recipient's address.
 * @param {string} amountInEther - The amount of ETH to transfer, as a string.
 * @returns {Promise<string>} - The transaction hash of the transfer.
 */
export async function transferETH(to: any, amountInEther: string) {
    try {
        // Check for the browser provider
        if (!window.ethereum) {
            throw new Error(
                "Ethereum provider not found. Please install MetaMask."
            );
        }

        // Request access to the user's wallet
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        // Convert the amount to Wei
        const amountInWei = ethers.parseEther(amountInEther);

        // Create the transaction
        const tx = await signer.sendTransaction({
            to,
            value: amountInWei,
        });

        // Wait for the transaction to be mined
        await tx.wait();

        return tx.hash;
    } catch (error) {
        console.error("Error transferring ETH:", error);
        throw error;
    }
}
