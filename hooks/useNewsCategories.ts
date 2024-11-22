import newsCategoryList from "@/constants/Categories";
import { useCallback, useState } from "react";

export const useNewsCategories = () => {
    const [newsCategories, setNewsCategories] = useState(newsCategoryList);

        const toggledNewsCategory = useCallback((id: number) => {
            // console.log(id)
            setNewsCategories((previous)=>{
                return previous.map((item)=>{
                    if(item.id === id){
                        return {
                            ...item,
                            selected: !item.selected
                        }
                    }
                    return item
                })
            })
        }, [])

    return {
        newsCategories, 
        toggledNewsCategory
    }

}