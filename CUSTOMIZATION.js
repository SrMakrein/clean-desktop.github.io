// GUÍA DE PERSONALIZACIÓN Y EXTENSIÓN DEL JUEGO
// Este archivo contiene ejemplos para ampliar y personalizar el juego

// ===== AGREGAR NUEVAS MEJORAS =====
/*
Para agregar una nueva mejora, modifica la sección de upgrades en DocumentGame:

this.upgrades = {
    clips: { ... },
    coffee: { ... },
    assistant: { ... },
    printer: { ... },
    
    // NUEVA MEJORA
    scanner: { 
        level: 0, 
        baseCost: 75, 
        baseEffect: 1.5, 
        name: '🖥️ Escáner OCR', 
        icon: '🖥️' 
    }
};

Luego agrega el efecto en la función buyUpgrade():

case 'scanner':
    this.config.docBaseValue += 0.5;
    this.showNotification('Valor de documentos aumentado!', 'success');
    break;
*/

// ===== AGREGAR NUEVOS POWER-UPS =====
/*
Modifica la sección powerupTypes en DocumentGame:

this.powerupTypes = {
    shredder: { ... },
    productivity: { ... },
    paperStorm: { ... },
    
    // NUEVO POWER-UP
    timeWarp: { 
        name: 'Distorsión Temporal', 
        icon: '⏰', 
        duration: 10, 
        effect: () => this.triggerTimeWarp() 
    }
};

Agrega el método efecto:

triggerTimeWarp() {
    // Duplica temporalmente la velocidad de spawn
    const originalInterval = this.config.docSpawnInterval;
    this.config.docSpawnInterval = originalInterval / 2;
    
    setTimeout(() => {
        this.config.docSpawnInterval = originalInterval;
    }, this.powerupTypes.timeWarp.duration * 1000);
}
*/

// ===== CAMBIAR COLORES Y TEMAS =====
/*
Modifica las variables CSS en styles.css:

:root {
    --primary-color: #2c3e50;      // Color primario oscuro
    --secondary-color: #3498db;    // Azul secundario
    --accent-color: #e74c3c;       // Rojo acento
    --success-color: #27ae60;      // Verde éxito
    --warning-color: #f39c12;      // Naranja advertencia
    --desk-color: #8b6f47;         // Color del escritorio
    --paper-color: #f5f3f0;        // Color del papel
}

Ejemplo de tema oscuro:
--primary-color: #1a1a1a;
--desk-color: #2d2d2d;
--paper-color: #3a3a3a;
*/

// ===== AGREGAR TIPOS DE DOCUMENTOS =====
/*
Modifica createDocumentElement() para crear documentos especiales:

// Documento especial raro
if (Math.random() > 0.98) {
    docElement.classList.add('rare-document');
    const rarityBonus = 5;
    doc.value *= rarityBonus;
    
    const rare = document.createElement('div');
    rare.textContent = '⭐ RARO';
    rare.style.cssText = `
        position: absolute;
        color: gold;
        font-weight: bold;
        top: 5px;
        left: 8px;
    `;
    docElement.querySelector('.document-inner').appendChild(rare);
}
*/

// ===== AGREGAR SONIDOS =====
/*
Crea un sistema de audio simple:

class GameAudio {
    constructor() {
        this.sounds = {
            click: this.createSound('data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA=='),
            success: this.createSound('...base64...'),
            powerup: this.createSound('...base64...')
        };
    }
    
    createSound(base64) {
        const audio = new Audio();
        audio.src = base64;
        return audio;
    }
    
    play(name) {
        if (this.sounds[name]) {
            this.sounds[name].play().catch(() => {});
        }
    }
}

Usar en DocumentGame:
this.audio = new GameAudio();
this.audio.play('click');
*/

// ===== AGREGAR ANIMACIONES KEYFRAMES =====
/*
Agrega nuevas animaciones en CSS:

@keyframes moneyFloat {
    0% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
    100% {
        opacity: 0;
        transform: translateY(-100px) scale(2);
    }
}

Úsala en JavaScript:
const money = document.createElement('div');
money.className = 'money-float';
money.textContent = `+${value}`;
money.style.animation = 'moneyFloat 1s ease-out';
*/

