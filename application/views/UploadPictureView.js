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
    if (!this.state.source) {
      return;
    }

    const data = new FormData();
    data.append('title', 'Swap sucks');
    data.append('image', {
      uri: this.state.source.uri,
      type: 'image/jpeg',
      name: 'test_photo',
    });
    fetch('http://andrew.local:80/image', {
      method: 'POST',
      body: data,
    }).then(res => {
      console.log(res)
    }).catch(error => {
      console.log(error)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <Button onPress={this.onSelectPicture} title="Select picture" />
        </View>
        <View style={styles.button}>
          <Button color="green" onPress={this.onSendPicture} title="Send picture" />
        </View>
        <Image source={this.state.source} style={styles.preview} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    borderColor: 'black',
    borderRadius: 4,
    borderWidth: 2,
    marginBottom: 15,
    width: 150,
  },
  preview: {
    height: 500,
    width: 500,
  },
});
