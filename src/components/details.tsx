import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Statistic, message } from 'antd';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { get } from 'lodash-es';

import { details } from '../utils/http';
import useStores from '../use-stores';

const Close = styled(Button)`
  &:hover {
    color: #777 !important;
    border-color: #777 !important;
  }
`;

const Details = () => {
  const {
    ui: { closeDetails, detailsViewId },
  } = useStores();
  // No need for global state for the nutrients so we will track it locally
  const [nutrients, updateNutrients] = useState([]);
  const [title, updateTitle] = useState('');

  useEffect(() => {
    details(detailsViewId)
      .then(results => {
        const nutrients = get(results, 'report.foods[0].nutrients', []);
        const name = get(results, 'report.foods[0].name');
        updateNutrients(nutrients);
        updateTitle(name);
      })
      .catch(error => {
        message.error('Whoops! Something went wrong. Try again.');
        // No error boundaries implemented, so we are not going to throw here...
        console.warn(error);
      });
  }, [detailsViewId]);

  return (
    <Modal
      title={title}
      visible={Boolean(detailsViewId)}
      onCancel={closeDetails}
      footer={<Close onClick={closeDetails}>Close</Close>}
    >
      <Row gutter={8}>
        {nutrients.map(({ nutrient, unit, value }) => (
          <Col span={12} key={nutrient}>
            <Statistic title={`${nutrient} (${unit})`} value={value} />
          </Col>
        ))}
      </Row>
    </Modal>
  );
};

export default observer(Details);
