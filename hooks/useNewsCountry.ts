import CountryList from "@/constants/CountryList";
import { useCallback, useState } from "react";

export const useNewsCountry = () => {
    const [newsCountry, setNewsCountry] = useState(CountryList);

        const toggledNewsCountry = useCallback((id: number) => {
            // console.log(id)
            setNewsCountry((previous)=>{
                return previous.map((item, index)=>{
                    if(index === id){
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
        newsCountry, 
        toggledNewsCountry
    }

}