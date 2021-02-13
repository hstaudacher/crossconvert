class Bar {
  constructor(readonly name: string, readonly kg: number, readonly lb: number) {}

  public toString() {
    return this.name;
  }
}

const bars = () => {
  return [
    new Bar('20kg/45lb', 20, 45),
    new Bar('15kg/33lb', 15, 33),
    new Bar('16kg/35lb', 16, 35),
    new Bar('12kg/25lb', 12, 25),
  ];
};

export {Bar, bars};
