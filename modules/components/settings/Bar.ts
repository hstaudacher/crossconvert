class Bar {
  constructor(readonly name: string, readonly kg: number, readonly lbs: number) {}

  public toString() {
    return this.name;
  }
}

const bars = () => {
  return [
    new Bar('20kg/45lbs', 20, 45),
    new Bar('15kg/33lbs', 15, 33),
    new Bar('16kg/35lbs', 16, 35),
    new Bar('12kg/25lbs', 12, 25),
  ];
};

export {Bar, bars};
