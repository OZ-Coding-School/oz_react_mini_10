import { useEffect, useState } from "react";

function useDebounce (value, dalay) {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebouncedValue(value)
        }, dalay)
        return()=> clearTimeout(timer)
    },[value,dalay])
    return debouncedValue
}
export default useDebounce