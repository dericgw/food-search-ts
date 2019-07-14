import React from 'react';
import styled from 'styled-components';

import List from './components/list';
import CartButton from './components/cart-button';
import GlobalStyles from './assets/styles/global';
import Cart from './components/cart';
import Details from './components/details';
import Header from './components/header';

const Layout = styled.section`
  height: 100%;
`;

const Content = styled.main`
  padding: 0 18px 48px 18px;
`;

const App: React.FC = () => (
  <>
    <Layout>
      <Header />
      <Content>
        <List />
      </Content>
      <CartButton />
    </Layout>
    <Cart />
    <Details />
    <GlobalStyles />
  </>
);

export default App;
