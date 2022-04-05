// import React from 'react';
// import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
// import RadioButtonRN from 'radio-buttons-react-native';

// const data = [
//     {
//         label: 'Yes'
//     },
//     {
//         label: 'No'
//     }
// ];

// const Radio = () => {


//     return (
//         <View style={{alignItems:'center'}}>
//             <RadioButtonRN
//                 data={data}
//                 box={false}
//                 animationTypes={['pulse']}
//                 boxStyle={{flexDirection: 'row'}}
//                 circleSize={10}
//                 textColor={'black'}
//                 selectedBtn={(e) => console.log(e)}
//             >
//             </RadioButtonRN>
//         </View>
//     );
// };

// export default Radio;


// import React, { PureComponent } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import PropTypes from 'prop-types';
// import Circle from './Circle';

// class RadioGroup extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedOptionId: props.activeButtonId,
//     };
//   }

//   static propTypes = {
//     options: PropTypes.arrayOf({
//       id: PropTypes.string.isRequired,
//       label: PropTypes.string,
//       labelView: PropTypes.element,
//     }).isRequired,
//     horizontal: PropTypes.bool,
//     circleStyle: PropTypes.object,
//     activeButtonId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//     onChange: PropTypes.func,
//   };

//   static defaultProps = {
//     horizontal: false,
//   };

//   onPress = option => () => {
//     if (option.id === this.state.selectedOptionId) {
//       return;
//     }

//     this.setState({ selectedOptionId: option.id });
//     this.props.onChange && this.props.onChange(option);
//   };

//   render() {
//     const { options, horizontal, circleStyle } = this.props;
//     return (
//       <View style={[styles.container, horizontal && { flexDirection: 'row' }]}>
//         {options.map(option => (
//           <TouchableOpacity
//             key={option.id}
//             style={styles.radio}
//             onPress={this.onPress(option)}
//           >
//             <Circle
//               active={this.state.selectedOptionId === option.id}
//               circleStyle={circleStyle}
//             />
//             {option.label && <Text>{option.label}</Text>}
//             {!option.label && option.labelView}
//           </TouchableOpacity>
//         ))}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flexWrap: 'wrap',
//   },
//   radio: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//     marginRight: 10,
//   },
// });

// export default RadioGroup;



import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Animated, TouchableOpacity } from 'react-native';


