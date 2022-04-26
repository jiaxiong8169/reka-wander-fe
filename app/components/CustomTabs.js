import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

TouchableOpacity.defaultProps = {activeOpacity: 0.7};

export const CustomTabs = ({tabs, tab, setTab, style}) => (
  <View style={[styles.container, style && style]}>
    {tabs.map(t => (
      <TouchableOpacity
        key={t.id}
        onPress={() => {
          setTab(t.id);
        }}>
        <Text style={[t.id === tab ? styles.activeTab : styles.inactiveTab]}>
          {t.name}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    paddingTop: 5,
  },
  activeTab: {
    borderRadius: 10,
    backgroundColor: '#1E88E5',
    padding: 5,
    color: '#fff',
    fontSize: 10,
  },
  inactiveTab: {
    padding: 5,
    borderRadius: 10,
    color: '#000',
    fontSize: 10,
  },
});
