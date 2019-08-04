import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import foodImage from '../assets/images/diet.svg';

const Wrapper = styled.div`
  max-width: 300px;
  width: auto;
  text-align: center;
  margin: 0 auto;

  h4 {
    color: #aaa;
    text-align: center;
    font-weight: 300;
  }

  img {
    height: 96px;
    opacity: 0.5;
    margin-bottom: 8px;
  }
`;

const NoResults = ({ children }) => (
  <Wrapper>
    <img alt="No results" src={foodImage} />
    <h4>{children}</h4>
  </Wrapper>
);

export default observer(NoResults);
