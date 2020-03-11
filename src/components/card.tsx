import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../utilities/appearence';

interface CardProps {
    style?: any,
    children?: any,
}

const Card = (props: CardProps) => {
    const theme = useTheme();
    return (
        <View style={[
            styles.container,
            { backgroundColor: theme.lightColor },
            props.style,
        ]}>
            {props.children}
        </View>
    );
}

Card.defaultProps = {
    // 
};

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 400,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { height: 10, width: 0 },
        elevation: 10,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
    }
});

export default Card;