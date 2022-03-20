//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyERC20 is ERC20 {

    constructor() ERC20("MyERC20", "MEC") {
    }

    function mint(address account, uint256 amount) public {
        return _mint(account, amount);
    }
}
