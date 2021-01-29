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
  constructor(readonly title: string, readonly options: string[]) {
    super(title);
  }
}

export {SettingsSection, SettingsItem, OptionsSettingsItem, SettingsType};
