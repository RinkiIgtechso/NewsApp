import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Colors } from '@/constants/Colors'
import newsCategoryList from '@/constants/Categories'

type Props = {
    onCategoryChanged: (category: string) => void;
}

const Catogries = ({onCategoryChanged}: Props) => {
    const scrollRef = useRef<ScrollView>(null);
    const itemRef = useRef<TouchableOpacity[] | null[]>([])
    const [itemWidths, setItemWidths] = useState<number[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelectedCategory = (index: number) => {
        const selected = itemRef.current[index];
        setActiveIndex(index);

        const offset = itemWidths.slice(0, index).reduce((acc, width) => acc + width + 20, 0); 
  
        scrollRef.current?.scrollTo({ x: offset - 20, y: 0, animated: true });

        onCategoryChanged(newsCategoryList[index].slug);

    }

  return (
    <View>
      <Text style={styles.title}>Trending right now</Text>
      <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.itemsWrapper}>
        {newsCategoryList.map((item, index)=>(
            <TouchableOpacity 
                ref={(el) => (itemRef.current[index] = el)}
                key={index} 
                style={[styles.item, activeIndex ===index && styles.itemActive]}
                onPress={() => handleSelectedCategory(index)}
                onLayout={(event) => {
                    const { width } = event.nativeEvent.layout;
                    setItemWidths((prev) => {
                      const updatedWidths = [...prev];
                      updatedWidths[index] = width;
                      return updatedWidths;
                    });
                  }}
            >
                <Text style={[styles.itemText, activeIndex ===index && styles.itemActiveText]}>{item.title}</Text>
            </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default Catogries

const styles = StyleSheet.create({
    title:{
        fontSize: 18,
        fontWeight: "600",
        color: Colors.black,
        marginBottom: 10,
        marginLeft:20
    },
    itemsWrapper: {
        gap: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10
    },
    item: {
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        borderColor: Colors.darkGrey,
        borderWidth: 1
    },
    itemActive:{
        backgroundColor: Colors.tint,
        borderColor: Colors.tint
    },
    itemActiveText:{
        fontWeight: "600",
        color: Colors.white
    },
    itemText: {
        fontSize: 14,
        color: Colors.darkGrey,
        letterSpacing: 0.5
    }
})