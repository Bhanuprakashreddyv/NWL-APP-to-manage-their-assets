import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';


import colors from "../Config/colors";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper"
import { KeyboardAvoidingView } from 'react-native';

import { db } from '../../FirebaseConfig';
import { collection, getDocs, doc } from 'firebase/firestore';


function ReportScreen({ navigation }) {

    const [inspectionData, setInspectionData] = useState([])

    useEffect(() => {
        async function fetchInspectionData() {
            const querySnapshot = await getDocs(collection(db, 'inspection'));
            const documents = querySnapshot.docs.map((doc) => doc.data());

            // console.log('documents');

            //console.log(documents);
            Promise.all(
                documents.map(async (data) => {

                    console.log(data);

                    const siteDoc = await doc(db, `site/${data.siteid}`).get();

                    console.log('site');
                    console.log(siteDoc);

                    const assetDoc = await doc(db, `site/${data.siteid}'/'${data.siteid}'/'${data.assetId}`).get();
                    // console.log('asset Doc');

                    // console.log(assetDoc);

                    // const userDoc = await doc(db, `Users/${doc.userId}`).get();

                    return {
                        ...doc,
                        assetName: assetDoc.data().name,
                        userName: userDoc.data().name,
                        siteName: siteDoc.data().name,
                    };
                })
            ).then((dataWithNames) => {
                setInspectionData(dataWithNames);
            });
        };
        console.log('inspection data');

        console.log(inspectionData);

        fetchInspectionData()

    }, [])
    const renderRow = ({ item }) => {
        return (
            <View style={styles.row}>
                <Text style={styles.cell}>{item.assetName}</Text>
                <Text style={styles.cell}>{item.userName}</Text>
                <Text style={styles.cell}>{item.siteName}</Text>
                <Text style={styles.cell}>{item.date}</Text>
                <Text style={styles.cell}>View</Text>
            </View>
        );
    };
    return (
        <FlatList
            data={inspectionData}
            renderItem={renderRow}
            keyExtractor={(item) => item.id}
            style={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
    },
    cell: {
        flex: 1,
    },
});
export default ReportScreen;