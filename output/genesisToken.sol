// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/*
    CONTRATO GENERADO AUTOMÁTICAMENTE
    =================================
    Este contrato fue generado por el Smart Constructor Modular.
    Cada módulo activado o desactivado depende de las opciones seleccionadas.
*/

import "./contracts/TokenBase.sol";
import "./contracts/modules/AccessControlModule.sol";

import "./contracts/modules/MintModule.sol";

import "./contracts/modules/BurnModule.sol";

import "./contracts/modules/PauseModule.sol";

import "./contracts/modules/CapModule.sol";


import "./contracts/modules/SnapshotModule.sol";


import "./contracts/modules/BlacklistModule.sol";

import "./contracts/modules/WhitelistModule.sol";

/*
    ENSAMBLADO DEL CONTRATO
    ========================
    Aquí se combinan dinámicamente todos los módulos seleccionados.
*/

contract GenesisToken is
    TokenBase,
    AccessControlModule
    , MintModule
    , BurnModule
    , PauseModule
    , CapModule
    
    , SnapshotModule
    
    , BlacklistModule
    , WhitelistModule
{
    constructor()
        TokenBase("Genesis", "gen", 18, )
        ERC20Capped(1000000000 * 10 ** 18)
    {
        _setupAdmin(msg.sender);
    }

    // Hooks combinados
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        override(
            TokenBase
            , PauseModule
            , SnapshotModule
        )
    {
        require(!blacklisted[from] && !blacklisted[to], "Blacklisted");

        require(whitelisted[from] && whitelisted[to], "Not whitelisted");

        super._beforeTokenTransfer(from, to, amount);
    }

    // Taxes
}
