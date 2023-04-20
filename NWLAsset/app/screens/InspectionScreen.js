import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-element-dropdown';

import { Octicons, Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
// Camera libraries 
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker'
import Exif from 'react-native-exif';


import colors from "../Config/colors";
import formStyle from './FormSytle';
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper"

import { getDropdownCollectionData, getSubcollectionData, saveDataToFirestore, updateDataInCollection } from '../../FirestoreUtils';
import { auth, storage } from '../../FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";


function InspectionScreen({ navigation }) {

    // Load Site, Asset, and Grade Data
    const [siteData, setSiteData] = useState([]);
    const [assetData, setAssetData] = useState([]);
    const [gradeData, setGradeData] = useState([]);


    const [images, setImages] = useState([]);
    const [showImages, setShowImages] = useState(false);
    const [videos, setVideos] = useState([]);

    const initialValues = {
        site: '',
        asset: '',
        comment: '',
        grade: '',
    };
    useEffect(() => {
        async function fetchSiteData() {
            const data = await getDropdownCollectionData('site');
            console.log(data)
            setSiteData(data);
        }
        async function fetchGradeData() {
            const data = await getDropdownCollectionData('grade');
            setGradeData(data);
        }
        fetchSiteData();
        fetchGradeData();

        // reset form values to empty every time component mounts
        initialValues.asset = '';
        initialValues.comment = '';
        initialValues.site = '';
        initialValues.grade = '';
        setImages([]);
        setVideos([]);
        setShowImages(false);

        console.log(images)
        console.log(videos)

    }, [])


    async function fetchAssetData(siteId) {
        const data = await getSubcollectionData(siteId, siteId);
        console.log(data)
        setAssetData(data);
    }

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);


    // Error Message 
    const [message, setMessage] = useState('');
    const [textStyle, setTextStyle] = useState({});
    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        let textStyle = {};
        type === 'FAILED' ? textStyle = formStyle.error : textStyle = formStyle.success;
        setTextStyle(textStyle);
    }

    // Camera and Picture 
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [showCamera, setShowCamera] = useState(false);
    const [cameraReady, setCameraReady] = useState(false);
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
    const [isPreview, setIsPreview] = useState(false);
    const [capturedImage, setCapturedImage] = useState(false);
    const [orientation, setOrientation] = useState(null);
    const [showVideo, setshowVideo] = useState(false);

    const cameraRef = useRef(null);
    const videoRef = useRef(null);

    const onCameraReady = () => {
        setCameraReady(true);
    };

    const takePicture = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to capture images!');
            return;
        }
        if (cameraRef.current && cameraReady && !showVideo) {
            const options = { quality: 0.5, base64: true, skipProcessing: true };
            const photo = await cameraRef.current.takePictureAsync(options);
            const source = photo.uri;
            if (source) {
                //  await cameraRef.current.pausePreview();
                setIsPreview(true);
                setCapturedImage(photo);
                console.log("picture source", source);
                const imageOrientation = await getOrientation(source);
                setOrientation(imageOrientation);
            }
            setShowCamera(true);

        }
    };

    // Function to get the orientation of the image
    const getOrientation = async (uri) => {
        try {
            const exifData = await Exif.getExif(uri);
            const orientation = exifData.Orientation;
            return orientation;
        } catch (error) {
            console.log('Error getting exif data:', error.message);
        }
    }

    const usePhoto = () => {
        setImages([...images, capturedImage]);
        setCapturedImage(null);
        setIsPreview(false);
        setShowCamera(false);
        setShowImages(true);

    };

    const retakePhoto = async () => {
        setIsPreview(false);
        setCapturedImage(null);

    };

    const toggleCameraType = () => {
        setCameraType((prevCameraType) =>
            prevCameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };
    const toggleFlashMode = () => {
        setFlashMode(
            flashMode === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.on
                : Camera.Constants.FlashMode.off
        );
    };
    const handleDeleteImage = (index) => {
        console.log('Deleting image at index', index);
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };


    const uploadMedia = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need media library permissions to upload images and videos!');
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true, // Allow multiple selection

        });

        console.log(result)

        if (!result.canceled && result.assets) {

            const selectedImages = result.assets.filter((asset) => asset.type === 'image');
            setImages([...images, ...selectedImages.map((image) => ({ uri: image.uri }))]);
            const selectedVideos = result.assets.filter((asset) => asset.type === 'video');
            setVideos([...videos, ...selectedVideos.map((video) => ({ uri: video.uri }))]);

            setShowImages(true);
        }

    };

    const handleDeleteVideo = (index) => {
        setSelectedVideoIndex(index);
        // show confirmation dialog
        Alert.alert(
            'Delete Video',
            'Are you sure you want to delete this video?',
            [
                {
                    text: 'Cancel',
                    onPress: () => setSelectedVideoIndex(null),
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        const newVideos = [...videos];
                        newVideos.splice(index, 1);
                        setVideos(newVideos);
                        setSelectedVideoIndex(null);
                    },
                    style: 'destructive'
                }
            ],
            { cancelable: true }
        );
    };

    const handleImagePress = (image) => {
        // setSelectedImage(image);
    };



    async function submitInspectionData(values, setSubmitting) {
        try {

            // Get the current user's ID
            const user = auth.currentUser;
            const userId = user ? user.uid : null;

            // Save the form data to Firestore
            const docId = await saveDataToFirestore('inspection', {
                siteid: values.site,
                assetid: values.asset,
                comment: values.comment,
                grade: values.grade,
                userId: userId,
            });

            console.log('Data saved to Firestore with ID:', docId);

            // Upload images to Firebase Storage 
            const imageUrls = await Promise.all(images.map(async (image, index) => {
                const filename = `inspection_${docId}_${index}`;
                const storageRef = ref(storage, `inspections/${filename}`);
                await uploadBytes(storageRef, image.uri);
                const downloadUrl = await getDownloadURL(storageRef);
                return { url: downloadUrl };

            })
            );

            console.log('Image URLs:', JSON.stringify(imageUrls));

            // Upload videos to Firebase Storage 
            const videoUrls = await Promise.all(
                videos.map(async (video, index) => {
                    const filename = `inspection_${docId}_${index}`;
                    const storageRef = ref(storage, `inspections/${filename}`);
                    await uploadBytes(storageRef, video.uri);
                    const downloadUrl = await getDownloadURL(storageRef);
                    return { url: downloadUrl };
                })
            );

            console.log('Video URLs:', JSON.stringify(videoUrls));

            // Update inspection data in Firestore with download URLs of media files
            await updateDataInCollection('inspection', docId, {
                imageUrls: imageUrls,
                videoUrls: videoUrls,
            });

            setSubmitting(false);
            navigation.navigate('SuccessScreen')

        }

        catch (error) {
            console.error('Error saving data:', error);
            setSubmitting(false);
        }
    }


    if (showCamera) {
        return (

            <Camera
                style={styles.camera}
                ref={showVideo ? videoRef : cameraRef}
                onCameraReady={onCameraReady}
                type={cameraType}
                flashMode={flashMode}
                mirrorImage={cameraType === Camera.Constants.Type.front ? true : false}
                onMountError={(error) => {
                    console.log("cammera error", error);
                }}
            >

                {isPreview && capturedImage ? (
                    <View style={styles.previewContainer}>
                        <Image source={{ uri: capturedImage.uri }} style={[styles.previewImage, { transform: [{ rotate: orientation + 'deg' }] }]} />
                        <View style={styles.previewButtons}>
                            <TouchableOpacity style={styles.useButton} onPress={usePhoto}>
                                <Text style={styles.previewText} >Use Photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.retakeButton} onPress={retakePhoto}>
                                <Text style={styles.previewText} >Retake</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) :

                    (

                        <View style={{ flex: 1 }}>
                            <View style={styles.topcontrolContainer} >
                                <View style={{ flex: 1 }} >
                                    <TouchableOpacity onPress={() => setShowCamera(false)} style={styles.closeButton}>
                                        <Ionicons name="close-circle-outline" size={30} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={toggleFlashMode} style={styles.flashButton}>
                                        <Ionicons name={flashMode === Camera.Constants.FlashMode.off ? "flash-off-outline" : "flash-outline"} size={30} color={flashMode === Camera.Constants.FlashMode.off ? "white" : "yellow"} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.bottomcontrolContainer} >
                                <View style={{ alignSelf: 'center', flex: 1, alignItems: 'center' }} >
                                    <TouchableOpacity onPress={takePicture} style={[styles.cameraButton, styles.cameraButtonCapture]} />
                                    <TouchableOpacity onPress={toggleCameraType} style={styles.flipButton}>
                                        <Ionicons name="camera-reverse-outline" size={30} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )

                }




            </Camera>


        )
    }
    return (
        <KeyBoardAvoidingWrapper>

            <View style={formStyle.inspectionStyledContainer}>
                <StatusBar style="dark" />
                <View style={formStyle.inspectioninnerContainer}>
                    <Formik initialValues={initialValues}
                        onSubmit={(values, { setSubmitting }) => {

                            if (!values.site || values.site === '') {
                                handleMessage('Site is Required');
                                setSubmitting(false);
                            }
                            else if (!values.asset || values.asset == '') {
                                handleMessage('Asset is Required');
                                setSubmitting(false);
                            }
                            else if (!values.grade || values.grade == '') {
                                handleMessage('Grade is Required');
                                setSubmitting(false);
                            }
                            else if (!values.comment || values.comment == '') {
                                handleMessage('Comment is Required');
                                setSubmitting(false);
                            }
                            else if (images.length == 0 || videos.length == 0) {
                                handleMessage('Media file is required .');
                                setSubmitting(false);
                            }
                            else if (videos.length > 1) {
                                handleMessage('You can only upload one video at a time.');
                                setSubmitting(false);
                            }
                            else if (images.length > 4) {
                                handleMessage('You can only upload four images at a time.');
                                setSubmitting(false);
                            }
                            else {

                                submitInspectionData(values, setSubmitting)
                            }


                        }}>

                        {
                            ({ handleChange, handleSubmit, values, isSubmitting }) => (
                                <View style={formStyle.inspectionFormArea}>
                                    <View>
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
                                            value={values.site}
                                            onFocus={() => setIsFocus(true)}
                                            onBlur={() => setIsFocus(false)}
                                            onChange={item => {
                                                console.log(item.value)
                                                setValue(item.value);
                                                fetchAssetData(item.value)
                                                setIsFocus(false);
                                                handleChange('site')(item.value);
                                            }}

                                        />

                                    </View>
                                    <View style={formStyle.inspectionFormContol}>
                                        <Dropdown
                                            style={[formStyle.dropdown, isFocus && { borderColor: colors.brand }]}
                                            placeholderStyle={formStyle.dropdownplaceholderStyle}
                                            selectedTextStyle={formStyle.dropdownselectedTextStyle}
                                            inputSearchStyle={formStyle.dropdowninputSearchStyle}
                                            iconStyle={formStyle.dropdowniconStyle}
                                            data={assetData}
                                            search
                                            maxHeight={300}
                                            labelField="label"
                                            valueField="value"
                                            placeholder={!isFocus ? 'Select Asset' : '...'}
                                            searchPlaceholder="Search asset..."
                                            value={values.asset}
                                            onFocus={() => setIsFocus(true)}
                                            onBlur={() => setIsFocus(false)}
                                            onChange={item => {
                                                console.log(item.value)
                                                setValue(item.value);
                                                setIsFocus(false);
                                                handleChange('asset')({ target: { value: item.value } });
                                            }}

                                        />

                                    </View>
                                    <View style={formStyle.inspectionFormContol}>

                                        <Dropdown
                                            style={[formStyle.smalldropdown, isFocus && { borderColor: colors.brand }]}
                                            placeholderStyle={formStyle.dropdownplaceholderStyle}
                                            selectedTextStyle={formStyle.dropdownselectedTextStyle}
                                            inputSearchStyle={formStyle.dropdowninputSearchStyle}
                                            iconStyle={formStyle.dropdowniconStyle}
                                            data={gradeData}
                                            maxHeight={300}
                                            labelField="label"
                                            valueField="value"
                                            placeholder={!isFocus ? 'Select Grade' : '...'}
                                            value={values.grade}
                                            onFocus={() => setIsFocus(true)}
                                            onBlur={() => setIsFocus(false)}
                                            onChange={item => {
                                                setValue(item.value);
                                                setIsFocus(false);
                                                handleChange('grade')({ target: { value: item.value } });
                                            }}

                                        />

                                    </View>

                                    <View style={formStyle.inspectionFormContol}>
                                        <TextInput
                                            style={{ height: 150, borderColor: 'gray', padding: 10, borderWidth: 1, borderRadius: 10 }}
                                            onChangeText={handleChange('comment')}
                                            value={values.comment}
                                            multiline={true}
                                            placeholder="Enter Comment"
                                            placeholderTextColor={colors.darkLight}
                                            numberOfLines={10}
                                        />


                                    </View>

                                    {showImages &&
                                        <View style={{ padding: 2 }}>
                                            {images.length > 0 && (
                                                <FlatList
                                                    data={images}
                                                    keyExtractor={(item, index) => index.toString()}
                                                    numColumns={2}
                                                    renderItem={({ item, index }) => (
                                                        <View style={{ flex: 1 / 2 }}>
                                                            <TouchableOpacity onPress={() => handleImagePress(item)} style={{ marginTop: 5, margin: 5 }}>
                                                                <Image
                                                                    source={{ uri: item.uri }}
                                                                    style={{ width: '100%', height: 350, borderRadius: 5 }}
                                                                />

                                                                <TouchableOpacity
                                                                    style={{ position: 'absolute', top: 8, right: 8 }}
                                                                    onPress={() => handleDeleteImage(index)}
                                                                >
                                                                    <Ionicons name="md-trash" size={24} color="#ffffff" />
                                                                </TouchableOpacity>
                                                            </TouchableOpacity>
                                                        </View>
                                                    )}
                                                    contentContainerStyle={{ paddingHorizontal: 8, paddingVertical: 16 }}
                                                />
                                            )}

                                            {videos.length > 0 && (
                                                <FlatList
                                                    data={videos}
                                                    keyExtractor={(item) => item.id}
                                                    renderItem={({ item, index }) => (
                                                        <View style={{ flex: 1 / 2 }}>
                                                            <Video source={{ uri: item.uri }}
                                                                style={{ width: '100%', height: 350, borderRadius: 5 }}
                                                                resizeMode="cover"
                                                                useNativeControls={true} />
                                                            <TouchableOpacity
                                                                style={{ position: 'absolute', top: 8, right: 8 }}
                                                                onPress={() => handleDeleteVideo(index)}
                                                            >
                                                                <Ionicons name="md-trash" size={24} color="#ffffff" />
                                                            </TouchableOpacity>
                                                        </View>
                                                    )}
                                                />
                                            )}
                                        </View>

                                    }

                                    <View style={{ flex: 1, flexDirection: 'row' }} >
                                        <TouchableOpacity style={styles.captureButton} onPress={uploadMedia}>
                                            <Octicons name="image" size={30} color="#047717" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.captureButton} onPress={() => setShowCamera(true)}>
                                            <Ionicons name="camera-outline" size={30} color="#047717" />
                                        </TouchableOpacity>

                                    </View>


                                    <Text style={[formStyle.MsgBox, textStyle]}>{message}</Text>

                                    {!isSubmitting &&

                                        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                                            <Text style={formStyle.buttonText}>

                                                Submit
                                            </Text>
                                        </TouchableOpacity>
                                    }
                                    {isSubmitting &&
                                        <TouchableOpacity style={styles.submitButton}>
                                            <ActivityIndicator size="large" color={colors.white} />
                                        </TouchableOpacity>
                                    }


                                </View>


                            )
                        }
                    </Formik>
                </View>
            </View>
        </KeyBoardAvoidingWrapper>

    );
}
const styles = StyleSheet.create({

    bottomcontrolContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        padding: 20,
        justifyContent: 'space-between'
    },
    topcontrolContainer: {
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        padding: 20,
        justifyContent: 'space-between'
    },
    camera: {
        flex: 1,
        width: "100%",
        height: "100%"
    },

    cameraButton: {
        color: '#fff',
        fontSize: 18,
    },
    cameraButtonCapture: {
        width: 70,
        height: 70,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: '#fff',

    },
    closeButton: {
        position: 'absolute',
        left: 0,
        top: 0,
    },
    flashButton: {
        position: 'absolute',
        right: 0,
        top: 0,
    },
    flipButton: {
        position: "absolute",
        bottom: 20,
        right: 100,

    },
    previewContainer: {
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',


    },
    previewImage: {
        flex: 1,
    },

    previewButtons: {
        flexDirection: 'row',
        position: "absolute",
        bottom: 7,
    },

    useButton: {
        color: 'white',
        fontSize: 14,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: colors.white,
        padding: 8,
        backgroundColor: colors.white,
        left: 320

    },

    retakeButton: {
        borderWidth: 1,
        borderRadius: 15,
        borderColor: colors.white,
        padding: 8,
        backgroundColor: colors.white,
        right: 70,
    },
    previewText: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold'
    },

    submitButton: {
        backgroundColor: colors.brand,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 5,
        height: 60,

    },
    container: {
        flex: 1,
        //width: Dimensions.get('window').width,
        //height: Dimensions.get('window').height,
    },
    cameraView: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,

    },

    cameraButtonInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 5,
        borderColor: '#f00',
    },
    recordingIndicator: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 5,
        borderColor: '#f00',
        position: 'relative',
        top: 5,
        left: 5,
        backgroundColor: 'rgba(255,0,0,0.5)',
    },
    cameraIcon: {
        fontSize: 20,
        color: 'blue',
        marginVertical: 20,
    },

    galleryButton: {
        backgroundColor: 'white',
        borderRadius: 20,
        height: 40,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    galleryButtonText: {
        fontSize: 18,
    },

    media: {
        ...StyleSheet.absoluteFillObject,
    },
    closeCross: {
        width: "68%",
        height: 1,
        backgroundColor: "black",
    },

    recordIndicatorContainer: {
        flexDirection: "row",
        position: "absolute",
        top: 25,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        opacity: 0.7,
    },
    recordTitle: {
        fontSize: 14,
        color: "#ffffff",
        textAlign: "center",
    },
    recordDot: {
        borderRadius: 3,
        height: 6,
        width: 6,
        backgroundColor: "#ff0000",
        marginHorizontal: 5,
    },
    text: {
        color: "#fff",
    },
    zoomOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "transparent",
    },

    captureButton: {
        left: 10,
        borderRadius: 10,
        padding: 15,
        marginTop: 15,
        marginRight: 15,
        borderWidth: 1,
        borderColor: colors.brand,

    },
});
export default InspectionScreen;