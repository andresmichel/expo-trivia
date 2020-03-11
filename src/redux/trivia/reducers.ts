import {
    RECEIVE_QUESTIONS,
    REQUEST_QUESTIONS,
    REQUEST_ERROR,
    NEXT_QUESTION,
    SET_ANSWER,
    RESTART_GAME,
} from './types';

interface Question {
    answer: string,
    category: string,
    correct_answer: string,
    question: string,
}

interface TriviaState {
    questions: Question[],
    current?: number,
    isFetching: boolean,
    hasError: boolean,
    score: number,
}

const INITIAL_STATE: TriviaState = {
    questions: [],
    current: 0,
    isFetching: false,
    hasError: false,
    score: 0,
}

export default (state: TriviaState = INITIAL_STATE, action): TriviaState => {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                isFetching: false,
                questions: action.data,
            };

        case REQUEST_QUESTIONS:
            return { ...state, isFetching: true, hasError: false };

        case REQUEST_ERROR:
            return { ...state, hasError: true };

        case NEXT_QUESTION:
            return { ...state, current: state.current + 1 };

        case SET_ANSWER:
            let score = state.score;
            const questions = [...state.questions];
            questions[action.index].answer = action.value;
            if (questions[action.index].correct_answer === action.value) score += 1;
            return { ...state, ...questions, score };

        case RESTART_GAME:
            return INITIAL_STATE;

        default:
            return state;
    }
}