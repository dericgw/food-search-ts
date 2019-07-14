import { observable, computed } from 'mobx';
import { find, isNaN } from 'lodash-es';

type Nutrient = { nutrient: string; value: string, unit: string };

interface IFood {
  ndbno: string;
  name: string;
  manu: string;
  nutrients?: Nutrient[];
}

export default class Food implements IFood {
  ndbno

  @observable
  public manu;

  @observable
  public name;

  @observable
  public readonly nutrients = observable<Nutrient>([]);

  constructor({ ndbno, name, manu, nutrients }) {
    this.ndbno = ndbno;
    this.name = name;
    this.manu = manu;
    this.nutrients = nutrients;
  }

  @computed
  public get calories(): Number {
    const calories = find(this.nutrients, { unit: 'kcal' });
    if (!calories) {
      return 0;
    }

    return isNaN(+calories.value) ? 0 : +calories.value;
  }
}
