/**
 * @flow
 */

import React from 'react';
import {connect} from 'react-redux';

import {LoginView} from 'oxygen/views/LoginView';
import {UploadPictureView} from 'oxygen/views/UploadPictureView';

import {AppViews} from './viewsReducer';

type Props = {
  views: {
    activeView: $Values<AppViews>,
  },
};

class ViewController extends React.PureComponent<Props, void> {
  getView() {
    switch (this.props.views.activeView) {
      case AppViews.LOGIN:
        return <LoginView />;
      case AppViews.UPLOAD_PICTURE:
        return <UploadPictureView />;
    }
  }

  render() {
    return this.getView();
  }
}

function mapStateToProps({views}) {
  return {
    views,
  }
}

ViewController = connect(mapStateToProps)(ViewController);

export {
  ViewController,
};
