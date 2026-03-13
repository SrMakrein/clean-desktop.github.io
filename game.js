// ===== JUEGO INCREMENTAL DE LIMPIEZA DE ESCRITORIO =====
// Sistema modular para un juego tipo auto-clicker

class DocumentGame {
    constructor() {
        // Estado del juego
        this.money = 0;
        this.totalClicks = 0;
        this.documentsRemoved = 0;
        this.documentsOnDesk = 0;
        this.gameSpeed = 1.0;
        this.incomePerSecond = 0;

        // Sistema de Score y Objetivos
        this.score = 0;
        this.scoreObjective = 100;
        this.scoreMultiplier = 1;
        this.highScore = 0;

        // Sistema de Audio
        this.audioEnabled = true;
        this.soundVolume = 0.3;
        this.audioContext = null;
        this.sounds = {};

        // Documentos activos
        this.documents = [];
        this.nextDocId = 0;

        // Sistema de mejoras
        this.upgrades = {
            clips: { 
                level: 0, 
                baseCost: 10, 
                baseEffect: 1.2, 
                name: '📎 Clips Organizadores', 
                icon: '📎',
                description: 'Aumenta el valor de cada documento\n+10% por nivel'
            },
            premium: { 
                level: 0, 
                baseCost: 25, 
                baseEffect: 0.2, 
                name: '💎 Documentos Premium', 
                icon: '💎',
                description: 'Genera documentos con más valor\n+20% por nivel'
            },
            assistant: { 
                level: 0, 
                baseCost: 100, 
                baseEffect: 1, 
                name: '🤖 Asistente Virtual', 
                icon: '🤖',
                description: 'Elimina documentos automáticamente\nCada nivel = 0.5 docs/2seg'
            },
            printer: { 
                level: 0, 
                baseCost: 50, 
                baseEffect: 1.3, 
                name: '🖨️ Impresora Automática', 
                icon: '🖨️',
                description: 'Más documentos frecuentes\n+3% valor, -100ms spawn'
            },
            clickMultiplier: { 
                level: 0, 
                baseCost: 150, 
                baseEffect: 1, 
                name: '⚡ Multiplicador de Clicks', 
                icon: '⚡',
                description: 'Cada click cuenta como múltiples\n+1 click/nivel (máx 100)',
                maxLevel: 100
            }
        };

        // Power-ups
        this.activePowerups = {};
        this.powerupTypes = {
            shredder: { name: 'Trituradora Instantánea', icon: '✂️', duration: 10, effect: () => this.triggerShredder() },
            productivity: { name: 'Modo Productividad', icon: '🚀', duration: 15, multiplier: 2 },
            paperStorm: { name: 'Tormenta de Papeles', icon: '🌪️', duration: 8, effect: () => this.triggerPaperStorm() }
        };

        // Configuración
        this.config = {
            docSpawnInterval: 2000,
            docBaseValue: 1,
            docBaseLifetime: 30000,
            assistantTickRate: 2000,
            powerupChance: 0.02
        };

        // Tipos de objetos de oficina
        this.officeItems = [
            { name: 'Documento', icon: '📄', emoji: '📄', value: 1 },
            { name: 'Carpeta', icon: '📁', emoji: '📁', value: 1.2 },
            { name: 'Bolígrafo', icon: '✏️', emoji: '✏️', value: 0.8 },
            { name: 'Nota Adhesiva', icon: '📝', emoji: '📝', value: 0.6 },
            { name: 'Clips', icon: '📎', emoji: '📎', value: 0.5 },
            { name: 'Tarea Urgente', icon: '⚠️', emoji: '⚠️', value: 1.5 },
            { name: 'Correo', icon: '✉️', emoji: '✉️', value: 1.1 },
            { name: 'Cuaderno', icon: '📓', emoji: '📓', value: 1.3 }
        ];

        // Elementos del DOM
        this.elements = {
            money: document.getElementById('money'),
            documentsCount: document.getElementById('documents-count'),
            speed: document.getElementById('speed'),
            score: document.getElementById('score'),
            scoreObjective: document.getElementById('score-objective'),
            documentsContainer: document.getElementById('documents-container'),
            upgradesList: document.getElementById('upgrades-list'),
            totalClicks: document.getElementById('total-clicks'),
            totalRemoved: document.getElementById('total-removed'),
            incomePerSecond: document.getElementById('income-per-second'),
            stressIndicator: document.getElementById('stress-indicator'),
            notifications: document.getElementById('notifications'),
            activePowerups: document.getElementById('active-powerups'),
            resetBtn: document.getElementById('reset-btn'),
            saveBtn: document.getElementById('save-btn'),
            muteBtn: document.getElementById('mute-btn'),
            clickMultiplier: document.getElementById('click-multiplier')
        };

        // Timers
        this.timers = {
            documentSpawn: null,
            assistantWork: null,
            incomeUpdate: null,
            animationFrame: null
        };

        this.init();
    }

