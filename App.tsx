import MainScreen from './modules/components/MainScreen';
import WeightPercentagesScreen from './modules/components/WeightPercentagesScreen';
import WeightPercentagesSettingsScreen from './modules/components/settings/WeightPercentagesSettingsScreen';
import OptionsListScreen from './modules/components/settings/OptionsListScreen';
import {registerCustomIconType, Icon} from 'react-native-elements';
import CrossFitIcons from './fonts/CrossFitIcons';
import {Navigation} from 'react-native-navigation';
import DataStore from './modules/components/store/DataStore';

registerCustomIconType('crossfit', CrossFitIcons);

declare const global: {HermesInternal: null | {}};

const start = () => {
  Navigation.registerComponent('Icon', () => Icon);
  Navigation.registerComponent('Main', () => MainScreen);
  Navigation.registerComponent('WeightPercentages', () => WeightPercentagesScreen);
  Navigation.registerComponent('WeightPercentagesSettings', () => WeightPercentagesSettingsScreen);
  Navigation.registerComponent('OptionsList', () => OptionsListScreen);
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
  Navigation.setDefaultOptions({
    topBar: {
      title: {
        color: 'tomato',
      },
      backButton: {
        color: 'tomato',
      },
    },
  });
  new DataStore().initialize();
};

export {start};
