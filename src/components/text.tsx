import React from 'react';
import { Text as TextComponent } from 'react-native';
import { useTheme } from '../utilities/appearence';

interface TextProps {
    style?: any,
    inverted: boolean,
    children?: any,
}

const Text = (props: TextProps) => {
    const theme = useTheme();
    const inlineProps = {
        ...props,
        style: [
            { color: props.inverted ? theme.lightColor : theme.darkColor },
            props.style,
        ]
    };
    return <TextComponent {...inlineProps} />;
}

Text.defaultProps = {
    inverted: false,
};

export default Text;