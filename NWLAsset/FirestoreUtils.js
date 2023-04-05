import { collection, getDocs } from 'firebase/firestore';
import { db } from './FirebaseConfig';

export async function getCollectionData(collectionName) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const collectionData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id, label: doc.data().name }));
    return collectionData;
}

export async function getSubcollectionData(documentId, subcollectionName) {
    const subcollectionRef = collection(db, 'site', documentId, subcollectionName);
    const querySnapshot = await getDocs(subcollectionRef);
    const subcollectionData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id, label: doc.data().name }));
    return subcollectionData;
}

export async function getDropdownCollectionData(collectionName) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const collectionData = querySnapshot.docs.map((doc) => ({ label: doc.data().name, value: doc.id }));
    return collectionData;
}
