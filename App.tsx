import React from 'react';

import MainScreen from './modules/components/MainScreen';
import {registerCustomIconType} from 'react-native-elements';
import CrossFitIcons from './fonts/CrossFitIcons';

registerCustomIconType('crossfit', CrossFitIcons);

declare const global: {HermesInternal: null | {}};

const App = () => {
  return <MainScreen />;
};

export default App;