    // ===== INICIALIZACIÓN =====
    init() {
        this.loadGame();
        this.initAudio();
        this.createUpgradesUI();
        this.attachEventListeners();
        this.startGameLoop();
        this.updateUI();
    }

    attachEventListeners() {
        this.elements.resetBtn.addEventListener('click', () => this.resetGame());
        this.elements.saveBtn.addEventListener('click', () => this.saveGame());
        if (this.elements.muteBtn) {
            this.elements.muteBtn.addEventListener('click', () => this.toggleAudio());
        }
    }

    // ===== LOOP PRINCIPAL =====
    startGameLoop() {
        // Spawning de documentos
        this.timers.documentSpawn = setInterval(() => this.spawnDocument(), this.config.docSpawnInterval);

        // Trabajo del asistente
        this.timers.assistantWork = setInterval(() => this.assistantWork(), this.config.assistantTickRate);

        // Actualización de ingresos pasivos
        this.timers.incomeUpdate = setInterval(() => this.passiveIncome(), 1000);

        // Update UI
        this.updateUIInterval = setInterval(() => this.updateUI(), 100);
    }

    stopGameLoop() {
        clearInterval(this.timers.documentSpawn);
        clearInterval(this.timers.assistantWork);
        clearInterval(this.timers.incomeUpdate);
        clearInterval(this.updateUIInterval);
    }

    // ===== DOCUMENTOS =====
    spawnDocument() {
        const docId = this.nextDocId++;
        // Seleccionar un objeto de oficina aleatorio
        const itemType = Math.floor(Math.random() * this.officeItems.length);
        const itemData = this.officeItems[itemType];
        const value = this.calculateDocumentValue(itemData.value);
        
        const doc = {
            id: docId,
            type: itemType,
            itemData: itemData,
            value: value,
            element: null,
            spawnTime: Date.now(),
            lifetime: this.config.docBaseLifetime
        };

        this.documents.push(doc);
        this.documentsOnDesk++;
        this.createDocumentElement(doc);
        
        // Chance de activar power-up al spawnear
        if (Math.random() < this.config.powerupChance) {
            this.activateRandomPowerup();
        }

        this.updateStressIndicator();
    }

    createDocumentElement(doc) {
        const container = this.elements.documentsContainer;
        const docElement = document.createElement('div');
        docElement.className = `document appear type-${doc.type}`;
        docElement.id = `doc-${doc.id}`;
        docElement.setAttribute('data-item', doc.itemData.name);

        // Posición aleatoria
        const maxX = container.offsetWidth - 120;
        const maxY = container.offsetHeight - 160;
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;

        docElement.style.left = x + 'px';
        docElement.style.top = y + 'px';
        docElement.style.width = '100px';
        docElement.style.height = '140px';

        // Contenido del documento - ahora con emoji del tipo de objeto
        let content = '<div class="document-inner">';
        
        // Emoji principal
        content += `<div class="document-emoji" style="font-size: 48px; text-align: center; margin: 10px 0;">${doc.itemData.emoji}</div>`;
        
        // Clip aleatorio
        if (Math.random() > 0.3) {
            content += '<div class="document-clip"></div>';
        }

        // Sello aleatorio
        if (Math.random() > 0.4) {
            const stamps = ['🔒', '✅', '⭐', '🔖'];
            content += `<div class="document-stamp">${stamps[Math.floor(Math.random() * stamps.length)]}</div>`;
        }

        // Post-it aleatorio
        if (Math.random() > 0.6) {
            content += '<div class="document-note"></div>';
        }

        // Valor
        content += `<div class="document-value">+${doc.value}</div>`;
        content += '</div>';

        docElement.innerHTML = content;

        // Event listener
        docElement.addEventListener('click', (e) => this.removeDocument(doc.id, e));

        container.appendChild(docElement);
        doc.element = docElement;
    }

