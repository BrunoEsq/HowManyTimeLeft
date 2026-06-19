# INSTRUCCIONES PARA ARREGLAR EL DEPLOYMENT EN VERCEL

## Problema Encontrado
El `vercel.json` tenía una regla de rewrite que capturaba TODAS las rutas (incluyendo `/api/*`) y las redirigía a `index.html`. Por eso recibías HTML en lugar de datos JSON.

## Solución Aplicada
Se actualizó `vercel.json` para:
1. Dejar que las rutas `/api/*` se manejen por las funciones serverless
2. Solo redirigir otras rutas al `index.html`
3. Configurar las funciones serverless correctamente

## Pasos para Re-Desplegar

### 1. Commit y Push de los cambios
```bash
cd "D:/Proyecto How Many Time Left/HowManyTimeLeft/HowManyTimeLeft"
git add vercel.json
git add HowManyTimeLeft/frontend/api/
git add HowManyTimeLeft/frontend/vercel.json
git commit -m "Fix API routes in Vercel configuration"
git push
```

### 2. Configurar Variable de Entorno en Vercel
1. Ve a tu proyecto en Vercel: https://vercel.com/dashboard
2. Click en tu proyecto "how-many-time-left"
3. Ve a **Settings** → **Environment Variables**
4. Agrega esta variable:
   - **Name:** `RAWG_API_KEY`
   - **Value:** `1b18eeed59504542baada61eb336bc78`
   - **Environments:** Selecciona Production, Preview y Development
5. Click en **Save**

### 3. Re-Desplegar
Opción A - Automático:
- Vercel detectará el push y re-desplegará automáticamente

Opción B - Manual:
- En el dashboard de Vercel, ve a **Deployments**
- Click en el botón **"Redeploy"** del último deployment
- Selecciona **"Use existing Build Cache"** → NO (desactivado)
- Click en **Redeploy**

### 4. Verificar que Funciona
Una vez desplegado, prueba estos URLs en tu navegador:

**Test Search:**
```
https://how-many-time-left.vercel.app/api/games/search?search=Elden+Ring&page=1&page_size=20
```

Debería devolver JSON como:
```json
{
  "count": 123,
  "results": [...]
}
```

**Test Details:**
```
https://how-many-time-left.vercel.app/api/games/3498
```

Debería devolver JSON con detalles del juego.

Si estos URLs funcionan, entonces el buscador en tu app también funcionará.

## Qué Cambió

### Archivo: `HowManyTimeLeft/HowManyTimeLeft/vercel.json`

**ANTES:**
```json
{
    "rewrites": [
        {
            "source": "/(.*)",
            "destination": "/index.html"
        }
    ]
}
```
☝️ Esto capturaba TODO incluyendo `/api/*`

**DESPUÉS:**
```json
{
    "rewrites": [
        {
            "source": "/api/:path*",
            "destination": "/api/:path*"
        },
        {
            "source": "/(.*)",
            "destination": "/index.html"
        }
    ]
}
```
☝️ Ahora `/api/*` va a las funciones serverless primero

## Troubleshooting

### Si sigue sin funcionar después del redeploy:

1. **Limpia el caché del navegador:**
   - Presiona `Ctrl + Shift + R` (hard refresh)
   - O abre DevTools → Network → Marca "Disable cache"

2. **Verifica que la variable de entorno esté configurada:**
   - Vercel Dashboard → Settings → Environment Variables
   - Debe aparecer `RAWG_API_KEY`

3. **Revisa los logs de la función:**
   - Vercel Dashboard → Deployments → Click en el último deployment
   - Ve a la tab **"Functions"**
   - Click en una función para ver sus logs

4. **Verifica que las funciones se desplegaron:**
   - En el deployment de Vercel, busca "Functions" en el output del build
   - Debería listar:
     - `api/games/search.ts`
     - `api/games/[id].ts`

### Si los endpoints API devuelven errores:

**Error 404:** Las funciones no se desplegaron correctamente
- Verifica que los archivos estén en: `HowManyTimeLeft/frontend/api/games/`
- Re-deploy sin usar caché

**Error 500:** Error en el código de la función
- Revisa los logs en Vercel Dashboard → Functions
- Probablemente falta la variable de entorno `RAWG_API_KEY`

**Error CORS:** Headers no configurados
- Las funciones ya tienen los headers CORS, pero verifica que se hayan desplegado

## Contacto
Si sigues teniendo problemas, muéstrame:
1. Screenshot de DevTools → Network mostrando el request a `/api/games/search`
2. Screenshot de la pestaña "Response" de ese request
3. Screenshot de Vercel Dashboard → Functions
