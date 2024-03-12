import { collection, doc, getDocs, addDoc, getDoc, getFirestore, query, where, updateDoc } from "firebase/firestore"
import app from "@/lib/firebase/firebase.config"
import bcrypt from 'bcrypt'
const firestore = getFirestore(app)

export async function addPost(
    data: {
        name: string,
        post: [],
    },
) {
    try {
        await addDoc(collection(firestore, 'posts'), data)
        return {
            status: true,
            statusCode: 200,
            message: 'add post success'
        }
    }
    catch (err) {
        console.error('Error in addPost function:', err);
        return {
            status: false,
            statusCode: 500,
            message: 'Internal Server Error (unexpected)',
        };
    }
}