import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: '#002d3f',
        secondary: '#7ecf53',
        accent: '#002d3f',
        error: '#b71c1c',
      },
    },
  },
});
