import MainScreen from './modules/components/MainScreen';
import WeightPercentagesScreen from './modules/components/WeightPercentagesScreen';
import SettingsScreen from './modules/components/settings/SettingsScreen';
import OptionsListScreen from './modules/components/settings/OptionsListScreen';
import {registerCustomIconType, Icon} from 'react-native-elements';
import CrossFitIcons from './fonts/CrossFitIcons';
import {Navigation} from 'react-native-navigation';
import DataStore from './modules/components/store/DataStore';
import DefaultStyle from './modules/components/DefaultStyle';
import HwpoIcon from './modules/components/hwpo/HwpoIcon';

registerCustomIconType('crossfit', CrossFitIcons);

declare const global: {HermesInternal: null | {}};

const start = () => {
  Navigation.registerComponent('Icon', () => Icon);
  Navigation.registerComponent('HwpoIcon', () => HwpoIcon);
  Navigation.registerComponent('Main', () => MainScreen);
  Navigation.registerComponent('WeightPercentages', () => WeightPercentagesScreen);
  Navigation.registerComponent('Settings', () => SettingsScreen);
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
      height: 50,
      title: {
        color: DefaultStyle.baseColor,
      },
      backButton: {
        color: DefaultStyle.baseColor,
      },
    },
  });
  new DataStore().initialize();
};

export {start};
