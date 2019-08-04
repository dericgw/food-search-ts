import React from 'react';
import { List } from 'antd';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import useStores from '../use-stores';

const { Item: ListItem } = List;

type ActionProps = {
  isInCart?: boolean;
};

const Action = styled.a`
  color: ${({ isInCart }: ActionProps) => (isInCart ? '#e74c3c' : '#777')};
  font-size: 12px;

  &:hover {
    color: ${({ isInCart }: ActionProps) => (isInCart ? '#e74c3c' : '#efad1c')};
  }
`;

const Item = ({ item }) => {
  const { name, manu, ndbno, isInCart } = item;
  console.log(item);
  const {
    cart: { addItemToCart, removeItemFromCart },
    ui: { openDetails },
  } = useStores();
  const cartButtonText = isInCart ? 'Remove' : 'Add to cart';

  const addOrRemoveFromCart = () => {
    if (isInCart) {
      removeItemFromCart(ndbno);
    } else {
      addItemToCart(item);
    }
  };

  const openDetailsModal = () => {
    openDetails(ndbno);
  };

  return (
    <ListItem
      actions={[
        <Action onClick={openDetailsModal}>View details</Action>,
        <Action onClick={addOrRemoveFromCart} isInCart={isInCart}>
          {cartButtonText}
        </Action>,
      ]}
    >
      <ListItem.Meta title={name} description={manu} />
    </ListItem>
  );
};

export default observer(Item);
