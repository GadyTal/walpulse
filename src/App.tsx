import { ThemeProvider } from 'styled-components';
import { TransactionContextProvider } from './context/TransactionContext/TransactionContext';
import {
  theme,
  AppContainer
} from './styles/StyledComponents';

import { FiltersContextProvider } from './context/FiltersContext/FilterContext';
import { Dashboard } from './components/Dashboard/Dashboard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TransactionContextProvider>
        <FiltersContextProvider>
          <AppContainer>
            <Dashboard />
          </AppContainer>
        </FiltersContextProvider>
      </TransactionContextProvider>
    </ThemeProvider>
  );
}

export default App;
