// ===== CONFIGURACIÓN AVANZADA DEL JUEGO =====
// Modifica este archivo para ajustar el comportamiento del juego sin editar game.js

const GAME_CONFIG = {
    // ===== DOCUMENTOS =====
    documents: {
        spawnInterval: 2000,           // Tiempo entre spawns (ms) - Reduce para más documentos
        baseValue: 1,                  // Valor base de cada documento
        lifetime: 30000,               // Cuánto tiempo permanece un documento (ms)
        maxOnDesk: 20,                 // Máximo de documentos simultáneos (opcional)
        types: 3                       // Número de variantes visuales
    },

    // ===== MEJORAS Y COSTOS =====
    upgrades: {
        clips: {
            baseCost: 10,
            costMultiplier: 1.15,      // Multiplicador de costo por nivel
            maxLevel: 100,             // Nivel máximo alcanzable
            effect: 'Aumenta valor de documentos en 10% por nivel'
        },
        coffee: {
            baseCost: 25,
            costMultiplier: 1.15,
            maxLevel: 50,
            effect: 'Aumenta velocidad de juego en 10% por nivel'
        },
        assistant: {
            baseCost: 100,
            costMultiplier: 1.15,
            maxLevel: 30,
            effect: 'Genera 2 monedas por segundo * nivel'
        },
        printer: {
            baseCost: 50,
            costMultiplier: 1.15,
            maxLevel: 40,
            effect: 'Aumenta spawn rate y probabilidad de power-ups'
        }
    },

    // ===== POWER-UPS =====
    powerups: {
        spawnChance: 0.02,             // Probabilidad de spawn (0.02 = 2%)
        shredder: {
            duration: 10,              // Duración en segundos
            documentsDestroyed: 3,     // Cuántos documentos destruye
            valueMultiplier: 1.5       // Multiplicador de valor al destruir
        },
        productivity: {
            duration: 15,
            multiplier: 2              // Multiplicador de ganancias
        },
        paperStorm: {
            duration: 8,
            documentsSpawned: 5,       // Documentos que genera
            spawnDelay: 200            // Delay entre spawns (ms)
        }
    },

    // ===== INTERFAZ =====
    ui: {
        updateInterval: 100,           // Frecuencia de actualización de UI (ms)
        numberFormat: 'compact',       // 'compact' (1K) o 'full' (1000)
        animationDuration: 400,        // Duración de animaciones (ms)
        notificationDuration: 3000     // Cuánto tiempo muestran notificaciones (ms)
    },

    // ===== VISUAL =====
    visual: {
        documentWidth: 100,            // Ancho de documentos (px)
        documentHeight: 140,           // Alto de documentos (px)
        deskColor: '#8b6f47',          // Color principal del escritorio
        stressIndicatorThreshold: 15,  // Número de docs para cambiar estrés
        showAnimations: true,          // Mostrar animaciones
        particleEffects: true          // Mostrar efectos de partículas
    },

    // ===== PERSISTENCIA =====
    persistence: {
        autoSave: true,                // Guardar automáticamente
        autoSaveInterval: 30000,       // Intervalo auto-guardado (ms)
        storageKey: 'documentGameSave' // Clave del localStorage
    },

    // ===== BALANCE Y DIFICULTAD =====
    balance: {
        initialMoney: 0,               // Dinero inicial
        moneyPerClick: 1,              // Base de dinero por clic
        autoClickerTickRate: 2000,     // Intervalo del asistente (ms)
        stressDecayRate: 0.5,          // Cuán rápido baja el estrés
        difficultyScaling: 1.0         // Multiplicador de dificultad (1.0 = normal)
    }
};

// ===== PRESETS DE DIFICULTAD =====
const DIFFICULTY_PRESETS = {
    peaceful: {
        documents: { spawnInterval: 3000, baseValue: 2 },
        powerups: { spawnChance: 0.05 },
        balance: { initialMoney: 100, difficultyScaling: 0.5 }
    },
    normal: {
        documents: { spawnInterval: 2000, baseValue: 1 },
        powerups: { spawnChance: 0.02 },
        balance: { initialMoney: 0, difficultyScaling: 1.0 }
    },
    hard: {
        documents: { spawnInterval: 1000, baseValue: 0.5 },
        powerups: { spawnChance: 0.01 },
        balance: { initialMoney: 0, difficultyScaling: 1.5 }
    },
    insane: {
        documents: { spawnInterval: 500, baseValue: 0.25 },
        powerups: { spawnChance: 0.005 },
        balance: { initialMoney: 0, difficultyScaling: 2.0 }
    }
};

