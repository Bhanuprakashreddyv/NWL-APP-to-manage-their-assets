import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, Image, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';

import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons'

import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';

// Camera libraries 
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker'
import * as VideoPicker from 'expo-image-picker';
import Exif from 'react-native-exif';


import colors from "../Config/colors";
import formStyle from './FormSytle';
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper"
import { getCollectionData, getDropdownCollectionData, getSubcollectionData } from '../../FirestoreUtils';
import AppStyle from './FormSytle';

const WINDOW_HEIGHT = Dimensions.get("window").height;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);

function InspectionScreen({ navigation }) {


    const [siteData, setSiteData] = useState([]);
    const [assetData, setAssetData] = useState([]);
    const [gradeData, setGradeData] = useState([]);

    useEffect(() => {
        async function fetchSiteData() {
            const data = await getDropdownCollectionData('site');
            setSiteData(data);
        }
        async function fetchGradeData() {
            const data = await getCollectionData('grade');
            console.log(data)
            setGradeData(data);
        }
        fetchSiteData();
        fetchGradeData();
    }, [])

    async function fetchAssetData(siteId) {
        const data = await getSubcollectionData(siteId, siteId);
        console.log(data)
        setAssetData(data);
    }
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const renderLabel = (label) => {
        if (value || isFocus) {
            return (
                <Text style={[formStyle.dropdownlabel, isFocus && { color: colors.brand }]}>
                    {label}
                </Text>
            );
        }
        return null;
    };

    const [message, setMessage] = useState('');
    const [textStyle, setTextStyle] = useState({});

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        let textStyle = {};
        type === 'FAILED' ? textStyle = formStyle.error : textStyle = formStyle.success;
        setTextStyle(textStyle);
    }

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
    const [images, setImages] = useState([]);
    const [video, setVideo] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [recording, setRecording] = useState(false);
    const [videoSource, setVideoSource] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const [cameraReady, setCameraReady] = useState(false);
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
    const [showVideo, setShowVideo] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [zoom, setZoom] = useState(0);
    const [zoomRatios, setZoomRatios] = useState([]);
    const [orientation, setOrientation] = useState(null);

    const cameraRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus === 'granted');

            const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasMediaLibraryPermission(mediaLibraryStatus === 'granted');
        })();

        const getZoomRatios = async () => {
            const ratios = await cameraRef.current.getAvailableCameraZoomRatiosAsync();
            setZoomRatios(ratios);
        };
        getZoomRatios();
    }, []);

    const onCameraReady = () => {
        setCameraReady(true);
    };

    const takePicture = async () => {
        if (cameraRef.current && cameraReady && !showVideo) {
            const options = { quality: 0.5, base64: true, skipProcessing: true };
            const photo = await cameraRef.current.takePictureAsync(options);
            const source = photo.uri;
            if (source) {
                //  await cameraRef.current.pausePreview();
                setIsPreview(true);
                setCapturedImage(photo.uri);
                console.log("picture source", source);
                const imageOrientation = await getOrientation(source);
                setOrientation(imageOrientation);
            }
            setImages([...images, photo.uri]);
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
   
    const handleZoom = event => {
        const { nativeEvent } = event;
        if (nativeEvent.state === State.ACTIVE) {
            const newZoom = zoom + (nativeEvent.scale - 1) / 10;
            if (newZoom >= 0 && newZoom <= 1) {
                setZoom(newZoom);
            }
        }
    };
    const startRecording = async () => {
        if (videoRef.current && cameraReady && showVideo) {
            setRecording(true);
            let video = await videoRef.current.recordAsync();
            console.log(video);
            setImages([...images, video.uri]);
        }
    };


    const stopRecording = async () => {
        if (videoRef.current && cameraReady && showVideo) {
            setRecording(false);
            await videoRef.current.stopRecording();
        }
    };
    const toggleVideoMode = () => {
        setShowVideo(!showVideo);
    };

    const onLongPressButton = () => {
        if (showVideo) {
            startRecording();
        }
    };

    const onLongPressButtonOut = () => {
        if (showVideo) {
            stopRecording();
        }
    };

    const cancelPreview = async () => {
        await cameraRef.current.resumePreview();
        setIsPreview(false);
        setVideoSource(null);
    };


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImages([...images, result.uri]);
        }
    };

    const pickVideo = async () => {
        let result = await VideoPicker.launchImageLibraryAsync({
            mediaTypes: VideoPicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setVideo(result.uri);
        }
    };


    const renderVideoRecordIndicator = () => (
        <View style={styles.recordIndicatorContainer}>
            <View style={styles.recordDot} />
            <Text style={styles.recordTitle}>{"Recording..."}</Text>
        </View>
    );
    const renderCaptureControl = () => (
        <View>

            <View style={styles.cameraButtonsView}>


                <TouchableOpacity
                    onPressIn={onLongPressButton}
                    onPressOut={onLongPressButtonOut}
                    onLongPress={() => setShowVideo(true)}
                    onPress={takePicture}
                    style={[styles.cameraButton, styles.cameraButtonCapture]}
                >

                    {/* {recording ? (
                                <View style={styles.recordingIndicator} />
                            ) : (
                                <View style={styles.cameraButtonInner} />
                            )} */}
                </TouchableOpacity>
            </View>
            <View style={styles.control}>


                <TouchableOpacity onPress={toggleVideoMode}>
                    <Text style={styles.cameraButton}>{showVideo ? 'Picture' : 'Video'}</Text>
                </TouchableOpacity>

            </View>
        </View>

    );




    const renderVideoPlayer = () => (
        <Video
            source={{ uri: videoSource }}
            shouldPlay={true}
            style={styles.media}
        />
    );


    if (hasCameraPermission === null || hasMediaLibraryPermission === null) {
        return <View />;
    }
    if (hasCameraPermission === false || hasMediaLibraryPermission === false) {
        return <Text>No access to camera or media library</Text>;
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
                        <Image source={{ uri: capturedImage }} style={[styles.previewImage, { transform: [{ rotate: orientation + 'deg' }] }]} />
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


                    <Formik initialValues={{ site: '', asset: '', comment: '', grade: '' }}
                        onSubmit={(values, { setSubmitting }) => {
                            if (values.site == '') {
                                handleMessage('Site is Required');
                                setSubmitting(false);
                            }
                            else if (values.asset == '') {
                                handleMessage('Asset is Required');
                                setSubmitting(false);
                            }
                            else if (values.comment == '') {
                                handleMessage('Comment is Required');
                                setSubmitting(false);
                            }
                            else {
                                // handleSignUp(values, setSubmitting)
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
                                                handleChange('site');
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
                                            valueField="id"
                                            placeholder={!isFocus ? 'Select Asset' : '...'}
                                            searchPlaceholder="Search asset..."
                                            value={values.asset}
                                            onFocus={() => setIsFocus(true)}
                                            onBlur={() => setIsFocus(false)}
                                            onChange={item => {
                                                setValue(item.value);
                                                setIsFocus(false);
                                                handleChange('asset');
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
                                            valueField="id"
                                            placeholder={!isFocus ? 'Select Grade' : '...'}
                                            value={values.asset}
                                            onFocus={() => setIsFocus(true)}
                                            onBlur={() => setIsFocus(false)}
                                            onChange={item => {
                                                setValue(item.value);
                                                setIsFocus(false);
                                                handleChange('grade');
                                            }}

                                        />

                                    </View>

                                    <View style={formStyle.inspectionFormContol}>
                                        <TextInput
                                            style={{ height: 150, borderColor: 'gray', borderWidth: 1, borderRadius: 10 }}
                                            onChangeText={handleChange('comment')}
                                            value={values.comment}
                                            multiline={true}
                                            placeholder="Enter Comment"
                                            placeholderTextColor={colors.darkLight}
                                            numberOfLines={10}
                                        />


                                    </View>
                                    <View style={{ alignContent: 'left', justifyContent: 'left', textAlign: 'right', borderWidth: 1, }} >
                                        <TouchableOpacity style={styles.captureButton} onPress={() => setShowCamera(true)}>
                                            <Ionicons name="camera-outline" size={30} color="black" />
                                        </TouchableOpacity>
                                        {/* <TouchableOpacity onPress={() => setShowCamera(true)}>

                                            <Text>Snap</Text>
                                        </TouchableOpacity> */}

                                    </View>

                                    <Text style={[formStyle.MsgBox, textStyle]}>{message}</Text>

                                    {!isSubmitting &&

                                        <TouchableOpacity onPress={handleSubmit} style={formStyle.styledButton}>
                                            <Text style={formStyle.buttonText}>

                                                Submit
                                            </Text>
                                        </TouchableOpacity>
                                    }
                                    {isSubmitting &&
                                        <TouchableOpacity style={formStyle.styledButton}>
                                            <ActivityIndicator size="large" color={colors.white} />
                                        </TouchableOpacity>
                                    }
                                    <View style={formStyle.line} />


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

    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
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

    // closeButton: {
    //     position: "absolute",
    //     top: 35,
    //     left: 15,
    //     height: closeButtonSize,
    //     width: closeButtonSize,
    //     borderRadius: Math.floor(closeButtonSize / 2),
    //     justifyContent: "center",
    //     alignItems: "center",
    //     backgroundColor: "#c4c5c4",
    //     opacity: 0.7,
    //     zIndex: 2,
    // },
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
        alignSelf: "center",
        position: 'relative',
        textAlign: 'left',
        left: 10,
    },
});
export default InspectionScreen;