    removeDocument(docId, event) {
        const docIndex = this.documents.findIndex(d => d.id === docId);
        if (docIndex === -1) return;

        const doc = this.documents[docIndex];
        
        // Verificar que el elemento aún existe en el DOM
        if (!doc.element || !doc.element.parentNode) {
            // Si el elemento no existe, solo remover del array
            this.documents.splice(docIndex, 1);
            this.documentsOnDesk = Math.max(0, this.documentsOnDesk - 1);
            return;
        }
        
        const value = this.calculateFinalValue(doc.value);

        // Aplicar multiplicador de power-up
        let finalValue = value;
        if (this.activePowerups.productivity) {
            finalValue = value * 2;
        }

        // Obtener el multiplicador de clicks
        const clickMultiplier = 1 + this.upgrades.clickMultiplier.level;

        this.money += finalValue;
        this.totalClicks += clickMultiplier;
        this.documentsRemoved++;
        this.score += Math.ceil(finalValue * this.scoreMultiplier);
        this.documentsOnDesk = Math.max(0, this.documentsOnDesk - 1);

        // Reproducir sonido de papel
        this.playSound('paperClick');

        // Animación de eliminación
        doc.element.classList.add('removing');

        // Efecto visual de valor flotante
        this.createClickEffect(event.pageX, event.pageY, finalValue);

        // Generar clicks adicionales automáticamente si el multiplicador es > 1
        if (clickMultiplier > 1) {
            for (let i = 1; i < clickMultiplier; i++) {
                setTimeout(() => {
                    // Crear efecto visual adicional
                    const offsetX = (Math.random() - 0.5) * 40;
                    const offsetY = (Math.random() - 0.5) * 40;
                    this.createClickEffect(event.pageX + offsetX, event.pageY + offsetY, finalValue, true);
                }, i * 50);
            }
        }

        // Notificación
        if (finalValue > value) {
            this.showNotification(`+${finalValue}💰 ¡Multiplicado!`, 'success');
        }

        // Remover documento - usar variables locales para evitar closure issues
        const docToRemove = doc;
        const docIdToRemove = docId;
        
        setTimeout(() => {
            if (docToRemove.element && docToRemove.element.parentNode) {
                docToRemove.element.remove();
            }
            // Remover usando el ID para evitar problemas
            const index = this.documents.findIndex(d => d.id === docIdToRemove);
            if (index !== -1) {
                this.documents.splice(index, 1);
            }
            this.updateStressIndicator();
        }, 400);
    }

    createClickEffect(x, y, value, isBonus = false) {
        const effect = document.createElement('div');
        effect.className = 'click-effect';
        effect.textContent = isBonus ? `+${value}⭐` : `+${value}`;
        effect.style.left = x + 'px';
        effect.style.top = y + 'px';
        
        if (isBonus) {
            effect.style.color = '#ffeb3b';
            effect.style.fontSize = '16px';
            effect.style.fontWeight = 'bold';
        } else if (this.activePowerups.productivity) {
            effect.style.color = '#ffd700';
        } else {
            effect.style.color = '#27ae60';
        }
        
        document.body.appendChild(effect);

        setTimeout(() => effect.remove(), 800);
    }

    calculateDocumentValue(itemValueMultiplier = 1) {
        const baseValue = this.config.docBaseValue * itemValueMultiplier;
        const clipsBonus = 1 + (this.upgrades.clips.level * 0.1);
        return Math.ceil(baseValue * clipsBonus);
    }

