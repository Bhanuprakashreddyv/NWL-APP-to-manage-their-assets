import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons'
import colors from '../Config/colors';

// Screens 
import HomeScreen from '../screens/HomeScreen';
import SiteScreen from '../screens/SiteScreen';
import InspectionScreen from '../screens/InspectionScreen';
import ReportScreen from '../screens/ReportScreen';


const homeName = 'HomeScreen'
const siteName = 'SiteScreen'
const inspectionName = 'InspectionScreen'
const reportName = 'ReportScreen'

const Tab = createBottomTabNavigator();

function TabNavigators(props) {
    return (

        <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === homeName) {
                        iconName = focused
                            ? 'home'
                            : 'home-outline';
                    } else if (rn === siteName) {
                        iconName = focused
                            ? 'ios-list'
                            : 'ios-list-outline';
                    }
                    else if (rn === inspectionName) {
                        iconName = focused
                            ? 'add-circle'
                            : 'add-circle-outline';
                    }
                    else if (rn === reportName) {
                        iconName = focused
                            ? 'newspaper'
                            : 'newspaper-outline';
                    }
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.brand,
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: 'bold',
                },
                backgroundColor: 'transparent',
                tabBarStyle: {
                    paddingTop: 8,
                    paddingBottom: 8,
                },
                headerTitle: '',
                contentStyle: {
                    backgroundColor: 'transparent',
                },

            })}

        >
            <Tab.Screen name={homeName} component={HomeScreen} />
            <Tab.Screen name={siteName} component={SiteScreen} />
            <Tab.Screen name={inspectionName} component={InspectionScreen} />
            <Tab.Screen name={reportName} component={ReportScreen} />

        </Tab.Navigator>

    );
}

export default TabNavigators;