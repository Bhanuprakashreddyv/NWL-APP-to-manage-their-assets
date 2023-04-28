import { View, Image, Text, TouchableOpacity, FlatList, ScrollView, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

import { BarChart, PieChart } from 'react-native-chart-kit';
import colors from '../Config/colors';
import { collection, getDocs, query, where, orderBy, collectionGroup } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';
import { useIsFocused } from '@react-navigation/native';
import { getCollectionData } from '../../FirestoreUtils';

export default function SiteDashbordScreen() {
    const [siteInspections, setSiteInspections] = useState([]);
    const [noInspections, setNoInspections] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {

            // Fetch site inspections
            const fetchSiteInspectionData = async () => {
                const inspectionsRef = collection(db, 'inspection');
                const q = query(inspectionsRef, orderBy('siteName'));
                const querySnapshot = await getDocs(q);

                const inspections = [];
                querySnapshot.forEach((doc) => {
                    inspections.push({
                        siteName: doc.data().siteName,
                        inspectionCount: 1,
                    });
                });
                const groupedData = inspections.reduce((acc, { siteName, inspectionCount }) => {
                    const key = siteName.toLowerCase().trim();
                    acc[key] = acc[key] || { siteName, inspectionCount: 0 };
                    acc[key].inspectionCount += inspectionCount;
                    return acc;
                }, {});

                const siteInspectionsData = Object.values(groupedData);
                setSiteInspections(siteInspectionsData);
            };

            // Fetch sites with no inspections
            const fetchNonSiteInspectData = async () => {
                const siteArray = await getCollectionData('site');
                const inspectionData = await getCollectionData('inspection')
                const noInspectionsData = siteArray.filter((site) => {
                    // check if the current site's id is in the inspectionArray
                    return !inspectionData.some((inspection) => inspection.siteid === site.id);
                });

                console.log(noInspectionsData);
                setNoInspections(noInspectionsData);
            };

            fetchSiteInspectionData();
            fetchNonSiteInspectData();
        }


    }, [isFocused])


    const chartConfig = {
        backgroundColor: '#FFFDD0',
        backgroundGradientFrom: '#FFFDD0',
        backgroundGradientTo: '#FFFDD0',
        color: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`, // custom color function
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        useShadowColorFromDataset: false, // optional
        yLabel: "Number of times inspected",
        xLabelStyle: "Site names",
        formatLabel: (value, index) => value,
        xLabelStyle: {
            fontSize: 14,
            color: "black",
            marginHorizontal: -10,
            marginBottom: 10,
        },
        yLabelStyle: {
            fontSize: 14,
            color: "#fff",
            marginLeft: 10,
            marginTop: -10,
        },
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
        },
    };
    const barData = {
        labels: siteInspections.map(item => item.siteName),
        datasets: [
            {
                data: siteInspections.map(item => item.inspectionCount),

            },

        ],
    };

    const pieData = siteInspections.map(item => ({
        name: item.siteName,
        count: item.inspectionCount,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    }));

    const renderSiteInspectionItem = ({ item }) => {
        return (
            <View style={styles.siteInspectionItem}>
                <Text style={styles.siteName}>{item.siteName}</Text>
            </View>
        );
    };

    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ScrollView>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: colors.brand, marginBottom: 20 }}>Inspected Sites</Text>
                        <BarChart
                            data={barData}
                            width={400}
                            height={400}
                            yAxisSuffix=" "
                            yAxisProps={{ fromZero: true }}
                            chartConfig={chartConfig}
                            verticalLabelRotation={40}
                            yAxisLabel=""
                            yAxisInterval={1}
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                                backgroundColor: "#fff",
                            }}
                        />
                    </View>
                    {/* <View style={{ marginTop: 20 }}>
                        <Text style={{ textAlign: 'center', fontSize: 20 }}>Pie Chart</Text>
                        <PieChart
                            data={pieData}
                            width={400}
                            height={400}
                            chartConfig={chartConfig}
                            accessor="count"
                            backgroundColor="transparent"
                            paddingLeft="50"
                            center={[10, 10]}
                            radius={100} // set the radius to a larger value
                        />
                    </View> */}

                    <View>
                        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: colors.brand, marginBottom: 15 }}> Non-Inspected Sites</Text>

                        {/* <FlatList
                            data={noInspections}
                            renderItem={renderSiteInspectionItem}
                            keyExtractor={(item) => item.siteName}
                        /> */}

                        {noInspections.map((item, index) => (
                            <View key={index} style={{ backgroundColor: '#d0d8f2', padding: 10, borderBottomWidth: 1, borderColor: '#CCCCCC' }}>
                                <Text style={{ color: '#133cc2', fontSize: 20, fontWeight: 'bold' }}>
                                    {item.name}
                                </Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>


            </View>



        </>
    )



}


const styles = StyleSheet.create({
    siteInspectionItem: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F0F8FF', // light blue color
        marginBottom: 5,
    },
    siteName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'blue',
    },
    inspectionCount: {
        fontSize: 18,
        color: 'blue',
    },
});