    calculateFinalValue(baseValue) {
        let value = baseValue;
        
        // Bonus por clips
        value *= (1 + this.upgrades.clips.level * 0.05);
        
        // Bonus por documentos premium
        value *= (1 + this.upgrades.premium.level * 0.2);
        
        // Bonus por impresora
        value *= (1 + this.upgrades.printer.level * 0.03);

        return Math.ceil(value);
    }

    // ===== ASISTENTE AUTOMÁTICO =====
    assistantWork() {
        if (this.upgrades.assistant.level === 0) return;

        const assistantCount = this.upgrades.assistant.level;
        const documentsPerTick = assistantCount * 0.5;

        if (this.documents.length > 0) {
            const toRemove = Math.min(Math.ceil(documentsPerTick), this.documents.length);
            
            for (let i = 0; i < toRemove; i++) {
                if (this.documents.length === 0) break;
                
                const randomIndex = Math.floor(Math.random() * this.documents.length);
                const doc = this.documents[randomIndex];
                const value = this.calculateFinalValue(doc.value);

                this.money += value;
                this.documentsRemoved++;
                this.score += Math.ceil(value * this.scoreMultiplier);
                this.documentsOnDesk = Math.max(0, this.documentsOnDesk - 1);

                // Reproducir sonido de papel
                this.playSound('paperClick');

                doc.element.classList.add('removing');
                
                // Usar variable local para evitar problemas de closure
                const docToRemove = doc;
                const docId = doc.id;
                
                setTimeout(() => {
                    if (docToRemove.element && docToRemove.element.parentNode) {
                        docToRemove.element.remove();
                    }
                    // Remover usando el ID para evitar inconsistencias
                    const index = this.documents.findIndex(d => d.id === docId);
                    if (index !== -1) {
                        this.documents.splice(index, 1);
                    }
                }, 400);
            }
        }
    }

    // ===== INGRESOS PASIVOS =====
    passiveIncome() {
        const incomePerSecond = (this.upgrades.assistant.level * 2) * this.gameSpeed;
        this.incomePerSecond = incomePerSecond;
        
        if (incomePerSecond > 0) {
            this.money += incomePerSecond;
        }

        // Remover documentos viejos
        const now = Date.now();
        const toRemove = [];

        // Recolectar documentos viejos por ID, no por índice
        for (let i = this.documents.length - 1; i >= 0; i--) {
            const doc = this.documents[i];
            if (now - doc.spawnTime > doc.lifetime) {
                toRemove.push(doc.id);
            }
        }

        // Remover documentos viejos
        toRemove.forEach(docId => {
            const index = this.documents.findIndex(d => d.id === docId);
            if (index !== -1) {
                const doc = this.documents[index];
                if (doc.element && doc.element.parentNode) {
                    doc.element.remove();
                }
                this.documents.splice(index, 1);
                this.documentsOnDesk = Math.max(0, this.documentsOnDesk - 1);
            }
        });

        if (toRemove.length > 0) {
            this.updateStressIndicator();
        }
    }

    // ===== MEJORAS =====
    createUpgradesUI() {
        const upgradesList = this.elements.upgradesList;
        upgradesList.innerHTML = '';

        // Ordenar upgrades por coste base
        const sortedUpgrades = Object.entries(this.upgrades).sort((a, b) => {
            return a[1].baseCost - b[1].baseCost;
        });

        for (const [key, upgrade] of sortedUpgrades) {
            const cost = this.getUpgradeCost(key);
            const card = document.createElement('div');
            card.className = 'upgrade-card';
            card.id = `upgrade-${key}`;

            const isAffordable = this.money >= cost;
            if (!isAffordable) {
                card.classList.add('disabled');
            }

            card.innerHTML = `
                <div class="upgrade-name">
                    <span>${upgrade.icon} ${upgrade.name}</span>
                    <span>Nivel ${upgrade.level}</span>
                </div>
                <div class="upgrade-level">
                    Costo: ${cost} 💰
                </div>
                <div class="upgrade-description">${upgrade.description}</div>
            `;

            card.addEventListener('click', () => this.buyUpgrade(key));
            upgradesList.appendChild(card);
        }
    }

    getUpgradeCost(upgradeKey) {
        const upgrade = this.upgrades[upgradeKey];
        return Math.ceil(upgrade.baseCost * Math.pow(1.15, upgrade.level));
    }

