import { defineStore } from 'pinia';

const outputStore = defineStore('output', {
  state: () => ({
    code: 'xxx' as string, // 变量
  }),

  actions: {
    method() {
      console.log('方法');
    },
  },
});

export default outputStore;
