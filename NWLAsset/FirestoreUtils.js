import { collection, getDocs, addDoc, serverTimestamp, getFirestore, doc, setDoc, query, where, getDoc } from 'firebase/firestore';
import { db } from './FirebaseConfig';

export async function getCollectionData(collectionName) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const collectionData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id, label: doc.data().name }));
    return collectionData;
}

export async function getSubcollectionData(documentId, subcollectionName) {
    const subcollectionRef = collection(db, 'site', documentId, subcollectionName);
    const querySnapshot = await getDocs(subcollectionRef);
    const subcollectionData = querySnapshot.docs.map((doc) => ({ ...doc.data(), value: doc.id, label: doc.data().name }));
    return subcollectionData;
}

export async function getDropdownCollectionData(collectionName) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const collectionData = querySnapshot.docs.map((doc) => ({ label: doc.data().name, value: doc.id }));
    return collectionData;
}


export async function saveDataToFirestore(collectionName, data) {
    try {
        const db = getFirestore();
        const docRef = await addDoc(collection(db, collectionName), {
            ...data,
            createdAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (error) {
        console.error('Error saving data to Firestore:', error);
        throw error;
    }

}

export async function getUserByUserId(userId) {
    const q = query(collection(db, 'users'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        // handle case where no user document was found
        return null;
    } else {
        // return the user document
        return querySnapshot.docs[0].data();
    }
}

export async function getDocByID(collectionName, docId) {
    const docRef = doc(db, collectionName, docId);
    const querySnapshot = await getDoc(docRef);
    const data = querySnapshot.data();
    return data;
}


export async function updateDataInCollection(collectionName, docId, data) {
    const db = getFirestore();
    await setDoc(doc(db, collectionName, docId), {
        ...data,
        updatedAt: serverTimestamp(),
    }, { merge: true });
}