    buyUpgrade(upgradeKey) {
        const upgrade = this.upgrades[upgradeKey];
        
        // Verificar si ya está al máximo nivel
        if (upgrade.maxLevel && upgrade.level >= upgrade.maxLevel) {
            this.showNotification('¡Mejora al máximo!', 'warning');
            return;
        }
        
        const cost = this.getUpgradeCost(upgradeKey);
        
        if (this.money < cost) {
            this.showNotification('Dinero insuficiente', 'warning');
            return;
        }

        this.money -= cost;
        upgrade.level++;

        // Efectos especiales según mejora
        switch (upgradeKey) {
            case 'premium':
                this.showNotification('Documentos más valiosos!', 'success');
                break;
            case 'assistant':
                this.showNotification('Asistente mejorado!', 'success');
                break;
            case 'printer':
                this.config.docSpawnInterval = Math.max(1000, this.config.docSpawnInterval - 100);
                this.config.powerupChance += 0.01;
                this.showNotification('Documentos más frecuentes!', 'success');
                break;
            case 'clickMultiplier':
                this.showNotification(`⚡ Multiplicador ${upgrade.level}x activado!`, 'success');
                break;
        }

        // Actualizar el nivel en la UI
        const card = document.getElementById(`upgrade-${upgradeKey}`);
        if (card) {
            const levelElement = card.querySelector('.upgrade-name span:last-child');
            if (levelElement) {
                levelElement.textContent = `Nivel ${upgrade.level}`;
                
                // Si está al máximo, mostrar indicador
                if (upgrade.maxLevel && upgrade.level >= upgrade.maxLevel) {
                    levelElement.textContent += ' ⭐MAX⭐';
                    card.classList.add('maxed-out');
                }
            }
        }

        this.saveGame();
        this.updateUI();
    }

    // ===== POWER-UPS =====
    activateRandomPowerup() {
        const powerupKeys = Object.keys(this.powerupTypes);
        const randomKey = powerupKeys[Math.floor(Math.random() * powerupKeys.length)];
        this.activatePowerup(randomKey);
    }

    activatePowerup(powerupKey) {
        if (this.activePowerups[powerupKey]) return;

        const powerup = this.powerupTypes[powerupKey];
        const duration = powerup.duration;

        this.activePowerups[powerupKey] = {
            startTime: Date.now(),
            duration: duration,
            timeRemaining: duration
        };

        if (powerup.effect) {
            powerup.effect();
        }

        this.showNotification(`⚡ ${powerup.name} activado por ${duration}s`, 'success');
        this.updatePowerupUI();

        // Countdown del power-up
        const countdown = setInterval(() => {
            if (!this.activePowerups[powerupKey]) {
                clearInterval(countdown);
                return;
            }

            const elapsed = (Date.now() - this.activePowerups[powerupKey].startTime) / 1000;
            this.activePowerups[powerupKey].timeRemaining = Math.max(0, duration - elapsed);

            if (this.activePowerups[powerupKey].timeRemaining <= 0) {
                delete this.activePowerups[powerupKey];
                this.showNotification(`${powerup.name} finalizado`, 'warning');
                clearInterval(countdown);
            }

            this.updatePowerupUI();
        }, 100);
    }

    triggerShredder() {
        // Elimina algunos documentos aleatorios
        const toShred = Math.min(3, this.documents.length);
        for (let i = 0; i < toShred; i++) {
            if (this.documents.length === 0) break;
            const randomIndex = Math.floor(Math.random() * this.documents.length);
            const doc = this.documents[randomIndex];
            
            const value = this.calculateFinalValue(doc.value * 1.5);
            this.money += value;
            
            doc.element.classList.add('removing');
            setTimeout(() => {
                if (doc.element.parentNode) {
                    doc.element.remove();
                }
            }, 400);
            
            this.documents.splice(randomIndex, 1);
            this.documentsOnDesk--;
        }
    }

    triggerPaperStorm() {
        // Spawnea múltiples documentos con mayor valor
        for (let i = 0; i < 5; i++) {
            setTimeout(() => this.spawnDocument(), i * 200);
        }
    }

