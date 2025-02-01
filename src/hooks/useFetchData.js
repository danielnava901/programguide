import {useCallback, useEffect, useMemo, useState} from "react";

const useFetchData = (url, indexEnd) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const getData = useCallback(async () => {
        try {
            console.log("haciendo fetch...");
            const data = await fetch(url)
            const result = await data.json();
            console.log({result: result.response.channels});
            setData(result.response.channels);
        }catch (error) {
            console.log("error");
            setError(error);
        }finally {
            setLoading(false);
        }
    }, [url]);

    const filteredList = useMemo(() => {
        console.log("filtered")
        if(!!data) return data.slice(0, indexEnd);

        return []
    }, [data, indexEnd]);

    console.log({loading, error});

    useEffect(() => {
        console.log("use effect useFetchData");
        getData();
    }, [getData]);



    return {data: filteredList, loading, error};
}

export {useFetchData};