import React from 'react';
import { Modal, Button, Table } from 'antd';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import NoResults from './no-results';
import useStores from '../use-stores';

const Action = styled.a`
  font-size: 12px;
  color: #e74c3c;

  &:hover {
    color: #e74c3c;
  }
`;

const TableFooter = styled.div`
  text-align: right;

  span {
    font-weight: bold;
  }
`;

const Cart = () => {
  const {
    ui: { cartIsOpen, closeCart },
    cart: { removeItemFromCart, items: cart, totalCalorieCount },
  } = useStores();
  const tableScroll = { x: false, y: 320 };
  const locale = {
    emptyText: <NoResults>No results here. Add something to the cart...</NoResults>,
  };

  // Build the column shape here
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', align: 'left' },
    { title: 'Calories', dataIndex: 'calories', key: 'calories', align: 'right' },
    {
      title: 'Action',
      dataIndex: 'remove',
      key: 'remove',
      align: 'right',
      width: 120,
      render: ndbno => <Action onClick={() => removeItemFromCart(ndbno)}>Remove</Action>,
    },
  ];

  // Build the data for the table and also the calorie count. Using reduce so we only need one
  // iteration -> O(n)
  const tableData = cart.reduce(
    (output, current) => {
      const { ndbno, name, calories } = current;

      return {
        columns: [
          ...output.columns,
          { key: ndbno, name: name.replace(/, UPC:.*/, ''), calories, remove: ndbno },
        ],
      };
    },
    { columns: [] },
  );

  return (
    <Modal
      visible={cartIsOpen}
      footer={<Button onClick={closeCart}>Close</Button>}
      title="Here's your cart!"
      width={600}
      onCancel={closeCart}
    >
      <Table
        size="small"
        // @ts-ignore
        columns={columns}
        dataSource={tableData.columns}
        footer={() => (
          <TableFooter>
            Total calorie count is <span>{totalCalorieCount}</span>
          </TableFooter>
        )}
        scroll={tableScroll}
        locale={locale}
      />
    </Modal>
  );
};

export default observer(Cart);