    updatePowerupUI() {
        const container = this.elements.activePowerups;
        container.innerHTML = '';

        for (const [key, power] of Object.entries(this.activePowerups)) {
            const powerup = this.powerupTypes[key];
            const badge = document.createElement('div');
            badge.className = 'powerup-badge';
            badge.innerHTML = `
                ${powerup.icon} ${powerup.name}
                <span class="powerup-timer">${Math.ceil(power.timeRemaining)}s</span>
            `;
            container.appendChild(badge);
        }
    }

    // ===== INTERFAZ =====
    updateUI() {
        this.elements.money.textContent = this.formatNumber(Math.floor(this.money));
        this.elements.documentsCount.textContent = this.documentsOnDesk;
        this.elements.speed.textContent = this.gameSpeed.toFixed(1) + 'x';
        this.elements.totalClicks.textContent = this.totalClicks;
        this.elements.totalRemoved.textContent = this.documentsRemoved;
        this.elements.incomePerSecond.textContent = this.formatNumber(Math.round(this.incomePerSecond * 100) / 100);
        
        // Actualizar multiplicador de clicks
        if (this.elements.clickMultiplier) {
            const multiplier = 1 + this.upgrades.clickMultiplier.level;
            this.elements.clickMultiplier.textContent = `${multiplier}x`;
        }
        
        // Actualizar Score
        if (this.elements.score) {
            this.elements.score.textContent = this.formatNumber(Math.floor(this.score));
        }
        if (this.elements.scoreObjective) {
            this.elements.scoreObjective.textContent = this.formatNumber(Math.floor(this.scoreObjective));
        }
        
        // Verificar si se alcanzó el objetivo
        this.updateScoreObjective();

        // Actualizar disponibilidad de mejoras
        for (const [key] of Object.entries(this.upgrades)) {
            const card = document.getElementById(`upgrade-${key}`);
            const cost = this.getUpgradeCost(key);
            const isAffordable = this.money >= cost;

            if (card) {
                if (isAffordable) {
                    card.classList.remove('disabled');
                } else {
                    card.classList.add('disabled');
                }

                // Actualizar costo en tiempo real
                const costElement = card.querySelector('.upgrade-level');
                if (costElement) {
                    costElement.textContent = `Costo: ${this.formatNumber(cost)} 💰`;
                }

                const progress = card.querySelector('.upgrade-progress-bar');
                if (!progress) {
                    const progressDiv = document.createElement('div');
                    progressDiv.className = 'upgrade-progress';
                    const bar = document.createElement('div');
                    bar.className = 'upgrade-progress-bar';
                    progressDiv.appendChild(bar);
                    card.appendChild(progressDiv);
                }

                const progressBar = card.querySelector('.upgrade-progress-bar');
                const percentage = (this.money / cost) * 100;
                progressBar.style.width = Math.min(percentage, 100) + '%';
            }
        }
    }

    updateStressIndicator() {
        const indicator = this.elements.stressIndicator;
        const percentage = (this.documentsOnDesk / 15) * 100;

        indicator.classList.remove('low', 'medium', 'high');

        if (percentage < 33) {
            indicator.classList.add('low');
        } else if (percentage < 66) {
            indicator.classList.add('medium');
        } else {
            indicator.classList.add('high');
        }
    }

