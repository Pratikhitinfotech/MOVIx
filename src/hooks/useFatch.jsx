import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../utils/api'

const useFatch = (url) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading("loading...")
        setData(null);
        setError(null)

        fetchDataFromApi(url)
            .then((res) => {
                setLoading(false)
                setData(res)
            }).catch((err) => {
                setLoading(false)
                setError("Somethig went wrong!")

            })
    }, [url])
    return { data, loading, error }
}

export default useFatch