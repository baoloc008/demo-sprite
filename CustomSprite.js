import React from 'react';
import {
  View,
  Animated,
  Easing
} from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import PropTypes from 'prop-types';

const stylePropType = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.object,
  PropTypes.array,
]);

export default class SpriteSheet extends React.PureComponent {
  static propTypes = {
    source: PropTypes.array.isRequired,
    viewStyle: stylePropType,
    imageStyle: stylePropType
  }

  constructor(props) {
    super(props);
    this.state = {
      imageHeight: 0,
      imageWidth: 0,
      time: Array(this.props.source.length).fill(new Animated.Value(0)),
      opacity: [new Animated.Value(1), ...Array.from({ length: this.props.source.length - 1 }).map(x => new Animated.Value(0))]
    }
  }
  
  componentWillMount() {
    let { source, height, width } = this.props;
    let image = resolveAssetSource(source[0]);
    let imageHeight = image.height;
    let imageWidth = image.width;
    let frameHeight = height;
    let frameWidth = width;

    this.setState({
      imageHeight,
      imageWidth,
      frameHeight,
      frameWidth,
      itemPerRow: Math.floor(image.width / frameWidth)
    });
  }

  render() {
    let {
      imageHeight,
      imageWidth,
      frameHeight,
      frameWidth,
    } = this.state;
    let { height, width, source } = this.props;
    let length = this.state.itemPerRow;
    const hotdogs = this.props.source.map((src, index) => (
      <Animated.Image
        key={index}
        source={source[index]}
        style={{
          position: 'absolute',                
          height: imageHeight,
          width: imageWidth,
          top: 0,
          left: this.state.time[index].interpolate({
            inputRange: [].concat(...Array.from({ length }, (_, i) => [i, i + 0.99999999999])),
            outputRange: [].concat(...Array.from({ length }, (_, i) => [-frameWidth * i, -frameWidth * i]))
          }),
          opacity: this.state.opacity[index]
        }}
      />
     ));
    return (
      <View
        style={{
          height: frameHeight,
          width: frameWidth,
          overflow: 'hidden',
          backgroundColor: 'transparent'
        }}>
       { hotdogs }
      </View>
    );
  }

  stop = () => {
    this.props.source.map((src, index) => {
      this.state.time[index].stopAnimation();
      this.state.opacity[index].stopAnimation();
    })
  }

  play = (fps) => {
    let length = this.state.itemPerRow;
      this.props.source.map((src, index) => {
        this.state.time[index].setValue(0);
        this.state.opacity[index].setValue(0);
      })
      this.state.opacity[0].setValue(1);
      const anims = this.props.source.map((src, index) => {
        if (index === 0) {
          return Animated.timing(this.state.time[index], {
            toValue: length,
            duration: length / fps * 1000,
            easing: Easing.linear
          });
        }
        return Animated.parallel([
          Animated.timing(this.state.opacity[index - 1], {
            toValue: 0,
            duration: 0,
          }),
          Animated.timing(this.state.opacity[index], {
            toValue: 1,
            duration: 0,
          }),
          Animated.timing(this.state.time[index], {
            toValue: length,
            duration: length / fps * 1000,
            easing: Easing.linear
          }),
        ]);
      })
      Animated.loop(Animated.sequence([].concat(...anims))).start();
  }
}
