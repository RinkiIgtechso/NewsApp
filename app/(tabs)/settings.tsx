import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

type Props = {}

const Page = (props: Props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  return (
    <>
      <Stack.Screen 
        options={{
          headerTitle: () => {
            return <Text style={{paddingLeft:130, fontWeight: '600', fontSize: 18}}>
                Settings
            </Text>
          },
          headerShown: true
      }}/>
      <View style={styles.container}>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnText}>About</Text>
          <MaterialIcons name='arrow-forward-ios' size={16} color={Colors.lightGrey} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnText}>Send Feedback</Text>
          <MaterialIcons name='arrow-forward-ios' size={16} color={Colors.lightGrey} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnText}>Privacy Policy</Text>
          <MaterialIcons name='arrow-forward-ios' size={16} color={Colors.lightGrey} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnText}>Terms & Uses</Text>
          <MaterialIcons name='arrow-forward-ios' size={16} color={Colors.lightGrey} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.itemBtn, {paddingBottom: 0}]} onPress={toggleSwitch}>
          <Text style={styles.itemBtnText}>Dark Mode</Text>
          <Switch
            trackColor={{false:"#767577", true: "#3e3e3e"}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor={'#3e3e3e'}
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{transform: [{scale: 0.6}], marginTop: -15}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={[styles.itemBtnText, {color:"red"}]}>Logout</Text>
          <MaterialIcons name="logout" size={16} color={'red'} />
        </TouchableOpacity>
      </View>
    </>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  itemBtn: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent:"space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomColor: Colors.background,
    borderBottomWidth: 1
  },
  itemBtnText: {
    fontSize: 14,
    fontWeight: '500'
  }
})