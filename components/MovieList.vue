<template>
  <div class="container">
    <div 
      :class="{'no-result': noMovies }"
      class="inner">
      <Loader v-if="loading" />
      <!-- <div v-if="loading">
        Loading!
      </div> -->
      <div
        v-if="message"
        class="message">
        {{ message }}
      </div>
      <div class="movies">
        <MovieItem
          v-for="movie in movies"
          :key="movie.imdbID"
          :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import Loader from '@/components/Loader.vue'
import MovieItem from '@/components/MovieItem'

export default {

    components:{
      Loader,
      MovieItem
    },
    //store에 저장되어 있는 값을 가지고 오는 역할을 computed
    //state,getters -> commputed에 매핑
    computed: {
        ...mapState('movie', [
            'movies',
            'loading',
            'message'
        ]),
        noMovies() {
          return !this.movies.length
        }
    }
}
</script>

<style lang="scss" scoped>
//import를 하는 이유는 bootstrap에 있는 scss의 내용을 가지고 와야
//css로 컴파일이 가능하다.

  .container {
    margin-top: 30px;
    .inner {
      background-color: $gray-200;
      padding: 10px 0;
      border-radius: 4px;
      text-align: center;
      &.no-result {
        padding: 70px 0;
      }
      .message {
        color: $gray-400;
        font-size: 20px;
      }
      .movies {
        display: flex;
        flex-wrap: wrap;
        //수평 정렬
        justify-content: center;
      }
    }
  }
</style>