# 🎮 Limpieza de Escritorio - Juego Incremental

Un juego web tipo **auto-clicker** con temática de oficina. ¡Limpia documentos, gana dinero y desbloquea mejoras mientras disfrutas de una experiencia visual única!

## 🎯 Características Principales

### Mecánica de Juego
- **Sistema de Click**: Haz clic en los documentos que aparecen en el escritorio para eliminarlos y ganar dinero
- **Spawn dinámico de documentos**: Documentos aparecen cada 2 segundos (configurable), simulando acumulación de trabajo
- **8 tipos de objetos de oficina**: Documentos, carpetas, bolígrafos, notas adhesivas, clips, tareas urgentes, correos y cuadernos - cada uno con valor diferente
- **Indicador visual de estrés**: El escritorio se llena y el indicador cambia de color según la cantidad de documentos acumulados
- **Sistema de puntuación**: Acumula score además de dinero, con multiplicadores dinámicos

### Sistema de Mejoras 🔧
1. **📎 Clips Organizadores** (10 monedas base)
   - Aumenta el valor de cada documento +10% por nivel
   - Efecto multiplicador: 1.2x por nivel
   - Costo escalado: 1.15x por cada nivel

2. **⚡ Multiplicador de Clicks** (150 monedas base)
   - Cada click cuenta como múltiples clicks
   - Máximo 100 niveles
   - +1 click efectivo por nivel

3. **🖨️ Impresora Automática** (50 monedas base)
   - Aumenta frecuencia de spawn de documentos (-100ms por nivel)
   - Incrementa probabilidad de power-ups
   - Añade +3% al valor de documentos

4. **🌪️ Probabilidad Tormenta** (25 monedas base)
   - Activa eventos de "Tormenta de Papeles"
   - +5% probabilidad por nivel (máx 75%)
   - Genera múltiples documentos de alto valor

5. **🔪 Trituradora de Papel** (100 monedas base)
   - Power-up controlable: duplica dinero al activarse
   - Duración: 30 segundos
   - Genera documentos automáticamente en los últimos 10 segundos
   - Gasta 1 nivel para activarse

### Power-ups Temporales ⚡
- **✂️ Trituradora Instantánea** (10s)
  - Destruye todos los documentos en pantalla
  - Dinero duplicado al destruir (x2)
  - Sonido especial de trituradora
  
- **🚀 Modo Productividad** (15s)
  - Duplica todas las ganancias (x2)
  - Multiplica valores de documentos
  
- **🌪️ Tormenta de Papeles** (8s)
  - Genera múltiples documentos de golpe
  - Documentos tienen mayor valor base
  - Aumenta probabilidad de power-ups

## 🎨 Diseño Visual

- **Escritorio 3D**: Vista aérea de un escritorio de madera estilizado
- **Documentos variados**: 8 tipos diferentes (📄📁✏️📝📎⚠️✉️📓) con valores base distintos
  - Cada documento incluye aleatoriamente: clips, sellos (🔒✅⭐🖔), notas adhesivas
- **Animaciones fluidas**: 
  - Aparición suave con rotación aleatoria
  - Efectos de eliminación con escala (disappear animation)
  - Valores flotantes al hacer clic
  - Pulsación visual del indicador de estrés
  - Efecto de "click feedback" en pantalla
- **Interfaz adaptativa**: Barra de estadísticas en tiempo real con dinero, score, velocidad, multiplicador de clicks
- **Panel lateral desplegable**: Muestra mejoras disponibles, estadísticas de juego y controles
- **Notificaciones dinámicas**: Sistema de alertas para poder-ups, mejoras compradas y eventos especiales

## 🚀 Cómo Jugar

1. **Haz clic en los documentos** para eliminarlos y ganar dinero
2. **Abre el panel lateral** para ver tus estadísticas
3. **Compra mejoras** cuando tengas suficiente dinero
4. **Aprovecha los power-ups** que aparecen aleatoriamente
5. **Optimiza tu estrategia** para maximizar ganancias

## 💾 Características de Persistencia

- **Guardado automático**: El juego se guarda en localStorage
- **Botón de guardar**: Guarda manualmente tu progreso
- **Botón de reinicio**: Reinicia el juego desde cero (con confirmación)

