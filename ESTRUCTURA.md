# 🗺️ ESTRUCTURA Y MAPA DEL PROYECTO

## Árbol de Archivos

```
Proyecto Juego Web/
│
├── 📄 index.html              ← INICIA AQUÍ: Abre en navegador
├── 🎨 styles.css              ← Estilos visuales y animaciones
├── ⚙️ game.js                 ← Lógica principal del juego
├── 🔧 config.js               ← Configuración avanzada
│
├── 📖 START_HERE.md           ← Guía de inicio rápido
├── 📚 README.md               ← Documentación completa
├── 📋 API.md                  ← Guía de API para desarrolladores
├── 🎨 CUSTOMIZATION.js        ← Ejemplos de personalización
│
└── 🧪 test.html               ← Panel de pruebas (opcional)
```

## Flujo de Ejecución

```
┌─────────────────────────────────────────────────────┐
│ Usuario abre index.html en navegador                │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│ Se cargan archivos en este orden:                   │
│ 1. HTML (estructura)                                │
│ 2. CSS (estilos)                                    │
│ 3. config.js (configuración)                        │
│ 4. game.js (lógica)                                 │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│ DocumentGame se inicializa                          │
│ - Carga datos guardados                             │
│ - Crea UI de mejoras                                │
│ - Inicia game loop                                  │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│ JUEGO EN EJECUCIÓN                                  │
│ ├─ Spawn de documentos cada 2s                      │
│ ├─ Actualización de UI cada 100ms                   │
│ ├─ Trabajo del asistente cada 2s                    │
│ ├─ Ingresos pasivos cada 1s                         │
│ └─ Eventos de usuario (clicks)                      │
└─────────────────────────────────────────────────────┘
```

## Estructura de Clases y Objetos

```
DocumentGame
│
├─ PROPIEDADES DE ESTADO
│  ├─ money: número
│  ├─ totalClicks: número
│  ├─ documentsRemoved: número
│  ├─ gameSpeed: número
│  └─ incomePerSecond: número
│
├─ COLECCIONES
│  ├─ documents: Array<Document>
│  │  └─ {id, type, value, element, spawnTime, lifetime}
│  ├─ upgrades: Object<Upgrade>
│  │  ├─ clips
│  │  ├─ coffee
│  │  ├─ assistant
│  │  └─ printer
│  ├─ activePowerups: Object<Powerup>
│  │  ├─ shredder
│  │  ├─ productivity
│  │  └─ paperStorm
│  └─ timers: Object
│
├─ CONFIGURACIÓN
│  └─ config: Object
│     ├─ docSpawnInterval
│     ├─ docBaseValue
│     ├─ assistantTickRate
│     └─ powerupChance
│
├─ ELEMENTOS DOM
│  └─ elements: Object
│     ├─ money
│     ├─ documentsCount
│     ├─ upgradesList
│     └─ ... (más elementos)
│
└─ MÉTODOS
   ├─ DOCUMENTOS
   │  ├─ spawnDocument()
   │  ├─ createDocumentElement()
   │  ├─ removeDocument()
   │  ├─ calculateDocumentValue()
   │  └─ calculateFinalValue()
   │
   ├─ MEJORAS
   │  ├─ createUpgradesUI()
   │  ├─ getUpgradeCost()
   │  └─ buyUpgrade()
   │
   ├─ POWER-UPS
   │  ├─ activatePowerup()
   │  ├─ activateRandomPowerup()
   │  ├─ triggerShredder()
   │  ├─ triggerPaperStorm()
   │  └─ updatePowerupUI()
   │
   ├─ AUTOMÁTICO
   │  ├─ assistantWork()
   │  ├─ passiveIncome()
   │  └─ startGameLoop()
   │
   ├─ INTERFAZ
   │  ├─ updateUI()
   │  ├─ updateStressIndicator()
   │  ├─ showNotification()
   │  └─ formatNumber()
   │
   └─ PERSISTENCIA
      ├─ saveGame()
      ├─ loadGame()
      └─ resetGame()
```

## Sistema de Componentes

### 1. COMPONENTE: Documentos
```
Spawn → Visual → Interactivo → Eliminación
   ↓       ↓         ↓            ↓
spawnDoc createEle  click      removeDoc
   ↓       ↓         ↓            ↓
   └────────────────────────────────┘
           Actualiza dinero
```

### 2. COMPONENTE: Mejoras
```
UI de Mejora → Click → Validación → Compra → Efecto → Actualiza UI
    ↓          ↓         ↓           ↓       ↓        ↓
 render    detectClick restaDinero  +nivel efectoEsp updateUI
```

