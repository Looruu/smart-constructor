// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./TokenBase.sol";
import "./modules/AccessControlModule.sol";
import "./modules/MintModule.sol";
import "./modules/BurnModule.sol";
import "./modules/PauseModule.sol";
import "./modules/CapModule.sol";
import "./modules/PermitModule.sol";
import "./modules/SnapshotModule.sol";
import "./modules/TaxModule.sol";
import "./modules/BlacklistModule.sol";
import "./modules/WhitelistModule.sol";

contract TokenFull is
    TokenBase,
    AccessControlModule,
    MintModule,
    BurnModule,
    PauseModule,
    CapModule,
    PermitModule,
    SnapshotModule,
    TaxModule,
    BlacklistModule,
    WhitelistModule
{
    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        uint256 initialSupply_,
        uint256 cap_
    )
        TokenBase(name_, symbol_, decimals_, initialSupply_)
        ERC20Capped(cap_ * 10 ** decimals_)
        PermitModule(name_)
    {
        _setupAdmin(msg.sender);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        override(TokenBase, PauseModule, SnapshotModule)
    {
        require(!blacklisted[from] && !blacklisted[to], "Blacklisted");
        super._beforeTokenTransfer(from, to, amount);
    }

    function _transfer(address from, address to, uint256 amount)
        internal
        override
    {
        amount = _applyTax(from, amount);
        super._transfer(from, to, amount);
    }
}
