const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendFollowerNotification = functions.firestore
    .document('usuarios/{userId}/followers/{followerId}')
    .onCreate(async (snap, context) => {
        const userId = context.params.userId;
        const followerId = context.params.followerId;

        try {
            const followerDoc = await admin.firestore().collection('usuarios').doc(followerId).get();
            const followerData = followerDoc.data();
            const followerName = followerData.nombre || 'Alguien';

            const userDoc = await admin.firestore().collection('usuarios').doc(userId).get();
            const userData = userDoc.data();
            const fcmToken = userData.fcmToken;

            if (!fcmToken) {
                console.log('El usuario no tiene token de notificación. Ignorando.');
                return null;
            }

            const payload = {
                notification: {
                    title: '¡Tienes un nuevo seguidor!',
                    body: `${followerName} ha comenzado a seguirte.`,
                },
                data: {
                    type: 'new_follower',
                    followerId: followerId
                }
            };
            await admin.messaging().sendToDevice(fcmToken, payload);
            console.log('Notificación enviada correctamente a:', userId);

        } catch (error) {
            console.error('Error enviando la notificación:', error);
        }

        return null;
    });

exports.sendLikeNotification = functions.firestore
    .document('reviews/{reviewId}/likes/{userId}')
    .onCreate(async (snap, context) => {
        return null;
    });
