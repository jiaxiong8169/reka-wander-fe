import React from 'react';
import Card from '../card/card';

const InsertDetailsCard = props => {
  return (
    <Card
      style={{
        margin: 10,
        marginTop: 20,
        marginBottom: 30,
      }}>
      {props.children}
    </Card>
  );
};

export default InsertDetailsCard;
