import React, { FC, useState, ReactElement, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ScrollView,
} from 'react-native';

export interface StepperProps {
  active: number;
  content: ReactElement[];
  onNext: Function;
  onBack: Function;
  onFinish: Function;
  wrapperStyle?: ViewStyle;
  stepStyle?: ViewStyle;
  stepTextStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  showButton?: boolean;
}

const search = (keyName: number, myArray: number[]): boolean => {
  return myArray.some((val) => val === keyName);
};

const Stepper: FC<StepperProps> = (props) => {
  const {
    active,
    content,
    onBack,
    onNext,
    onFinish,
    wrapperStyle,
    stepStyle,
    stepTextStyle,
    buttonStyle,
    buttonTextStyle,
    showButton = true,
  } = props;
  const [step, setStep] = useState<number[]>([0]);
  const pushData = (val: number) => {
    setStep((prev) => [...prev, val]);
  };

  const removeData = () => {
    setStep((prev) => {
      prev.pop();
      return prev;
    });
  };

  useEffect(() => {
    if (step[step.length - 1] > active) {
      removeData();
    } else {
      pushData(active);
    }
  }, [active]);

  return (
    <View style={wrapperStyle}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {content.map((_, i) => {
          return (
            <React.Fragment key={i}>
              {i !== 0 && (
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: 'grey',
                    opacity: 1,
                    marginHorizontal: 10,
                  }}
                />
              )}
              <View
                style={[
                  {
                    backgroundColor: '#1976d2',
                    width: 30,
                    height: 30,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: search(i, step) ? 1 : 0.3,
                  },
                  stepStyle,
                ]}
              >
                {search(i, step) ? (
                  <Text
                    style={[
                      {
                        color: 'white',
                      },
                      stepTextStyle,
                    ]}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={[
                      {
                        color: 'white',
                      },
                      stepTextStyle,
                    ]}
                  >
                    {i + 1}
                  </Text>
                )}
              </View>
            </React.Fragment>
          );
        })}
      </View>
      <View style={{ alignItems: "center" }}>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <View>
          {content[active]}</View>
        {/* </ScrollView> */}
        {showButton && (
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            {active !== 0 && (
              <TouchableOpacity
                style={[
                  {
                    padding: 10,
                    borderRadius: 4,
                    // alignSelf: 'flex-start',
                    marginRight: 10,
                  },
                  buttonStyle,
                  {
                    backgroundColor: '#a1a1a1',
                  },
                ]}
                onPress={() => {
                  // removeData();
                  onBack();
                }}
              >
                <Text style={[{ color: 'white' }, buttonTextStyle]}>Back</Text>
              </TouchableOpacity>
            )}
            {content.length - 1 !== active && (

              <TouchableOpacity
                style={[
                  {
                    padding: 10,
                    borderRadius: 4,
                    backgroundColor: '#1976d2',
                    // alignSelf: 'center',
                    // alignItems: 'center',
                    // justifyContent:'center',
                    // marginRight: 10,
                    // position: 'absolute',
                    // top: -100,
                    // bottom: 0,
                  },
                  buttonStyle,
                ]}
                onPress={() => {
                  // pushData(active + 1);
                  onNext();
                }}
              >
                <Text style={[{ color: 'white', fontSize: 15 }, buttonTextStyle]}>Next</Text>
              </TouchableOpacity>

            )}
            {content.length - 1 === active && (
              <TouchableOpacity
                style={[
                  {
                    padding: 10,
                    borderRadius: 4,
                    backgroundColor: '#1976d2',
                    alignSelf: 'flex-start',
                  },
                  buttonStyle,
                ]}
                onPress={() => onFinish()}
              >
                <Text style={[{ color: 'white', fontSize: 20 }, buttonTextStyle]}>Finish</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default Stepper;