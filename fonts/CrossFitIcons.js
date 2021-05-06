import {Platform} from 'react-native';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from './CrossFitIcons-selection.json';

const isIOS = Platform.OS === 'ios';

const CrossFitIcons = isIOS
  ? createIconSetFromIcoMoon(icoMoonConfig)
  : createIconSetFromIcoMoon(icoMoonConfig, 'crossfit', 'CrossFit.ttf');

export default CrossFitIcons;
