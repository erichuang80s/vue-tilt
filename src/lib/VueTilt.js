import {defineComponent, onMounted, onBeforeUnmount, ref, h, watch} from 'vue'
import VanillaTilt from 'vanilla-tilt'
export default defineComponent({
  name: 'VueTilt',
  props: {
    speed: {
      type: Number,
      default: 300
    },
    max: {
      type: Number,
      default: 15
    },
    startX: {
      type: Number,
      default: 0
    },
    startY: {
      type: Number,
      default: 0
    },
    perspective: {
      type: Number,
      default: 1000
    },
    scale: {
      type: Number,
      default: 1
    },
    'max-glare': Number,
    axis: {
      type: Object,
      default: () => null
    },
    'mouse-event-elemen': {
      type: Object,
      default: () => null
    },
    easing: {
      type: String,
      default: 'cubic-bezier(.03,.98,.52,.99)'
    },
    transition: {
      type: Boolean,
      default: true
    },
    reset: {
      type: Boolean,
      default: true
    },
    'reset-to-start': {
      type: Boolean,
      default: true
    },
    reverse: Boolean,
    glare: Boolean,
    gyroscope: {
      type: Boolean,
      default: true
    },
    'full-page-listenin': Boolean,
    gyroscopeMinAngleX: {
      type: Number,
      default: -45
    },
    gyroscopeMaxAngleX: {
      type: Number,
      default: 45
    },
    gyroscopeMinAngleY: {
      type: Number,
      default: -45
    },
    gyroscopeMaxAngleY: {
      type: Number,
      default: 45
    },
    gyroscopeSamples: {
      type: Number,
      default: 10
    },
  },
  emits: ['tiltChange'],
  setup(props, {slots, emit}) {
    
    const target = ref()
    onMounted(() => {
      VanillaTilt.init(target.value, props)
      target.value.addEventListener('tiltChange', (e) => emit('tiltChange', e))
    })
    onBeforeUnmount(() => target.value.vanillaTilt.destroy())
    watch(props, () => {
      target.value.vanillaTilt.settings = target.value.vanillaTilt.extendSettings(props)
      target.value.vanillaTilt.reset()
    }, true)

    return () => [
      h('div', {ref: (el) => target.value = el}, slots)
    ]
  }
})