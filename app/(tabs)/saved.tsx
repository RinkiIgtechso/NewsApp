import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {}

const Saved = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>Saved Screen</Text>
    </View>
  )
}

export default Saved

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})