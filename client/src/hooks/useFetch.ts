import axios from "axios"
import { useEffect, useState } from "react"

const useFetch = (url: string) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setLoading(true)
        setError(false)
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                Authorization: `Bearer ${token}`
                };
                const res = await axios.get(url, { headers })
                setData(res.data)
            } catch(err) {
                console.log(err)
                setError(true)
            }
            setLoading(false)
        }
        fetchData()
    }, [url])



const reFetch = async () => {
    setLoading(true)
    setError(false)
    try {
        const token = localStorage.getItem('token');
        const headers = {
        Authorization: `Bearer ${token}`
        };
        const res = await axios.get(url, { headers })
        setData(res.data)
    } catch(err) {
        console.log(err)
        setError(true)
    }
    setLoading(false)
}
return { data, loading, error, reFetch }

}

export default useFetch