export default {
    state: {
        ads:[
            {
                title: "Ремонт вмятин",
                desc: "First Desc",
                promo: true,
                src: "https://автоцарапина.рф/images/grey/overcontent-slider/overcontent-01.jpg",
                id: "1",
                userId: "1"
              },
              {
                title: "Оклейка авто плёнкой",
                desc: "Second Desc",
                promo: true,
                src: "https://автоцарапина.рф/images/grey/overcontent-slider/overcontent-08.jpg",
                id: "2",
                userId: "2"
              },
              {
                title: "Кузовной ремонт",
                desc: "Thitd Desc",
                promo: true,
                src: "https://автоцарапина.рф/images/grey/overcontent-slider/overcontent-11.jpg",
                id: "3",
                userId: "3"
              },
              {
                title: "Реставрация кожаного салона",
                desc: "Fourth Desc",
                promo: true,
                src: "https://автоцарапина.рф/images/grey/overcontent-slider/overcontent-05.jpg",
                id: "4",
                userId: "4"
              },
              {
                title: "Покраска",
                desc: "Fifth Desc",
                promo: true,
                src: "https://автоцарапина.рф/images/grey/overcontent-slider/overcontent-09.jpg",
                id: "5",
                userId: "5"
              },
              {
                title: "Удаление прожёгов",
                desc: "Sixth Desc",
                promo: true,
                src: "https://автоцарапина.рф/images/grey/overcontent-slider/overcontent-13.jpg",
                id: "6",
                userId: "6"
              },
              {
                title: "Полировка кузова авто",
                desc: "Seventh Desc",
                promo: true,
                src: "https://автоцарапина.рф/images/grey/overcontent-slider/overcontent-14.jpg",
                id: "7",
                userId: "7"
              }
        ]
    },
    mutations: {
        createAd(state, payload) {
            state.ads.push(payload)
        },
        loadAds(state, payload) {
            state.ads = payload
        },
        updateAd(state, { title, desc, id }) {
            const ad = state.ads.find(a => {
                return a.id === id
            })
            ad.title = title
            ad.desc = desc
        }
    },
    actions: {
        createAd({ getters }, payload) {
            payload.id = Math.random()
            payload.userId = getters.user != null ? getters.user.id : '1'
        }

    },
    getters: {
        ads(state) {
            return state.ads
        },
        promoAds(state) {
            return state.ads.filter(ad => {
                return ad.promo
            })
        },
        myAds(state, getters) {
            return state.ads.filter(ad => {
                return ad.userId == getters.user.id
            })
        },
        adById(state) {
            return id => {
                return state.ads.find(ad => ad.id == id)
            }
        }
    },
    async createAd({ commit, getters }, payload) {
        payload.id = Math.random()
        payload.userId = getters.user != null ? getters.user.id : '1'
        commit('clearError')
        commit('setLoading', true)
        //Заглушка запроса
        let isRequestOk = true
        let promise = new Promise(function (resolve) {
            setTimeout(() => resolve('Done')
                , 3000);
        });
        if (isRequestOk) {
            await promise.then(() => {
                commit('createAd', payload)
                commit('setLoading', false)
            })
        } else {
            await promise.then(() => {
                commit('setLoading', false)
                commit('setError', 'Ошибка создания объявления')
                throw 'Упс... Ошибка создания объявления'
            })
        }

    },
    async updateAd({ commit }, { title, desc, id }) {
        commit('clearError')
        commit('setLoading', true)
        //Заглушка запроса
        let isRequestOk = true
        let promise = new Promise(function (resolve) {
            resolve('Done')
        });
        if (isRequestOk) {
            await promise.then(() => {
                commit('updateAd', { title, desc, id })
                commit('setLoading', false)
            })
        } else {
            await promise.then(() => {
                commit('setLoading', false)
                commit('setError', 'Ошибка редактирования объявления')
                throw 'Упс... Ошибка редактирования объявления'
            })
        }
    }

}