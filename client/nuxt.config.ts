// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: process.env.NUXT_PUBLIC_DEVTOOLS_ENABLED === "true" },
  devServer: {
    port: 3002,
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: "",
      apiServerSideBaseUrl: "",
      imageBaseUrl: "http://localhost:9000",
      showLocaleSelect: "",
      activeLocales: "en,fr,de,es",
    },
  },

  css: ["@/assets/style/main.scss"],

  components: [{ path: "./components", pathPrefix: false }],

  modules: [
    "@nuxt/ui",
    "@nuxt/fonts",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "dayjs-nuxt",
    "@nuxtjs/seo",
  ],

  piniaPluginPersistedstate: {
    cookieOptions: {
      maxAge: 3600 * 24 * 30,
    },
  },

  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      redirectOn: "root",
    },
    locales: [
      { code: "en", iso: "en", name: "English", dir: "auto" },
      { code: "fr", iso: "fr", name: "French", dir: "auto" },
      { code: "es", iso: "es", name: "Spanish", dir: "auto" },
      { code: "de", iso: "de", name: "German", dir: "auto" },
      { code: "ru", iso: "ru", name: "Russian", dir: "auto" },
      { code: "fi", iso: "fi", name: "Finnish", dir: "auto" },
      { code: "pcm", iso: "pcm", name: "Pidgin", dir: "auto" },
      { code: "ko", iso: "ko", name: "Korean", dir: "auto" },
      { code: "ar", iso: "ar", name: "Arabic", dir: "rtl" },
    ],
    defaultLocale: "en",
    vueI18n: "./i18n.config.ts",
    restructureDir: false,
  },

  ui: {},

  icon: {
    collections: ["heroicons", "mdi", "tabler", "simple-icons"],
    customCollections: [{ prefix: "icon", dir: "./assets/icons" }],
  },

  dayjs: {
    locales: ["en", "fr", "es", "de", "ru", "fi", "ko", "ar"],
  },

  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: "",
  },

  fonts: {
    families: [{ name: "Inter", provider: "google" }],
  },

  sitemap: {
    sitemaps: {
      pages: {
        includeAppSources: true,
        defaults: { changefreq: "weekly" },
      },
      creators: {
        sources: ["/api/__sitemap__/creators"],
        defaults: { changefreq: "daily" },
      },
    },
  },

  robots: {
    disallow: ["/admin", "/streamer"],
  },

  site: {
    name: "XMRChat",
  },

  seo: {
    fallbackTitle: false,
  },
});
