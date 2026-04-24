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

        } catch (error) {
            console.error(error);
        }

        return null;
    });

exports.sendLikeNotification = functions.firestore
    .document('reviews/{reviewId}/likes/{userId}')
    .onCreate(async (snap, context) => {
        const reviewId = context.params.reviewId;
        const likerId = context.params.userId;

        try {
            const likerDoc = await admin.firestore().collection('usuarios').doc(likerId).get();
            const likerData = likerDoc.data();
            const likerName = likerData?.nombre || 'Alguien';

            const reviewDoc = await admin.firestore().collection('reviews').doc(reviewId).get();
            const reviewData = reviewDoc.data();

            if (!reviewData || !reviewData.usuarioId) {
                return null;
            }

            const authorId = reviewData.usuarioId;

            if (likerId === authorId) {
                return null;
            }

            const authorDoc = await admin.firestore().collection('usuarios').doc(authorId).get();
            const authorData = authorDoc.data();
            const fcmToken = authorData?.fcmToken;

            if (!fcmToken) {
                return null;
            }

            const payload = {
                notification: {
                    title: 'A alguien le gustó tu review',
                    body: `A ${likerName} le ha gustado tu publicación.`,
                },
                data: {
                    type: 'new_like',
                    reviewId: reviewId,
                    likerId: likerId
                }
            };

            await admin.messaging().sendToDevice(fcmToken, payload);

        } catch (error) {
            console.error(error);
        }

        return null;
    });
