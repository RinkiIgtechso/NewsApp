import { View, StyleSheet, LayoutChangeEvent } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabBarButton from "@/components/TabBarButton";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import React from "react";


export const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps)  => {
    const [dimension, setDimension] = useState({ height:20, width: 100 });
    const buttonWidth = dimension.width / state.routes.length;

    const onTabbarLayout = (e: LayoutChangeEvent) => {
        setDimension({
            height: e.nativeEvent.layout.height,
            width: e.nativeEvent.layout.width
        })
    }

    const tabPositionX = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(()=>{
        return {
            transform: [{ translateX: tabPositionX.value }]
        }
    })

    return (
        <View onLayout={onTabbarLayout} style={styles.tabbar}>
            <Animated.View style={[animatedStyle,{
                position: 'absolute',
                backgroundColor: Colors.tint,
                top: 52,
                left: 34,
                height: 8,
                width: 40
            }]}>
                {state.routes.map((route, index)=> { 
                    const options = descriptors[route.key];
                    const label = 
                            options.options.tabBarLabel ??
                            options.options.title ??
                            route.name;

                    const isFocused = state.index === index;
                    const onPress = () => {
                        tabPositionX.value = withTiming( buttonWidth * index, {
                            duration: 200
                        });

                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault:  true
                        });

                        if(!isFocused && !event.defaultPrevented){
                            navigation.navigate(route.name, route.params)
                        }
                    }
                    const onLongPress = () => {
                        navigation.emit({
                          type: "tabLongPress",
                          target: route.key,
                        });
                    };  

                    return (
                        <TabBarButton
                          onPress={onPress}
                          onLongPress={onLongPress}
                          isFocused={isFocused}
                          routeName={route.name}
                          label={label as string}
                        />
                    );
                })}
            </Animated.View>
        </View>
    )

}

const styles = StyleSheet.create({
    tabbar: {
      flexDirection: 'row',
      paddingTop: 16,
      paddingBottom:40,
      backgroundColor: Colors.white,
    }
  })