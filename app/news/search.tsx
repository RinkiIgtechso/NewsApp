import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router, Stack, useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import { NewsDataType } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import Loading from '@/components/Loading'
import { NewsItem } from '@/components/NewsList'

type Props = {}

const search = (props: Props) => {
    const [news, setNews] = useState<NewsDataType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { category, country, query } = useLocalSearchParams<{query: string, category: string, country: string}>();

    const getNews = async (category: string = '') => {
        try {
            let categoryString = '';
            let countryString = '';
            let queryString = '';

            if(category){
                categoryString = `&category=${category}`
            }
            if(country){
                countryString = `&country=${country}`
            }
            if(query){
                queryString = `&q=${query}`
            }

            const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=10${categoryString}${countryString}${queryString}`;
            const res = await axios.get(URL);
            console.log(res);
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

    useEffect(()=>{
        getNews();
    },[])

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: () => {
                        return <Text style={{paddingLeft:80, fontWeight: '600', fontSize: 18}}>
                            Search
                        </Text>
                    },
                // title:"search"
                }}
            />
            <View style={styles.container}>
                {isLoading ? (
                    <Loading size={'large'} />
                ) : (
                    <FlatList
                        data={news}
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

export default search

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 20,
        marginVertical: 20
    }
})