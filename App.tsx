import React, { useState, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { playbackService } from './musicPlayerService';
import { addTrack, setUpPlayer } from './musicPlayerService';

// AppRegistry.registerComponent(...);
TrackPlayer.registerPlaybackService(() => playbackService);
export default function App(): JSX.Element {
  const [isplayerReady, setPlayerIsReady] = useState(false);
  async function setup() {
    let isSetup = await setUpPlayer();
    if (isSetup) {
      await addTrack();
    }
    setPlayerIsReady(isSetup);
  }
  useEffect(() => {
    setup();
  }, []);
  if (!isplayerReady) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Testing seems okay</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
