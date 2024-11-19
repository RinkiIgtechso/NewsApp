import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NewsDataType } from '@/types'
import { SharedValue } from 'react-native-reanimated';
import {LinearGradient} from "expo-linear-gradient"
import { Colors } from 'react-native/Libraries/NewAppScreen';

type Props = {
    slideItem: NewsDataType,
    index: number,
    scrollX: SharedValue<number>
}

const { width } = Dimensions.get('screen');
 
const SliderItem = ({slideItem, index, scrollX}: Props) => {
   
  return (
    <View style={styles.itemWrapper}>
        {slideItem.image_url ? (
            <Image source={{ uri: slideItem.image_url }} style={styles.image} />
        ) : (
            <Text>No Image</Text>
        )}
        <LinearGradient colors={['transparent', "rgba(0, 0, 0, 0.5)"]} style={styles.background}>
            <View>
                <View style={styles.sourceInfo}>
                    {slideItem.source_icon  && (
                        <Image source={{ uri: slideItem.source_icon }} style={styles.sourceIcon} />
                    )}
                    <Text style={styles.sourceName}>{slideItem.source_name}</Text>
                </View>
                <Text style={styles.title} numberOfLines={2}>{slideItem.title || 'No Title'}</Text>
            </View>
        </LinearGradient>
    </View>
  )
}

export default SliderItem

const styles = StyleSheet.create({
    itemWrapper: {
        // position: 'relative',
        width: width,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20
    },
    image: {
        width: width - 60,
        height: 180,
        borderRadius: 20
    },
    background: {
        position: 'absolute',
        left: 30,
        right: 0,
        top: 0,
        width: width - 60,
        height: 180,
        borderRadius: 20,
        // padding: 20
    },
    sourceIcon: {
        width: 25,
        height: 25,
        borderRadius: 20
    },
    sourceInfo: {
        flexDirection: 'row',
        position: 'absolute',
        top: 85,
        paddingHorizontal: 20,
        gap: 10,
        alignItems: 'center'
    },
    sourceName: {
        fontSize: 12,
        color: Colors.white,
        fontWeight: '600'
    },
    title: {
        fontSize: 14,
        color: Colors.white,
        position: 'absolute',
        top: 120,
        paddingHorizontal: 20,
        fontWeight: '600'
    }
})