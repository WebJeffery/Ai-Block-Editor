// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'
import MyLayout from "./MyLayout.vue";
import VBaseEditor from "./components/base/VBaseEditor.vue"

export default {
  ...Theme,
  Layout: MyLayout,
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component('VBaseEditor', VBaseEditor)
  }
}
