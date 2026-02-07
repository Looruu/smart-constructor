// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./AccessControlModule.sol";

abstract contract BlacklistModule is AccessControlModule {
    mapping(address => bool) public blacklisted;

    function setBlacklist(address user, bool status)
        external
        onlyRole(BLACKLIST_ROLE)
    {
        blacklisted[user] = status;
    }

    modifier notBlacklisted(address user) {
        require(!blacklisted[user], "Blacklisted");
        _;
    }
}
