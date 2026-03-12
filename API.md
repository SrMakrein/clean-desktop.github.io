// ===== API DEL JUEGO PARA DESARROLLADORES =====
// Guía completa para integrar y extender el juego

/**
 * ACCESO AL JUEGO
 * El objeto del juego se expone globalmente como window.game
 */

// Ejemplo: Acceder al juego
const game = window.game;

// ===== PROPIEDADES PRINCIPALES =====

// Estado actual
game.money                // Dinero actual (número)
game.totalClicks         // Total de clics realizados (número)
game.documentsRemoved    // Documentos eliminados (número)
game.documentsOnDesk     // Documentos actualmente en la mesa (número)
game.gameSpeed           // Multiplicador de velocidad (número)
game.incomePerSecond     // Dinero por segundo (número)

// Documentos activos
game.documents           // Array de documentos [{id, type, value, element, ...}]
game.nextDocId           // ID siguiente para documentos (número)

// Mejoras
game.upgrades            // Objeto con todas las mejoras
game.upgrades.clips.level
game.upgrades.coffee.level
game.upgrades.assistant.level
game.upgrades.printer.level

// Power-ups activos
game.activePowerups      // Objeto con power-ups activos {shredder, productivity, etc}

// Configuración
game.config              // Objeto con configuración del juego

// ===== MÉTODOS PRINCIPALES =====

// --- DOCUMENTOS ---

// Spawnear un nuevo documento
game.spawnDocument()
// Retorna: nada (modifica game.documents)

// Remover un documento específico
game.removeDocument(docId, event)
// Parámetros:
//   - docId: ID del documento a remover
//   - event: Evento del mouse (para posición del efecto)

// Calcular valor de documento
const value = game.calculateDocumentValue()
// Retorna: número - valor del documento considerando mejoras

// Calcular valor final con bonificadores
const finalValue = game.calculateFinalValue(baseValue)
// Parámetros: baseValue - valor base del documento
// Retorna: número - valor final con todos los bonificadores

// --- MEJORAS ---

// Comprar una mejora
game.buyUpgrade('clips')
// Parámetros: 'clips' | 'coffee' | 'assistant' | 'printer'
// Efecto: Reduce dinero, aumenta nivel, aplica efectos

// Obtener costo de una mejora
const cost = game.getUpgradeCost('coffee')
// Parámetros: Nombre de la mejora
// Retorna: número - costo para el próximo nivel

// Crear UI de mejoras
game.createUpgradesUI()
// Efecto: Regenera la lista de mejoras en el panel lateral

// --- POWER-UPS ---

// Activar un power-up específico
game.activatePowerup('shredder')
// Parámetros: 'shredder' | 'productivity' | 'paperStorm'
// Efecto: Activa el power-up y su timer

// Activar power-up aleatorio
game.activateRandomPowerup()
// Efecto: Elige aleatoriamente y activa un power-up

// Trituradora (destruye documentos)
game.triggerShredder()
// Efecto: Destruye hasta 3 documentos aleatoriamente

// Tormenta de papeles (genera muchos documentos)
game.triggerPaperStorm()
// Efecto: Genera 5 documentos rápidamente

// Actualizar UI de power-ups
game.updatePowerupUI()
// Efecto: Redibuja los badges de power-ups activos

// --- ASISTENTE AUTOMÁTICO ---

// Trabajo del asistente (generalmente se llama automáticamente)
game.assistantWork()
// Efecto: El asistente elimina documentos según su nivel

// Ingresos pasivos (generalmente se llama automáticamente)
game.passiveIncome()
// Efecto: Suma ingresos por segundo y limpia documentos viejos

// --- INTERFAZ ---

// Actualizar toda la UI
game.updateUI()
// Efecto: Refresca dinero, documentos, velocidad, etc.

// Actualizar indicador de estrés
game.updateStressIndicator()
// Efecto: Cambia color según cantidad de documentos

// Mostrar notificación
game.showNotification('Mensaje', 'success')
// Parámetros:
//   - message: string - el mensaje a mostrar
//   - type: 'info' | 'success' | 'warning' | 'error'

// Formatear números
const formatted = game.formatNumber(1234567)
// Parámetros: number - número a formatear
// Retorna: string - '1.23M' o '1.23K' o '1234567'

// Crear efecto visual de click
game.createClickEffect(x, y, value)
// Parámetros:
//   - x, y: coordenadas del click
//   - value: valor a mostrar

// --- PERSISTENCIA ---

// Guardar juego
game.saveGame()
// Efecto: Guarda el estado en localStorage

// Cargar juego
game.loadGame()
// Efecto: Carga el estado desde localStorage (se llama al init)

// Reiniciar juego
game.resetGame()
// Efecto: Reinicia todo (pide confirmación)

// --- LOOPS DEL JUEGO ---

// Iniciar game loop
game.startGameLoop()
// Efecto: Inicia timers de spawn, asistente, etc.