    showNotification(message, type = 'info') {
        const container = this.elements.notifications;
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        container.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('remove');
            setTimeout(() => notification.remove(), 400);
        }, 3000);
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(2) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(2) + 'K';
        }
        return Math.floor(num).toString();
    }

    // ===== SISTEMA DE AUDIO =====
    initAudio() {
        // Se pueden agregar archivos de sonido después
        // Por ahora esta es la estructura base
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    playSound(soundName) {
        if (!this.audioEnabled || !this.audioContext) return;
        
        switch(soundName) {
            case 'paperClick':
                this.playPaperSound();
                break;
            case 'success':
                this.playSuccessSound();
                break;
            case 'powerup':
                this.playPowerupSound();
                break;
            case 'milestone':
                this.playMilestoneSound();
                break;
        }
    }

    playPaperSound() {
        // Sonido de mezclar papeles al hacer click
        try {
            const ctx = this.audioContext;
            const now = ctx.currentTime;
            
            // Crear un sonido simple de papel (ruido de frecuencia baja)
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            // Frecuencia variable para simular sonido de papel
            osc.frequency.setValueAtTime(150 + Math.random() * 100, now);
            osc.frequency.exponentialRampToValueAtTime(50, now + 0.15);
            
            gain.gain.setValueAtTime(0.1 * this.soundVolume, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            
            osc.start(now);
            osc.stop(now + 0.15);
        } catch (e) {
            // Si falla, simplemente continuar sin sonido
        }
    }

    playSuccessSound() {
        // Sonido de éxito
        try {
            const ctx = this.audioContext;
            const now = ctx.currentTime;
            
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.setValueAtTime(1000, now + 0.1);
            
            gain.gain.setValueAtTime(0.1 * this.soundVolume, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            
            osc.start(now);
            osc.stop(now + 0.2);
        } catch (e) {
            // Si falla, simplemente continuar sin sonido
        }
    }

    playPowerupSound() {
        // Sonido de power-up
        try {
            const ctx = this.audioContext;
            const now = ctx.currentTime;
            
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.setValueAtTime(1200, now + 0.1);
            
            gain.gain.setValueAtTime(0.15 * this.soundVolume, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            
            osc.start(now);
            osc.stop(now + 0.3);
        } catch (e) {
            // Si falla, simplemente continuar sin sonido
        }
    }

    playMilestoneSound() {
        // Sonido de celebración para hito alcanzado
        try {
            const ctx = this.audioContext;
            const now = ctx.currentTime;
            
            // Primera nota (Mi)
            const osc1 = ctx.createOscillator();
            const gain1 = ctx.createGain();
            osc1.connect(gain1);
            gain1.connect(ctx.destination);
            osc1.frequency.setValueAtTime(660, now);
            gain1.gain.setValueAtTime(0.15 * this.soundVolume, now);
            gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc1.start(now);
            osc1.stop(now + 0.3);
            
            // Segunda nota (Sol - más aguda)
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.connect(gain2);
            gain2.connect(ctx.destination);
            osc2.frequency.setValueAtTime(880, now + 0.15);
            gain2.gain.setValueAtTime(0, now + 0.15);
            gain2.gain.setValueAtTime(0.15 * this.soundVolume, now + 0.15);
            gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
            osc2.start(now + 0.15);
            osc2.stop(now + 0.45);
            
            // Tercera nota (Do - aún más aguda)
            const osc3 = ctx.createOscillator();
            const gain3 = ctx.createGain();
            osc3.connect(gain3);
            gain3.connect(ctx.destination);
            osc3.frequency.setValueAtTime(1047, now + 0.3);
            gain3.gain.setValueAtTime(0, now + 0.3);
            gain3.gain.setValueAtTime(0.15 * this.soundVolume, now + 0.3);
            gain3.gain.exponentialRampToValueAtTime(0.01, now + 0.65);
            osc3.start(now + 0.3);
            osc3.stop(now + 0.65);
        } catch (e) {
            // Si falla, simplemente continuar sin sonido
        }
    }

    toggleAudio() {
        this.audioEnabled = !this.audioEnabled;
        if (this.elements.muteBtn) {
            this.elements.muteBtn.textContent = this.audioEnabled ? '🔊 Sonido' : '🔇 Mute';
            this.elements.muteBtn.classList.toggle('muted', !this.audioEnabled);
        }
        
        if (this.audioEnabled) {
            this.showNotification('Sonido habilitado', 'success');
        } else {
            this.showNotification('Sonido deshabilitado', 'warning');
        }
        
        localStorage.setItem('audioEnabled', JSON.stringify(this.audioEnabled));
    }

    // ===== SISTEMA DE SCORE =====
    updateScoreObjective() {
        // Aumentar el objetivo cada vez que se alcanza
        if (this.score >= this.scoreObjective) {
            this.highScore = Math.max(this.highScore, this.score);
            this.scoreObjective = Math.ceil(this.scoreObjective * 1.5);
            this.scoreMultiplier = Math.min(2, this.scoreMultiplier + 0.1);
            
            // Reproducir sonido de celebración
            this.playSound('milestone');
            
            this.showNotification(`🎯 ¡Objetivo alcanzado! Nuevo objetivo: ${this.scoreObjective}`, 'success');
        }
    }

    // ===== PERSISTENCIA =====
    saveGame() {
        const gameState = {
            money: this.money,
            totalClicks: this.totalClicks,
            documentsRemoved: this.documentsRemoved,
            gameSpeed: this.gameSpeed,
            score: this.score,
            highScore: this.highScore,
            scoreObjective: this.scoreObjective,
            audioEnabled: this.audioEnabled,
            upgrades: JSON.parse(JSON.stringify(this.upgrades)),
            config: this.config,
            timestamp: Date.now()
        };

        localStorage.setItem('documentGameSave', JSON.stringify(gameState));
        this.showNotification('Juego guardado correctamente', 'success');
    }

    loadGame() {
        const saved = localStorage.getItem('documentGameSave');
        if (saved) {
            try {
                const gameState = JSON.parse(saved);
                this.money = gameState.money || 0;
                this.totalClicks = gameState.totalClicks || 0;
                this.documentsRemoved = gameState.documentsRemoved || 0;
                this.gameSpeed = gameState.gameSpeed || 1.0;
                this.score = gameState.score || 0;
                this.highScore = gameState.highScore || 0;
                this.scoreObjective = gameState.scoreObjective || 100;
                this.audioEnabled = gameState.audioEnabled !== false; // true por defecto
                
                // Cargar y fusionar mejoras - mantener la estructura original y actualizar niveles
                if (gameState.upgrades) {
                    for (const [key, savedUpgrade] of Object.entries(gameState.upgrades)) {
                        if (this.upgrades[key]) {
                            this.upgrades[key].level = savedUpgrade.level || 0;
                        }
                    }
                }
                
                this.config = { ...this.config, ...gameState.config };
            } catch (e) {
                console.error('Error al cargar el juego:', e);
            }
        }
        
        // Cargar configuración de audio
        const savedAudioEnabled = localStorage.getItem('audioEnabled');
        if (savedAudioEnabled !== null) {
            this.audioEnabled = JSON.parse(savedAudioEnabled);
        }
    }

    resetGame() {
        if (confirm('¿Estás seguro de que quieres reiniciar el juego? Se perderá todo el progreso.')) {
            this.stopGameLoop();
            
            // Guardar score actual si es mayor que el récord
            if (this.score > this.highScore) {
                this.highScore = this.score;
            }
            
            localStorage.removeItem('documentGameSave');
            
            // Limpiar documentos
            this.documents.forEach(doc => {
                if (doc.element) doc.element.remove();
            });
            this.documents = [];

            // Reinicializar estado
            this.money = 0;
            this.totalClicks = 0;
            this.documentsRemoved = 0;
            this.documentsOnDesk = 0;
            this.gameSpeed = 1.0;
            this.score = 0;
            this.scoreObjective = 100;
            this.scoreMultiplier = 1;
            this.upgrades = {
                clips: { level: 0, baseCost: 10, baseEffect: 1.2, name: '📎 Clips Organizadores', icon: '📎' },
                coffee: { level: 0, baseCost: 25, baseEffect: 0.1, name: '☕ Café Extra', icon: '☕' },
                assistant: { level: 0, baseCost: 100, baseEffect: 1, name: '🤖 Asistente Virtual', icon: '🤖' },
                printer: { level: 0, baseCost: 50, baseEffect: 1.3, name: '🖨️ Impresora Automática', icon: '🖨️' }
            };
            this.activePowerups = {};

            this.updateUI();
            this.createUpgradesUI();
            this.startGameLoop();
            this.showNotification('Juego reiniciado', 'warning');
        }
    }
}

// ===== INICIAR JUEGO =====
document.addEventListener('DOMContentLoaded', () => {
    const game = new DocumentGame();
    
    // Exponer la instancia globalmente para debugging
    window.game = game;
});
