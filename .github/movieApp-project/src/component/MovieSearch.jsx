import { useSearchParams } from "react-router-dom"
import { useDebounce } from "../../hook/debounce";
import { useEffect, useState } from "react";
import { movieSearchAPI } from "../movieAPI/movieSearchAPI";

const movieSearch = () => {
    const [searchParams] = useSearchParams;
    const query = searchParams.get('query') || '';
    const debounceQuery = useDebounce(query, 500)
    const [results, setResults] = useState([])

    useEffect(() => {
        const fetchResults = async () => {
            const data = await movieSearchAPI(debounceQuery)
            setResults(data)
        }
        if (debouncedQuery) fetchResults();
    },[debounceQuery])
}