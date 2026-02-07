# 🧠 Smart Constructor – Modular ERC20 Token Generator

**Smart Constructor** es un generador modular de tokens ERC20 que permite crear contratos inteligentes altamente configurables combinando módulos independientes.  
El objetivo es ofrecer una arquitectura clara, auditable y extensible para construir tokens profesionales sin duplicar código.

Este proyecto incluye:

- 🧩 Módulos plug‑and‑play (Mint, Burn, Cap, Snapshot, Permit, Tax, etc.)
- 🛠️ Un generador CLI interactivo (`generate.js`)
- 📦 Contratos base (`TokenBase.sol`, `TokenFull.sol`)
- 🌐 Interfaz HTML opcional
- 🧪 Arquitectura lista para pruebas y auditorías

---

## 🚀 Características principales

### ✔️ Arquitectura modular
Cada funcionalidad del token está implementada como un módulo independiente:

- AccessControl
- Blacklist
- Burn
- Cap
- Mint
- Pause
- Permit (EIP‑2612)
- Snapshot
- Tax
- Whitelist

Puedes combinarlos libremente para generar un token a medida.

---

## 🛠️ Generador CLI

El archivo `generate.js` permite crear un token seleccionando módulos desde una interfaz interactiva.

Ejemplo:

```bash
node generate.js
```
El generador:

Pregunta por el nombre del token, símbolo y supply.

Permite elegir qué módulos incluir.

Ensambla automáticamente el contrato final.

Lo guarda en la carpeta de salida.

smart-constructor/
│
├── contracts/
│   ├── TokenBase.sol
│   ├── TokenFull.sol
│   └── modules/
│       ├── AccessControlModule.sol
│       ├── BlacklistModule.sol
│       ├── BurnModule.sol
│       ├── CapModule.sol
│       ├── MintModule.sol
│       ├── PauseModule.sol
│       ├── PermitModule.sol
│       ├── SnapshotModule.sol
│       ├── TaxModule.sol
│       └── WhitelistModule.sol
│
├── generate.js          # Generador CLI
├── index.html           # Interfaz visual opcional
├── index.py             # Script auxiliar
├── package.json
└── images/          


Instalación: ```bash npm install```

Uso del generador:  ```node generate.js```

Módulos disponibles

Cada módulo implementa una funcionalidad específica:

Módulo	Descripción
AccessControl	Roles y permisos
Blacklist	Lista negra de direcciones
Burn	Función de quemado
Cap	Supply máximo
Mint	Minteo controlado
Pause	Pausable
Permit	EIP‑2612 (gasless approvals)
Snapshot	Snapshots del estado
Tax	Impuestos configurables
Whitelist	Lista blanca


