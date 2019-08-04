import { action, observable } from 'mobx';
import { IRootStore } from './index';

export interface IUi {
  isLoading: boolean;
  cartIsOpen: boolean;
  closeCart: () => void;
  openCart: () => void;
  detailsViewId: string | null;
  updateDetailsViewId: (string) => void;
  updateIsLoading: (boolean) => void;
  showErrorMessage: () => void;
  showInfoMessage: (message: string) => void;
  openDetails: (ndbno: string) => void;
  closeDetails: () => void;
}

export default class Ui implements IUi {
  public static errorMessage = 'Whoops! Something went wrong';

  @observable public isLoading = false;

  @observable public detailsViewId = null;

  @observable public cartIsOpen = false;

  public constructor(private readonly rootStore: IRootStore) {}

  @action
  public closeCart = () => {
    this.cartIsOpen = false;
  };

  @action
  public openCart = () => {
    if (!this.rootStore.cart.hasItemsInCart) {
      this.rootStore.ui.showInfoMessage('Add some items first and the you can view your cart.');
    } else {
      this.cartIsOpen = true;
    }
  };

  @action
  public updateDetailsViewId = detailsViewId => {
    this.detailsViewId = detailsViewId;
  };

  @action
  public updateIsLoading = isLoading => {
    this.isLoading = isLoading;
  };

  public showErrorMessage = () => {
    this.rootStore.message.error(Ui.errorMessage);
  };

  public showInfoMessage = message => {
    this.rootStore.message.info(message);
  };

  @action
  public openDetails = id => {
    this.detailsViewId = id;
  };

  @action
  public closeDetails = () => {
    this.detailsViewId = null;
  };
}
