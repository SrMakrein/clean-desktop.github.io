# 🚀 GUÍA DE DESPLIEGUE Y DISTRIBUCIÓN

## Opción 1: Jugar Localmente (Más Fácil)

### En Windows
1. Abre el explorador de archivos
2. Ve a la carpeta del proyecto
3. Haz doble clic en `index.html`
4. ¡El juego se abrirá en tu navegador!

### En Mac
1. Abre Finder
2. Ve a la carpeta del proyecto
3. Haz doble clic en `index.html`
4. ¡Listo!

### En Linux
```bash
# Abre la carpeta del proyecto y ejecuta:
xdg-open index.html
# O simplemente:
firefox index.html
```

---

## Opción 2: Compartir con GitHub Pages (Gratuito)

### Paso 1: Crear un repositorio en GitHub

1. Ve a [github.com](https://github.com)
2. Crea una cuenta (si no la tienes)
3. Haz clic en "New repository"
4. Nombre: `juego-oficina` (o tu nombre)
5. Selecciona "Public"
6. Crea el repositorio

### Paso 2: Subir los archivos

```bash
# En tu carpeta del proyecto:
git init
git add .
git commit -m "Juego incremental de oficina - v1.0"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/juego-oficina.git
git push -u origin main
```

### Paso 3: Activar GitHub Pages

1. En el repositorio, ve a "Settings"
2. Busca "Pages" en el lado izquierdo
3. En "Source" selecciona "main"
4. Guarda
5. Tu juego estará en: `https://tuusuario.github.io/juego-oficina`

---

## Opción 3: Desplegar en Netlify (Recomendado)

### Método A: Drag & Drop (Más Fácil)

1. Ve a [netlify.com](https://netlify.com)
2. Crea una cuenta
3. Arrastra la carpeta del proyecto al área de upload
4. ¡Tu juego estará en línea en segundos!

### Método B: Conectar GitHub

1. Ve a [netlify.com](https://netlify.com)
2. Crea una cuenta
3. Haz clic en "Connect from Git"
4. Selecciona "GitHub"
5. Autoriza a Netlify
6. Selecciona tu repositorio
7. Deploy automático (se actualiza cuando hagas push)

### Método C: CLI de Netlify

```bash
# Instala Netlify CLI
npm install -g netlify-cli

# En la carpeta del proyecto:
netlify deploy --prod
```

---

## Opción 4: Desplegar en Vercel (También Gratuito)

### Pasos

1. Ve a [vercel.com](https://vercel.com)
2. Crea una cuenta
3. Haz clic en "New Project"
4. Importa tu repositorio de GitHub
5. Haz clic en "Deploy"
6. Tu sitio estará en: `https://tu-proyecto.vercel.app`

**Ventaja:** Despliegues automáticos cuando hagas push a GitHub

---

## Opción 5: Servidor Web Propio

### Con Apache
```bash
# Copia los archivos a:
/var/www/html/juego-oficina/

# El juego estará en:
http://localhost/juego-oficina
```

### Con Nginx
```bash
# En /etc/nginx/sites-available/default:

server {
    listen 80 default_server;
    root /var/www/juego-oficina;
    index index.html;
}

# Reinicia Nginx:
systemctl restart nginx
```

### Con Node.js (Express)
```bash
# Instala Express
npm init -y
npm install express

# Crea server.js:
```

```javascript
const express = require('express');
const app = express();

app.use(express.static(__dirname));

app.listen(3000, () => {
    console.log('Juego corriendo en http://localhost:3000');
});
```

```bash
# Ejecuta:
node server.js
```

### Con Python
```bash
# Python 3:
python -m http.server 8000

# Python 2:
python -m SimpleHTTPServer 8000

# Accede a: http://localhost:8000
```

---

## Opción 6: Docker (Para Servidores)

### Dockerfile

```dockerfile
FROM nginx:latest

COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Construir y ejecutar

```bash
# Construir imagen
docker build -t juego-oficina .

# Ejecutar contenedor
docker run -p 80:80 juego-oficina

# El juego estará en: http://localhost
```

---

## Optimizar para Producción

### 1. Minificar archivos

**CSS:**
```bash
# Instala cssnano
npm install cssnano

# Minifica:
npx cssnano styles.css -o styles.min.css
```

**JavaScript:**
```bash
# Usa terser
npm install terser

# Minifica:
npx terser game.js -o game.min.js
```

**En index.html, cambia:**
```html
<!-- De: -->
<link rel="stylesheet" href="styles.css">
<script src="game.js"></script>

<!-- A: -->
<link rel="stylesheet" href="styles.min.css">
<script src="game.min.js"></script>
```

### 2. Comprimir imágenes

No tenemos imágenes en este proyecto, pero si las agregas:

```bash
npm install imagemin-cli imagemin-mozjpeg

imagemin *.jpg --out-dir=optimized
```

### 3. Habilitar caché

En `.htaccess` (Apache):
```apache
<FilesMatch "\\.(jpg|jpeg|png|gif|js|css|svg)$">
  Header set Cache-Control "max-age=31536000, public"
</FilesMatch>
```

### 4. HTTPS (Importante)

- Netlify: Automático
- GitHub Pages: Automático
- Vercel: Automático
- Propio: Usa Let's Encrypt

```bash
# Let's Encrypt con Certbot:
sudo apt install certbot python3-certbot-apache
sudo certbot --apache -d tudominio.com
```

---

## Checklist de Pre-Despliegue

```markdown
- [ ] He probado el juego localmente en múltiples navegadores
- [ ] He verificado que el guardado funciona
- [ ] He probado en test.html
- [ ] He revisado la consola (F12) para errores
- [ ] He actualizado metadatos (título, descripción)
- [ ] He comprobado que funciona offline
- [ ] He probado en móvil
- [ ] He optimizado imágenes (si las hay)
- [ ] He minificado archivos
- [ ] He activado HTTPS
```

---

## Después del Despliegue

### Monitoreo

1. **Verificar acceso:**
   ```bash
   curl https://tudominio.com
   ```

2. **Revisar logs:**
   - Netlify: Dashboard → Analytics
   - Vercel: Dashboard → Analytics
   - Propio: `/var/log/nginx/access.log`

3. **Probar funcionalidad:**
   - Abre el juego
   - Haz varios clics
   - Guarda y recarga
   - Verifica notificaciones

### Actualizaciones

**En GitHub Pages:**
```bash
git add .
git commit -m "Actualización v1.1"
git push
# Se actualiza automáticamente
```

**En Netlify/Vercel:**
- Se actualizan automáticamente cuando haces push

**En servidor propio:**
```bash
# Copia archivos nuevos
cp -r /ruta/proyecto/* /var/www/html/juego-oficina/
```

---

## Dominios Personalizados

### Con Netlify

1. En Settings → Domain management
2. Haz clic en "Add custom domain"
3. Ingresa tu dominio
4. Sigue las instrucciones de DNS

### Con Vercel

1. En Settings → Domains
2. Ingresa tu dominio
3. Configura los registros DNS

### Con GoDaddy, Namecheap, etc.

1. Compra un dominio
2. Ve a la configuración de DNS
3. Agrega registro CNAME:
   ```
   CNAME: www → tuproyecto.netlify.app
   ```

---

## Estadísticas y Análisis

### Google Analytics

```html
<!-- En index.html, antes de </head>: -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Alternativas

- **Plausible**: https://plausible.io (privacidad)
- **Fathom**: https://usefathom.com
- **Matomo**: Auto-hospedado, privado

---

## Monetización (Opcional)

### Ads

```html
<!-- Google AdSense, antes de </body>: -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ID"></script>
```

### Donaciones

```html
<!-- Ko-fi, Buy Me a Coffee, etc.: -->
<iframe src="https://ko-fi.com/..."></iframe>
```

---

## Troubleshooting de Despliegue

### Error: 404 Not Found

**Solución:**
- Verifica que `index.html` esté en la raíz
- En GitHub Pages, asegúrate de que esté activado
- En servidor propio, verifica permisos: `chmod 644 *`

### Error: CORS

**Solución:**
Este proyecto no usa APIs externas, así que no debería haber problema.

### Juego funciona en localhost pero no online

**Solución:**
- Verifica que todos los archivos (CSS, JS) estén presentes
- Comprueba la consola (F12) para errores
- Verifica rutas relativas en HTML

### LocalStorage no funciona

**Solución:**
- Esto es normal si usas `file://` (local)
- En un servidor web funciona perfectamente
- Los navegadores requieren HTTPS para algunos casos

---

## Rendimiento en Producción

### Métricas Importantes

- **FCP** (First Contentful Paint): < 1.5s
- **LCP** (Largest Contentful Paint): < 2.5s
- **CLS** (Cumulative Layout Shift): < 0.1
- **TTI** (Time to Interactive): < 3.8s

### Herramientas de Prueba

1. [PageSpeed Insights](https://pagespeed.web.dev)
2. [WebPageTest](https://www.webpagetest.org)
3. [GTmetrix](https://gtmetrix.com)
4. Lighthouse (F12 en Chrome)

---

## Backup y Recuperación

### Backup en GitHub

```bash
# Automatizado con cada push
git push origin main
```

### Backup manual

```bash
# Crear copia comprimida
tar -czf backup-juego-$(date +%Y%m%d).tar.gz .
```

---

## Seguridad Básica

- ✅ No almacenes datos sensibles en localStorage
- ✅ No ejecutes código de usuarios no confiables
- ✅ Usa HTTPS siempre
- ✅ Mantén las dependencias actualizadas
- ✅ Revisa permisos de archivos

---

**¡Tu juego está listo para conquistar el mundo! 🎮🚀**
