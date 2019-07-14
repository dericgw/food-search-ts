import { MessageApi } from 'antd/es/message';

import Cart, { ICart } from './cart';
import Search, { ISearch } from './search';
import Ui, { IUi } from './ui';

export interface IRootStore {
  message: MessageApi;
  cart: ICart;
  search: ISearch;
  ui: IUi;
}

export default class RootStore implements IRootStore {
  public readonly message;

  public readonly cart;

  public readonly search;

  public readonly ui;

  constructor({ message }) {
    this.message = message;
    this.cart = new Cart(this);
    this.search = new Search(this);
    this.ui = new Ui(this);
  }
}
