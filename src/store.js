import axios from "axios";
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      name: "kim",
      age: 20,
      likes: [30, 20, 10],
      liked: [false, false, false],
      more: {},
    };
  },
  mutations: {
    changeName(state) {
      state.name = "park";
    },
    increaseAge(state, payload) {
      state.age += payload;
    },
    likePost(state, i) {
      if (!state.liked[i]) {
        state.likes[i]++;
      } else {
        state.likes[i]--;
      }
      state.liked[i] = !state.liked[i];
    },
    setMore(state, data) {
      state.more = data;
    },
  },
  // ajax 혹은 오래걸리는작업들(비동기처리)
  actions: {
    getData(context) {
      axios.get("https://codingapple1.github.io/vue/more0.json").then((a) => {
        context.commit("setMore", a.data);
      });
    },
  },
});

export default store;
