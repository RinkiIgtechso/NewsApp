import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NewsDataType } from '@/types'
import Animated, { SharedValue } from 'react-native-reanimated'
import { Colors } from '@/constants/Colors'

type Props = {
    item: NewsDataType[], 
    paginatinonIndex: number,
    scrollX: SharedValue<number>
}

const Pagination = ({item, paginatinonIndex, scrollX}: Props) => {
  return (
    <View style={styles.container}>
        {item.map((_, index)=>{
            return (                   
                <Animated.View style={[styles.dot, {backgroundColor: paginatinonIndex===index ? Colors.tint : Colors.darkGrey}]} key={index} />
            )
        })}
    </View>
  )
}

export default Pagination

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        height: 40,
        justifyContent: 'center',
        alignItems:"center"
    },
    dot: {
        backgroundColor: "#333",
        height: 8,
        width: 8,
        marginHorizontal: 2,
        borderRadius: 8
    }
})