import {useCallback, useEffect, useMemo, useState} from "react";

const useFetchData = (url, indexEnd) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const getData = useCallback(async () => {
        try {
            console.log("fetching");
            const data = await fetch(url)
            const result = await data.json();
            setData(result.response.channels);
        }catch (error) {
            setError(error);
        }finally {
            setLoading(false);
        }
    }, [url]);

    const filteredList = useMemo(() => {
        if(!!data) return data.slice(0, indexEnd);

        return []
    }, [data, indexEnd]);

    useEffect(() => {
        getData();
    }, [getData]);

    return {data: filteredList, loading, error};
}

export {useFetchData};