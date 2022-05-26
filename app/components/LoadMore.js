import React from 'react';
import {ActivityIndicator} from 'react-native';
import {CustomButton} from './CustomButton';

export const LoadMore = ({getData, full, loading}) => {
  return (
    <CustomButton
      onPress={getData}
      isDisabled={full}
      colorScheme="secondary"
      style={{alignSelf: 'center', marginTop: 20, marginBottom: 20}}>
      {full ? (
        'No More Results'
      ) : loading ? (
        <ActivityIndicator color="white" />
      ) : (
        'Load More'
      )}
    </CustomButton>
  );
};
