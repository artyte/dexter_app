import bug from '../assets/types/Bug.svg'
import dark from '../assets/types/Dark.svg'
import dragon from '../assets/types/Dragon.svg'
import electric from '../assets/types/Electric.svg'
import fairy from '../assets/types/Fairy.svg'
import fighting from '../assets/types/Fighting.svg'
import fire from '../assets/types/Fire.svg'
import flying from '../assets/types/Flying.svg'
import ghost from '../assets/types/Ghost.svg'
import grass from '../assets/types/Grass.svg'
import ground from '../assets/types/Ground.svg'
import ice from '../assets/types/Ice.svg'
import normal from '../assets/types/Normal.svg'
import poison from '../assets/types/Poison.svg'
import psychic from '../assets/types/Psychic.svg'
import rock from '../assets/types/Rock.svg'
import steel from '../assets/types/Steel.svg'
import water from '../assets/types/Water.svg'
import genderless from '../assets/sex/Genderless.svg'
import female from '../assets/sex/Female.svg'
import male from '../assets/sex/Male.svg'

/** An index type for the asset object types. Since all keys and value pairs are of type string, an index type is used for easy writing and reading. The use of index type here is not intended to make this object dynamic. */
type types = {
  [key: string]: string
}
/** The svg assets for each 18 Pokemon types is being contianed within here. */
export const types: types = {
  bug,
  dark,
  dragon,
  electric,
  fairy,
  fighting,
  fire,
  flying,
  ghost,
  grass,
  ground,
  ice,
  normal,
  poison,
  psychic,
  rock,
  steel,
  water,
}

/** An index type for the asset object sex. Since all keys and value pairs are of type string, an index type is used for easy writing and reading. The use of index type here is not intended to make this object dynamic. */
type sex = {
  [key: string]: string
}
/** The svg assets for all sex is being contianed within here. */
export const sex: sex = {
  male,
  female,
  genderless,
}
