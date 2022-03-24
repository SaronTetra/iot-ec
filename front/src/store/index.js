import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        id: 0,
        devices: {},
        newId: 0,
    },
    mutations: {
        set (state, id) {
            state.id = id
        },
        setDevices(state, device) {
            const dev = JSON.parse(device)
            state.newId = dev.id
            state.devices[dev.id] = dev
        },
    },
    actions: {
        notify (){},
        refresh (){}
    }
})
