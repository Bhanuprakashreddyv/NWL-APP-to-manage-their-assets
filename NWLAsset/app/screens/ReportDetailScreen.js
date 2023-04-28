import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Image } from 'react-native';
import { Video } from 'expo-av';

import KeyBoardAvoidingWrapper from '../components/KeyBoardAvoidingWrapper';

import { getDocByID } from '../../FirestoreUtils';
import { useIsFocused } from '@react-navigation/native';

function ReportDetailScreen({ route }) {
    const inspectionId = route.params.inspectionId;
    const [inspectionData, setInspectionData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    
    useEffect(() => {
        async function fetchInspectionData() {
            const data = await getDocByID('inspection', inspectionId);

            console.log('Data  ' + JSON.stringify(data))
            if (data.createdAt && data.createdAt.toDate) {
                data.createdAt = data.createdAt.toDate().toLocaleDateString();
            }
            setInspectionData(data);
        }
        fetchInspectionData();
    }, [])

    const handleImagePress = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalVisible(true);
    }
    return (
        <>
            <ScrollView>
                <View>

                    <View style={styles.container}>
                        {/* <Text style={styles.heading}>Report Details</Text> */}

                        <View style={styles.row}>
                            <Text style={styles.label}>Asset Name:</Text>
                            <Text style={styles.value}>{inspectionData.assetName}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>Site Name:</Text>
                            <Text style={styles.value}>{inspectionData.siteName}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>Comment:</Text>
                            <Text style={styles.value}>{inspectionData.comment}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>Grade:</Text>
                            <Text style={styles.value}>{inspectionData.gradeName}</Text>
                        </View>


                        <View style={styles.row}>
                            <Text style={styles.label}>Image Count:</Text>
                            {inspectionData.imageUrls ? (
                                <Text style={styles.value}>{inspectionData.imageUrls.length}</Text>
                            ) : (
                                <Text style={styles.value}>0</Text>
                            )}
                        </View>

                        {inspectionData.imageUrls && (
                            <View style={styles.imageContainer}>
                                {inspectionData.imageUrls.map((imageUrl, index) => (
                                    <TouchableOpacity key={index} onPress={() => handleImagePress(imageUrl.url)}>
                                        <Image style={styles.image} source={{ uri: imageUrl.url }} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                        <View style={styles.row}>
                            <Text style={styles.label}>Inspected By :</Text>
                            <Text style={styles.value}>{inspectionData.userName}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Date Inspected :</Text>
                            <Text style={styles.value}>{inspectionData.createdAt}</Text>
                        </View>
                        {/* <View style={styles.row}>
                            <Text style={styles.label}>Video Count:</Text>
                            {inspectionData.videoUrls ? (
                                <Text style={styles.value}>{inspectionData.videoUrls.length}</Text>
                            ) : (
                                <Text style={styles.value}>0</Text>
                            )}
                        </View> */}



                        {/* <View style={styles.imageContainer}>
                            {inspectionData.imageUrls.map((imageUrl, index) => (
                                <Image key={index} style={styles.image} source={{ uri: imageUrl.url }} />
                            ))}
                        </View> */}

                        {/* <View style={styles.videoContainer}>
                            {inspectionData.videoUrls.map((videoUrl, index) => (
                                <Video key={index}
                                    source={{ uri: videoUrl.url }}
                                    resizeMode="cover"
                                    useNativeControls={true} />

                            ))}
                        </View> */}
                    </View>

                </View>

            </ScrollView>

            <Modal visible={modalVisible} transparent={true}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                    <Image style={styles.modalImage} source={{ uri: selectedImage }} resizeMode="contain" />
                </View>
            </Modal>
        </>
    );



}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white'
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        width: 150,
    },
    value: {
        flex: 1,
    },
    imageContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        margin: 5,
    },
    videoContainer: {
        marginBottom: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        zIndex: 1,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        marginTop: 30,
    },
    modalImage: {
        width: '90%',
        height: '90%',
    }

})
export default ReportDetailScreen