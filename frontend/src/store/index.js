import { configureStore } from '@reduxjs/toolkit'

import detailMovieReducer from './detail-movie-slice'
import detailMovieSearchReducer from './detail-movie-search-slice'

const store = configureStore({
    reducer: {detailMovie: detailMovieReducer, detailMovieSearch: detailMovieSearchReducer}
})

export default store