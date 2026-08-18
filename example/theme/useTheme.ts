import {useContext} from 'react';
import {ThemeContext, type ThemeContextValue} from './ThemeProvider';

const useTheme = (): ThemeContextValue => useContext(ThemeContext);

export default useTheme;
