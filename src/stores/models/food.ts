import { observable, computed, action } from 'mobx';
import { find, isNaN } from 'lodash-es';

import { ICart } from '../cart';

type Nutrient = { nutrient: string; value: string; unit: string };

export interface IFood {
  store: ICart;
  ndbno: string;
  name: string;
  manu: string;
  nutrients?: Nutrient[];
  isInCart: boolean;
  calories: number;
  addNutrients(nutrients: Nutrient[]): void;
}

export default class Food implements IFood {
  store: ICart;

  ndbno;

  @observable
  public manu;

  @observable
  public name;

  @observable
  public readonly nutrients = observable.array<Nutrient>([]);

  constructor(store, { ndbno, name, manu, nutrients }: Partial<IFood>) {
    this.store = store;
    this.ndbno = ndbno;
    this.name = name;
    this.manu = manu;
    this.addNutrients(nutrients);
  }

  @computed
  public get calories() {
    const calories = find(this.nutrients, { unit: 'kcal' });
    if (!calories) {
      return 0;
    }

    return isNaN(+calories.value) ? 0 : +calories.value;
  }

  @computed
  public get isInCart() {
    return this.store.items.includes(this);
  }

  @action
  public addNutrients(nutrients) {
    if (nutrients) {
      this.nutrients.replace(nutrients);
    }
  }
}
