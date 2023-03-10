import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { db } from '../../FirebaseConfig';
import { getDocs, doc, collection, onSnapshot } from 'firebase/firestore';
import colors from '../Config/colors';
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
            const siteList = snapshot.docs.map((doc) => doc.data());
            console.log(siteList)
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
    if (isloading) {
        return <ActivityIndicator />;
    }

    return (
        <KeyboardAvoidingView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <View style={AppStyle.searchWrapper}>
                        <Ionicons style={AppStyle.searchIcon} size={18} name="search" color="black" />
                        <TextInput style={AppStyle.searchInput} placeholder="Search Here"
                            placeholderTextColor="white" value={search} onChangeText={(text) => searchFiter(text)}
                        />
                        <TouchableOpacity onPress={clearSearch}>
                            <Ionicons style={AppStyle.searchIcon} size={18} name="close" color="black" />
                        </TouchableOpacity>


                    </View>
                    <View >
                        <FlatList
                            data={siteData}
                            keyExtractor={site => site.id}
                            renderItem={({ item }) => (
                                <View style={AppStyle.siteListContainer}>
                                    <TouchableOpacity style={AppStyle.siteList}>
                                        <Text style={AppStyle.siteListText}>{item.name}</Text>
                                    </TouchableOpacity>
                                </View>

                            )}
                        />
                    </View>

                </View>

            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>


    );
}

export default SiteScreen;