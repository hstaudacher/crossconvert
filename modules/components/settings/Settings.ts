enum SettingsType {
  BOOLEAN,
  OPTIONS,
}
class SettingsSection {
  constructor(readonly title: string, readonly type: SettingsType, readonly data: SettingsItem[]) {
    data.forEach((d) => (d.section = this));
  }
}

class SettingsItem {
  section: SettingsSection = new SettingsSection('', SettingsType.BOOLEAN, []);
  constructor(readonly title: string) {}
}

class OptionsSettingsItem extends SettingsItem {
  constructor(
    readonly title: string,
    readonly options: string[] | number[],
    private readonly valueProvider: Function,
    readonly update: Function,
  ) {
    super(title);
  }

  public value = () => {
    return this.valueProvider();
  };
}

export {SettingsType, SettingsSection, SettingsItem, OptionsSettingsItem};
