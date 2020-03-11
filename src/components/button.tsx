import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../utilities/appearence';
import Text from './text';

interface ButtonProps {
    style?: any,
    title?: string,
    type: 'default' | 'secondary',
    shape: 'default' | 'circle',
    icon?: string,
    block: boolean,
    disabled: boolean,
    onPress(): any,
}

const Button = (props: ButtonProps) => {
    const [isPressed, setIsPressed] = useState(false);
    const theme = useTheme();
    return (
        <TouchableWithoutFeedback
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onPress={() => {
                props.onPress();
                Haptics.selectionAsync();
            }}
            disabled={props.disabled}
        >
            <View style={[
                styles.button,
                props.block && styles.buttonBlock,
                { backgroundColor: theme.primaryColor },
                props.type === 'secondary' && { backgroundColor: theme.backgroundColor },
                isPressed && { backgroundColor: theme.buttonBackgroundActiveColor },
                isPressed && props.type === 'secondary' && { backgroundColor: theme.primaryColor },
                props.shape === 'circle' && styles.circleButton,
                props.style,
            ]}>
                {
                    props.shape === 'circle' &&
                    <View style={styles.iconWrapper}>
                        <MaterialIcons
                            name={props.icon}
                            size={24}
                            color={isPressed ? theme.lightColor : theme.darkColor} />
                    </View>
                }
                {
                    Boolean(props.title) &&
                    <Text
                        style={styles.label}
                        inverted={isPressed || props.type !== 'secondary'}>
                        {props.title}
                    </Text>
                }
            </View>
        </TouchableWithoutFeedback>
    );
}

Button.defaultProps = {
    type: 'default',
    shape: 'default',
    block: false,
    disabled: false,
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        borderRadius: 5,
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    buttonBlock: {
        width: '100%',
    },
    circleButton: {
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconWrapper: {
        position: 'absolute',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Button;