## 📊 Sistema de Progresión

El sistema de costos utiliza **escalado exponencial**:
- **Costo inicial**: Varía según la mejora (Clips: 10, Multiplicador de Clicks: 150)
- **Multiplicador de costo**: 1.15x por cada nivel adquirido
- **Fórmula**: `costoActual = costoBase * (1.15 ^ nivel)`
- **Progreso visible**: Barra de progreso mostrando costo actual vs dinero disponible en cada mejora

### Mecánica de Dinero
- **Valor base de documentos**: 1 moneda (configurable)
- **Multiplicadores acumulativos**:
  - Clips Organizadores: +10% por nivel
  - Multiplicador de Clicks: +1 click por nivel
  - Power-ups activos: x2 adicional (Modo Productividad)
- **Ingresos pasivos**: Futuro sistema de asistente para generar dinero automático

## ⚙️ Arquitectura Técnica

### Stack Tecnológico
- **HTML5**: Estructura semántica con elementos multimedia
- **CSS3**: 
  - Animaciones CSS complejas (keyframes)
  - Transformaciones 3D y perspectiva
  - Flexbox y Grid para layout responsivo
  - Efectos visuales con sombras, gradientes y transiciones
  - Media queries para adaptación móvil
  
- **JavaScript (ES6+)**: 
  - Programación Orientada a Objetos con clase `DocumentGame`
  - Manejo de eventos y delegación
  - LocalStorage para persistencia de datos
  - Web Audio API para sonidos dinámicos
  - RequestAnimationFrame para animaciones fluidas

### Estructura de Clases

**Clase Principal: DocumentGame**
```
├── Sistema de Documentos
│   ├── spawnDocument() - Genera documentos aleatorios
│   ├── createDocumentElement() - Renderiza documento en DOM
│   ├── removeDocument() - Elimina documento y calcula valor
│   └── documents[] - Array de documentos activos
│
├── Sistema de Mejoras
│   ├── upgrades{} - Objeto de mejoras con niveles
│   ├── buyUpgrade() - Compra y aplica mejoras
│   └── calculateUpgradeCost() - Calcula costo exponencial
│
├── Power-ups
│   ├── activePowerups{} - Power-ups activos con timers
│   ├── activateRandomPowerup() - Activa power-up aleatorio
│   ├── triggerShredder() - Ejecuta trituradora
│   └── triggerPaperStorm() - Ejecuta tormenta de papeles
│
├── Sistema de Audio
│   ├── initAudio() - Inicializa Web Audio Context
│   ├── playSound() - Reproduce efectos de sonido
│   └── toggleAudio() - Muta/desmuta sonidos
│
├── UI y Visualización
│   ├── updateUI() - Actualiza valores en DOM cada 100ms
│   ├── createClickEffect() - Efecto visual de valores flotantes
│   ├── updateStressIndicator() - Visualiza estrés en escritorio
│   └── showNotification() - Muestra alertas dinámicas
│
└── Persistencia
    ├── saveGame() - Guarda estado en localStorage
    ├── loadGame() - Carga estado guardado
    └── resetGame() - Reinicia con confirmación
```

### Timers y Loops

| Sistema | Intervalo | Función |
|---------|-----------|---------|
| Document Spawn | 2000ms | Crea nuevos documentos |
| Income Update | 1000ms | Genera ingresos pasivos |
| UI Refresh | 100ms | Actualiza pantalla |
| Assistant Work | 2000ms | Trabaja automáticamente |
| Power-up Duration | 1000ms | Decrementa timer de power-ups |

### Configuración Externa

Archivo [config.js](config.js) permite personalizar sin editar game.js:
- Intervalos de spawn y tiempos
- Valores base de documentos y dinero
- Costos y efectos de mejoras
- Probabilidades de power-ups
- Multiplicadores de dificultad

## 📱 Responsividad

El juego se adapta inteligentemente a diferentes tamaños:
- **Desktop (>1024px)**: Panel lateral permanente con todas las mejoras visibles
- **Tablets (768px-1024px)**: Interfaz optimizada con scroll en mejoras
- **Mobile (<768px)**: 
  - Interfaz comprimida con botones optimizados
  - Panel lateral desplegable deslizante
  - Gestos táctiles optimizados
  - Documentos redimensionados para pantallas pequeñas

