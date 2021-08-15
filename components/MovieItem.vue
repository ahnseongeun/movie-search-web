<template>
  <RouterLink
    :to="`/movie/${movie.imdbID}`"
    :style="{ backgroundImage: `url(${movie.Poster})`}"
    class="movie">
    <div class="info">
      <div class="year">
        {{ movie.Year }}
      </div>
      <div class="title">
        {{ movie.Title }}
      </div>
    </div>
  </RouterLink>
</template>

<script>
export default {
    props: {
        movie: {
            type: Object,
            //data는 항상 함수여야 한다. 왜냐하면 함수로 안한면
            //각각의 object는 독립적이여햐 하는데 하나의 객체로 처리하면
            //reference 구조이기 때문에 모든 값이 바뀌게 된다.
            default: () => ({})
        }
    }
}
</script>

<style lang="scss" scoped>
    .movie {
        $size: 200px;
        width: $size;
        height: $size * 3 / 2;
        margin: 10px;
        border-radius: 4px;
        background-color: $gray-400;
        background-size: cover;
        overflow: hidden;
        //bottom, top, left 같은 요소가 없다면 아무일이 일어나지 않고 부모 요소의 position만 정의
        position: relative;
        &:hover::after {
            content: "";
            //after와 content는 한 세트
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            border: 6px solid $primary;
        }
        .info {
            //default는 width는 auto이다.
            //movie의 poster의 가로 영역을 사용하겠다.
            width: 100%;
            padding: 14px;
            font-size: 14px;
            text-align: center;
            box-sizing: border-box;
            //부모요소를 기준으로한다.
            //그러면 movie를 기준으로 배치한다?? 하지만 movie는 position이 없으면 기준이 될 수 없다.
            //그래서 movie에도 position이 있어야 한다.
            position: absolute;
            left: 0;
            bottom: 0;
            //blur의 진한 정도
            backdrop-filter: blur(10px);
            //background-color: rgb(0,0,0);
            .year {
                color: $primary;
            }
            .title {
                color: $white;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
        }
    }
    .movie {}
    .movie .info {}
    .movie .info .year{}
    .movie .info .title{}
</style>