import React, { useState, useEffect } from 'react';
import { View, Text } from "react-native";
import { getSubcollectionData } from '../../FirestoreUtils';
import AppStyle from './AppStyle';
import { FlatList } from 'react-native-gesture-handler';

function AssetScreen({ route }) {
    const siteDocId = route.params.siteId;
    const [assetData, setAssetData] = useState([]);

    useEffect(() => {
        async function fetchAssetData() {
            const subCollectionName = siteDocId;
            const data = await getSubcollectionData(siteDocId, subCollectionName);
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