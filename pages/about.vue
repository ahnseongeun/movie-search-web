<template>
  <div class="about">
    <div class="photo">
      <Loader
        v-if="imageLoading"
        absolute />
      <img
        :src="image"
        :alt="name" />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ blog }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loader from '@/components/Loader'

export default {
    //layout: 'heropy',
    components: {
        Loader
    },
    data() {
        return {
            imageLoading: true
        }
    },
    computed: {
        ...mapState('about', [
            'name',
            'email',
            'blog',
            'phone',
            'image',
        ])
    },
    //Vue의 내부적인 함수들은 async를 보장 할 수 없다. 그래서 init라는 함수를 새로 생성한다.
    mounted() {
        this.init()
    },
    methods: {
        async init() {
            await this.$loadImage(this.image)
            this.imageLoading = false
        }
    },
    //객체 데이터를 받아서 처리 할 수 있다.
    head() {
      
      return {
        meta: [
          { hid: 'og:type' , property: 'og:type' , content: 'website' },
          { hid: 'og:site_name' , property: 'og:site_name' , content: 'Nuxt Movie App' },
          { hid: 'og:title' , property: 'og:title' , content: this.name },  //mapState의 about의 name
          { hid: 'og:description' , property: 'og:description' , content: this.email },
          { hid: 'og:image' , property: 'og:image' , content: this.image },
          { hid: 'og:url' , property: 'og:url' , content: process.env.CLIENT_URL + this.$route.fullPath}
        ]
      }
    }
}
</script>

<style lang="scss" scoped>
.about {
  text-align: center;
  .photo {
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 30px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    position: relative;
    img {
      width: 100%;
    }
  }
  .name {
    font-size: 40px;
    font-family: "Oswald", sans-serif;
    margin-bottom: 20px;
  }
}
</style>