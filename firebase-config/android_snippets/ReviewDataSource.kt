package com.condorapp.data.datasource

import com.google.firebase.firestore.FieldValue
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.coroutines.tasks.await
import javax.inject.Inject

class ReviewDataSource @Inject constructor(
    private val db: FirebaseFirestore
) {
    suspend fun toggleLike(reviewId: String, currentUserId: String): Result<Unit> {
        return try {
            val reviewRef = db.collection("reviews").document(reviewId)
            val likeRef = reviewRef.collection("likes").document(currentUserId)

            db.runTransaction { transaction ->
                val snapshot = transaction.get(likeRef)

                if (snapshot.exists()) {
                    // DISLIKE: Si existe el like, lo borramos y restamos 1 al contador global
                    transaction.delete(likeRef)
                    transaction.update(reviewRef, "likesCount", FieldValue.increment(-1))
                } else {
                    // LIKE: Si NO existe, lo creamos y sumamos 1 al contador global
                    transaction.set(likeRef, hashMapOf("date" to FieldValue.serverTimestamp()))
                    transaction.update(reviewRef, "likesCount", FieldValue.increment(1))
                }
            }.await()
            
            Result.success(Unit)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
