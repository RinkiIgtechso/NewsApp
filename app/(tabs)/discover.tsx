import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import SearchBar from '@/components/SearchBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import newsCategoryList from '@/constants/Categories'
import CheckBox from '@/components/CheckBox'
import { useNewsCategories } from '@/hooks/useNewsCategories'
import { useNewsCountry } from '@/hooks/useNewsCountry'
import { Link } from 'expo-router'

type Props = {}

const Page = (props: Props) => {
  const { top: SafeTop } = useSafeAreaInsets();

  const { newsCategories, toggledNewsCategory } = useNewsCategories();
  const { newsCountry, toggledNewsCountry } = useNewsCountry();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");

  return (
    <View style={[styles.container, { paddingTop: SafeTop + 20 } ]}>
      <SearchBar withHorizontalPadding={false} setSearchQuery={setSearchQuery} />
      <Text style={styles.title}>Categories</Text>
      <View style={styles.listContainer}>
        {newsCategories.map((item)=>(
          <CheckBox 
            key={item.id} 
            label={item.title} 
            checked={item.selected} 
            onPress={()=>{
              toggledNewsCategory(item.id);
              setCategory(item.slug);
            }} 
          />
        ))}
      </View>

      <Text style={styles.title}>Country</Text>
      <View style={styles.listContainer}>
        {newsCountry.map((item, index)=>(
          <CheckBox 
            key={index} 
            label={item.name} 
            checked={item.selected} 
            onPress={()=>{
              toggledNewsCountry(index);
              setCountry(item.code);
            }} 
          />
        ))}
      </View>

        <Link href={{
          pathname: "/news/search",
          params: { query: searchQuery, category, country },
        }} style={styles.searchBtn} asChild>
          <TouchableOpacity >
            <Text style={styles.searchBtnTxt}>Search</Text>
          </TouchableOpacity>
        </Link>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 10,
  },
  listContainer: {
    flexDirection:"row",
    flexWrap: 'wrap',
    gap: 10,
    marginTop:12,
    marginBottom: 20
  },
  searchBtn: {
    backgroundColor: Colors.tint,
    alignItems:"center",
    padding: 14,
    borderRadius: 10,
    marginVertical: 10
  }, 
  searchBtnTxt: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600'
  }
})