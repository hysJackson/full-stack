import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export default defineNuxtConfig({
  modules: ['@unocss/nuxt', '@pinia/nuxt'],
  experimental: {
    reactivityTransform: true,
  },
  vite: {
    plugins: [
      Components({
        resolvers: [
          AntDesignVueResolver({ importStyle: 'less', resolveIcons: true }),
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  },
});

