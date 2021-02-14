import {Navigation} from 'react-native-navigation';

class VerticalOffset {
  private readonly defaultOffset = 80;

  private offset = this.defaultOffset;

  private subscribers: Function[] = [];

  public initialize() {
    Navigation.constants().then((constants) => {
      this.offset = constants.topBarHeight + constants.statusBarHeight;
      this.subscribers.forEach((s) => s(this.offset));
    });
  }

  public getOffset() {
    return this.offset;
  }

  public addSubscriber(subscriber: Function) {
    this.subscribers.push(subscriber);
    this.initialize();
  }
}

const verticalOffset = new VerticalOffset();

export default verticalOffset;
