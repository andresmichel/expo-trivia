import {
    RECEIVE_QUESTIONS,
    REQUEST_QUESTIONS,
    REQUEST_ERROR,
    NEXT_QUESTION,
    SET_ANSWER,
    RESTART_GAME,
} from './types';
import { config as triviaConfig } from '../../constants/trivia';

export const fetchQuestions = () => {
    const { url, amount, difficulty, type } = triviaConfig;
    return async (dispatch) => {
        dispatch({ type: REQUEST_QUESTIONS });
        try {
            const response = await fetch(`${url}?amount=${amount}&difficulty=${difficulty}&type=${type}`);
            const data = await response.json();
            dispatch({ type: RECEIVE_QUESTIONS, data: data.results });
        } catch (error) {
            dispatch({ type: REQUEST_ERROR });
        }
    }
}

export const nextQuestion = () => {
    return { type: NEXT_QUESTION };
}

export const setAnswer = (index, value) => {
    return { type: SET_ANSWER, index, value };
}

export const restartGame = () => {
    return { type: RESTART_GAME };
}