class RadioButtonRN extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeIndex: -1,
            fadeAnim: new Animated.Value(0),
            animations: []
        };
        // this.fadeAnim = new Animated.Value(0);

        this.animations = [
            {
                name: 'zoomIn',
                animation: {
                    scale: this.state.fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1]
                    })
                }
            },
            {
                name: 'pulse',
                animation: {
                    scale: this.state.fadeAnim.interpolate({
                        inputRange: [0, 0.4, 0.7, 1],
                        outputRange: [0.7, 1, 1.3, 1]
                    })
                }
            },
            {
                name: 'shake',
                animation: {
                    scale: this.state.fadeAnim.interpolate({
                        inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
                        outputRange: [0.8, 1.2, 0.8, 1.2, 0.8, 1]
                    })
                }
            },
            {
                name: 'rotate',
                animation: {
                    rotate: this.state.fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg']
                    })
                }
            },
        ]

        this._changeRadio = this._changeRadio.bind(this);
        this._checkAnimatons = this._checkAnimatons.bind(this);
    }

    componentDidMount() {
        this._checkAnimatons();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.activeIndex === -1 && this.props.initial > 0) {
            const initialActive = this.props.initial - 1;
            this._changeRadio(this.props.data[initialActive], initialActive);
        }
        if (this.props.initial !== prevProps.initial) {
            const initialActive = this.props.initial - 1;
            this._changeRadio(this.props.data[initialActive], initialActive);
        }
        if (this.props.animationTypes !== prevProps.animationTypes) {
            this._checkAnimatons();
        }
    }

    _checkAnimatons() {
        const { animationTypes } = this.props;

        this.setState({ animations: [] });
        const newAnim = [];
        animationTypes && animationTypes.map((item, index) => {
            const itm = this.animations.find((e) => e.name === item);
            if (itm) {
                newAnim.push(itm.animation);
            }
        })
        this.setState({ animations: newAnim });
    }

    _changeRadio(item, activeIndex) {
        this.setState({ activeIndex });
        if (activeIndex !== this.state.activeIndex) {
            this.fadeInAnimation();
        }
        this.props.selectedBtn(item);
    }

    fadeInAnimation = () => {
        // this.fadeAnim.setValue(0)
        Animated.timing(this.state.fadeAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
        }).start(() => {
            Animated.timing(this.state.fadeAnim, {
                toValue: 1,
                duration: this.props.duration,
                delay: 10,
                useNativeDriver: true,
            }).start();
        });
    }

    render() {
        let { activeIndex, fadeAnim, animations } = this.state;
        let { boxStyle, style, circleSize, textStyle, data, icon, activeColor, deactiveColor, boxActiveBgColor, boxDeactiveBgColor, box, textColor } = this.props;

        return (
            //horizontal -> flexDirection: 'row'
            <View style={style={flexDirection: 'row',justifyContent: 'space-between',}}>
                {
                    data.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[box ? styles.productBox : styles.productBoxLess,
                                box && {
                                    backgroundColor: activeIndex === index ? boxActiveBgColor : boxDeactiveBgColor,
                                    borderColor: activeIndex === index ? activeColor : deactiveColor,
                                }
                                    , boxStyle]}
                                activeOpacity={0.9}
                                onPress={() => this._changeRadio(item, index)}
                            >
                                <View style={styles.leftProductBox}>
                                    <View style={[icon ? styles.icon : styles.circle, {
                                        borderColor: activeIndex === index ? activeColor : deactiveColor,
                                        width: circleSize + 8,
                                        height: circleSize + 8
                                    },
                                    icon && {
                                        borderColor: activeIndex === index ? 'transparent' : deactiveColor
                                    }
                                    ]}>
                                        <Animated.View style={{
                                            opacity: activeIndex === index ? fadeAnim : 0,
                                        }}>
                                            <Animated.View
                                                style={{
                                                    transform: animations
                                                }}
                                            >
                                                {
                                                    icon ?
                                                        icon
                                                        :
                                                        <View style={[styles.circleFill, {
                                                            backgroundColor: activeIndex === index ? activeColor : deactiveColor,
                                                            borderColor: activeIndex === index ? activeColor : deactiveColor,
                                                            width: circleSize,
                                                            height: circleSize
                                                        }]} />
                                                }
                                            </Animated.View>
                                        </Animated.View>
                                    </View>
                                </View>

                                <View style={[styles.centerProductBox]}>
                                    <Text style={[{
                                        color: textColor,
                                        fontSize: 20,
                                    }, textStyle]}>
                                        {item.label}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        );
    }

}

/* Styles ====================================== */
const styles = StyleSheet.create({
    productBox: {
        flexDirection: 'row',
        borderRadius: 7,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 15,
        // marginTop: 10
    },
    productBoxLess: {
        flexDirection: 'row',
        marginTop: 10
    },
    leftProductBox: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',

    },
    centerProductBox: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        paddingHorizontal: 4
    },
    circle: {
        borderWidth: 1,
        borderRadius: 10000,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        borderWidth: 1,
        borderRadius: 10000,
        alignItems: 'center',
        justifyContent: 'center'
    },
    circleFill: {
        borderWidth: 1,
        borderRadius: 10000
    }
});

/* Props ======================================= */
RadioButtonRN.propTypes = {
    style: PropTypes.object,
    boxStyle: PropTypes.object,
    textStyle: PropTypes.object,
    initial: PropTypes.number,
    circleSize: PropTypes.number,
    duration: PropTypes.number,
    data: PropTypes.array,
    animationTypes: PropTypes.array,
    selectedBtn: PropTypes.func,
    activeColor: PropTypes.string,
    deactiveColor: PropTypes.string,
    // textActiveColor: PropTypes.string,
    // textDeactiveColor: PropTypes.string,
    boxActiveBgColor: PropTypes.string,
    boxDeactiveBgColor: PropTypes.string,
    textColor: PropTypes.string,
    box: PropTypes.bool,
};

RadioButtonRN.defaultProps = {
    style: {},
    boxStyle: {},
    textStyle: {},
    initial: -1,
    circleSize: 18,
    duration: 500,
    data: [],
    animationTypes: [],
    selectedBtn: () => { },
    // activeColor: 'black',
    activeColor: `#4169E1`,
    deactiveColor: '#e2e2e2',
    boxActiveBgColor: '#e1f5fe33',
    boxDeactiveBgColor: '#fff',
    textColor: 'black',
    box: true,
};

/* Export Component ============================ */
export default RadioButtonRN;