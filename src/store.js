import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      name: "kim",
      age: 20,
      likes: [30, 20, 10],
    };
  },
  mutations: {
    changeName(state) {
      state.name = "park";
    },
    increaseAge(state, payload) {
      state.age += payload;
    },
    likePost(state, likedI) {
      if (!likedI[0]) {
        state.likes[likedI[1]]++;
      } else {
        state.likes[likedI[1]]--;
      }
    },
  },
});

export default store;
