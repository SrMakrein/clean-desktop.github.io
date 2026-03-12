# 🎮 Limpieza de Escritorio - Juego Incremental

Un juego web tipo **auto-clicker** con temática de oficina. ¡Limpia documentos, gana dinero y desbloquea mejoras mientras disfrutas de una experiencia visual única!

## 🎯 Características Principales

### Mecánica de Juego
- **Clic en documentos**: Haz clic en los documentos que aparecen en el escritorio para eliminarlos y ganar dinero
- **Spawn progresivo**: Los documentos aparecen continuamente, simulando acumulación de trabajo
- **Indicador de estrés**: El escritorio se llena y el indicador cambia de color según la presión

### Sistema de Mejoras 🔧
1. **📎 Clips Organizadores** - Aumenta el valor de los documentos eliminados
2. **☕ Café Extra** - Incrementa tu velocidad de juego
3. **🤖 Asistente Virtual** - Elimina documentos automáticamente (genera ingresos pasivos)
4. **🖨️ Impresora Automática** - Aumenta la frecuencia de aparición de documentos y power-ups

### Power-ups Temporales ⚡
- **✂️ Trituradora Instantánea** - Destruye varios documentos a la vez
- **🚀 Modo Productividad** - Duplica la ganancia por 15 segundos
- **🌪️ Tormenta de Papeles** - Genera muchos documentos con mayor recompensa

## 🎨 Diseño Visual

- **Escritorio 3D**: Vista aérea de un escritorio de madera estilizado
- **Documentos variados**: Cada documento tiene clips, sellos y post-its únicos
- **Animaciones fluidas**: 
  - Aparición suave con rotación
  - Efectos de eliminación con escala
  - Valores flotantes al hacer clic
  - Pulsación de estrés en el indicador

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

Cada mejora tiene un costo que aumenta exponencialmente:
- **Costo inicial**: Varía según la mejora
- **Multiplicador**: 1.15x por cada nivel
- **Progreso visible**: Barra de progreso en cada mejora

## ⚙️ Configuración Técnica

### Tecnologías
- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos, animaciones y efectos visuales
- **JavaScript**: Lógica de juego modular y orientada a objetos

### Estructura Modular
```javascript
DocumentGame {
  - Gestión de documentos
  - Sistema de mejoras
  - Power-ups temporales
  - UI y notificaciones
  - Persistencia de datos
}
```

### Timers del Juego
- **Document Spawn**: 2000ms (configurable)
- **Assistant Work**: 2000ms
- **Income Update**: 1000ms
- **UI Refresh**: 100ms

## 🎮 Consejos de Juego

1. **Primeras mejoras**: Invierte en clips y café para aumentar ingresos básicos
2. **Mid-game**: Desbloquea el asistente virtual para ingresos pasivos
3. **Late-game**: Usa la impresora para más power-ups y documentos
4. **Power-ups**: Espera el modo productividad para máxima ganancia

## 📱 Responsividad

El juego se adapta a diferentes tamaños de pantalla:
- **Desktop**: Experiencia completa con panel lateral
- **Tablets**: Interfaz optimizada con panel desplegable
- **Mobile**: Interfaz reducida para pantallas pequeñas

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
1. Edita `game.js` para cambiar la lógica
2. Modifica `styles.css` para el diseño visual
3. Actualiza `index.html` para agregar nuevos elementos
4. Los cambios se guardan en localStorage automáticamente

## 🏆 Objetivos de Juego

- Acumular 1M de dinero
- Llegar al nivel 10 en todas las mejoras
- Desbloquear todos los power-ups
- Mantener un estrés bajo mientras ganas dinero

---

**¡Diviértete limpiando documentos!** 🎉
