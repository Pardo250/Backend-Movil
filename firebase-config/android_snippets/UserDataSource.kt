package com.condorapp.data.datasource

import com.google.firebase.firestore.FieldValue
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.coroutines.tasks.await
import javax.inject.Inject

class UserDataSource @Inject constructor(
    private val db: FirebaseFirestore
) {
    suspend fun toggleFollow(targetUserId: String, currentUserId: String): Result<Unit> {
        return try {
            val targetUserRef = db.collection("usuarios").document(targetUserId)
            val followerRef = targetUserRef.collection("followers").document(currentUserId)

            db.runTransaction { transaction ->
                val snapshot = transaction.get(followerRef)

                if (snapshot.exists()) {
                    // UNFOLLOW
                    transaction.delete(followerRef)
                    transaction.update(targetUserRef, "countFollowers", FieldValue.increment(-1))
                } else {
                    // FOLLOW
                    transaction.set(followerRef, hashMapOf("date" to FieldValue.serverTimestamp()))
                    transaction.update(targetUserRef, "countFollowers", FieldValue.increment(1))
                }
            }.await()
            
            Result.success(Unit)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
