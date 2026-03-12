## 🚀 INICIO RÁPIDO

### Archivos del Proyecto

```
Proyecto Juego Web/
├── index.html          ← Abre esto en tu navegador
├── styles.css          ← Estilos y animaciones
├── game.js             ← Lógica principal del juego
├── test.html           ← Panel de pruebas (optional)
├── CUSTOMIZATION.js    ← Ejemplos de personalización
├── README.md           ← Documentación completa
└── START_HERE.md       ← Este archivo
```

### ¿Cómo Jugar?

1. **Abre `index.html` en tu navegador** - ¡El juego comienza inmediatamente!
2. **Haz clic en los documentos** para eliminarlos y ganar dinero
3. **Abre el panel lateral** para ver mejoras disponibles
4. **Compra mejoras** para automatizar y aumentar ganancias
5. **Disfruta de los power-ups** que aparecen aleatoriamente

### Controles

| Acción | Resultado |
|--------|-----------|
| Clic en documentos | Gana dinero |
| Clic en mejoras | Compra upgrade |
| Botón 💾 Guardar | Guarda tu progreso |
| Botón 🔄 Reiniciar | Reinicia el juego |

### Sistema de Mejoras

```
📎 Clips Organizadores (10 💰)
   ↳ Aumenta valor de documentos
   
☕ Café Extra (25 💰)
   ↳ Aumenta velocidad del juego
   
🤖 Asistente Virtual (100 💰)
   ↳ Genera ingresos pasivos automáticos
   
🖨️ Impresora Automática (50 💰)
   ↳ Más documentos y power-ups frecuentes
```

### Power-ups Especiales

⚡ Aparecen aleatoriamente:

- **✂️ Trituradora**: Destruye múltiples documentos
- **🚀 Productividad**: Duplica ganancias por 15 segundos
- **🌪️ Tormenta**: Genera muchos documentos con mayor recompensa

### Configuración Técnica

**Requisitos**: Solo un navegador web moderno (Chrome, Firefox, Safari, Edge)

**No necesita**: Servidor, internet (funciona offline), instalación

**Guardado**: Automático en localStorage

### Consejos de Estrategia

1. **Primeros minutos**: Haz clic manual en documentos
2. **Cuando tengas 10 💰**: Compra Clips para más ganancias
3. **Cuando tengas 25 💰**: Compra Café para ir más rápido
4. **Cuando tengas 100 💰**: Desbloquea Asistente (¡ingresos pasivos!)
5. **Late game**: Invierte en Impresora para más power-ups

### Debugging y Pruebas

Abre `test.html` para:
- Probar generación de documentos
- Verificar mejoras
- Activar power-ups manualmente
- Ver estadísticas detalladas
- Pruebas de rendimiento

### Personalización Rápida

#### Cambiar colores (en styles.css)
```css
:root {
    --primary-color: #2c3e50;      /* Cambiar este */
    --desk-color: #8b6f47;         /* Y este */
    --secondary-color: #3498db;    /* Y este */
}
```

#### Cambiar velocidad de spawn (en game.js)
```javascript
this.config.docSpawnInterval = 2000;  /* Cambiar este valor en ms */
```

#### Cambiar costos de mejoras (en game.js)
```javascript
clips: { level: 0, baseCost: 10, ... }  /* Cambiar baseCost */
```

### Errores Comunes

**Q: No aparecen documentos**
A: Abre la consola (F12) y verifica que no haya errores. Recarga la página.

**Q: Las mejoras no funcionan**
A: Asegúrate de tener suficiente dinero. Prueba en test.html para debugging.

**Q: No se guarda el progreso**
A: Verifica que el navegador permita localStorage (no en modo incógnito).

**Q: El juego va muy lento**
A: Intenta cerrar otras pestañas o reiniciar el navegador.

### Próximos Pasos

1. **Juega y disfruta** - El juego está listo para jugar
2. **Personaliza** - Usa CUSTOMIZATION.js para tus propias mejoras
3. **Expande** - Agrega nuevas mejoras, power-ups, o mecánicas
4. **Comparte** - Muestra tu versión personalizada a otros

### Características Incluidas

✅ Sistema click/auto-clicker completo
✅ 4 tipos de mejoras con escalado exponencial
✅ 3 tipos de power-ups especiales
✅ Animaciones fluidas y efectos visuales
✅ Sistema de estrés visual
✅ Persistencia de datos (guardar/cargar)
✅ Notificaciones emergentes
✅ Interfaz responsiva
✅ Panel de control lateral
✅ Estadísticas en tiempo real

### Estructura Modular

Toda la lógica está en una clase `DocumentGame` que es fácil de extender:

```javascript
class DocumentGame {
    - spawnDocument()        // Generar documentos
    - removeDocument()       // Eliminar documentos
    - buyUpgrade()          // Comprar mejoras
    - activatePowerup()     // Activar power-ups
    - saveGame() / loadGame()  // Persistencia
    - updateUI()            // Actualizar interfaz
}
```

---

**¡Diviértete limpiando ese escritorio! 🎉**

Preguntas o sugerencias → Edita CUSTOMIZATION.js para ejemplos
