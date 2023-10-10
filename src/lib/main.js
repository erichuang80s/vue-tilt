import VueTilt from "./VueTilt"
export default {
  install(app, options) {
    app.component(options?.name || VueTilt.name, VueTilt)
  }
}