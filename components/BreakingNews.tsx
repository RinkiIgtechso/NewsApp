import { Animated, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { NewsDataType } from '@/types'
import SliderItem from './SliderItem'
import { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'

type Props = {
    newsList: Array<NewsDataType>
}   

const BreakingNews = ({ newsList }: Props) => {
    const [data, setData] = useState(newsList);
    const [paginationIndex, setPaginationIndex] = useState(0);
    const scrollX = useSharedValue(0);
    const ref = useAnimatedRef<Animated.FlatList<any>>();
    
    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x;
        },
    })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breaking News</Text>
      <View style={styles.slideWrapper}>
        <Animated.FlatList
            ref={ref}
            data={data}
            keyExtractor={(_, index)=> `list_item${index}`}
            renderItem={({item, index}) => (
                <SliderItem slideItem={item} index={index} scrollX={scrollX} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            ListEmptyComponent={<Text>No breaking news available.</Text>}
            onScroll={onScrollHandler}
            scrollEventThrottle={16}
        />
      </View>
    </View>
  )
}

export default BreakingNews

const styles = StyleSheet.create({
    container:{
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        color: Colors.black,
        marginBottom: 10,
        marginLeft: 20
    },
    slideWrapper: {
        flex: 0, // Prevent stretch
        width: '100%',
        justifyContent: 'center',
        borderRadius: 20
    }
})