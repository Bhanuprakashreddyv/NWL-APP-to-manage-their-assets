import React, { useState } from "react";
import { View, TextInput } from "react-native";
import AppStyle from "../screens/AppStyle";
import Ionicons from '@expo/vector-icons/Ionicons'
function Search({ onSearchEnter }) {
    const [term, setTerm] = useState("");
    return (

        <View style={AppStyle.searchWrapper}>
            <Ionicons style={AppStyle.searchIcon} size={18} name="search" color="black" />
            <TextInput style={AppStyle.searchInput} placeholder="Search"
                placeholderTextColor="white" value={term} onChangeText={(text) => setTerm(text)}
                onEndEditing={() => {
                    onSearchEnter(term);
                }} />
            <Ionicons style={AppStyle.searchIcon} size={18} name="close" color="black" />

        </View>
    );
}

export default Search;