// Detener game loop
game.stopGameLoop()
// Efecto: Pausa todos los timers

// ===== EJEMPLOS DE USO =====

/*
// Ejemplo 1: Agregar dinero y mostrar notificación
game.money += 1000;
game.showNotification('¡Bonificación de 1000 monedas!', 'success');
game.updateUI();

// Ejemplo 2: Completar una mejora automáticamente
while (game.money >= game.getUpgradeCost('assistant')) {
    game.buyUpgrade('assistant');
}

// Ejemplo 3: Activar todos los power-ups
Object.keys(game.powerupTypes).forEach(type => {
    game.activatePowerup(type);
});

// Ejemplo 4: Generar 100 documentos
for (let i = 0; i < 100; i++) {
    game.spawnDocument();
}

// Ejemplo 5: Eliminar todos los documentos
game.documents.forEach(doc => {
    game.removeDocument(doc.id, {pageX: 0, pageY: 0});
});

// Ejemplo 6: Obtener estadísticas
const stats = {
    money: game.money,
    clicks: game.totalClicks,
    removed: game.documentsRemoved,
    improvements: Object.entries(game.upgrades)
        .map(([key, u]) => ({name: u.name, level: u.level}))
};
console.table(stats);

// Ejemplo 7: Resetear a una mejora específica
game.resetGame();
game.money = 1000000;
for (let i = 0; i < 10; i++) {
    game.buyUpgrade('assistant');
}
game.updateUI();
*/

// ===== EVENTOS PERSONALIZADOS =====

/*
Puedes crear tus propios eventos:

// Disparat evento cuando se compra una mejora
document.addEventListener('upgradeAdded', (e) => {
    console.log('Mejora comprada:', e.detail.upgradeName);
});

// Disparar evento cuando se elimina un documento
document.addEventListener('documentRemoved', (e) => {
    console.log('Dinero ganado:', e.detail.value);
});

// Implementación en game.js:
this.dispatchEvent = (eventName, detail) => {
    const event = new CustomEvent(eventName, { detail });
    document.dispatchEvent(event);
};
*/

// ===== EXTENSIONES COMUNES =====

/*
// EXTENSIÓN 1: Multiplicador temporal de dinero
game.addMoneyMultiplier = function(multiplier, duration) {
    const originalMoney = this.money;
    const tempMultiplier = multiplier;
    
    // Multiplicar ganancias futuras...
    // setTimeout(() => { /* restaurar */ }, duration * 1000);
}

// EXTENSIÓN 2: Sistema de combos
game.comboSystem = {
    combo: 0,
    maxCombo: 0,
    
    addCombo: function() {
        this.combo++;
        this.maxCombo = Math.max(this.maxCombo, this.combo);
        if (this.combo % 10 === 0) {
            game.showNotification(`¡Combo x${this.combo}!`, 'success');
        }
    },
    
    resetCombo: function() {
        this.combo = 0;
    }
}

// EXTENSIÓN 3: Sistema de misiones
game.missions = [
    { id: 1, name: 'Primer Clic', description: 'Haz tu primer clic', condition: () => game.totalClicks >= 1 },
    { id: 2, name: 'Millonario', description: 'Consigue 1 millón', condition: () => game.money >= 1000000 },
    { id: 3, name: 'Experto', description: 'Nivel 10 en todas las mejoras', condition: () => Object.values(game.upgrades).every(u => u.level >= 10) }
]

game.checkMissions = function() {
    this.missions.forEach(mission => {
        if (mission.condition() && !mission.completed) {
            mission.completed = true;
            this.showNotification(`Misión completada: ${mission.name}`, 'success');
        }
    });
}
*/

// ===== INTEGRACIÓN CON ELEMENTOS HTML =====

/*
// Crear botón personalizado
const customBtn = document.createElement('button');
customBtn.textContent = 'Mega Boost';
customBtn.className = 'btn btn-save';
customBtn.onclick = () => {
    game.money += game.money * 0.5;  // Suma el 50%
    game.updateUI();
};
document.querySelector('.control-panel').appendChild(customBtn);

// Escuchar cambios en dinero
setInterval(() => {
    if (game.money > 100000) {
        console.log('¡Has alcanzado 100K!');
    }
}, 1000);
*/

// ===== DEBUGGING =====

/*
En la consola del navegador (F12):

// Ver todo el estado del juego
console.log(window.game);

// Ver dinero actual
console.log(game.money);

// Ver todos los documentos
console.log(game.documents);

// Ver mejoras
console.log(game.upgrades);

// Probar sonidos
game.showNotification('Test', 'success');

// Hacer clic automático
game.money += 100;
game.updateUI();

// Acelerar tiempo
setInterval(() => {
    game.passiveIncome();
    game.passiveIncome();
    game.passiveIncome();
}, 100);
*/

console.log('📚 API del Juego cargado. Usa "game" para acceder al juego.');
console.log('Ejemplos: game.money, game.buyUpgrade("clips"), game.activatePowerup("shredder")');
