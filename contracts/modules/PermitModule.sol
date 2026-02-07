// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

abstract contract PermitModule is ERC20Permit {
    constructor(string memory name_) ERC20Permit(name_) {}
}
