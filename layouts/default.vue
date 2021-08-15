<template>
  <div>
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<!--router-view는 Nuxt로 사용하고 router-link는 NuxtLink로 사용한다.-->
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
    components: {
      Header,
      Footer
    }
}
</script>
