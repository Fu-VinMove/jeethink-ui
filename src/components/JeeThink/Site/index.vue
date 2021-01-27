<template>
  <div>
    <svg-icon icon-class="guide" @click="goto"/>
  </div>
</template>

<script>
export default {
  name: 'JeeThinkSite',
  data() {
    return {
      url: 'http://hd-law.cn'
    }
  },
  methods: {
    goto() {
      window.open(this.url)
    }
  }
}
</script>
