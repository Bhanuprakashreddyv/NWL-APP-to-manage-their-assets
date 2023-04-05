import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { db } from '../../FirebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import AppStyle from './AppStyle';
import KeyBoardAvoidingWrapper from '../components/KeyBoardAvoidingWrapper';
import Ionicons from '@expo/vector-icons/Ionicons'
import { KeyboardAvoidingView } from 'react-native';
function SiteScreen({ navigation }) {

    const [isloading, setLoading] = useState(false);
    const [siteData, setSiteData] = useState([]);
    const [siteMasterData, setSiteMasterData] = useState([]);
    const [search, setSearch] = useState('');
    useEffect(() => {
        const subscriber = onSnapshot(collection(db, 'site'), (snapshot) => {
            const siteList = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setSiteData(siteList);
            setSiteMasterData(siteList);
            setLoading(false);

        })
        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    const searchFiter = (text) => {
        if (text) {
            const searchData = siteMasterData.filter((item) => {
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1
            });
            console.log(searchData)
            setSiteData(searchData);
            setSearch(text)
        }
        else {
            setSiteData(siteMasterData);
            setSearch(text)

        }

    }

    const clearSearch = () => {
        setSearch('')
        searchFiter('')
    }
    const handleSitePress = (id) => {
        navigation.navigate('AssetScreen', { siteId: id });
    }

    if (isloading) {
        return <ActivityIndicator />;
    }

    return (
        <KeyboardAvoidingView>

            <View >
                <View style={AppStyle.searchWrapper}>
                    <Ionicons style={AppStyle.searchIcon} size={18} name="search" color="black" />
                    <TextInput style={AppStyle.searchInput} placeholder="Search Here"
                        placeholderTextColor="white" value={search} onChangeText={(text) => searchFiter(text)}
                    />
                    <TouchableOpacity onPress={clearSearch}>
                        <Ionicons style={AppStyle.searchIcon} size={18} name="close" color="black" />
                    </TouchableOpacity>


                </View>
                <View style={{ width: '100%', height: '100%' }}>
                    <FlatList
                        data={siteData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={AppStyle.siteListContainer}>
                                <TouchableOpacity style={AppStyle.siteList}
                                    onPress={() => handleSitePress(item.id)}>
                                    <Text style={AppStyle.siteListText}>{item.name}</Text>
                                </TouchableOpacity>
                            </View>

                        )}
                    />
                </View>

            </View>



        </KeyboardAvoidingView>


    );
}

export default SiteScreen;