import React, { useContext } from 'react';
import styled from 'styled-components';
import { List as DataList, Button } from 'antd';

import AppContext from '../app.context';
import Item from './item';
import NoResults from './no-results';

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const LoadMoreButton = styled(Button)`
  margin: 18px auto;

  &:hover,
  &:focus {
    color: #efad1c !important;
    border-color: #efad1c !important;
  }
`;

const List = () => {
  const { searchResults, isLoading, loadMoreResults, resultsTotal } = useContext(AppContext);
  const hasMoreResults = searchResults.length < resultsTotal;
  const locale = {
    emptyText: <NoResults>No results here. Try searching...</NoResults>,
  };

  return (
    <Wrapper>
      <DataList
        loading={isLoading}
        loadMore={
          hasMoreResults && <LoadMoreButton onClick={loadMoreResults}>Load more...</LoadMoreButton>
        }
        dataSource={searchResults}
        locale={locale}
        renderItem={item => <Item item={item} />}
      />
    </Wrapper>
  );
};

export default List;
