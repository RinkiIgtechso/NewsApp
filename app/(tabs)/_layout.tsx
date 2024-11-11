import React from 'react'
import { Tabs } from 'expo-router'
import { TabBar } from '@/components/TabBar'
import { Ionicons } from '@expo/vector-icons'
import { icon } from "../../constants/Icons"
import { Colors } from '@/constants/Colors'
import { Text } from 'react-native'

const TabLayout = () => {

  return (
    <Tabs>
    {/* <Tabs tabBar={(props) => <TabBar {...props} />}> */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: (focused)=>icon['index']({
            color: focused.focused ? Colors.tabIconSelected : Colors.tabIconDefault,
            focused: focused.focused,
          }),
          tabBarLabel(props) {
            return (
              <Text style={{
                color: props.focused ? 'red' :'black',
                fontSize:12
              }}>Home</Text>
            )
          },
        }}

      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: (focused)=>icon['discover']({
            color: focused.focused ? Colors.tabIconSelected : Colors.tabIconDefault,
            focused: focused.focused,
          }),
          tabBarLabel(props) {
            return (
              <Text style={{
                color: props.focused ? 'red' :'black',
                fontSize:12
              }}>Discover</Text>
            )
          },
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: (focused)=>icon['saved']({
            color: focused.focused ? Colors.tabIconSelected : Colors.tabIconDefault,
            focused: focused.focused,
          }),
          tabBarLabel(props) {
            return (
              <Text style={{
                color: props.focused ? 'red' :'black',
                fontSize:12
              }}>Saved</Text>
            )
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: (focused)=>icon['settings']({
            color: focused.focused ? Colors.tabIconSelected : Colors.tabIconDefault,
            focused: focused.focused,
          }),
          tabBarLabel(props) {
            return (
              <Text style={{
                color: props.focused ? 'red' :'black',
                fontSize:12
              }}>Settings</Text>
            )
          },
        }}
      />
    </Tabs>
  )
}

export default TabLayout