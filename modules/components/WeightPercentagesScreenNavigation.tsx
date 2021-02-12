import {Navigation} from 'react-native-navigation';

class WeightPercentageScreenNavigation {
  constructor(readonly componentId: string) {}

  public setup() {
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
        },
      });
    };

    Navigation.mergeOptions(this.componentId, {
      topBar: {
        title: {
          text: 'Percentages',
        },
        rightButtons: [
          {
            id: 'weightPercentagesSettingsButton',
            text: '',
            component: {
              name: 'Icon',
              passProps: {
                name: 'sliders',
                type: 'font-awesome',
                color: 'tomato',
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
