import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { animated, useSpring } from 'react-spring';
import { fetchQuestions, nextQuestion, setAnswer } from '../redux/trivia/actions';
import Background from '../components/background';
import Button from '../components/button';
import Card from '../components/card';
import Progress from '../components/progress';
import Text from '../components/text';
import { useTheme } from '../utilities/appearence';
import he from 'he';

const AnimatedView = animated(View);
const AnimatedProgress = animated(Progress);

const QuizScreen = (props) => {
    const { trivia } = useSelector(state => state);
    const dispatch = useDispatch();
    const theme = useTheme();
    // Selected value
    const [value, setValue] = useState(null);
    // Flip animation
    const [animatedFlip, setFlip] = useSpring(() => ({ f: 0 }));
    // Card enter and leave animation
    const [animatedCard, setCard] = useSpring(() => ({ c: -1 }));
    // Header enter and leave animation
    const [animatedHeader, setHeader] = useSpring(() => ({ h: 0 }));
    // Countdown progress animation
    const [animatedProgress, setProgress] = useSpring(() => ({
        p: 0,
        config: { duration: 10000 }, // Countdown duration (10 seconds)
    }));
    useEffect(() => {
        let timeoutId = null;
        // Save the answer in the state
        const save = (value) => dispatch(setAnswer(trivia.current, value));
        const next = () => {
            // Restet current value
            setValue(null);
            // Set the next question
            dispatch(nextQuestion());
        }
        const out = () => {
            // Stop the current progress
            setProgress({ p: animatedProgress.p.getValue(), immediate: true });
            // Start leave animations
            setFlip({ f: 1, immediate: false }); // Flip card
            setHeader({ h: 0, immediate: false }); // Hide header
            setCard({ c: 1, immediate: false, delay: 1000 }); // Hide Card
            if (trivia.current === (trivia.questions.length - 1)) {
                // If is the last question go to the results screen
                timeoutId = setTimeout(() => props.navigation.navigate('Results'), 2000);
            } else {
                // If not go to the next question
                timeoutId = setTimeout(next, 2000);
            }
        }
        const show = () => {
            // Reset animations to initial state
            setFlip({ f: 0, immediate: true });
            setCard({ c: -1, immediate: true });
            setProgress({ p: 0, immediate: true });
            // Start enter animations
            setHeader({ h: 1, immediate: false }); // Show header
            setProgress({
                p: 1,
                immediate: false,
                onRest: ({ p }) => {
                    // When countdown ends, start leave animations
                    if (p === 1) out(); // Time's up!
                }
            }); // Start countdown
            setCard({ c: 0, immediate: false }); // Show Card
        }
        if (value) {
            // If value is not null save the current value
            save(value);
            // Start leave animations
            out();
        } else {
            // Start enter animations
            show();
        }
        return () => clearTimeout(timeoutId);
    }, [trivia.current, value]);
    if (trivia.isFetching) {
        return (
            <Background style={styles.container}>
                <ActivityIndicator size={'large'} color={theme.primaryColor} />
            </Background>
        );
    } ``
    if (trivia.hasError) {
        return (
            <Background style={styles.container}>
                <Button
                    title={'Something happen, try again'}
                    onPress={() => dispatch(fetchQuestions())} />
            </Background>
        );
    }
    const current = trivia.questions[trivia.current];
    const hasAnswer = Boolean(current.answer);
    const correct = hasAnswer && current.correct_answer === current.answer;
    const { category, question } = current;
    return (
        <Background style={styles.container}>
            <AnimatedView style={[
                styles.cardWrapper,
                {
                    opacity: animatedCard.c.interpolate({
                        range: [-1, -0.9, 0, 0.6, 1],
                        output: [0, 1, 1, 1, 0]
                    }),
                    transform: [
                        { perspective: 1000 },
                        {
                            rotateY: animatedFlip.f.interpolate({
                                range: [0, 0.5, 1],
                                output: ['0deg', '90deg', '90deg']
                            })
                        },
                        {
                            rotateZ: animatedCard.c.interpolate({
                                range: [-1, 0, 1],
                                output: ['-15deg', '0deg', '-15deg']
                            })
                        },
                        {
                            translateX: animatedCard.c.interpolate({
                                range: [-1, 0, 1],
                                output: [-500, 0, 500]
                            })
                        },
                    ],
                },
            ]}>
                <Card>
                    <View style={styles.labelWrapper}>
                        <Text style={styles.label}>{he.decode(question)}</Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <Button
                            style={styles.button}
                            type={'secondary'}
                            title={'True'}
                            onPress={() => setValue('True')} />
                        <Button
                            style={styles.button}
                            type={'secondary'}
                            title={'False'}
                            onPress={() => setValue('False')} />
                    </View>

                </Card>
            </AnimatedView>
            <AnimatedView style={[
                styles.cardWrapper,
                {
                    opacity: animatedCard.c.interpolate({
                        range: [-1, -0.9, 0, 0.6, 1],
                        output: [0, 1, 1, 1, 0]
                    }),
                    transform: [
                        { perspective: 1000 },
                        {
                            rotateY: animatedFlip.f.interpolate({
                                range: [0, 0.5, 1],
                                output: ['-90deg', '-90deg', '0deg']
                            })
                        },
                        {
                            rotateZ: animatedCard.c.interpolate({
                                range: [-1, 0, 1],
                                output: ['-15deg', '0deg', '15deg']
                            })
                        },
                        {
                            translateX: animatedCard.c.interpolate({
                                range: [-1, 0, 1],
                                output: [0, 0, 500]
                            })
                        },
                    ],
                },
            ]}>
                <Card style={{
                    backgroundColor: correct ?
                        theme.successColor : hasAnswer ?
                            theme.dangerColor : theme.primaryColor
                }}>
                    <Text
                        inverted style={{ fontSize: 18, fontWeight: 'bold' }}>
                        {correct ?
                            'Yes! Right answer' : hasAnswer ?
                                'Nope! Wrong answer' : 'Time\'s up!'}
                    </Text>
                </Card>
            </AnimatedView>
            <AnimatedView style={[
                styles.header,
                { backgroundColor: theme.primaryColor },
                {
                    opacity: animatedHeader.h.interpolate({
                        range: [0, 1],
                        output: [0, 1]
                    }),
                    transform: [
                        {
                            scale: animatedHeader.h.interpolate({
                                range: [0, 1],
                                output: [0.9, 1]
                            }),
                        },
                    ],
                },
            ]}>
                <View>
                    <AnimatedProgress
                        value={animatedProgress.p.interpolate({
                            range: [0, 1],
                            output: [0, 45 * 2 * Math.PI]
                        })}
                        label={animatedProgress.p.interpolate(p => (10 - (Math.floor(p * 10))).toFixed(0))}
                    />
                </View>
                <View>
                    <Text inverted style={styles.headerCategory}>{category}</Text>
                    <Text inverted style={styles.headerLabel}>Question {trivia.current + 1} of 10</Text>
                </View>
            </AnimatedView>
        </Background>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        position: 'absolute',
        top: 60,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 7,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    headerCategory: {
        marginLeft: 10,
        fontSize: 16,
    },
    headerLabel: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardWrapper: {
        position: 'absolute',
        alignSelf: 'center',
    },
    labelWrapper: {
        marginTop: 'auto',
    },
    label: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonsContainer: {
        width: '100%',
        marginTop: 'auto',
        marginVertical: -5,
    },
    button: {
        width: '100%',
        marginVertical: 5,
    },
});

export default QuizScreen;
