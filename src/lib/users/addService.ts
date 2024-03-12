import { collection, doc, getDocs, addDoc, getDoc, getFirestore, query, where, updateDoc } from "firebase/firestore"
import app from "@/lib/firebase/firebase.config"
import bcrypt from 'bcrypt'
const firestore = getFirestore(app)

export async function addUser(
    data: {
        email: string,
        password: string,
    },
) {
    try {
        const q = query(
            collection(firestore, 'users'),
            where('email', '==', data.email)
        )
    
        const snapshot = await getDocs(q)
        const users = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
    
        if(users.length > 0) {
            return {
                status: false,
                message: 'Email already exists',
                statusCode: 400,
            }
        }
        else {
            try {
                data.password = await bcrypt.hash(data.password, 10)

                await addDoc(collection(firestore, 'users'), data)
                return {
                    status: true,
                    statusCode: 200,
                    message: 'add user success'
                }
            }
            catch(err) {
                return {
                    status: false,
                    statusCode: 400,
                    message: 'add user failed',
                }
            }
        }
    }
    catch (err) {
        console.error('Error in addUser function:', err);
        return {
            status: false,
            statusCode: 500,
            message: 'Internal Server Error (unexpected)',
        };
    }
}