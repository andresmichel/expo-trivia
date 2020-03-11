import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { restartGame } from '../redux/trivia/actions';
import Background from '../components/background';
import Button from '../components/button';
import Text from '../components/text';
import { useTheme } from '../utilities/appearence';
import he from 'he';

const ResultsScreen = (props) => {
    const { trivia } = useSelector(state => state);
    const dispatch = useDispatch();
    const theme = useTheme();
    return (
        <Background style={styles.container}>
            <FlatList
                contentContainerStyle={{ paddingBottom: 120 }}
                ListHeaderComponent={(
                    <View style={styles.header}>
                        <Text style={styles.title}>You scored</Text>
                        <View style={[styles.scoreWrapper, { backgroundColor: theme.primaryColor, }]}>
                            <Text style={[styles.scoreLabel, { color: theme.lightColor }]}>
                                {`${trivia.score} of ${trivia.questions.length}`}
                            </Text>
                        </View>
                    </View>
                )}
                data={trivia.questions}
                keyExtractor={(_, index) => String(index)}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <View style={[
                            styles.itemIcon,
                            {
                                backgroundColor: item.correct_answer === item.answer ?
                                    theme.successColor : Boolean(item.answer) ?
                                        theme.dangerColor : theme.primaryColor,
                            },
                        ]}>
                            <Text
                                style={{ fontWeight: 'bold' }}
                                inverted>
                                {item.answer ? item.answer[0] : '?'}
                            </Text>
                        </View>
                        <Text style={styles.itemLabel}>{he.decode(item.question)}</Text>
                    </View>
                )}
            />
            <View style={styles.footerContainer}>
                <Background style={styles.buttonWrapper}>
                    <Button
                        title={'Play again?'}
                        onPress={() => {
                            setTimeout(() => dispatch(restartGame()), 300);
                            props.navigation.navigate('Home');
                        }} />
                </Background>
            </View>
        </Background>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 20,
    },
    title: {
        marginBottom: 10,
        fontSize: 24,
        fontWeight: 'bold',
    },
    scoreWrapper: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20
    },
    scoreLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 20,
        maxWidth: 500,
        alignSelf: 'center',
    },
    itemIcon: {
        height: 40,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginRight: 20,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    itemLabel: {
        flex: 1,
        fontSize: 18,
    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignSelf: 'center',
        maxWidth: 500,
    },
    buttonWrapper: {
        borderRadius: 5,
        marginHorizontal: 20,
        paddingBottom: 60,
    },
});

export default ResultsScreen;
