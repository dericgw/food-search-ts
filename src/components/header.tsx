import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import { observer } from 'mobx-react';

import useStores from '../use-stores';

const { Search } = Input;

export const StyledHeader = styled.header`
  height: 280px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 18px;

  button.ant-input-search-button {
    background-color: #ee264e !important;
    border-color: #ee264e !important;
  }
`;
export const H1 = styled.h1`
  color: #444;
  font-weight: 300;
  margin: 36px auto;
  text-align: center;
  font-size: 48px;
`;
export const SearchBar = styled(Search)`
  max-width: 600px !important;
`;

const Header = () => {
  const {
    search: { search },
  } = useStores();

  return (
    <StyledHeader>
      <H1>Food Search!</H1>
      <SearchBar
        placeholder="Search for food..."
        enterButton="Search"
        size="large"
        onSearch={search}
      />
    </StyledHeader>
  );
};

export default observer(Header);
