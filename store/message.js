

export default {
    namespaced: true, //모듈을 사용할 때는 꼭 필요한 요소
    state: () => ({
        msg: 'test'
    }),
    getters: {
        reversedMsg(state) {
            return state.msg.split('').reverse().join('')
        }
    },
    mutations: {
        updateMsg(state, newMsg) {
            state.msg = newMsg
        }
    },
    actions: {
        reverseMsg({ state, commit}) {
            const newMsg = state.msg.split('').reverse().join('')
            commit('updateMsg', newMsg)
        }
    }
}