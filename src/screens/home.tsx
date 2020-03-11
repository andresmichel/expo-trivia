import React, { useEffect } from 'react';
import { View, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { animated, useSpring } from 'react-spring';
import { fetchQuestions } from '../redux/trivia/actions';
import { toggleColorScheme } from '../redux/settings/actions';
import Text from '../components/text';
import Button from '../components/button';
import Background from '../components/background';
import logo from '../../assets/images/logo.png';

const AnimatedView = animated(View);

const HomeScreen = ({ navigation }) => {
    const { trivia } = useSelector(state => state);
    const dispatch = useDispatch();
    const [animatedScale, setAnimatedScale] = useSpring(() => ({
        scale: 1,
        from: { scale: 0.8 },
        config: { tension: 500, friction: 5 }
    }));
    useEffect(() => {
        if (trivia.questions.length < 1) dispatch(fetchQuestions());
    }, [trivia.questions]);
    return (
        <Background style={styles.container}>
            <View style={styles.content}>
                <TouchableWithoutFeedback
                    onPressIn={() => setAnimatedScale({ scale: 0.8 })}
                    onPressOut={() => setAnimatedScale({ scale: 1 })}>
                    <AnimatedView style={{ transform: [animatedScale] }}>
                        <Image style={styles.logo} source={logo} />
                    </AnimatedView>
                </TouchableWithoutFeedback>
                <Text style={styles.title}>Welcome to the Trivia Challenge!</Text>
                <Text style={styles.label}>You will be presented with 10 True or False questions.</Text>
                <Text style={styles.label}>Can you score 100%?</Text>
            </View>
            <View style={styles.darkModeButtonWrapper}>
                <Button
                    shape={'circle'}
                    type={'secondary'}
                    icon={'brightness-4'}
                    onPress={() => dispatch(toggleColorScheme())} />
            </View>
            <View style={styles.buttonWrapper}>
                <Button
                    style={styles.button}
                    title={'Begin'}
                    onPress={() => navigation.navigate('Quiz')} />
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        width: 240,
        alignItems: 'center',
    },
    logo: {
        height: 150,
        width: 150,
        marginBottom: 20,
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    label: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    darkModeButtonWrapper: {
        position: 'absolute',
        top: 60,
        right: 20,
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        maxWidth: 500,
    },
    button: {
        marginHorizontal: 20,
    },
});

export default HomeScreen;
