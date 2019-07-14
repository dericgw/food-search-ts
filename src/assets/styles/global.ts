import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  #root {
    height: 100%;
  }
  
  .ant-pagination-item-active {
    border-color: #a5dbd8;

    a {
      color: #a5dbd8;
    }
  } 
  
  .ant-table-row:hover {
    background-color: #eee;
  }
`;

export default GlobalStyles;
