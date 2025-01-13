// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Blockland is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    // Event to emit the tokenId after minting
    event TokenMinted(address indexed to, uint256 indexed tokenId);

    constructor(address initialOwner)
        ERC721("Blockland", "BL")
        Ownable(initialOwner)
    {}

    function safeMint(address to, string memory uri) public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        // Emit the TokenMinted event with the minted tokenId
        emit TokenMinted(to, tokenId);
    }

    // Function to transfer NFT
    function transferNFT(address from, address to, uint256 tokenId) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Caller is not owner nor approved");
        _transfer(from, to, tokenId);
    }

    // Define the _isApprovedOrOwner function
    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view returns (bool) {
        address owner = ownerOf(tokenId);
        return (spender == owner || getApproved(tokenId) == spender || isApprovedForAll(owner, spender));
    }

    // Function to change ownership
    function changeOwner(address newOwner) public {
        require(newOwner != address(0), "New owner cannot be the zero address");
        transferOwnership(newOwner);
    }

    // The following functions are overrides required by Solidity.
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
