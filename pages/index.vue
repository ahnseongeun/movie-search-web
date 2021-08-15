<template>
  <div>
    <!--h1>MOVIE SEARCH</h1-->
    <Headline />
    <Search />
    <MovieList />
  </div>
</template>

<script>
import Search from '@/components/Search'
import MovieList from '@/components/MovieList'
import Headline from '@/components/Headline'

export default {
    components: {
        Search,
        MovieList,
        Headline
    }
}
</script>