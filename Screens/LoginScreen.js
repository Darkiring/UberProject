import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    StatusBar,
    TextInput,
    TouchableOpacity,
    TouchableNativeFeedback,
    Alert,
    Animated,
    Dimensions,
    Keyboard
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Icon } from 'native-base';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class LoginScreen extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
      super(props);
      this.state = {      
        imagemarginTop: 105,
        imagemarginBottom: 100,      
        imagewidth: 110,
        imageheight: 110,
        marginThis: 25,
        placeholderText: 'Enter your mobile number',
        left: -10,
      };
    }
  
  componentWillMount() {
    this.loginHeight = new Animated.Value(190);

    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);

    this.keyboardHeight = new Animated.Value(0);
    this.forwardArrowOpacity = new Animated.Value(0);
    this.borderBottomWidth = new Animated.Value(0);    
  }

  keyboardDidShow = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration + 100,
        toValue: event.endCoordinates.height - 178
      }),
      Animated.timing(this.forwardArrowOpacity, {
        duration: event.duration,
        toValue: 1
      }),
      Animated.timing(this.borderBottomWidth, {
        duration: event.duration,
        toValue: 1
      })
    ]).start()
  }

  keyboardDidHide = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: 100,
        toValue: 0
      }),
      Animated.timing(this.forwardArrowOpacity, {
        duration: 100,
        toValue: 0
      }),
      Animated.timing(this.borderBottomWidth, {
        duration: 100,
        toValue: 0
      })
    ]).start()
  }

  increaseHeightOfLogin = () => {
    Animated.timing(this.loginHeight, {
      toValue: SCREEN_HEIGHT,
      duration: 500
    }).start(() => {
      this.refs.textInputMobile.focus();
    })
    this.setState({
      placeholderText: '(201) 555-0123           ',
      imagemarginTop: 0,
      imagemarginBottom: 0,
      imagewidth: 0,
      imageheight: 0,
      marginThis: 20,
      left: 0,
    })
  }

  decreaseHeightOfLogin = () => {
    Keyboard.dismiss();
    Animated.timing(this.loginHeight, {
      toValue: 190,
      duration: 500
    }).start()
    this.setState({
      placeholderText: 'Enter your mobile number',
      imagemarginTop: 105,
      imagemarginBottom: 100,
      imagewidth: 110,
      imageheight: 110,
      marginThis: 25,
      left: -10,  
    })
  }  

  render() {
    
    const headerTextopacity = this.loginHeight.interpolate({
      inputRange: [190, SCREEN_HEIGHT],
      outputRange: [1, 0]
    })

    const marginTop = this.loginHeight.interpolate({
      inputRange: [190, SCREEN_HEIGHT],
      outputRange: [25, 100]
    })

    const headerBackArrow = this.loginHeight.interpolate({
      inputRange: [190, SCREEN_HEIGHT],
      outputRange: [0, 1]
    })

    const titleTextbottom = this.loginHeight.interpolate({
      inputRange: [190, 300, SCREEN_HEIGHT],
      outputRange: [0, 0, 100]
    })

    const titleTextLeft = this.loginHeight.interpolate({
      inputRange: [190, SCREEN_HEIGHT],
      outputRange: [100, 25]
    })

    const titleTextOpacity = this.loginHeight.interpolate({
      inputRange: [190, SCREEN_HEIGHT],
      outputRange: [0, 1]
    })

    return (
      <View style={{ flex: 1, backgroundColor: '#1F5EDF'}}>
        <StatusBar
          backgroundColor="#1F5EDF"
          barStyle="light-content"
        />

        <Animatable.View
          style={{
            position:'absolute',
            height: 60,
            width: 60,
            top: 20,
            left: 25,
            zIndex: 100,
            opacity: headerBackArrow
          }}
        >
         <TouchableOpacity
            onPress={() => this.decreaseHeightOfLogin()}
         >
           <Animatable.View
              animation='slideInLeft'
           >
              <Icon
               name="md-arrow-back"
              />
           </Animatable.View>
         </TouchableOpacity>
        </Animatable.View>
        
        <Animated.View
          style={{
            position: 'absolute',
            height: 57, width: 57,
            right: 25,
            bottom: this.keyboardHeight, // animated
            opacity: this.forwardArrowOpacity, // animated
            zIndex: 100,
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30
          }}
        >
           <Icon name="md-arrow-forward" style={{color: 'white'}} />
        </Animated.View>

        <Animatable.View
          animation='zoomIn' interationCount={1}
        >
          <Image
            style={{ 
              width: this.state.imagewidth,
              height: this.state.imageheight, 
              alignSelf: 'center', marginTop: 
              this.state.imagemarginTop, 
              marginBottom: this.state.imagemarginBottom 
            }}
            source={require('../src/assets/uber_2018_logo_before_after.png')}
          />
        </Animatable.View>

        <Animatable.View 
          animation='slideInUp'
          interationCount={1}
          style={{ 
            flex: 1, 
          }}
        >
            <Animated.View 
              style={{
                height: this.loginHeight,                
                backgroundColor: 'white',
              }}
            >
              <Animated.View
                style={{
                  opacity: headerTextopacity,
                  alignItems: 'flex-start',
                  paddingHorizontal: 25,
                  paddingTop: marginTop
                }}
              >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '100'
                }}
              >
                Viaja con Uber
              </Text>              
              </Animated.View>
              <TouchableNativeFeedback
                onPress = {() => this.increaseHeightOfLogin()}
              >
              <Animated.View
                  style={{
                    marginTop: this.state.marginThis,
                    paddingHorizontal: 25,
                    left: this.state.left,
                    flexDirection: 'row'
                  }}
              >
              <Animated.Text
                style = {{
                  fontSize: 24, color: 'gray',
                  position: 'absolute',
                  bottom: titleTextbottom,
                  left: titleTextLeft,
                  opacity: titleTextOpacity,
                  
                }}
              >
                Enter your mobile number
              </Animated.Text>
              <Animated.View
                pointerEvents='none'
                style={{
                  flexDirection: 'row',
                  marginLeft: 15,
                  borderBottomWidth: this.borderBottomWidth
                }}
              > 
                <Image
                  source={require('../src/assets/bandera-republica-dominicana.jpg')}
                  style={{ height: 30, width: 33, resizeMode: 'center', borderRadius: 8 }}
                />
                  <Text style={{ 
                      fontSize: 20,
                      paddingLeft: 15,
                      paddingRight: 10,
                   }}
                   >+1</Text>
                    <TextInput
                      ref="textInputMobile"
                      style = {{ fontSize: 20, paddingTop: 0, paddingLeft: 0 }}
                      placeholder = {this.state.placeholderText}
                      underlineColorAndroid = 'transparent'
                      keyboardType = 'phone-pad'
                      maxLength = {10}
                   />
              </Animated.View>
              </Animated.View>
            </TouchableNativeFeedback>
            </Animated.View>            
            <View
              style={{
                height: 70,
                backgroundColor: 'white',
                alignItems: "flex-start",
                justifyContent: 'center',
                borderTopColor: '#e8e8ec',
                borderTopWidth: 1,
                paddingHorizontal: 25
              }}
            >
              <Text
                style={{
                  color: '#1F5EDF',
                  fontSize: 16,
                  fontWeight: '100'
                }}
              > 
                O conéctate por redes sociales
              </Text>
            </View>
          </Animatable.View>
      </View>
    );
  }
}
