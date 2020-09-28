import * as React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import Unsplash, { toJson } from 'unsplash-js';
import PhotoBrowser from 'react-native-photo-browser';

const APP_ACCESS_KEY = 'pmqEg8jVFC1ErUP35CAyB_JLPfO07GGh6Ggoqw7V2pQ'


export default class TabOneScreen extends React.Component {
  state = {
    loading:true,
    page:1,
    thumbnails: [],
    images: []
  }

  unsplash = new Unsplash({ accessKey: APP_ACCESS_KEY })

  componentDidMount() {
    this.getPhotos()
  }

  getPhotos() {
    this.setState({ loading: true })

    this.unsplash.photos.listPhotos(this.state.page, 18, "latest")
    .then(data => toJson(data))
    .then(this.setUrls)
    .catch(console.error)
  }

  setUrls = data => {
    const thumbnails = []
    const images = []

    for (const photo of data) {
      thumbnails.push({ uri: photo.urls.thumb })
      images.push({ uri: photo.urls.regular })
    }

    this.setState({
      loading: false,
      thumbnails,
      images
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <Text>
            Loading
          </Text>
        </View>
      )
    } else {
      return (
        <Container style={styles.row}>
          <Back onPress={this.back} />

          {this.images}

          <Forward onPress={this.forward} />
        </Container>
      );
    }
  }

  back = () => {
    console.log('back')

    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 })
      this.getPhotos()
    }
  }

  forward = () => {
    console.log('forward')

    this.setState({ page: this.state.page + 1 })
    this.getPhotos()
  }

  get images() {
    if (this.state.thumbnails.length) {
      return (
        <Container>
          {[...this.imageGenerator()]}
        </Container>
      )
    } else return (
      <Text>
        No images loaded
      </Text>
    )
  }

  * imageGenerator() {
    for (const i in this.state.thumbnails) {
      yield (
        <TouchableOpacity
          key={i}
          onPress={() => this.onPress(i)}
        >
          <Image
            style={styles.image}
            source={this.state.thumbnails[i]}
          />
        </TouchableOpacity>
      )
    }
  }

  onPress = index => {
    this.props.navigation.navigate(
      'ImageDetails',
      this.state.images[index]
    )
  }
}


function Container(props) {
  return <View {...props} style={mergeStyles(styles.container, props.style)} />
}

function Button(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.button.view}>
        <Text style={styles.button.text}>
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

function Back(props) {
  return <Button {...props} text='<' />
}

function Forward(props) {
  return <Button {...props} text='>' />
}

function mergeStyles (componentStyle, propStyle) {
  if (propStyle) return {...componentStyle, ...propStyle}
  else return componentStyle
}

const styles = {
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: { flexDirection: 'row' },
  container: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  image: {
    width: 100,
    height: 100
  },
  button: {
    view: { flex: 1, justifyContent: 'center'},
    text: { fontSize: 24, padding: 10 }
  }
}
