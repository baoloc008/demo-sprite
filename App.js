import React from 'react';
import {
  View,
  Image,
  Animated,
  Button,
  Slider,
  Text
} from 'react-native';
import SpriteSheet from './CustomSprite';

export default class Example extends React.Component {
  fps = 10;

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 9,
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: 70
          }}
        >
          <SpriteSheet
            ref={ref => (this.hotdog = ref)}
            source={[
              require('./assets/hotdog/Hotdog_0.png'),
              require('./assets/hotdog/Hotdog_1.png'),
              require('./assets/hotdog/Hotdog_2.png'),
              require('./assets/hotdog/Hotdog_3.png'),
              require('./assets/hotdog/Hotdog_4.png'),
              require('./assets/hotdog/Hotdog_5.png'),
              require('./assets/hotdog/Hotdog_6.png'),
              require('./assets/hotdog/Hotdog_7.png'),
              require('./assets/hotdog/Hotdog_8.png'),
              require('./assets/hotdog/Hotdog_9.png'),
              require('./assets/hotdog/Hotdog_10.png'),
              require('./assets/hotdog/Hotdog_11.png'),
              require('./assets/hotdog/Hotdog_12.png'),
              require('./assets/hotdog/Hotdog_13.png'),
              require('./assets/hotdog/Hotdog_14.png'),
              require('./assets/hotdog/Hotdog_15.png'),
              require('./assets/hotdog/Hotdog_16.png'),
              require('./assets/hotdog/Hotdog_17.png'),
              require('./assets/hotdog/Hotdog_18.png'),
              require('./assets/hotdog/Hotdog_19.png'),
              require('./assets/hotdog/Hotdog_20.png'),
              require('./assets/hotdog/Hotdog_21.png'),
              require('./assets/hotdog/Hotdog_22.png'),
              require('./assets/hotdog/Hotdog_23.png')
            ]}
            height={520}
            width={374}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 16, marginRight: 10 }}>FPS</Text>
            <Slider
              style={{ flex: 1 }}
              minimumValue={1}
              maximumValue={47}
              value={this.fps}
              // onValueChange={val => this.fps = val}
              onSlidingComplete={(val) => {
                this.fps = val;
                this.play(this.fps)
              }}
            />
          </View>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
        >
          <Button onPress={() => this.play(this.fps)} title="play" />
          <Button onPress={() => this.stop()} title="stop" />
        </View>
      </View>
    );
  }

  play = fps => this.hotdog.play(fps);
  stop = () => this.hotdog.stop();
}
