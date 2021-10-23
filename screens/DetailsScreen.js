/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
import React, {useEffect, useState} from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const DetailsScreen = ({navigation}) => {
  const [fcm, setFcm] = useState('');

  useEffect(() => {
    messaging()
      .getToken()
      .then(res => {
        setFcm(res);
        console.log('fcm token:' + res);
      });
  }, []);

  const fcmAPI = async () => {
    const data = {
      to: fcm,
      notification: {
        title: 'Check this Mobile (title)',
        body: 'Rich Notification testing (body)',
        mutable_content: true,
        sound: 'Tri-tone',
      },
      // "data": {
      //   "url": "www.fulldemo.com",
      // },
      contentAvailable: true,
      // Required for background/quit data-only messages on Android
      priority: 'high',
    };
    const response = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'key=AAAAZKUo2-0:APA91bEZ9ngv8azdNuxw18_Phrxwo7dwGjqtXnmezDpb4UiKyQ-LtSxWw4cKwDoy7JemmQ99NfvOfXQ6Sc6AhCyel_xwsLcWVD6lC5eAyoIJBn8Gx8Kf-jVbaIUx36NS7Ko4xCRHkKxW',
      },
      body: JSON.stringify(data),
    });
    return response.json(data);
  };

  const onSendNotification = async () => {
    if (fcm) {
      fcmAPI()
        .then(res => {
          alert(JSON.stringify(res));
        })
        .catch(e => console.log(e));
    }
  };
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.circleButton}
        onPress={onSendNotification}
      />
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'red',
    marginLeft: 70,
    marginTop: 120,
  },
});
