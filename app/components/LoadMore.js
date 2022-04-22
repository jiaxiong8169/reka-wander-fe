import {Text} from 'native-base';
import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const LoadMore = ({getData, full, loading}) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={getData}
        disabled={full}
        style={full ? styles.loadMoreBtnDisabled : styles.loadMoreBtn}>
        <Text style={styles.btnText}>
          {full ? 'No More Results' : loading ? 'Loading Data...' : 'Load More'}
        </Text>
        {loading ? (
          <ActivityIndicator color="white" style={{marginLeft: 8}} />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 110,
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadMoreBtnDisabled: {
    padding: 10,
    backgroundColor: '#7d7d7d',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});
