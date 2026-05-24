# 🔔 Guía: Notificaciones Push en Equilibria

## ✅ Estado de Implementación

### Lo que acabamos de agregar:
1. **NotificationService** - Gestiona permisos y registro del dispositivo
2. **RecordatorioNotificationService** - Programa y maneja notificaciones de recordatorios
3. **NotificationTestComponent** - Página de prueba para testear todo

### Instalación de dependencias:
```bash
npm install @capacitor/push-notifications
npm install @capacitor/local-notifications
npx cap sync
```

---

## 🧪 Cómo Probar Notificaciones

### **Opción 1: En Desarrollo (Local)**

1. **Abre la app en desarrollo:**
   ```bash
   ionic serve
   ```

2. **Navega a la página de prueba:**
   - Crea una ruta en tu `app.routes.ts`:
   ```typescript
   {
     path: 'test-notifications',
     component: NotificationTestComponent
   }
   ```

3. **Accede a:** `http://localhost:8100/test-notifications`

4. **Pruebas disponibles:**
   - ✅ "Enviar Notificación de Prueba" - Verás una notificación en 2 segundos
   - ✅ "Programar Recordatorios Saludables" - Elige una hora (ej: 14:30)
   - ✅ "Ver Notificaciones Pendientes" - Lista todas las notificaciones programadas
   - ✅ "Limpiar Todas" - Cancela todo

### **Opción 2: En Dispositivo Real/Emulador**

#### Android:
```bash
ionic build
npx cap copy android
npx cap open android
# En Android Studio: Build > Build Bundle(s) / APK(s) > Build APK(s)
```

#### iOS:
```bash
ionic build
npx cap copy ios
npx cap open ios
# En Xcode: Product > Run
```

---

## 📱 Dónde Ver las Notificaciones

### Local (navegador):
- Las notificaciones aparecerán como **notificaciones del navegador**
- Verifica la bandeja del sistema (esquina superior derecha en muchos navegadores)

### Android:
- Aparecen en la **bandeja de notificaciones** del dispositivo
- Desliza desde la parte superior para ver el centro de notificaciones

### iOS:
- Aparecen como **notificaciones push** estándar de iOS
- Centro de notificaciones (desliza desde arriba)

---

## 🔧 Flujo de Integración: Bienestar + Notificaciones

### Cuando el usuario activa un recordatorio en la página **Bienestar**:

```typescript
// En bienestar.page.ts
async toggleRecordatorio(recordatorio: Recordatorio) {
  if (recordatorio.notificacionesActivas) {
    // Programar notificación
    await this.recordatorioNotificationService.programarRecordatorioSaludable(
      recordatorio,
      recordatorio.hora // ej: "14:30"
    );
  } else {
    // Cancelar notificación
    await this.recordatorioNotificationService.cancelarNotificacion(
      recordatorio.nombre
    );
  }
}
```

---

## 🎯 Próximos Pasos para Producción

### Opción A: Usar OneSignal (Recomendado - Más Fácil)
```bash
npm install onesignal-cordova-plugin
npx cap sync
```
- Panel visual para enviar notificaciones manualmente
- Backend más simple
- Free para hasta 30K usuarios

### Opción B: Usar Firebase Cloud Messaging (FCM)
- Requiere más configuración
- Más potente y flexible
- Integración con Google Cloud

### Opción C: Keep Actual Approach (Notificaciones Locales)
- Ya está implementado ✅
- Solo funciona cuando la app está instalada
- Perfect para este caso de uso

---

## 🧪 Checklist de Testing

- [ ] Instalar `@capacitor/push-notifications` y `@capacitor/local-notifications`
- [ ] `npx cap sync`
- [ ] Crear ruta para `NotificationTestComponent`
- [ ] Acceder a página de prueba
- [ ] Hacer clic en "Enviar Notificación de Prueba"
- [ ] Ver la notificación en el sistema
- [ ] Programar un recordatorio para dentro de 2 minutos
- [ ] Esperar y verificar que aparezca la notificación
- [ ] Integrar con página Bienestar

---

## 📊 Modelo de Datos: Recordatorio

```typescript
interface Recordatorio {
  idRecordatorio: number;      // ID único
  nombre: string;              // Ej: "Bebe agua"
  descripcion?: string;        // Descripción
  notificacionesActivas: boolean; // ¿Enviamos notificaciones?
  hora?: string;               // HH:mm para recordatorios saludables
  fecha?: Date;                // Fecha/hora para recordatorios personalizados
  tipoRecordatorio: string;    // 'saludable' | 'personal'
  frecuencia?: string;         // 'diaria', 'semanal', etc.
}
```

---

## 📝 Logs para Debugging

Abre la consola del navegador (F12) y busca:
```
✅ Device Token: [token_aquí]
✅ Dispositivo registrado para notificaciones
✅ Notificación "X" programada para [hora]
🔔 Notificación recibida: [datos]
```

---

## 🚨 Problemas Comunes

| Problema | Solución |
|----------|----------|
| **"Device Token not available"** | Permisos de notificaciones no concedidos. Aceptar en popup inicial. |
| **Notificaciones no aparecen** | Revisar permisos del navegador/dispositivo. Probar con `enviarNotificacionPrueba()`. |
| **Error: "No se encuentra LocalNotifications"** | Ejecutar `npx cap sync` nuevamente. |
| **Android: Notificaciones solo en primer plan** | Agregar configuración en `capacitor.config.ts`. |

---

## 💡 Tips

1. **Test de carga:** Programa 10 notificaciones y mira "Ver Notificaciones Pendientes"
2. **Debugging:** Usa `console.log()` en los servicios para seguir el flujo
3. **Hora de prueba:** Usa hora actual + 1 minuto para pruebas rápidas
4. **Device Token:** Guarda este token si planeas backend de notificaciones

