import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

TouchableOpacity.defaultProps = {activeOpacity: 0.7};

export const CustomTabs = ({tabs, tab, setTab, style}) => (
  <View style={[styles.container, style && style]}>
    {tabs.map(t => (
      <TouchableOpacity
        key={t.id}
        onPress={() => {
          setTab(t.id);
        }}>
        <View style={[t.id === tab ? styles.activeTab : styles.inactiveTab]}>
          <Text style={{fontSize: 10, color: t.id === tab ? '#fff' : '#000'}}>
            {t.name}
          </Text>
        </View>
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
    borderRadius: 7,
    backgroundColor: '#1E88E5',
    padding: 5,
  },
  inactiveTab: {
    padding: 5,
    borderRadius: 7,
  },
});
