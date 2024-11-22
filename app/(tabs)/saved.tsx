import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Stack } from 'expo-router';
import Loading from '@/components/Loading';
import { Link } from 'expo-router';
import { NewsItem } from '@/components/NewsList';
import { NewsDataType } from '@/types';
import { useIsFocused } from '@react-navigation/native';

type Props = {}

const Saved = (props: Props) => {
  const [bookmarkNews, setBookmarkNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  const fetchBookmark = async () =>{
    await AsyncStorage.getItem('bookmark').then(async (token)=>{
      const res = JSON.parse(token || '');
      if(res){
        console.log("all bookmark", res);
        let query_string = res.join(",");
        const response = await axios.get(`https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${query_string}`);
        const news = response.data.result;
        setBookmarkNews(news);
        setIsLoading(false);
      }else{
        setBookmarkNews([]);
        setIsLoading(false);
      }
    })
  }

  useEffect(()=>{
    fetchBookmark();
  },[isFocused])

  return (
    <>
      <Stack.Screen 
        options={{
          headerTitle: () => {
              return <Text style={{paddingLeft:130, fontWeight: '600', fontSize: 18}}>
                  Search
              </Text>
          },
          headerShown: true
      // title:"search"
      }}/>
      <View style={styles.container}>
        {isLoading ? (
          <Loading size={'large'} />
        ) : (
            <FlatList
                data={bookmarkNews}
                keyExtractor={(_, index) => `list_item${index}`}
                renderItem={({item, index}) => {
                    return (
                        <Link href={`/news/${String(item.article_id)}`} asChild key={index}>
                            <TouchableOpacity>
                                <NewsItem item={item} />
                            </TouchableOpacity>
                        </Link>
                    )
                }}
            />
        )}
      </View>
    </>
  )
}

export default Saved

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  },
})