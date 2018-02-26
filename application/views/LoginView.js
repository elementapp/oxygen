/**
 * @flow
 */

import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk';

import {AppViews, switchView} from './viewsReducer';

type Props = {
  dispatch: (action: {}) => void;
};

class LoginView extends React.PureComponent<Props, void> {
  componentDidMount() {
    this.getTokenAndLogin();
  }

  getTokenAndLogin = async () => {
    const data = await AccessToken.getCurrentAccessToken();
    if (data) {
      this.login(data.accessToken.toString());
    }
  };

  login = (accessToken: string) => {
    this.props.dispatch(switchView(AppViews.UPLOAD_PICTURE));
  };

  onLoginFinished = (error, result) => {
    if (error) {
      alert("login has error: " + result.error);
    } else if (result.isCancelled) {
      alert("login is cancelled.");
    } else {
      this.getTokenAndLogin();
    }
  };

  render() {
    return (
      <View>
        <LoginButton
          onLoginFinished={this.onLoginFinished}
          onLogoutFinished={() => alert("logout.")}/>
      </View>
    );
  }
}

LoginView = connect()(LoginView);

export {
  LoginView,
};
