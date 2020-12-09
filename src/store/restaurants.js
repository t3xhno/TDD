const restaurants = (api, stateOverrides) => ({
  namespaced: true,
  state: {
    records: [],
    loading: false,
    loadError: false,
    ...stateOverrides,
  },
  actions: {
    load({commit}) {
      commit('startLoading');
      api
        .loadRestaurants()
        .then(records => {
          commit('storeRecords', records);
        })
        .catch(() => {
          commit('recordLoadingError');
        });
    },
  },
  mutations: {
    recordLoadingError(state) {
      state.loading = false;
      state.loadError = true;
    },
    startLoading(state) {
      state.loadError = false;
      state.loading = true;
    },
    storeRecords(state, records) {
      state.records = records;
      state.loading = false;
    },
  },
});

export default restaurants;
