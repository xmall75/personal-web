import { collection, doc, getDocs, addDoc, getDoc, getFirestore, query, where, updateDoc, and } from "firebase/firestore"
import app from "@/lib/firebase/firebase.config"

const firestore = getFirestore(app)

export async function getPostByName(name: any) {
    try {
        const q = query(
        collection(firestore, 'posts'),
        where('name', '==', name)
        )

        const snapshot = await getDocs(q)
        const posts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))

        if(posts.length > 0) {
            const getData = await getDoc(doc(firestore, 'posts', posts[0].id))
            const data = {
                id: posts[0].id,
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