# vue-tilt
使用 [vanilla-tilt.js](https://github.com/micku7zu/vanilla-tilt.js) 簡單包裝的 vue3 組件。

# Usage
CDN Install
```html
  <!-- vue3 cdn install doc (https://vuejs.org/guide/quick-start.html#using-vue-from-cdn ) -->
  <script src="https://cdn.jsdelivr.net/gh/erichuang80s/vue-tilt@master/dist/vue-tilt.js"></script>
  <script>
    const app = Vue.createApp({})
    app.use(VueTilt)
    app.mount('#app')
  </script>
```

example
```html
  <div id="app">
    <vue-tilt :speed="1500" :scale="1.5">
      <img :src="`https://picsum.photos/seed/${Date.now()}/400/300`" alt="picsum">
    </vue-tilt>
  </div>

```

自訂組件名稱
```javascript
app.use(VueTilt, {name: 'my-tilt'})
```

```html
  <my-tilt :speed="1500" :scale="1.5">
    <img :src="`https://picsum.photos/seed/${Date.now()}/400/300`" alt="picsum">
  </my-tilt>
```

# Props
props 參考 [vanilla-tilt.js options](https://github.com/micku7zu/vanilla-tilt.js#options)

# Event
- tilt-change\
  滑鼠移動數值變更時觸發，Event 參數。


# License
MIT
