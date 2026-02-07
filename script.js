document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("generateBtn");
    const downloadBtn = document.getElementById("downloadBtn");
    const resultBox = document.getElementById("result");

    let lastGeneratedContract = "";

    btn.addEventListener("click", () => {
        const name = document.getElementById("tokenName").value.trim();
        const symbol = document.getElementById("tokenSymbol").value.trim();
        const supply = document.getElementById("tokenSupply").value.trim();

        if (!name || !symbol || !supply) {
            resultBox.textContent = "Completa todos los parámetros del token.";
            resultBox.style.color = "#EF4444";
            return;
        }

        const checkboxes = document.querySelectorAll(".module-list input[type='checkbox']");
        const selected = [];

        checkboxes.forEach(cb => {
            if (cb.checked) selected.push(cb.value);
        });

        if (selected.length === 0) {
            resultBox.textContent = "Selecciona al menos un módulo.";
            resultBox.style.color = "#EF4444";
            return;
        }

        // Imports
        const imports = selected
            .map(m => `import "./modules/${m}Module.sol";`)
            .join("\n");

        // Herencia
        const inheritance = selected
            .map(m => `${m}Module`)
            .join(", ");

        // Contrato generado
        const contract = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

${imports}

contract ${name} is ${inheritance} {

    string public constant name = "${name}";
    string public constant symbol = "${symbol}";
    uint256 public constant initialSupply = ${supply};

    constructor() {
        _mint(msg.sender, initialSupply);
    }
}
        `.trim();

        lastGeneratedContract = contract;

        resultBox.style.color = "#10B981";
        resultBox.textContent = contract;
    });

    // Descargar archivo .sol
    downloadBtn.addEventListener("click", () => {
        if (!lastGeneratedContract) {
            alert("Primero genera un contrato.");
            return;
        }

        const blob = new Blob([lastGeneratedContract], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "MyToken.sol";
        a.click();

        URL.revokeObjectURL(url);
    });
});
