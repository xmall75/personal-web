import { collection, doc, getDocs, addDoc, getDoc, getFirestore, query, where, updateDoc, and } from "firebase/firestore"
import app from "@/lib/firebase/firebase.config"

const firestore = getFirestore(app)

export async function getUserByEmail(email: any) {
    try {
        const q = query(
        collection(firestore, 'users'),
        where('email', '==', email)
        )

        const snapshot = await getDocs(q)
        const users = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))

        if(users.length > 0) {
            const getData = await getDoc(doc(firestore, 'users', users[0].id))
            const data = {
                id: users[0].id,
                data: getData.data()
            }

            return data
        }
    }
    catch (err) {
        return {
            status: 404,
            message: err,
        }
    }
}