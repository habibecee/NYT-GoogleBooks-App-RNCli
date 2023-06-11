import React from 'react';
import MainNavigation from './src/Navigators/MainNavigations';
import {MainContextProvider} from './src/Context/Context';

function App() {
  return (
    <MainContextProvider>
      <MainNavigation />
    </MainContextProvider>
  );
}

export default App;
