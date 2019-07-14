import React, { useContext } from 'react';
import { List } from 'antd';
import styled from 'styled-components';

import AppContext from '../app.context';

const { Item: ListItem } = List;

const Action = styled.a`
  color: ${({ isInCart }) => (isInCart ? '#e74c3c' : '#777')};
  font-size: 12px;

  &:hover {
    color: ${({ isInCart }) => (isInCart ? '#e74c3c' : '#efad1c')};
  }
`;

const Item = ({ item }) => {
  const { name, manu, ndbno } = item;
  const { addToCart, removeFromCart, cart, openDetails } = useContext(AppContext);
  const isInCart = ndbno in cart;
  const cartButtonText = isInCart ? 'Remove' : 'Add to cart';

  const addOrRemoveFromCart = () => {
    if (isInCart) {
      removeFromCart(ndbno);
    } else {
      addToCart(item);
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

export default Item;
