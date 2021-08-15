<template>
  <div 
    :style="{
      width: `${size}rem`,
      height: `${size}rem`
    }"
    :class=" { absolute: absolute, fixed: fixed } "
    class="spinner-border text-primary"></div>
</template>

<script>
//props는 부모 컴포넌트로 부터 데이터를 받을 때 사용
export default {
    props: {
        size: {
            type: Number,
            default: 2
        },
        absolute: {
            type: Boolean,
            default: false   
        },
        fixed: {
            type: Boolean,
            default: false
        },
        zIndex: {
            type: Number,
            default: 0
        }
    }

}
</script>

<style lang="scss" scoped>
    .spinner-border {
        margin: auto;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        &.absolute {
            position: absolute;
    }
        &.fixed {
            position: fixed;
        }
    }
</style>