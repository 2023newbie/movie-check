import React from 'react'
import SearchForm from '../components/search/SearchForm'
import ResultList from '../components/search/ResultList'
import { redirect, useLoaderData } from 'react-router-dom';

const user = {
  userid: "User 01",
  token: "8qlOkxz4wq",
}; // data require when fetch

const SearchPage = () => {
  const data = useLoaderData()
  console.log(data);
  return (
    <>
      <SearchForm />
      {data && <ResultList data={data} />}
    </>
  )
}

export default SearchPage

export const loader = async ({request}) => {
  const searchParams = new URL(request.url).searchParams

  const keyword = searchParams.get('keyword')
  const genre = searchParams.get('genre')
  const mediatype = searchParams.get('mediatype')
  const year = searchParams.get('year')
  
   if (keyword === null && genre === null && mediatype === null && year === null) return null

   let query = '?'

  // add query parameter based on length query, genre !== undefined
  const addQuery = (queryName, queryType) => {
    if (queryType !== '' && queryType !== null) {
      if (query.length > 1) {
        query += `&${queryName}=${queryType}`
      } else {
        query += `${queryName}=${queryType}`
      }
    }
  }
  addQuery('keyword', keyword)
  addQuery('genre', genre)
  addQuery('mediatype', mediatype)
  addQuery('year', year)

  const response = await fetch('http://localhost:5000/api/movies/search/enhance' + query, {
    method: 'GET',
    headers: user
  })
  
  // throw error if api went wrong
  if (!response.ok) 
    return response

  // convert response to data
  const finalData = await response.json()
  const results = finalData.results
  
  // return message if results is empty
  if (results === undefined) 
    return {message: 'Have no movies with your queries'}

  return results
}


// based on queries, redirect to link
export const action = async ({request}) => {
  const data = await request.formData()

  //get form data
  const keyword = data.get('keyword')
  const genre = data.get('genre')
  const mediatype = data.get('mediatype')
  const year = data.get('year')

  let query = '?'

  // add query parameter based on length query, genre !== undefined
  const addQuery = (queryName, queryType) => {
    if (queryType !== '') {
      if (query.length > 1) {
        query += `&${queryName}=${queryType}`
      } else {
        query += `${queryName}=${queryType}`
      }
    }
  }
  addQuery('keyword', keyword)
  addQuery('genre', genre)
  addQuery('mediatype', mediatype)
  addQuery('year', year)

  return redirect(`/search${query}`)
}