## 🎮 Consejos de Juego

### Estrategia Progresiva
1. **Primeros clicks (minutos 0-5)**
   - Enfócate en hacer clic manualmente
   - Ahorra para la primera mejora (Clips)
   - Los clips doblan tu valor de documentos
   
2. **Mid-game (minutos 5-20)**
   - Invierte en Multiplicador de Clicks para aumentar rendimiento
   - Compra niveles en Impresora para más documentos
   - Acumula monedas para el Multiplicador de Clicks (150+)

3. **Late-game (minutos 20+)**
   - Prioriza mejoras que generen el mayor flujo de dinero
   - Usa power-ups estratégicamente (Modo Productividad con muchos documentos)
   - Equilibra mejoras de ingresos vs mejoras de spawn

### Optimización de Power-ups
- **Trituradora Instantánea**: Mejor cuando hay muchos documentos en pantalla
- **Modo Productividad**: Más efectivo combinado con alta densidad de documentos
- **Tormenta de Papeles**: Genera documentos para clicks posteriores

## 📈 Estadísticas Rastreadas

El juego registra en tiempo real:
- **Dinero total**: Acumulado en tu sesión
- **Score**: Puntos ganados (afectado por multiplicador)
- **Documentos eliminados**: Contador total de clicks
- **Documentos en escritorio**: Estrés actual
- **Velocidad de juego**: Multiplicador aplicado
- **Multiplicador de clicks**: Efecto de mejora activo
- **Ingresos por segundo**: Proyección de ingresos pasivos

## 🎨 Sistema de Temas y Customización

El proyecto es altamente customizable mediante:

**Colores y estilos** (styles.css):
- Variables CSS para rápido cambio de tema
- Animaciones personalizables
- Efectos visuales modulares

**Mecánicas de juego** (config.js):
- Intervalos de spawn
- Valores base de dinero
- Costos de mejoras
- Duraciones de power-ups
- Probabilidades de eventos

**Extensión de contenido** (CUSTOMIZATION.js):
- Ejemplos para añadir nuevas mejoras
- Plantillas para nuevos power-ups
- Guía para agregar tipos de documentos
- Puntos de extensión documentados

## 🔮 Futuras Expansiones Posibles

- Sistema de logros y badges
- Leaderboard global
- Temas visuales diferentes
- Más tipos de documentos especiales
- Sistema de combos y multiplicadores
- Mascotas que ayudan
- Eventos especiales
- Modos de juego (relajado, competitivo)

## 📝 Licencia

Juego de código abierto. Siéntete libre de modificar y expandir.

## 🎓 Desarrollo

Para modificar el juego:
1. Edita `game.js` para cambiar la lógica del juego
2. Modifica `styles.css` para el diseño visual y animaciones
3. Actualiza `index.html` para agregar nuevos elementos DOM
4. Usa `config.js` para ajustes sin editar el código principal
5. Los cambios se guardan en localStorage automáticamente

## 🏆 Objetivos de Juego

- Acumular 1M de dinero
- Llegar al nivel 10 en todas las mejoras
- Desbloquear todos los power-ups
- Mantener un estrés bajo mientras ganas dinero

## 📚 Archivos Principales

| Archivo | Descripción |
|---------|------------|
| `index.html` | Estructura HTML del juego (131 líneas) |
| `styles.css` | Estilos CSS y animaciones responsivas |
| `game.js` | Lógica principal del juego (1193 líneas) |
| `config.js` | Configuración personalizable (236 líneas) |
| `CUSTOMIZATION.js` | Guía de extensiones y ejemplos (310 líneas) |
| `README.md` | Documentación completa |
| `API.md` | Referencia de API y métodos |
| `CHANGELOG.md` | Historial de cambios y versiones |

---

**¡Diviértete limpiando documentos!** 🎉

*Última actualización: Marzo 2026*
*Versión: 2.0 (Sistema completo con múltiples mejoras y power-ups)*
