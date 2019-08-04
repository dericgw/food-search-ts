import { observable, action, runInAction, computed } from 'mobx';

import { IRootStore } from './index';
import Food from './models/food';
import { search } from '../utils/http';

export interface ISearch {
  results: Food[];
  offset: number;
  searchTerm: string;
  resultsTotal: number;
  hasMoreResults: boolean;
  search: (string) => Promise<void>;
  loadMoreResults: () => Promise<void>;
}

export default class Search implements ISearch {
  @observable public offset: number = 0;

  public results = observable.array<Food>([]);

  @computed
  public get hasMoreResults() {
    return this.results.length < this.resultsTotal;
  }

  @observable public resultsTotal: number = 0;

  @observable public searchTerm: string = '';

  public constructor(private readonly rootStore: IRootStore) {}

  public search = async (searchTerm): Promise<void> => {
    const { updateIsLoading, showErrorMessage, showInfoMessage } = this.rootStore.ui;
    try {
      updateIsLoading(true);

      const results = await search(searchTerm, 0);

      if (!results.list) {
        // Handle the case where no results are returned
        showInfoMessage('There were no results for the search. Try another search term.');
      } else {
        runInAction(() => {
          this.searchTerm = searchTerm;
          const newResults = results.list.item.map(food => {
            return new Food(this.rootStore.cart, food);
          });
          this.results.replace(newResults);
          this.offset = 0;
          this.resultsTotal = results.list.total;
        });
      }
    } catch (error) {
      showErrorMessage();
      throw new Error(error);
    } finally {
      updateIsLoading(false);
    }
  };

  @action
  public loadMoreResults = async () => {
    const { updateIsLoading, showErrorMessage } = this.rootStore.ui;
    try {
      updateIsLoading(true);

      const newOffset = this.offset + 10;
      const results = await search(this.searchTerm, newOffset);

      runInAction(() => {
        this.offset = newOffset;
        results.list.item.forEach(food => {
          this.results.push(new Food(this.rootStore.cart, food));
        });
      });
    } catch (error) {
      showErrorMessage();
      throw new Error(error);
    } finally {
      updateIsLoading(false);
    }
  };
}
