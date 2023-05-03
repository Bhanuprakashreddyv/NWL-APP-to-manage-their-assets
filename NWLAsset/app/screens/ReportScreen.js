import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../../FirebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useIsFocused } from '@react-navigation/native';

function ReportScreen({ navigation }) {
    const isFocused = useIsFocused();
    const [inspectionData, setInspectionData] = useState([])

    useEffect(() => {
        if (isFocused) {
            // Do something here to refresh the screen, such as updating state or fetching new data
            async function fetchInspectionData() {
                const querySnapshot = await getDocs(query(collection(db, 'inspection'), orderBy('createdAt', 'desc')));
                const data = querySnapshot.docs.map((doc) => {
                    const inspection = { ...doc.data(), id: doc.id }
                    if (inspection.createdAt && inspection.createdAt.toDate) {
                        inspection.createdAt = inspection.createdAt.toDate().toLocaleDateString();
                    }
                    if (inspection.updatedAt && inspection.updatedAt.toDate) {
                        inspection.updatedAt = inspection.updatedAt.toDate().toLocaleDateString();
                    }
                    return inspection;

                });
                setInspectionData(data);
            };
            fetchInspectionData()
        }


    }, [isFocused])
    const renderRow = ({ item }) => {
        return (
            <>

                <View style={styles.row}>
                    <Text style={styles.cell}>{item.siteName}</Text>
                    <Text style={styles.cell}>{item.assetName}</Text>
                    <Text style={styles.cell}>{item.createdAt}</Text>
                    <Text style={styles.cell}>{item.userName}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ReportDetailScreen', { inspectionId: item.id })}>
                        <Text style={[styles.cell, styles.link]}>Open</Text>
                    </TouchableOpacity>
                </View>
            </>

        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={[styles.cellHeader, styles.siteHeader]}>Site</Text>
                <Text style={[styles.cellHeader, styles.siteHeader]}>Asset</Text>
                <Text style={[styles.cellHeader, styles.siteHeader]}>Date</Text>
                <Text style={[styles.cellHeader, styles.siteHeader]}>Inspected by</Text>
                <Text style={[styles.cellHeader, styles.siteHeader]}>  </Text>

            </View>
            <FlatList
                data={inspectionData}
                renderItem={renderRow}
                keyExtractor={(item) => item.id}
                style={styles.container}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white'
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,

    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        padding: 10,
    },
    cellHeader: {
        flex: 1,
        fontSize: 12,
        fontWeight: 'bold',
        backgroundColor: '#52dea4',
        padding: 5,
        paddingTop: 10
    },

    siteHeader: {
        paddingLeft: 10,
        paddingRight: 5,
    },

    cell: {
        flex: 1,
        backgroundColor: '#b8d1c7',
        padding: 8,
    },

    link: {
        textDecorationLine: 'underline',
        color: '#0c356b',
        fontWeight: 'bold'

    },
});
export default ReportScreen;