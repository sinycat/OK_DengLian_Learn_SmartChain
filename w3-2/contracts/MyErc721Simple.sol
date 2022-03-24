// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyErc721Simple is  ERC721URIStorage{
    uint public counter;

    constructor() ERC721("MyErc721", "MESS") {
        counter=10000;
    }
    
}