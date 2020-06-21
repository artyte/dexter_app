/** An index type for the string object color. Since all keys and value pairs are of type string, an index type is used for easy writing and reading. The use of index type here is not intended to make this object dynamic. */
type color = {
  [key: string]: string
}

/** The hex colors for all types are contained here */
export const colors: color = {
  bug: '#A2C231',
  dark: '#5E5E6A',
  dragon: '#6934E8',
  electric: '#F4DC5A',
  fairy: '#F1A0E6',
  fighting: '#F94F2C',
  fire: '#FBA64A',
  flying: '#99B2E4',
  ghost: '#444B87',
  grass: '#5CBE62',
  ground: '#DB8000',
  ice: '#42E7E8',
  normal: '#EEC8B7',
  poison: '#B462CD',
  psychic: '#EF4A83',
  rock: '#C6B56C',
  steel: '#A7A7BB',
  water: '#59A4E0',
}

export const tmp = ''
