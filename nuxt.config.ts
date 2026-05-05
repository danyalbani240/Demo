// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  // routeRules: {
  //   // "/auth": { ssr: false },
  //   "/dashboard/**": { ssr: false },
  // },
  // devtools: {
  //   enabled: process.env.NODE_ENV !== "production",

  //   timeline: {
  //     enabled: process.env.NODE_ENV !== "production",
  //   },
  // },
  devtools: false,

  modules: [
    "@nuxt/ui",
    [
      "@nuxtjs/i18n",
      {
        locales: [
          {
            code: "fa",
            name: "فارسی",
            file: "fa.json",
          },
          {
            code: "en",
            name: "English",
            file: "en.json",
            dir: "ltr",
          },
          {
            code: "ku",
            name: "Kurdish",
            file: "ku.json",
          },
        ],
        lazy: true,
        langDir: "locales",
        defaultLocale: "Ku",
        strategy: "no_prefix",
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: "i18n_redirected",
          redirectOn: "root",
          alwaysRedirect: false,

          globalInjection: true, // <-- REQUIRED
        },
      },
    ],
    "@pinia/nuxt",
  ],

  ui: {
    fonts: false,
  },
  app: {
    head: {
      link: [{ rel: "manifest", href: "/manifest.webmanifest" }],
      meta: [{ name: "enamad", content: "58583249" }],
      // script: [
      //   {
      //     src: "https://cdn.kavenegar.com/sdk/page.js?appId=9e9186df-6b0f-4624-bc89-27a2dad29fa5",
      //     defer: true,
      //   },
      // ],
    },
  },

  pages: true,

  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    public: {
      backendBaseURL:
        process.env.NUXT_PUBLIC_BACKEND_BASE_URL ||
        "https://big-project-production-01f5.up.railway.app",
      siteUrl:
        process.env.NUXT_PUBLIC_SITE_URL ||
        "https://big-project-production-01f5.up.railway.app",
      otpSend: false,
    },
  },
});
