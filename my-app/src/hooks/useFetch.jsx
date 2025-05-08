import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function useFetch({ url, errorNavigate = true }) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const navigate = useNavigate()
  const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN

  useEffect(() => {
    setLoading(true)
    // 데이터 초기화 (재검색 시 이전 데이터를 지우기 위함)
    setData(null)

    const fetchAPI = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
      try {
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error('데이터를 불러오지 못했습니다.')
        }
        const data = await response.json()
        setData(data)
      } catch (err) {
        console.error('err', err)
        if (errorNavigate) navigate('/error')
      } finally {
        setLoading(false)
      }
    }

    fetchAPI()
  }, [url, API_TOKEN])

  return { data, loading }
}
