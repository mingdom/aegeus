/* @flow */
import React from 'react';
import FlatButton from 'material-ui/FlatButton';

export const CoinRefreshButton = ( props: { onClick: Function }) => (
  <FlatButton onTouchTap={props.onClick}>
		<i className="material-icons" style={{color: 'black'}}>refresh</i>
  </FlatButton>
);
