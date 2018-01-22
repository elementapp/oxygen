/**
 * @flow
 */

import React from 'react';
import MapView from 'react-native-maps';


type Props = {
  region?: {},
};

export class Map extends React.PureComponent<Props, void> {
  render() {
    return (
      <MapView
        provider="google"
        {...this.props}
      />
    );
  }
}
