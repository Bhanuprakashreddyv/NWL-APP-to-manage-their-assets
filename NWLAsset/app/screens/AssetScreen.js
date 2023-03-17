import React, { useState, useEffect } from 'react';
import { View, Text } from "react-native";
import { db } from '../../FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { async } from '@firebase/util';
import { getSubcollectionData } from '../../FirestoreUtils';
import AppStyle from './AppStyle';
import { FlatList } from 'react-native-gesture-handler';

function AssetScreen({ route }) {
    const siteDocId = route.params.siteId;
    const [assetData, setAssetData] = useState([]);

    useEffect(() => {
        async function fetchAssetData() {
            console.log(siteDocId)
            // const subCollectionName = 'asset';
            const data = await getSubcollectionData(siteDocId, siteDocId);
            console.log(data)
            setAssetData(data);
        }
        fetchAssetData();
    }, [siteDocId])

    const renderAssetItem = ({ item }) => {
        return (
            <View style={AppStyle.assetList}>
                <Text style={AppStyle.assetListText}>{item.name}</Text>
            </View>

        )
    }
    return (
        <View style={AppStyle.assetListContainer}>
            <FlatList
                data={assetData}
                keyExtractor={(item) => item.id}
                renderItem={renderAssetItem} />
        </View>
    );
}

export default AssetScreen;