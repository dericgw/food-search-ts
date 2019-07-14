import React from 'react';
import { Modal, Button, Table } from 'antd';
import styled from 'styled-components';
import { isNaN } from 'lodash-es';

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
    store: {
      ui: { cartIsOpen, closeCart },
      cart: { removeFromCart, items: cart },
    },
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
      render: ndbno => <Action onClick={() => removeFromCart(ndbno)}>Remove</Action>,
    },
  ];

  // Build the data for the table and also the calorie count. Using reduce so we only need one
  // iteration -> O(n)
  const tableData = cart.reduce(
    (output, current) => {
      const { ndbno, name, calories } = current;

      // Some of the results come back with the calories as a dash, "-", so we have
      // to handle that.
      const currentCalories = isNaN(+calories) ? 0 : +calories;

      return {
        columns: [
          ...output.columns,
          { key: ndbno, name: name.replace(/, UPC:.*/, ''), calories, remove: ndbno },
        ],
        totalCalories: output.totalCalories + currentCalories,
      };
    },
    { columns: [], totalCalories: 0 },
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
        columns={columns}
        dataSource={tableData.columns}
        footer={() => (
          <TableFooter>
            Total calorie count is <span>{tableData.totalCalories.toLocaleString()}</span>
          </TableFooter>
        )}
        scroll={tableScroll}
        locale={locale}
      />
    </Modal>
  );
};

export default Cart;
