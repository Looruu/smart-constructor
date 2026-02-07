// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./AccessControlModule.sol";

abstract contract TaxModule is AccessControlModule {
    uint256 public taxBasisPoints; // ej: 100 = 1%
    address public taxWallet;

    function setTax(uint256 bp, address wallet) external onlyRole(TAX_ROLE) {
        taxBasisPoints = bp;
        taxWallet = wallet;
    }

    function _applyTax(address from, uint256 amount)
        internal
        returns (uint256)
    {
        if (taxBasisPoints == 0) return amount;

        uint256 tax = (amount * taxBasisPoints) / 10000;
        super._transfer(from, taxWallet, tax);
        return amount - tax;
    }
}
