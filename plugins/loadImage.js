export default {
    //install을 하면 plugin인 등록
    install(Vue) {
        //this.$loadImage를 어디서든지 사용할 수 있다. -> 비동기이니깐 await
        Vue.prototype.$loadImage = (src) => {
            return new Promise((resolve) => {
                //document는 SSL 방식에서 동작하는 것이 아니라 클라이언트에서 만들때 동작한다.
                //그래서 server라면 바로 끝내면버린다.
                if (process.server) {
                    resolve()
                    return
                }
                const img = document.createElement('img')
                img.src = src
                img.addEventListener('load', () => {
                    //이미지 로드가 완료되는 시점
                    resolve()
                })
            })
        }
    }
}