// ===== TEMAS VISUALES =====
const THEMES = {
    default: {
        '--primary-color': '#2c3e50',
        '--secondary-color': '#3498db',
        '--accent-color': '#e74c3c',
        '--success-color': '#27ae60',
        '--warning-color': '#f39c12',
        '--desk-color': '#8b6f47',
        '--paper-color': '#f5f3f0'
    },
    dark: {
        '--primary-color': '#1a1a1a',
        '--secondary-color': '#2196F3',
        '--accent-color': '#FF5252',
        '--success-color': '#4CAF50',
        '--warning-color': '#FFC107',
        '--desk-color': '#2d2d2d',
        '--paper-color': '#3a3a3a'
    },
    neon: {
        '--primary-color': '#0a0e27',
        '--secondary-color': '#00ff00',
        '--accent-color': '#ff00ff',
        '--success-color': '#00ffff',
        '--warning-color': '#ffff00',
        '--desk-color': '#1a1a3e',
        '--paper-color': '#0f0f1e'
    },
    cozy: {
        '--primary-color': '#6D4C41',
        '--secondary-color': '#A1887F',
        '--accent-color': '#D7CCC8',
        '--success-color': '#8D6E63',
        '--warning-color': '#BCAAA4',
        '--desk-color': '#8D6E63',
        '--paper-color': '#EFEBE9'
    },
    corporate: {
        '--primary-color': '#1F4788',
        '--secondary-color': '#2E5F9E',
        '--accent-color': '#C73E1D',
        '--success-color': '#2E7D32',
        '--warning-color': '#F57C00',
        '--desk-color': '#3E4A52',
        '--paper-color': '#F5F5F5'
    }
};

// ===== FUNCIÓN PARA APLICAR TEMA =====
function applyTheme(themeName) {
    const theme = THEMES[themeName];
    if (!theme) {
        console.error(`Tema no encontrado: ${themeName}`);
        return;
    }
    
    for (const [key, value] of Object.entries(theme)) {
        document.documentElement.style.setProperty(key, value);
    }
    localStorage.setItem('preferredTheme', themeName);
}

// ===== FUNCIÓN PARA APLICAR DIFICULTAD =====
function applyDifficulty(difficultyName) {
    const difficulty = DIFFICULTY_PRESETS[difficultyName];
    if (!difficulty) {
        console.error(`Dificultad no encontrada: ${difficultyName}`);
        return;
    }
    
    // Mergear con configuración base
    for (const [section, values] of Object.entries(difficulty)) {
        if (GAME_CONFIG[section]) {
            Object.assign(GAME_CONFIG[section], values);
        }
    }
    localStorage.setItem('gameDifficulty', difficultyName);
}

// ===== EJEMPLOS DE USO =====
/*
// En la consola del navegador, puedes hacer:

// Aplicar un tema
applyTheme('dark');
applyTheme('neon');
applyTheme('cozy');

// Cambiar dificultad
applyDifficulty('hard');
applyDifficulty('peaceful');

// Modificar configuración individual
GAME_CONFIG.documents.spawnInterval = 1000;
GAME_CONFIG.powerups.spawnChance = 0.05;
GAME_CONFIG.balance.initialMoney = 500;

// Acceder a valores
console.log(GAME_CONFIG.upgrades.clips.baseCost);  // 10
console.log(GAME_CONFIG.powerups.productivity.multiplier);  // 2
*/

// ===== CARGA DE TEMA GUARDADO AL INICIO =====
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('preferredTheme') || 'default';
    const savedDifficulty = localStorage.getItem('gameDifficulty') || 'normal';
    
    applyTheme(savedTheme);
    applyDifficulty(savedDifficulty);
});

// Exportar para uso en otros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GAME_CONFIG, DIFFICULTY_PRESETS, THEMES, applyTheme, applyDifficulty };
}
