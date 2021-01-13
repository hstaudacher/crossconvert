import MainScreen from './modules/components/MainScreen';
import WeightPercentagesScreen from './modules/components/WeightPercentagesScreen';
import WeightPercentageSettingsScreen from './modules/components/WeightPercentageSettingsScreen';
import {registerCustomIconType, Icon} from 'react-native-elements';
import CrossFitIcons from './fonts/CrossFitIcons';
import {Navigation} from 'react-native-navigation';

registerCustomIconType('crossfit', CrossFitIcons);

declare const global: {HermesInternal: null | {}};

const start = () => {
  Navigation.registerComponent('Icon', () => Icon);
  Navigation.registerComponent('Main', () => MainScreen);
  Navigation.registerComponent('WeightPercentages', () => WeightPercentagesScreen);
  Navigation.registerComponent('WeightSettings', () => WeightPercentageSettingsScreen);
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
