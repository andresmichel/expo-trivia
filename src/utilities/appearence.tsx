import { lightTheme, darkTheme } from '../constants/appearence';
import { useSelector } from 'react-redux';

const getTheme = (colorScheme) => {
    return colorScheme === 'dark' ? darkTheme : lightTheme;
}

export const useTheme = () => {
    const settings = useSelector(state => state.settings);
    return getTheme(settings.colorScheme);
}