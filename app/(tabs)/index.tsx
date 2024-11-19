import { ActivityIndicator, ActivityIndicatorBase, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import SearchBar from '@/components/SearchBar'
import axios from 'axios'
import { NewsDataType } from '@/types'
import BreakingNews from '@/components/BreakingNews'

type Props = {}

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getBreakingNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&country=in&language=en&image=1&removeduplicate=1&size=5`;
      const res = await axios.get(URL);
      if(res && res.data){
        setBreakingNews(res.data.results);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getBreakingNews();
  },[])

  return (
    <GestureHandlerRootView style={[styles.container, { paddingTop: safeTop }]}>
      <Header />
      <SearchBar />
      {isLoading ? (
        <ActivityIndicator size={'large'} />
      ): (
        <BreakingNews newsList={breakingNews} />
      )}
    </GestureHandlerRootView>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
})