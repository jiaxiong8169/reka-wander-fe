import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Card from '../../components/card/card';
import GradientBackground from '../../components/GradientBackground';

export default function Recommended({navigation}) {
  const onPressHandler = () => {
    navigation.navigate('Success');
  };

  return (
    <GradientBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={{margin: 10}}>Your Searhing Details</Text>
          <Card style={{marginVertical: 10}}>
            <View>
              <View
                style={{
                  flexDirection: 'column',
                  // height: 50,
                  borderColor: '#000',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  // backgroundColor: '#000'
                }}>
                <View
                  style={{
                    // height: 20,
                    flexDirection: 'row',
                    // alignContent: 'flex-start',
                    // justifyContent:'flex-start',
                    // alignItems: 'flex-start',
                  }}>
                  <Image
                    style={{
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
                    }}>
                    Pax
                  </Text>
                </View>
                <View
                  style={{
                    // height: 25,
                    padding: 3,
                    flexDirection: 'row',
                    // alignContent: 'flex-e',
                    // justifyContent: 'space-between',
                    // alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      flex: 3,
                      paddingLeft: 5,
                      fontSize: 14,
                      // color: '#000',
                    }}>
                    4
                  </Text>
                  <Text
                    style={{
                      flex: 2,
                      fontSize: 14,
                    }}>
                    RM250/pax
                  </Text>
                  <TouchableOpacity style={{marginTop: 4}}>
                    <Text style={{fontSize: 10, color: '#00BFFF'}}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{flexDirection: 'column', borderBottomColor: '#000'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    // height: 50,
                    paddingTop: 10,
                    borderColor: '#000',
                    borderBottomWidth: 1,
                    justifyContent: 'space-between',
                    // backgroundColor: '#000'
                  }}>
                  <View
                    style={{
                      // height: 23,
                      flexDirection: 'row',
                      // alignContent: 'flex-start',
                      // justifyContent:'flex-start',
                      // alignItems: 'flex-start',
                    }}>
                    <Image
                      style={{
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
                        fontSize: 16,
                        color: '#000',
                      }}>
                      Date
                    </Text>
                  </View>
                  <View
                    style={{
                      // height: 25,
                      flexDirection: 'row',
                      padding: 3,
                      // alignContent: 'flex-start',
                      // justifyContent: 'space-between',
                      // alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        flex: 3,
                        paddingLeft: 5,
                        fontSize: 14,
                        // color: '#000',
                      }}>
                      22 July - 25 July 2021
                    </Text>
                    <Text
                      style={{
                        flex: 2,
                        fontSize: 14,
                      }}>
                      RM400/night
                    </Text>
                    <TouchableOpacity style={{marginTop: 4}}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: '#00BFFF',
                          // paddingLeft: 10
                        }}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View
                style={{flexDirection: 'column', borderBottomColor: '#000'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    // height: 50,
                    paddingTop: 10,
                    borderColor: '#000',
                    borderBottomWidth: 1,
                    justifyContent: 'space-between',
                    // backgroundColor: '#000'
                  }}>
                  <View
                    style={{
                      // height: 23,
                      flexDirection: 'row',
                      // alignContent: 'flex-start',
                      // justifyContent:'flex-start',
                      // alignItems: 'flex-start',
                    }}>
                    <Image
                      style={{
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
                        fontSize: 16,
                        color: '#000',
                      }}>
                      Budget
                    </Text>
                  </View>
                  <View
                    style={{
                      // height: 25,
                      flexDirection: 'row',
                      padding: 3,
                      // alignContent: 'flex-start',
                      // justifyContent: 'space-between',
                      // alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        flex: 3,
                        paddingLeft: 5,
                        fontSize: 14,
                        // color: '#000',
                      }}>
                      RM5,000
                    </Text>

                    <TouchableOpacity style={{marginTop: 4}}>
                      <Text style={{fontSize: 10, color: '#00BFFF'}}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View
                style={{flexDirection: 'column', borderBottomColor: '#000'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    // height: 50,
                    paddingTop: 10,
                    borderColor: '#000',
                    borderBottomWidth: 1,
                    justifyContent: 'space-between',
                    // backgroundColor: '#000'
                  }}>
                  <View
                    style={{
                      // height: 23,
                      flexDirection: 'row',
                      // alignContent: 'flex-start',
                      // justifyContent:'flex-start',
                      // alignItems: 'flex-start',
                    }}>
                    <Image
                      style={{
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
                        fontSize: 16,
                        color: '#000',
                      }}>
                      Travel Interest
                    </Text>
                  </View>
                  <View
                    style={{
                      // height: 25,
                      flexDirection: 'row',
                      padding: 3,
                      // alignContent: 'flex-start',
                      // justifyContent: 'space-between',
                      // alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        flex: 3,
                        paddingLeft: 5,
                        fontSize: 14,
                        // color: '#000',
                      }}>
                      Entertainment, Leisure
                    </Text>
                    <Text style={{flex: 2, fontSize: 14}}>Depends</Text>
                    <TouchableOpacity style={{marginTop: 4}}>
                      <Text style={{fontSize: 10, color: '#00BFFF'}}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{flexDirection: 'column'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    // height: 50,
                    paddingTop: 10,
                    borderColor: '#000',
                    borderBottomWidth: 1,
                    justifyContent: 'space-between',
                    // backgroundColor: '#000'
                  }}>
                  <View
                    style={{
                      // height: 23,
                      flexDirection: 'row',
                      // alignContent: 'flex-start',
                      // justifyContent:'flex-start',
                      // alignItems: 'flex-start',
                    }}>
                    <Image
                      style={{
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
                        fontSize: 16,
                        color: '#000',
                      }}>
                      Kids
                    </Text>
                  </View>
                  <View
                    style={{
                      // height: 25,
                      flexDirection: 'row',
                      padding: 3,
                      // alignContent: 'flex-start',
                      // justifyContent: 'space-between',
                      // alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        flex: 3,
                        paddingLeft: 5,
                        fontSize: 15,
                        // color: '#000',
                      }}>
                      Yes
                    </Text>
                    <Text style={{flex: 2, fontSize: 15}}>Free</Text>
                    <TouchableOpacity style={{marginTop: 4}}>
                      <Text style={{fontSize: 10, color: '#00BFFF'}}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 16,
                    marginLeft: 50,
                    color: '#000',
                  }}>
                  Total
                </Text>
                <Text style={{flex: 1, fontSize: 18, color: '#000'}}>
                  RM2,600
                </Text>
              </View>
            </View>
          </Card>
          <Text style={{margin: 10}}>Recommended Spots</Text>
          <Card style={{marginVertical: 10}}>
            <View style={{flexDirection: 'column'}}>
              <TouchableOpacity style={{margin: 4}}>
                <View
                  style={{
                    // height: 80,
                    flex: 1,
                    flexDirection: 'row',
                    borderColor: '#000',
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                  }}>
                  <Image
                    style={{
                      flex: 1,
                      height: 60,
                      // width: 150,
                      resizeMode: 'contain',
                      borderRadius: 5,
                      paddingRight: 8,
                    }}
                    source={require('../../assets/home.jpg')}
                  />

                  <View
                    style={{
                      flex: 3,
                      flexDirection: 'column',
                      marginLeft: 3,
                      paddingLeft: 10,
                    }}>
                    <Text
                      style={{
                        // flex: 100,
                        fontSize: 16,
                        color: '#000',
                      }}>
                      Cock & Bull
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        color: '#000',
                        // paddingBottom: 4,
                      }}>
                      This is a small introduction about the spot
                    </Text>
                    <View
                      style={{
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                      }}>
                      <Text
                        style={{
                          fontSize: 11,
                          color: '#000',

                          // paddingBottom: 4,
                        }}>
                        Free Entry
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'flex-end', justifyContent: 'flex-end'}}>
              <Text
                style={{
                  fontSize: 11,
                  color: '#00BFFF',
                  paddingTop: 5,
                }}>
                Edit
              </Text>
            </View>
          </Card>

          <Text style={{margin: 10}}>Recommended Car</Text>
          <Card style={{marginVertical: 10}}>
            <View style={{flexDirection: 'column'}}>
              <TouchableOpacity style={{margin: 4}}>
                <View
                  style={{
                    // height: 80,
                    flex: 1,
                    flexDirection: 'row',
                    borderColor: '#000',
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                  }}>
                  <Image
                    style={{
                      flex: 1,
                      height: 60,
                      // width: 150,
                      resizeMode: 'contain',
                      borderRadius: 5,
                      paddingRight: 8,
                    }}
                    source={require('../../assets/toyotaExample.png')}
                  />

                  <View
                    style={{
                      flex: 3,
                      flexDirection: 'column',
                      marginLeft: 3,
                      paddingLeft: 10,
                    }}>
                    <Text
                      style={{
                        // flex: 100,
                        fontSize: 16,
                        color: '#000',
                      }}>
                      Toyota
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        color: '#000',
                        // paddingBottom: 4,
                      }}>
                      This is a small introduction about the spot
                    </Text>
                    <View
                      style={{
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                      }}>
                      <Text
                        style={{
                          fontSize: 11,
                          color: '#000',

                          // paddingBottom: 4,
                        }}>
                        4 seater
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                paddingTop: 5,
              }}>
              <Text
                style={{
                  fontSize: 11,
                  color: '#00BFFF',
                }}>
                Edit
              </Text>
            </View>
          </Card>
        </View>
        <View style={{marginTop: 20}}>
          <TouchableOpacity onPress={onPressHandler}>
            <Text
              style={{
                color: 'white',
                padding: 12,
                backgroundColor: '#4169E1',
                borderRadius: 50,
                textAlign: 'center',
                marginHorizontal: 80,
              }}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}
