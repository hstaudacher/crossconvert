import MainScreen from './modules/components/MainScreen';
import WeightDetailsScreen from './modules/components/WeightDetailsScreen';
import {registerCustomIconType} from 'react-native-elements';
import CrossFitIcons from './fonts/CrossFitIcons';
import {Navigation} from 'react-native-navigation';

registerCustomIconType('crossfit', CrossFitIcons);

declare const global: {HermesInternal: null | {}};

const start = () => {
  Navigation.registerComponent('Main', () => MainScreen);
  Navigation.registerComponent('WeightDetails', () => WeightDetailsScreen);
  Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: 'Main',
              },
            },
          ],
        },
      },
    });
  });
};

export {start};
