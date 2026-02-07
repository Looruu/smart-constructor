// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/Pausable.sol";
import "./AccessControlModule.sol";

abstract contract PauseModule is Pausable, AccessControlModule {
    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        virtual
        override
    {
        require(!paused(), "Token paused");
        super._beforeTokenTransfer(from, to, amount);
    }
}
