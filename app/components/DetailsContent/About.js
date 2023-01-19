import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {CustomText} from '../texts/custom-text';
import {Container} from './container';
import ReadMore from '@fawazahmed/react-native-read-more';

export const About = ({
  description,
  descriptionStyle,
  titleStyle,
  seeMoreStyle,
  seeLessStyle,
  subContainerView,
  styleContainer,
}) => {
  return (
    <Container
      styleContainer={styleContainer}
      subContainerView={subContainerView}
      titleStyle={titleStyle}
      title={'About'}>
      <ReadMore
        numberOfLines={5}
        seeMoreStyle={seeMoreStyle}
        seeLessStyle={seeLessStyle}
        style={[
          descriptionStyle,
          {paddingTop: 10, paddingBottom: 3, fontSize: 14},
        ]}>
        {description}
      </ReadMore>
    </Container>
  );
};
