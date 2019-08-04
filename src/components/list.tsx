import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { List as DataList, Button } from 'antd';

import Item from './item';
import NoResults from './no-results';
import useStores from '../use-stores';

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
  const {
    search: { results, loadMoreResults, hasMoreResults },
    ui: { isLoading },
  } = useStores();
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
        dataSource={results}
        locale={locale}
        renderItem={item => <Item item={item} />}
      />
    </Wrapper>
  );
};

export default observer(List);
