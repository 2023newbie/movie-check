import React from 'react'
import Banner from '../components/home/Banner'
import Poster from '../components/home/Poster'
import Trending from '../components/home/category/Trending'
import TopRating from '../components/home/category/TopRating'
import Action from '../components/home/category/Action'
import Comedy from '../components/home/category/Comedy'
import Horror from '../components/home/category/Horror'
import Romance from '../components/home/category/Romance'
import Documentary from '../components/home/category/Documentary'

const HomePage = () => {
  return (
    <>
        <Banner />
        <Poster />
        <Trending />
        <TopRating />
        <Action />
        <Comedy />
        <Horror />
        <Romance />
        <Documentary />
    </>
  )
}

export default HomePage