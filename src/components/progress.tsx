import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import { useTheme } from '../utilities/appearence';
import Text from './text';

const STROKE_DASH_ARRAY = 45 * 2 * Math.PI;

interface ProgressProps {
    size: number,
    value: number,
    label: string,
}

const Progress = (props: ProgressProps) => {
    const theme = useTheme();
    return (
        <View style={[styles.container, { height: props.size, width: props.size }]}>
            <Svg height="100%" width="100%" viewBox="0 0 100 100">
                <Circle
                    cx="50"
                    cy="50"
                    r="45"
                    origin="50,50"
                    rotation="-90"
                    stroke={theme.lightColor}
                    opacity="0.3"
                    strokeLinecap="round"
                    strokeWidth="6"
                    fill="transparent"
                />
                <Circle
                    cx="50"
                    cy="50"
                    r="45"
                    origin="50,50"
                    rotation="-90"
                    stroke={theme.lightColor}
                    strokeLinecap="round"
                    strokeWidth="6"
                    strokeDashoffset={STROKE_DASH_ARRAY - props.value}
                    strokeDasharray={STROKE_DASH_ARRAY}
                    fill="transparent"
                />
            </Svg>
            <Text inverted style={styles.label}>{props.label}</Text>
        </View>
    );
}

Progress.defaultProps = {
    size: 40,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        position: 'absolute',
    }
});

export default Progress;