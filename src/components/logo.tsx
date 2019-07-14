import React from 'react';
import styled from 'styled-components';

import logo from '../assets/images/dax-logo.png';

const StyledLogo = styled.img`
  position: absolute;
  top: 18px;
  left: 18px;
  max-height: 48px;
`;

const Logo = () => <StyledLogo src={logo} />;

export default Logo;
