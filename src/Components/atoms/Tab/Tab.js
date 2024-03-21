import React from 'react';
import {View, TouchableOpacity, Text, Platform} from 'react-native';
import styles from './TabStyle';
// import LinearGradient from 'react-native-linear-gradient';

export const Tab = props => {
  const {currentTab, titleList, tabPress, titleStyle, type} = props; /// <Tab currentTab={currentTab} titleList={['tab1', 'tab2', ]} tabPress={(currentTab) => setCurrentTab(currentTab)} />
  if (type === 1) {
    return (
      <View style={styles.PH15}>
        <View style={styles.tabBar2}>
          {titleList.map((title, i) => {
            return (
              <View
              key={i}
                style={[
                  styles.tabRow,
                  currentTab == i
                    ? styles.activeGradient2
                    : styles.inactiveGradient2,
                ]}>
                <TouchableOpacity
            activeOpacity={0.9}
                  style={[
                    styles.tab2,
                    currentTab == i ? styles.activeTab2 : styles.inactiveTab2,
                  ]}
                  onPress={() => tabPress(i)}>
                  <Text
                    style={[
                      titleStyle ? titleStyle : styles.tabTitle2,
                      currentTab == i
                        ? styles.activeTabTx2
                        : styles.inactiveTabTx2,
                    ]}>
                    {title}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
          <View style={styles.topSep2} />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.tabBar}>
        {titleList.map((title, i) => {
          return (
            // <LinearGradient colors={currentTab == i ? ['#2aa5f5', '#2a35b3',] : ['#FFFFFF', '#FFFFFF',]} style={Platform.OS === 'ios' ? { height: 52 } : { height: 47 }}
            // 	start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}
            // 	style={[{ flex: 1, flexDirection: 'row', }, currentTab == i ? styles.activeGradient : styles.inactiveGradient]}	>
            <TouchableOpacity
            key={i}
            activeOpacity={0.9}
              style={[
                styles.tab,
                currentTab == i ? styles.activeTab : styles.inactiveTab,
              ]}
              onPress={() => tabPress(i)}>
              <Text
                style={[
                  titleStyle ? titleStyle : styles.tabTitle,
                  currentTab == i ? styles.activeTabTx : styles.inactiveTabTx,
                ]}>
                {title}
              </Text>
            </TouchableOpacity>
            // </LinearGradient>
          );
        })}
        <View style={styles.topSep} />
      </View>
    );
  }
};
export default Tab;
