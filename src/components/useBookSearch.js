import { useEffect, useState } from 'react'
import axios from 'axios'
import {URL_BACKEND} from "./const";

export default function useBookSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [books, setBooks] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setBooks([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)

    let payload = {'pageNumber' : pageNumber}
    let cancel
    axios({
      method: 'POST',
      url: URL_BACKEND +'books/page',
      headers: { page: pageNumber },
      data : payload,
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setBooks(prevBooks => {
        return [...prevBooks, res.data]
      })
      setHasMore(res.data.length > 0)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [query, pageNumber])

  return { loading, error, books, hasMore }
}
