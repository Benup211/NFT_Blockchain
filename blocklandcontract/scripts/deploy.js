const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Get the contract factory
    const BlocklandFactory = await ethers.getContractFactory("Blockland");

    // Deploy the contract
    const Blockland = await BlocklandFactory.deploy(deployer.address);

    // Wait for the deployment transaction to be mined
    const receipt = await Blockland.deployTransaction.wait();
    
    console.log("Blockland deployed to:", Blockland.address);
    console.log("Transaction receipt:", receipt);
}

// Execute the main function
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error during deployment:", error);
        process.exit(1);
    });
