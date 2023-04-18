import { collection, getDocs, addDoc, updateDoc, serverTimestamp, getFirestore, doc, setDoc } from 'firebase/firestore';
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
// Update a document in a collection
// export async function updateDataInCollection(collectionName, docId, data) {

//     console.log('  data  ' + data)
//     const db = getFirestore();
//     await updateDoc(doc(db, collectionName, docId), {
//         ...data,
//         updatedAt: serverTimestamp(),
//     });
// }

export async function updateDataInCollection(collectionName, docId, data) {
    const db = getFirestore();
    await setDoc(doc(db, collectionName, docId), {
        ...data,
        updatedAt: serverTimestamp(),
    }, { merge: true });
}