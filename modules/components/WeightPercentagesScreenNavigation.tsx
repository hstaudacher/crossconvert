import {Navigation} from 'react-native-navigation';
import DefaultStyle from './DefaultStyle';
import {WeightSettings} from './store/WeightSettingsStore';

class WeightPercentageScreenNavigation {
  constructor(readonly componentId: string) {}

  public setup(settings: WeightSettings, onSettingsUpdate: Function) {
    const onSettingsPress = () => {
      Navigation.push(this.componentId, {
        component: {
          name: 'WeightPercentagesSettings',
          options: {
            topBar: {
              backButton: {
                title: 'Percentages',
              },
            },
          },
          passProps: {
            settings: settings,
            onSettingsUpdate: onSettingsUpdate,
          },
        },
      });
    };

    Navigation.mergeOptions(this.componentId, {
      topBar: {
        rightButtons: [
          {
            id: 'weightPercentagesSettingsButton',
            text: '',
            component: {
              name: 'Icon',
              passProps: {
                name: 'sliders',
                type: 'font-awesome',
                color: DefaultStyle.baseColor,
                onPress: onSettingsPress,
              },
            },
          },
        ],
      },
    });
  }
}

export default WeightPercentageScreenNavigation;
