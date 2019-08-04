import React from 'react';
import { Icon, Badge } from 'antd';
import styled from 'styled-components';

import useStores from '../use-stores';
import { observer } from 'mobx-react';

const Wrapper = styled.div`
  position: fixed;
  right: 18px;
  top: 18px;
`;

const StyledCartButton = styled.button`
  background-color: #eee;
  color: #444;
  height: 48px;
  width: 48px;
  border: none;
  border-radius: 4px;
  font-size: 22px;
  z-index: 99;
`;

const CartButton = () => {
  const {
    ui: { openCart },
    cart: { numberOfItemsInCart },
  } = useStores();

  return (
    <Wrapper>
      <Badge count={numberOfItemsInCart}>
        <StyledCartButton onClick={openCart}>
          <Icon type="shopping-cart" />
        </StyledCartButton>
      </Badge>
    </Wrapper>
  );
};

export default observer(CartButton);
