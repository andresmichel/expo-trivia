import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../utilities/appearence';

interface BackgroundProps {
    style?: any,
    children?: any,
}

const Background = (props: BackgroundProps) => {
    const theme = useTheme();
    const inlineProps = {
        ...props,
        style: [
            styles.container,
            { backgroundColor: theme.backgroundColor },
            props.style,
        ],
    };
    return <View {...inlineProps} />;
}

Background.defaultProps = {
    // 
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Background;