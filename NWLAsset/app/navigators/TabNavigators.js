import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons'
import colors from '../Config/colors';

// Screens 
import HomeScreen from '../screens/HomeScreen';
import SiteScreen from '../screens/SiteScreen';
import InspectionScreen from '../screens/InspectionScreen';
import ReportScreen from '../screens/ReportScreen';
import DashboardScreen from '../screens/DashboardScreen';
import SiteDashbordScreen from '../screens/SiteDashbordScreen';
import AssetDashbordScreen from '../screens/AssetDashbordScreen';


const homeName = 'HomeScreen'
const siteName = 'SiteScreen'
const inspectionName = 'InspectionScreen'
const reportName = 'ReportScreen'
const dashboardName = 'DashboardScreen'

const Tab = createBottomTabNavigator();



function DashboardTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                style: {
                    position: 'absolute',
                    bottom: 0,
                    left: 20,
                    right: 20,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: '#fff',
                    shadowColor: '#000',
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                    elevation: 5,
                }, 
                headerShown: false,                
                backgroundColor: 'green',

            }}>
            <Tab.Screen name="SiteDashbordScreen" component={SiteDashbordScreen} options={{
                headerTitle: 'Site', title: 'Site', headerTintColor: colors.brand, tabBarIcon: ({ color, size }) => (
                    <Ionicons name="business" size={size} color={color} />
                ),
            }} />
            <Tab.Screen name="AssetDashbordScreen" component={AssetDashbordScreen} options={{
                headerTitle: 'Asset', title: 'Asset', headerTintColor: colors.brand, tabBarIcon: ({ color, size }) => (
                    <Ionicons name="stats-chart-outline" size={size} color={color} />
                ),
            }} />
        </Tab.Navigator>
    );
}



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
                    else if (rn === dashboardName) {
                        iconName = focused
                            ? 'bar-chart'
                            : 'bar-chart-outline';
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
            <Tab.Screen name={homeName} component={HomeScreen} options={{ title: 'Home' }} />
            <Tab.Screen name={siteName} component={SiteScreen} options={{ headerTitle: 'Site', title: 'Site', headerTintColor: colors.brand }} />
            <Tab.Screen name={inspectionName} component={InspectionScreen} options={{ headerTitle: 'Add new Inspection', title: 'New Inspection', }} />
            <Tab.Screen name={reportName} component={ReportScreen} options={{ headerTitle: 'Reports', title: 'Report', }} />
            <Tab.Screen name={dashboardName} component={DashboardTabNavigator} options={{ headerTitle: 'Dashboard', title: 'Dashboard', }} />

        </Tab.Navigator>

    );
}

export default TabNavigators;