### 3. COMPONENTE: Power-ups
```
Probabilidad → Selecciona → Activa → Efecto → Timer → Expira
    ↓            ↓          ↓        ↓        ↓        ↓
random type   getRandom active doEffect  count(1s) remove
```

## Flujo de Datos

```
                    ENTRADA DEL USUARIO
                           │
                    ┌──────▼──────┐
                    │  Click      │
                    │  Buttons    │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
   removeDoc          buyUpgrade        activatePowerup
        │                  │                  │
        ▼                  ▼                  ▼
   +money            -money +level      +effect +timer
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                    ┌──────▼──────┐
                    │ STATE GAME  │
                    │   (dinero,  │
                    │   docs,     │
                    │  upgrades)  │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
    updateUI          saveGame            showEffects
        │                  │                  │
        ▼                  ▼                  ▼
   DOM UPDATE      LOCALSTORAGE        ANIMACIONES
```

## Ciclo de Vida de un Documento

```
1. SPAWN
   └─ spawnDocument() crea objeto
      └─ createDocumentElement() crea visual
         └─ Aparece en pantalla con animación

2. ACTIVO
   ├─ Esperando click
   └─ O tiempo agotándose (30s)

3. CLICK O TIMEOUT
   ├─ Si click: removeDocument()
   │  └─ Suma dinero
   │     └─ Animación de eliminación
   │        └─ Remove del DOM
   │
   └─ Si timeout: passiveIncome()
      └─ Remove automático
         └─ Remove del DOM

4. FIN
   └─ Objeto eliminado de game.documents
```

## Ciclo de Mejoras

```
1. INIT
   └─ createUpgradesUI()
      └─ Crea cards para cada mejora

2. MOSTRAR
   ├─ Nombre y nivel
   ├─ Costo actual
   ├─ Barra de progreso
   └─ Habilitado/deshabilitado según dinero

3. CLICK EN MEJORA
   └─ buyUpgrade(key)
      ├─ Validar dinero
      ├─ -money
      ├─ +level
      ├─ Aplicar efecto especial
      ├─ updateUI()
      └─ Mostrar notificación

4. ACTUALIZACIÓN
   └─ calculateCost() = baseCost * (1.15 ^ level)
      └─ Costo aumenta exponencialmente
```

## Integración de Archivos

```
index.html (estructura)
    ├─ Imports config.js
    ├─ Imports game.js
    │
    └─ Carga styles.css (en head)
         └─ Define variables CSS globales
            └─ Usadas por game.js indirectamente
```

## Puntos de Extensión

```
┌─────────────────────────────────────────┐
│         game.js (CORE)                  │
│  - DocumentGame class                   │
│  - Lógica fundamental                   │
│  - No modificar directamente             │
└──────────────────▲──────────────────────┘
                   │
        ┌──────────┼──────────┐
        │          │          │
        ▼          ▼          ▼
    config.js  styles.css  test.html
    (valores)  (visuals)   (debugging)
        │          │          │
        └──────────┼──────────┘
                   │
              EXTENSIONES
        ┌──────────┴──────────┐
        │                     │
    Nuevas Mejoras      Nuevos Power-ups
    Nuevos Temas        Nuevas Mecánicas
    Nuevos Estilos      Logros/Eventos
```

## Archivos de Documentación

| Archivo | Propósito | Para quién |
|---------|-----------|-----------|
| START_HERE.md | Inicio rápido | Nuevos usuarios |
| README.md | Documentación completa | Usuarios y devs |
| API.md | Referencia técnica | Desarrolladores |
| CUSTOMIZATION.js | Ejemplos de extensión | Desarrolladores avanzados |
| config.js | Configuración del juego | Usuarios y devs |

## Cómo Extender

```
Para agregar una NUEVA MEJORA:
1. Edita game.js → this.upgrades
2. Edita game.js → buyUpgrade() switch
3. Opcionalmente: config.js para ajustes

Para agregar un NUEVO POWER-UP:
1. Edita game.js → this.powerupTypes
2. Crea método triggerXXX() en game.js
3. Opcionalmente: Agregar UI en HTML

Para cambiar VISUALES:
1. Edita styles.css variables :root
2. O usa config.js → applyTheme()

Para agregar MECÁNICAS:
1. Crea métodos en DocumentGame
2. Llama desde game loop o event handlers
3. Actualiza UI según sea necesario
```

---

**Proyecto modular, extensible y listo para producción** ✨
