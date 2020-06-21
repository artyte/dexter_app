/** This class checks for whether the value passed is nullish or of the wrong type. If any of the conditions fail, return the respective type's default value. */
export class NullCheck {
  /** The default value for any type passed that does not match any primitive javascript types. */
  defaultObjectVal: object

  constructor(defaultObjectVal: object) {
    this.defaultObjectVal = defaultObjectVal
  }

  public makeExist(valToCheck: any, valType: string) {
    type defaultValHash = {
      [key: string]: any
    }
    const defaultValHash: defaultValHash = {
      string: '',
      number: 0,
      object: {},
      boolean: false,
    }
    const defaultVal = defaultValHash[valType] ?? this.defaultObjectVal

    let checkedVal = valToCheck ?? defaultVal
    checkedVal =
      typeof checkedVal === typeof defaultVal ? checkedVal : defaultVal
    return checkedVal
  }
}

export const tmp = 0