// ===== AGREGAR LOGROS =====
/*
Crea un sistema de logros:

class Achievement {
    constructor() {
        this.achievements = {
            firstClick: { name: 'Primer Clic', icon: '✋', completed: false },
            millionaire: { name: 'Millonario', icon: '💰', completed: false, target: 1000000 },
            speedDemon: { name: 'Demonio de Velocidad', icon: '⚡', completed: false, target: 3.0 }
        };
    }
    
    check(game) {
        if (game.totalClicks > 0 && !this.achievements.firstClick.completed) {
            this.unlock('firstClick');
        }
        
        if (game.money >= 1000000 && !this.achievements.millionaire.completed) {
            this.unlock('millionaire');
        }
        
        if (game.gameSpeed >= 3.0 && !this.achievements.speedDemon.completed) {
            this.unlock('speedDemon');
        }
    }
    
    unlock(achievementKey) {
        this.achievements[achievementKey].completed = true;
        // Mostrar notificación
    }
}
*/

// ===== AGREGAR ESTADÍSTICAS DETALLADAS =====
/*
Expande el sistema de stats:

class GameStats {
    constructor() {
        this.stats = {
            totalMoneyEarned: 0,
            documentsClicked: 0,
            documentsAutoClicked: 0,
            powerupsActivated: 0,
            upgradesPurchased: 0,
            playtime: 0,
            bestMultiplier: 1
        };
    }
    
    update(game) {
        this.stats.totalMoneyEarned = game.money;
        this.stats.documentsClicked = game.totalClicks;
        this.stats.upgradesPurchased = Object.values(game.upgrades)
            .reduce((sum, u) => sum + u.level, 0);
    }
    
    export() {
        return JSON.stringify(this.stats, null, 2);
    }
}
*/

// ===== AGREGAR MINI-JUEGOS =====
/*
Crea un mini-juego durante los power-ups:

class MiniGame {
    static shredderMinigame(count) {
        // Muestra un popup donde haces clic en documentos que desaparecen
        // Mayor velocidad = más documentos destruidos
        return new Promise(resolve => {
            let destroyed = 0;
            // Implementar lógica...
            resolve(destroyed);
        });
    }
}
*/

// ===== AGREGAR MODO PRESUPUESTO =====
/*
Sistema de presupuesto para hacer el juego más estratégico:

this.budget = {
    total: 1000,
    spent: 0,
    remaining() { return this.total - this.spent; }
};

// Modificar buyUpgrade para usar presupuesto:
if (this.budget.remaining() < cost) {
    this.showNotification('Presupuesto insuficiente', 'warning');
    return;
}
*/

// ===== AGREGAR SISTEMA DE RONDAS =====
/*
Implementa rondas con objetivos:

class GameRound {
    constructor(number) {
        this.number = number;
        this.target = 1000 * Math.pow(2, number);
        this.timeLimit = 120; // segundos
        this.completed = false;
    }
    
    check(money) {
        return money >= this.target;
    }
}
*/

// ===== GUARDAR CONFIGURACIÓN VISUAL =====
/*
Permite al usuario cambiar temas:

class ThemeManager {
    constructor() {
        this.themes = {
            dark: { primary: '#1a1a1a', ... },
            light: { primary: '#ffffff', ... },
            neon: { primary: '#00ff00', ... }
        };
    }
    
    applyTheme(themeName) {
        const theme = this.themes[themeName];
        for (const [key, value] of Object.entries(theme)) {
            document.documentElement.style.setProperty(`--${key}`, value);
        }
        localStorage.setItem('preferredTheme', themeName);
    }
}
*/

export const CUSTOMIZATION_EXAMPLES = {
    newUpgrade: 'Ver agregar nuevas mejoras',
    newPowerup: 'Ver agregar nuevos power-ups',
    themes: 'Ver cambiar colores y temas',
    sounds: 'Ver agregar sonidos',
    achievements: 'Ver agregar logros',
    stats: 'Ver agregar estadísticas detalladas',
    miniGames: 'Ver agregar mini-juegos',
    budget: 'Ver agregar sistema de presupuesto',
    rounds: 'Ver agregar sistema de rondas',
    themeManager: 'Ver guardar configuración visual'
};
