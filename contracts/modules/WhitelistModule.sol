// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./AccessControlModule.sol";

abstract contract WhitelistModule is AccessControlModule {
    mapping(address => bool) public whitelisted;

    function setWhitelist(address user, bool status)
        external
        onlyRole(WHITELIST_ROLE)
    {
        whitelisted[user] = status;
    }

    modifier onlyWhitelisted(address user) {
        require(whitelisted[user], "Not whitelisted");
        _;
    }
}
