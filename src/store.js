import axios from "axios";
import { createStore } from "vuex";
import Data from "./data.js";

const store = createStore({
  state() {
    return {
      name: "kim",
      age: 12,
      postData: Data,
      likes: [30, 20, 10],
      liked: [false, false, false],

      moreCount: 0,
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
      state.postData.push(data);
      state.moreCount++;
    },
    posting(state, myPost) {
      state.postData.unshift(myPost);
    },
  },
  // ajax 혹은 오래걸리는작업들(비동기처리)
  actions: {
    getData(context) {
      axios.get(`https://codingapple1.github.io/vue/more${context.state.moreCount}.json`).then((a) => {
        context.commit("setMore", a.data);
      });
    },
  },
});

export default store;
