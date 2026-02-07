// generate.js
// Generador interactivo de contratos ERC-20 modulares con explicaciones en español.
// Requiere: fs-extra, handlebars, prompts
// Asegúrate de tener en package.json: "type": "module"

import fs from "fs-extra";
import Handlebars from "handlebars";
import prompts from "prompts";

async function main() {
    console.log("\n=== GENERADOR DE TOKEN ERC-20 ULTRA PRO ===\n");

    // Datos básicos del token
    const base = await prompts([
        {
            type: "text",
            name: "name",
            message: "Nombre del token (ej: Genesis):"
        },
        {
            type: "text",
            name: "symbol",
            message: "Símbolo (ej: GEN):"
        },
        {
            type: "number",
            name: "decimals",
            message: "Decimales (normalmente 18):",
            initial: 18
        },
        {
            type: "number",
            name: "initialSupply",
            message: "Supply inicial (sin decimales, ej: 8000000):"
        }
    ]);

    console.log("\n--- OPCIONES AVANZADAS DEL TOKEN ---\n");

    // Mintable
    console.log("MINTABLE:");
    console.log("- Permite CREAR nuevos tokens después del despliegue.");
    console.log("- Útil para recompensas, incentivos, emisiones controladas.");
    console.log("- Riesgo: inflación si el rol MINTER no está bien gobernado.\n");

    const { mintable } = await prompts({
        type: "toggle",
        name: "mintable",
        message: "¿Quieres que el token sea MINTABLE (se puedan crear más tokens)?",
        initial: false,
        active: "sí",
        inactive: "no"
    });

    // Burnable
    console.log("\nBURNABLE:");
    console.log("- Permite QUEMAR tokens, reduciendo el supply total.");
    console.log("- Útil para modelos deflacionarios o quema de fees.");
    console.log("- Riesgo: supply impredecible si se abusa.\n");

    const { burnable } = await prompts({
        type: "toggle",
        name: "burnable",
        message: "¿Quieres que el token sea BURNABLE (se puedan quemar tokens)?",
        initial: false,
        active: "sí",
        inactive: "no"
    });

    // Pausable
    console.log("\nPAUSABLE:");
    console.log("- Permite PAUSAR todas las transferencias en caso de emergencia.");
    console.log("- Útil ante hacks, bugs, migraciones.");
    console.log("- Riesgo: centralización, el rol PAUSER puede congelar el sistema.\n");

    const { pausable } = await prompts({
        type: "toggle",
        name: "pausable",
        message: "¿Quieres que el token sea PAUSABLE (se puedan pausar transferencias)?",
        initial: false,
        active: "sí",
        inactive: "no"
    });

    // Capped
    console.log("\nCAPPED (SUPPLY MÁXIMO):");
    console.log("- Define un límite máximo de tokens que se pueden crear.");
    console.log("- Útil para controlar la inflación en tokens mintables.");
    console.log("- Riesgo: si el cap es muy bajo, limita el crecimiento del protocolo.\n");

    const { capEnabled } = await prompts({
        type: "toggle",
        name: "capEnabled",
        message: "¿Quieres definir un SUPPLY MÁXIMO (CAP)?",
        initial: false,
        active: "sí",
        inactive: "no"
    });

    let cap = null;
    if (capEnabled) {
        const capAns = await prompts({
            type: "number",
            name: "cap",
            message: "Cap máximo (sin decimales, ej: 100000000):"
        });
        cap = capAns.cap;
    }

    // Permit
    console.log("\nPERMIT (EIP-2612):");
    console.log("- Permite aprobar tokens mediante FIRMA, sin pagar gas.");
    console.log("- Ideal para UX avanzada, DEX, integraciones DeFi modernas.");
    console.log("- Riesgo: implementación incorrecta puede ser crítica.\n");

    const { permit } = await prompts({
        type: "toggle",
        name: "permit",
        message: "¿Quieres habilitar PERMIT (EIP-2612)?",
        initial: false,
        active: "sí",
        inactive: "no"
    });

    // Snapshot
    console.log("\nSNAPSHOT:");
    console.log("- Permite tomar 'fotos' del estado de balances y supply.");
    console.log("- Útil para gobernanza, airdrops, recompensas retroactivas.");
    console.log("- Riesgo: coste de gas si se usa muy frecuentemente.\n");

    const { snapshot } = await prompts({
        type: "toggle",
        name: "snapshot",
        message: "¿Quieres habilitar SNAPSHOT (estados históricos)?",
        initial: false,
        active: "sí",
        inactive: "no"
    });

    // Taxes
    console.log("\nTAXES / FEES:");
    console.log("- Permite cobrar una comisión en cada transferencia.");
    console.log("- Útil para tokens deflacionarios, tesorería, liquidez.");
    console.log("- Riesgo: mala reputación, problemas para listarse en CEX.\n");

    const { taxes } = await prompts({
        type: "toggle",
        name: "taxes",
        message: "¿Quieres habilitar TAXES (comisiones en transferencias)?",
        initial: false,
        active: "sí",
        inactive: "no"
    });

    // Blacklist
    console.log("\nBLACKLIST:");
    console.log("- Permite BLOQUEAR direcciones específicas.");
    console.log("- Útil para tokens regulados, cumplimiento legal.");
    console.log("- Riesgo: centralización extrema, censura.\n");

    const { blacklist } = await prompts({
        type: "toggle",
        name: "blacklist",
        message: "¿Quieres habilitar BLACKLIST (bloquear direcciones)?",
        initial: false,
        active: "sí",
        inactive: "no"
    });

    // Whitelist
    console.log("\nWHITELIST:");
    console.log("- Permite que SOLO ciertas direcciones puedan usar el token.");
    console.log("- Útil para preventas, tokens privados, entornos regulados.");
    console.log("- Riesgo: no apto para DeFi abierto.\n");

    const { whitelist } = await prompts({
        type: "toggle",
        name: "whitelist",
        message: "¿Quieres habilitar WHITELIST (solo direcciones permitidas)?",
        initial: false,
        active: "sí",
        inactive: "no"
    });

    console.log("\n=== RESUMEN DE CONFIGURACIÓN ===");
    console.log(`Nombre:        ${base.name}`);
    console.log(`Símbolo:       ${base.symbol}`);
    console.log(`Decimales:     ${base.decimals}`);
    console.log(`Supply inicial:${base.initialSupply}`);
    console.log(`Mintable:      ${mintable}`);
    console.log(`Burnable:      ${burnable}`);
    console.log(`Pausable:      ${pausable}`);
    console.log(`Cap enabled:   ${capEnabled} ${capEnabled ? `(cap: ${cap})` : ""}`);
    console.log(`Permit:        ${permit}`);
    console.log(`Snapshot:      ${snapshot}`);
    console.log(`Taxes:         ${taxes}`);
    console.log(`Blacklist:     ${blacklist}`);
    console.log(`Whitelist:     ${whitelist}\n`);

    const confirm = await prompts({
        type: "toggle",
        name: "ok",
        message: "¿Generar contrato con esta configuración?",
        initial: true,
        active: "sí",
        inactive: "no"
    });

    if (!confirm.ok) {
        console.log("Operación cancelada. No se generó ningún contrato.");
        return;
    }

    // Cargar plantilla Handlebars
    const template = fs.readFileSync("./templates/erc20_modular.hbs", "utf8");
    const compile = Handlebars.compile(template);

    const data = {
        ...base,
        mintable,
        burnable,
        pausable,
        capEnabled,
        cap,
        permit,
        snapshot,
        taxes,
        blacklist,
        whitelist
    };

    const output = compile(data);

    await fs.ensureDir("./output");
    const fileName = `${base.name.replace(/\s+/g, "")}Token.sol`;
    fs.writeFileSync(`./output/${fileName}`, output);

    console.log(`\n✅ Contrato generado en ./output/${fileName}\n`);
}

main().catch((err) => {
    console.error("Error en el generador:", err);
});
