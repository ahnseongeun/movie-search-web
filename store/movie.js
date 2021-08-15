import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

export default {
    namespaced: true,
    state: () => ({
        movies: [],
        loading: false,
        message: 'Search for the movie title!',
        theMovie: {}

    }),
    getters: {},
    mutations: {
        updateStates(state, payload) {
            console.log(payload)
            Object.keys(payload).forEach(key => {
                state[key] = payload[key]
                // state.movies = payload.movies
            })
        },
        pushMovies(state, payload) {
            state.movies.push(...payload)
        }
    },
    actions: {
        //기본으로 들어 있는 context값
        //action은 상태 변화가 안된다 -> mutation의 도움을 받자.
        async searchMovies( context, payload) {
            if (context.state.loading) return 
        

            //로딩 시작 -> commit을 통해서 mutation 실행
            context.commit('updateStates', {
                loading: true,
                message: ''
            })

            try {
                
                const res = await _fetchMovie(payload)
                console.log(res)
                const {Search, totalResults} = res.data
                context.commit('updateStates', {
                    movies: _uniqBy(Search, 'imdbID'), //payload 부분
                })
                const total = parseInt(totalResults, 10) 
                const pageLength = Math.ceil(total / 10)
                
                if( pageLength > 1) {
                    for( let page = 2; page <= pageLength; page += 1) {
                        if ( page > (payload.number / 10)) break;
                        const res = await _fetchMovie({
                            /*
                            title: payload.title,
                            type: payload.type,
                            number: payload.number
                            위와 같은 것이 ...payload
                            */
                           ...payload,
                           page
                        })
                        const { Search } = res.data
                        //새로운 배열이 들어가면 기존의 배열을 덮어쓴다. 하지만 첫번째 state로 전개를하고, res로 2번째 원소들로 전개를 하면 하나의 배열의 이어 붙혀서 데이터들이 들어간다.
                        context.commit('updateStates', {
                            movies: _uniqBy([
                                ...context.state.movies,
                                ...Search
                                //..._uniqBy(Search, 'imdbID')
                            ],'imdbID')
                        })    
                    }
                }
            } catch (error) {
                console.log(error.message)
                context.commit('updateStates',{
                    message: error.message,
                    movies: []
                })
            } finally {
                context.commit('updateStates', {
                    loading: false
                })
            }
        },
        async searchMovieWithId(context, payload) {
            if (context.state.loading) return 

            context.commit('updateStates', {
                loading: true
            })

            try {
                const res = await _fetchMovie({
                    id: payload.id
                })
                console.log(res)

                context.commit('updateStates',{
                    theMovie: res.data
                })
            } catch (error) {
                context.commit('updateStates', {
                    message: error.message
                })
            } finally {
                context.commit('updateStates', {
                    loading: false
                })
            }
        }
    }
}

/*
fetchMovie({
    title: 'example'
})
해당 js안에서만 실행되는 것을 명시 할 때는 _를 붙힌다.
 */

//client side rendering은 '/api/movie -> '주소/api/movie''
//server side rendering은 '/api/movie -> '/api/movie'
async function _fetchMovie(payload) {
    const url = process.client ? '/api/movie' : `${process.env.CLIENT_URL}/api/movie`
    return await axios.post(url, payload)
}