import { expect } from "chai";
import { ethers } from "hardhat";
import { Blockland } from "../typechain-types";

describe("Blockland", function () {
    let Blockland: Blockland;
    let owner: any;
    let addr1: any;
    let addr2: any;

    beforeEach(async function () {
        const BlocklandFactory = await ethers.getContractFactory("Blockland");
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy the contract with the initial owner set
        Blockland = await BlocklandFactory.deploy(owner.address);
        // await Blockland.deployed();
    });

    it("Should deploy with the correct address", async function () {
        expect(await Blockland.owner()).to.equal(owner.address);
    });

    it("Should mint an NFT and assign it to the right address of the user", async function () {
        const tokenURI = "ipfs://QmXy...";

        // Mint a new token to addr1
        await Blockland.safeMint(addr1.address, tokenURI);

        // Check the owner of the token
        expect(await Blockland.ownerOf(0)).to.equal(addr1.address);
    });

    it("Should update _nextTokenId correctly after minting the property successfully", async function () {
        const tokenURI1 = "ipfs://QmXy1...";
        const tokenURI2 = "ipfs://QmXy2...";

        // Mint two tokens
        await Blockland.safeMint(addr1.address, tokenURI1);
        await Blockland.safeMint(addr2.address, tokenURI2);

        // Verify that _nextTokenId is 2 after minting two tokens
        expect(await Blockland.ownerOf(0)).to.equal(addr1.address);
        expect(await Blockland.ownerOf(1)).to.equal(addr2.address);
    });

    it("Should emit TokenMinted event upon minting the property successfully", async function () {
        const tokenURI = "ipfs://QmXy..."; // Example IPFS URI

        // Expect event to be emitted during minting
        await expect(Blockland.safeMint(addr1.address, tokenURI))
            .to.emit(Blockland, "TokenMinted")
            .withArgs(addr1.address, 0);
    });

    it("Should return the correct token URI when nft tokenId is given", async function () {
        const tokenURI = "ipfs://QmXy..."; // Example IPFS URI

        // Mint a token and check the URI
        await Blockland.safeMint(addr1.address, tokenURI);
        expect(await Blockland.tokenURI(0)).to.equal(tokenURI);
    });

    // Test for changing the owner
    it("Should allow the current owner to change ownership", async function () {
        // Change ownership to addr1
        await Blockland.changeOwner(addr1.address);

        // Verify that addr1 is now the owner
        expect(await Blockland.owner()).to.equal(addr1.address);
    });

    it("Should prevent non-owners from changing ownership", async function () {
        // Attempt to change ownership from addr1, who is not the owner
        await expect(Blockland.connect(addr1).changeOwner(addr2.address))
            .to.be.reverted; // Check the error message based on the Ownable implementation
    });

    it("Should not allow changing to the zero address", async function () {
        // Attempt to change ownership to the zero address
        await expect(Blockland.changeOwner(ethers.ZeroAddress))
            .to.be.revertedWith("New owner cannot be the zero address"); // Check against your custom error message
    });
});
