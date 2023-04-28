import { View, Image, Text, TouchableOpacity, FlatList, ScrollView, StyleSheet, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';

import { BarChart } from 'react-native-chart-kit';
import colors from '../Config/colors';
import { useIsFocused } from '@react-navigation/native';
import { getCollectionData, getDropdownCollectionData, getSubcollectionData } from '../../FirestoreUtils';

import { Dropdown } from 'react-native-element-dropdown';
import formStyle from './FormSytle';
import { Formik } from 'formik';

export default function AssetDashbordScreen() {

    const isFocused = useIsFocused();

    // Load Site, Asset, and Grade Data
    const [siteData, setSiteData] = useState([]);
    const [assetInspectionData, setAssetInspectionData] = useState([]);
    const [noAssetInspectionData, setNoAssetInspectionData] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState(null);
    const [showAssetData, setShowAssetData] = useState(false);
    const [isEmptySiteArray, setIsEmptySiteArray] = useState(false);
    const [grade3aCount, setGrade3aCount] = useState(0);
    const [grade3bCount, setGrade3bCount] = useState(0);
    const [grade4aCount, setGrade4aCount] = useState(0);
    const [grade4bCount, setGrade4bCount] = useState(0);
    const [grade3aAssetData, setGrade3aAssetData] = useState([]);
    const [grade3bAssetData, setGrade3bAssetData] = useState([]);
    const [grade4aAssetData, setGrade4aAssetData] = useState([]);
    const [grade4bAssetData, setGrade4bAssetData] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalAssetData, setModalAssetData] = useState([]);
    const [modalAssetHeader, setModalAssetHeader] = useState('');


    useEffect(() => {
        if (isFocused) {
            // fetch all sites
            async function fetchSiteData() {
                const data = await getDropdownCollectionData('site');
                setSiteData(data);
            }
            fetchSiteData();
            setShowAssetData(false)
            setIsEmptySiteArray(false)
        }


    }, [isFocused])

    async function fetchAssetData(siteId) {

        // Fetch Asset by siteId
        const assetArrayData = await getSubcollectionData(siteId, siteId);
        const inspectionData = await getCollectionData('inspection')
        const inspections = [];
        inspectionData.forEach((doc) => {
            if (doc.createdAt && doc.createdAt.toDate) {
                doc.createdAt = doc.createdAt.toDate().toLocaleDateString();
            }
            inspections.push({
                assetName: doc.assetName,
                assetid: doc.assetid,
                inspectionCount: 1,
                grade: doc.grade,
                gradeName: doc.gradeName,
                date: doc.createdAt,
                id: doc.id,

            });
        });

        const groupedData = inspections.reduce((acc, inspection) => {
            const asset = assetArrayData.find((a) => a.value === inspection.assetid);
            if (asset) {
                const { name, value } = asset;
                acc[value] = {
                    name,
                    value,
                    count: (acc[value] ? acc[value].count : 0) + 1,
                };
            }
            return acc;
        }, {});
        const assetCountArray = Object.values(groupedData);
        setAssetInspectionData(assetCountArray);

        if (assetCountArray.length === 0) {
            setIsEmptySiteArray(true)
        }
        else {

            setIsEmptySiteArray(false)

        }

        // filter  assets that have been not been inspected
        const noAssetInspection = assetArrayData.filter((asset) => {
            return !inspectionData.some((inspection) => inspection.assetid === asset.value);
        });

        setShowAssetData(true)
        setNoAssetInspectionData(noAssetInspection);


        // Filter asset grade condition for the 

        const filteredInspectionData = inspectionData.filter(data =>
            assetArrayData.some(a => a.value === data.assetid)
        );

        const grade3aFilteredData = filteredInspectionData.filter(item => item.gradeName === '3a');
        setGrade3aCount(grade3aFilteredData.length);
        setGrade3aAssetData(grade3aFilteredData);

        const grade3bFilteredData = filteredInspectionData.filter(item => item.gradeName === '3b');
        setGrade3bCount(grade3bFilteredData.length);
        setGrade3bAssetData(grade3bFilteredData);

        const grade4aFilteredData = filteredInspectionData.filter(item => item.gradeName === '4a');
        setGrade4aCount(grade4aFilteredData.length);
        setGrade4aAssetData(grade4aFilteredData);

        const grade4bFilteredData = filteredInspectionData.filter(item => item.gradeName === '4b');
        setGrade4bCount(grade4bFilteredData.length);
        setGrade4bAssetData(grade4bFilteredData)


    }

    const handleShowAssetModal = (grade) => {
        setModalAssetData([])
        setModalAssetHeader('Grade ' + grade + ' Asset')
        if (grade === "3a") {
            setModalAssetData(grade3aAssetData)
        }
        else if (grade === "3b") {
            setModalAssetData(grade3bAssetData)

        }
        else if (grade === "4a") {
            setModalAssetData(grade4aAssetData)

        }
        else if (grade === "4b") {
            setModalAssetData(grade4bAssetData)

        }


        console.log(JSON.stringify(modalAssetData))

        setModalVisible(true)
    }
    const chartConfig = {
        backgroundColor: '#FFFDD0',
        backgroundGradientFrom: '#FFFDD0',
        backgroundGradientTo: '#FFFDD0',
        color: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`, // custom color function
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 3, // optional, default 3
        useShadowColorFromDataset: false, // optional
        yLabel: "Number of times inspected",
        xLabelStyle: "Site names",
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
        labels: assetInspectionData.map(item => item.name),
        datasets: [
            {
                data: assetInspectionData.map(item => item.count),

            },

        ],
    };
    const initialValues = {
        site: '',

    };
    return (
        <>
            <View style={{ flex: 1, padding: 10, backgroundColor: 'white' }}>


                <Formik initialValues={initialValues}>
                    {
                        ({ handleChange }) => (
                            <Dropdown
                                style={[formStyle.dropdown, isFocus && { borderColor: colors.brand }]}
                                placeholderStyle={formStyle.dropdownplaceholderStyle}
                                selectedTextStyle={formStyle.dropdownselectedTextStyle}
                                inputSearchStyle={formStyle.dropdowninputSearchStyle}
                                iconStyle={formStyle.dropdowniconStyle}
                                data={siteData}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Select Site' : '...'}
                                searchPlaceholder="Search Site..."
                                value={initialValues.site}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setValue(item.value);
                                    fetchAssetData(item.value)
                                    setIsFocus(false);
                                    handleChange('site')(item.value);
                                }}

                            />


                        )
                    }


                </Formik>

                {showAssetData &&


                    <ScrollView>
                        {!isEmptySiteArray ? (
                            <View>

                                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: colors.brand, marginBottom: 20, marginTop: 20 }}>Asset Grade </Text>

                                <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                                    <TouchableOpacity onPress={() => handleShowAssetModal("3a")} style={[styles.container, { backgroundColor: 'lightblue', }]}>
                                        <Text style={styles.text}>
                                            Grade:  3a
                                        </Text>
                                        <Text style={styles.textCount}>
                                            <Text>
                                                {grade3aCount}
                                            </Text>
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => handleShowAssetModal("3b")} style={[styles.container, { backgroundColor: 'lightgreen', }]}>
                                        <Text style={styles.text}>
                                            Grade: 3b
                                        </Text>
                                        <Text style={styles.textCount}>

                                            <Text>
                                                {grade3bCount}
                                            </Text>

                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                                    <TouchableOpacity onPress={() => handleShowAssetModal("4a")} style={[styles.container, { backgroundColor: 'lightpink', }]}>
                                        <Text style={styles.text}>
                                            Grade: 4a
                                        </Text>
                                        <Text style={styles.textCount}>
                                            {grade4aCount}
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => handleShowAssetModal("4b")} style={[styles.container, { backgroundColor: '#f73123', }]}>
                                        <Text style={styles.text}>
                                            Grade: 4b
                                        </Text>
                                        <Text style={styles.textCount}>
                                            {grade4bCount}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: colors.brand, marginBottom: 20 }}>Inspected Asset</Text>
                                    <BarChart
                                        data={barData}
                                        width={400}
                                        height={400}
                                        yAxisSuffix=" "
                                        yAxisProps={{ fromZero: true }}
                                        chartConfig={chartConfig}
                                        verticalLabelRotation={40}
                                        style={{
                                            marginVertical: 8,
                                            borderRadius: 16,
                                            backgroundColor: "#fff",
                                        }}
                                    />
                                </View>
                                <View>
                                    <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: colors.brand, marginBottom: 15 }}> Non-Inspected Asset</Text>
                                    {noAssetInspectionData.map((item, index) => (
                                        <View key={index} style={{ backgroundColor: '#d0d8f2', padding: 10, borderBottomWidth: 1, borderColor: '#CCCCCC' }}>
                                            <Text style={{ color: '#133cc2', fontSize: 20, fontWeight: 'bold' }}>
                                                {item.name}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                        ) : (

                            <View>

                                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: colors.red, marginBottom: 15, marginTop: 30 }}>
                                    Selected Site has not been inspected
                                </Text>
                            </View>
                        )}

                    </ScrollView>


                }
                {!showAssetData &&
                    <View>

                        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: colors.red, marginBottom: 15, marginTop: 30 }}>
                            Select Site to  Display Asset Details
                        </Text>
                    </View>
                }


            </View>
            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <ScrollView style={styles.modalContent}>
                        <Text style={styles.modalHeader}> {modalAssetHeader} </Text>
                        {modalAssetData.map((item, index) => (
                            <View style={styles.modalItem} key={index}>
                                <Text style={styles.assetName}>{item.assetName}</Text>
                                <Text style={styles.assetDate}>{item.createdAt}</Text>
                                <View style={styles.modalDivider}></View>

                            </View>
                        ))}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </Modal>



        </>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: 'gray',
        padding: 10,
        width: '45%',
        height: 100,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        borderRadius: 10,
        borderWidth: 1,
        marginLeft: 10,
    },
    text: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        position: 'absolute',
        top: 10,
        left: 10,
    },
    textCount: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 10,
        right: 10,
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        maxHeight: 500,
        width: '90%',
    },
    modalHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    assetName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#1b77c2'
    },
    assetDate: {
        fontSize: 16,
    },
    modalDivider: {
        height: 1,
        backgroundColor: '#ccc',
        marginTop: 10,
    },
    closeButton: {
        alignSelf: 'flex-end',
        marginTop: 20,
        padding: 10,
        backgroundColor: 'gray',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    // modalContent: {
    //     backgroundColor: '#fff',
    //     borderRadius: 10,
    //     padding: 20,
    //     maxHeight: 300,
    //     width: '90%',
    // },
    // modalHeader: {
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //     marginBottom: 10,
    // },
    // modalList: {
    //     flex: 1,
    // },
    // modalItem: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     paddingVertical: 5,
    // },
    // assetName: {
    //     flex: 1,
    //     marginRight: 10,
    // },
    // assetDate: {
    //     fontSize: 12,
    //     color: '#666',
    // },
    // closeButton: {
    //     marginTop: 20,
    //     backgroundColor: '#ccc',
    //     padding: 10,
    //     borderRadius: 5,
    //     alignSelf: 'flex-end',
    // },
    // closeButtonText: {
    //     color: '#fff',
    //     fontWeight: 'bold',
    // },
});