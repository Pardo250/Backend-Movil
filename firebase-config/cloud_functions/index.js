const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Función que escucha cuando se crea un documento en la subcolección "followers"
exports.sendFollowerNotification = functions.firestore
    .document('usuarios/{userId}/followers/{followerId}')
    .onCreate(async (snap, context) => {
        const userId = context.params.userId; // El usuario al que le dieron follow
        const followerId = context.params.followerId; // El usuario que dio follow

        try {
            // 1. Obtener los datos del seguidor para armar el mensaje (opcional)
            const followerDoc = await admin.firestore().collection('usuarios').doc(followerId).get();
            const followerData = followerDoc.data();
            const followerName = followerData.nombre || 'Alguien';

            // 2. Obtener el token del dispositivo del usuario (userId)
            // Asumiendo que guardas el token de FCM en el documento del usuario o en una subcolección
            const userDoc = await admin.firestore().collection('usuarios').doc(userId).get();
            const userData = userDoc.data();
            const fcmToken = userData.fcmToken;

            if (!fcmToken) {
                console.log('El usuario no tiene token de notificación. Ignorando.');
                return null;
            }

            // 3. Crear el Payload de la Notificación Push
            const payload = {
                notification: {
                    title: '¡Tienes un nuevo seguidor!',
                    body: `${followerName} ha comenzado a seguirte.`,
                    // Puedes agregar una imagen (icon) si lo deseas
                },
                data: {
                    type: 'new_follower',
                    followerId: followerId
                }
            };

            // 4. Enviar la notificación a través de Firebase Cloud Messaging
            await admin.messaging().sendToDevice(fcmToken, payload);
            console.log('Notificación enviada correctamente a:', userId);

        } catch (error) {
            console.error('Error enviando la notificación:', error);
        }
        
        return null;
    });

// Análogamente, se puede implementar para los Likes:
exports.sendLikeNotification = functions.firestore
    .document('reviews/{reviewId}/likes/{userId}')
    .onCreate(async (snap, context) => {
        // Lógica similar para enviar notificación al creador del review...
        return null;
    });
