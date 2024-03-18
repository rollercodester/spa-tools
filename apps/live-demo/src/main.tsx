import { StrictMode } from 'react';
import { ChakraBaseProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { ShowcaseRouter } from './router';
import { theme } from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraBaseProvider theme={theme}>
      <ShowcaseRouter />
    </ChakraBaseProvider>
  </StrictMode>
);
