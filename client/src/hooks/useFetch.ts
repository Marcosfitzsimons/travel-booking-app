import axios from "axios"
import { useEffect, useState } from "react"

const useFetch = (url: string) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<unknown | boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get(url)
                setData(res.data)
            } catch(err) {
                setError(err)
            }
            setLoading(false)
        }
        fetchData()
    }, [url])



const reFetch = async () => {
    setLoading(true)
    try {
        const res = await axios.get(url)
        setData(res.data)
    } catch(err) {
        setError(err)
    }
    setLoading(false)
}
return { data, loading, error, reFetch }

}

export default useFetch