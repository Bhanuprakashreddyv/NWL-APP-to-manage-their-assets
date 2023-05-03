import React from 'react';
import { View, Text } from 'react-native';
import { ChartLegend } from 'react-native-chart-kit';

function CustomLegend({ data, color }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {data.map((item, index) => (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }} key={index}>
                    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: item.color }} />
                    <Text style={{ color: color, marginLeft: 5 }}>{item.name}</Text>
                </View>
            ))}
        </View>
    );
};

export default CustomLegend;
