import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import Card from '../../components/card/card';
import GradientBackground from '../../components/GradientBackground';

const data = [
    {}
];

export default function Recommended({ navigation }) {
    return (
        <GradientBackground>
            <ScrollView>
                <View>
                    <Text style={{ margin: 10 }}>
                        Your Searhing Details
                    </Text>
                    <Card style={{ marginVertical: 10, }}>
                        <View>
                            <View style={{
                                flexDirection: 'column',
                                // height: 50, 
                                borderColor: '#000',
                                justifyContent: 'space-between',
                                borderBottomWidth: 1,
                                // backgroundColor: '#000'
                            }}>
                                <View style={{
                                    // height: 20,
                                    flexDirection: 'row',
                                    // alignContent: 'flex-start',
                                    // justifyContent:'flex-start',
                                    // alignItems: 'flex-start',
                                }}>
                                    <Image style={{
                                        flex: 1,
                                        height: undefined,
                                        resizeMode: 'contain',
                                        // alignContent:'flex-start',
                                    }}
                                        source={require('../../assets/pax_icon.png')}
                                    />
                                    <Text
                                        style={{
                                            flex: 7,
                                            fontSize: 16,
                                            color: '#000',
                                        }}
                                    >
                                        Pax
                                    </Text>
                                </View>
                                <View style={{
                                    // height: 25,
                                    padding: 3,
                                    flexDirection: 'row',
                                    alignContent: 'flex-e',
                                    // justifyContent: 'space-between',
                                    // alignItems: 'flex-start',
                                }}>

                                    <Text style={{
                                        flex: 2,
                                        paddingLeft: 5,
                                        fontSize: 15,
                                        // color: '#000',
                                    }}>
                                        4
                                    </Text>
                                    <Text style={{ flex: 1, fontSize: 15, }}>
                                        RM250/pax
                                    </Text>
                                    <TouchableOpacity style={{marginTop: 10}}>
                                        <Text style={{ fontSize: 11, color:'#00BFFF' }}>
                                            Edit
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', borderBottomColor: '#000' }}>
                                <View style={{
                                    flexDirection: 'column',
                                    // height: 50, 
                                    paddingTop: 10,
                                    borderColor: '#000',
                                    borderBottomWidth: 1,
                                    justifyContent: 'space-between',
                                    // backgroundColor: '#000'
                                }}>
                                    <View style={{
                                        height: 23,
                                        flexDirection: 'row',
                                        // alignContent: 'flex-start',
                                        // justifyContent:'flex-start',
                                        // alignItems: 'flex-start',
                                    }}>
                                        <Image style={{
                                            flex: 1,
                                            height: undefined,
                                            resizeMode: 'contain',
                                            // alignContent:'flex-start',
                                        }}
                                            source={require('../../assets/calendar_icon.png')}
                                        />
                                        <Text
                                            style={{
                                                flex: 7,
                                                fontSize: 17,
                                                color: '#000',
                                            }}
                                        >
                                            Date
                                        </Text>
                                    </View>
                                    <View style={{
                                        height: 25,
                                        flexDirection: 'row',
                                        // alignContent: 'flex-start',
                                        // justifyContent: 'space-between',
                                        // alignItems: 'flex-start',
                                    }}>

                                        <Text style={{
                                            flex: 2,
                                            paddingLeft: 5,
                                            fontSize: 15,
                                            // color: '#000',
                                        }}>
                                            22 July - 25 July 2021
                                        </Text>
                                        <Text style={{ flex: 1, }}>
                                            RM400/night
                                        </Text>
                                        <TouchableOpacity>
                                            <Text>
                                                Edit
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>



                            </View>

                            <View style={{ flexDirection: 'column', borderBottomColor: '#000' }}>
                                <View style={{
                                    flexDirection: 'column',
                                    // height: 50, 
                                    paddingTop: 10,
                                    borderColor: '#000',
                                    borderBottomWidth: 1,
                                    justifyContent: 'space-between',
                                    // backgroundColor: '#000'
                                }}>
                                    <View style={{
                                        height: 23,
                                        flexDirection: 'row',
                                        // alignContent: 'flex-start',
                                        // justifyContent:'flex-start',
                                        // alignItems: 'flex-start',
                                    }}>
                                        <Image style={{
                                            flex: 1,
                                            height: undefined,
                                            resizeMode: 'contain',
                                            // alignContent:'flex-start',
                                        }}
                                            source={require('../../assets/dollar_icon.png')}
                                        />
                                        <Text
                                            style={{
                                                flex: 7,
                                                fontSize: 17,
                                                color: '#000',
                                            }}
                                        >
                                            Budget
                                        </Text>
                                    </View>
                                    <View style={{
                                        height: 25,
                                        flexDirection: 'row',
                                        // alignContent: 'flex-start',
                                        // justifyContent: 'space-between',
                                        // alignItems: 'flex-start',
                                    }}>

                                        <Text style={{
                                            flex: 2,
                                            paddingLeft: 5,
                                            fontSize: 15,
                                            // color: '#000',
                                        }}>
                                            RM5,000
                                        </Text>

                                        <TouchableOpacity>
                                            <Text>
                                                Edit
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>



                            </View>

                            <View style={{ flexDirection: 'column', borderBottomColor: '#000' }}>
                                <View style={{
                                    flexDirection: 'column',
                                    // height: 50, 
                                    paddingTop: 10,
                                    borderColor: '#000',
                                    borderBottomWidth: 1,
                                    justifyContent: 'space-between',
                                    // backgroundColor: '#000'
                                }}>
                                    <View style={{
                                        height: 23,
                                        flexDirection: 'row',
                                        // alignContent: 'flex-start',
                                        // justifyContent:'flex-start',
                                        // alignItems: 'flex-start',
                                    }}>
                                        <Image style={{
                                            flex: 1,
                                            height: undefined,
                                            resizeMode: 'contain',
                                            // alignContent:'flex-start',
                                        }}
                                            source={require('../../assets/travelInterest_icon.jpg')}
                                        />
                                        <Text
                                            style={{
                                                flex: 7,
                                                fontSize: 17,
                                                color: '#000',
                                            }}
                                        >
                                            Travel Interest
                                        </Text>
                                    </View>
                                    <View style={{
                                        height: 25,
                                        flexDirection: 'row',
                                        // alignContent: 'flex-start',
                                        // justifyContent: 'space-between',
                                        // alignItems: 'flex-start',
                                    }}>

                                        <Text style={{
                                            flex: 2,
                                            paddingLeft: 5,
                                            fontSize: 15,
                                            // color: '#000',
                                        }}>
                                            Entertainment, Leisure
                                        </Text>
                                        <Text style={{ flex: 1, }}>
                                            Depends
                                        </Text>
                                        <TouchableOpacity>
                                            <Text>
                                                Edit
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>



                            </View>
                            <View style={{ flexDirection: 'column', borderBottomColor: '#000' }}>
                                <View style={{
                                    flexDirection: 'column',
                                    // height: 50, 
                                    paddingTop: 10,
                                    borderColor: '#000',
                                    borderBottomWidth: 1,
                                    justifyContent: 'space-between',
                                    // backgroundColor: '#000'
                                }}>
                                    <View style={{
                                        height: 23,
                                        flexDirection: 'row',
                                        // alignContent: 'flex-start',
                                        // justifyContent:'flex-start',
                                        // alignItems: 'flex-start',
                                    }}>
                                        <Image style={{
                                            flex: 1,
                                            height: undefined,
                                            resizeMode: 'contain',
                                            // alignContent:'flex-start',
                                        }}
                                            source={require('../../assets/kid_icon.png')}
                                        />
                                        <Text
                                            style={{
                                                flex: 7,
                                                fontSize: 17,
                                                color: '#000',
                                            }}
                                        >
                                            Kids
                                        </Text>
                                    </View>
                                    <View style={{
                                        height: 25,
                                        flexDirection: 'row',
                                        // alignContent: 'flex-start',
                                        // justifyContent: 'space-between',
                                        // alignItems: 'flex-start',
                                    }}>

                                        <Text style={{
                                            flex: 2,
                                            paddingLeft: 5,
                                            fontSize: 15,
                                            // color: '#000',
                                        }}>
                                            Yes
                                        </Text>
                                        <Text style={{ flex: 1, }}>
                                            Free
                                        </Text>
                                        <TouchableOpacity>
                                            <Text>
                                                Edit
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>



                            </View>
                        </View>
                    </Card>
                    <Text style={{ margin: 10 }}>
                        Recommended Spots
                    </Text>
                    <Card style={{ marginVertical: 10, }}>
                        <View style={{ height: 150, flexDirection: 'row' }}>
                            <Image
                                style={{ flex: 1, height: undefined, borderRadius: 5 }}
                                source={require('../../assets/home.jpg')}
                            />


                        </View>
                    </Card>
                </View>
            </ScrollView>
        </GradientBackground>
    );
};
