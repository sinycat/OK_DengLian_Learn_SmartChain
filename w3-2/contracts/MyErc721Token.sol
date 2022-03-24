// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyErc721Token is  ERC721URIStorage{
    uint public counter;

    constructor() ERC721("MyErc721", "MES") {
        counter=0;
    }

    // https://gateway.pinata.cloud/ipfs/QmXxzb78YQ9fGh2UvjEEbF5BhJHjypVeDsfi9GJn3ZKczp
    function createErc721Token(string memory tokenURI) public returns(uint){
        uint tokenId=counter;
        _safeMint(msg.sender,tokenId);
        _setTokenURI(tokenId,tokenURI);
        counter++;
        return tokenId;
    }
    
}