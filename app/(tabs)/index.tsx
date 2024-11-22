import { ActivityIndicator, ActivityIndicatorBase, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import SearchBar from '@/components/SearchBar'
import axios from 'axios'
import { NewsDataType } from '@/types'
import BreakingNews from '@/components/BreakingNews'
import Catogries from '@/components/Catogries'
import NewsList from '@/components/NewsList'
import Loading from '@/components/Loading'

type Props = {}

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getBreakingNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=5`;
      const res = await axios.get(URL);
      if(res && res.data){
        setBreakingNews(res.data.results);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getNews = async (category: string = '') => {
    try {
      let categoryString = '';
      if (category.length !== 0) {
        categoryString = `&category=${category}`;
      }
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=10${categoryString}`;
      const res = await axios.get(URL);
      // console.log(res);
      if (res && res.data) {
        setNews(res.data.results);
        setIsLoading(false);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 429) {
        // console.log('Rate limit reached. Retrying...');
        const retryAfter = error.response.headers['retry-after'] || 5; // Use 'Retry-After' header if available
        setTimeout(() => getNews(category), retryAfter * 1000);
      } else {
        console.error(error);
      }
    }
  };

  const onCatChanged = (category: string) => {
    setNews([]);
    getNews(category)
  }

  useEffect(()=>{
    getBreakingNews();
    getNews();
  },[])

  return (
    <ScrollView>
      <GestureHandlerRootView style={[styles.container, { paddingTop: safeTop }]}>
        <Header />
        <SearchBar withHorizontalPadding={true} setSearchQuery={()=>{console.log('ere')}} />
        {isLoading ? (
            <Loading size={'large'} />
        ): (
          <BreakingNews newsList={breakingNews} />
        )}
        <Catogries onCategoryChanged={onCatChanged} />
        <NewsList newsList={news} />
      </GestureHandlerRootView>
      </ScrollView>
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