// Theme (pojo)
export default class Theme {
  constructor (name, uniqueCards) {
    this.name = name;
    this.cards = uniqueCards;
    this.max = uniqueCards * 2;
  }
}

export const ThemesList = [
  new Theme('Colors', 8),
  new Theme('MoreColors', 16),
  new Theme('Shapes', 16),
  new Theme('Romanov', 16)
];
