/**
 * @flow
 */

import React from 'react';
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
console.log(ImagePicker);

const OPTIONS = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
  }
};

type Props = {};

type State = {
  source: ?{
    uri: string,
  },
};

export class UploadPictureView extends React.PureComponent<Props, State> {
  state = {
    source: null,
  };

  onSelectPicture = () => {
    ImagePicker.showImagePicker(OPTIONS, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        this.setState({
          source,
        });
      }
    });
  }

  onSendPicture = () => {
    // TODO (paul)
  }

  render() {
    return (
      <View>
        <Button onPress={this.onSelectPicture} title="Select picture" />
        <Button onPress={this.onSendPicture} title="Send picture" />
        <Image source={this.state.source} style={styles.preview} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1,
  },
  preview: {
    height: 500,
    width: 500,
  },
});
