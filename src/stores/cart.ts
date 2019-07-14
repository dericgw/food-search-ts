import { observable, computed, runInAction, action } from 'mobx';
import { findIndex, get } from 'lodash-es';

import Food from './models/food';
import { IRootStore } from './index';
import { details } from '../utils/http';

export interface ICart {
  items: Food[];
  numberOfItemsInCart: number;
  hasItemsInCart: boolean;
  addItemToCart: (item: any) => Promise<void>;
  removeItemFromCart: (ndbno: string) => void;
}

export default class Cart implements ICart {
  public items = observable.array<Food>([]);

  public readonly rootStore;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
  }

  @computed
  public get numberOfItemsInCart() {
    return this.items.length;
  }

  @computed
  get hasItemsInCart() {
    return this.numberOfItemsInCart > 0;
  }

  public addItemToCart = async item => {
    try {
      // If the details have already been fetch, they will be retrieved from cache
      const results = await details(item.ndbno);

      // Use "get" because it's so fresh and so clean
      const nutrients = get(results, 'report.foods[0].nutrients', []);

      runInAction(() => {
        const { ndbno, name, manu } = item;
        const food = new Food({ ndbno, name, manu, nutrients });
        this.items.push(food);
      });
    } catch (error) {
      this.rootStore.ui.showErrorMessage();
      throw new Error(error);
    }
  };

  @action
  public removeItemFromCart = ndbno => {
    this.items.splice(findIndex(this.items, { ndbno }), 1);
  };
}
