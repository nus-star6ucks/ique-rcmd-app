<template>
  <div>
    <a-menu v-model:selectedKeys="current" mode="horizontal">
      <a-menu-item key="store"> Stores </a-menu-item>
      <a-menu-item key="two"> Navigation Two </a-menu-item>
      <a-menu-item key="three"> Navigation Three </a-menu-item>
      <a-sub-menu>
        <template #title>Navigation Four - Submenu</template>
        <a-menu-item-group title="Item 1">
          <a-menu-item key="setting:1">Option 1</a-menu-item>
          <a-menu-item key="setting:2">Option 2</a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group title="Item 2">
          <a-menu-item key="setting:3">Option 3</a-menu-item>
          <a-menu-item key="setting:4">Option 4</a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      <a-menu-item key="alipay"> Navigation Five </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Header',

  data () {
    return {
      current: ref < String[String] > (['store'])
    }
  },

  mounted () {

  },

  methods: {

  },
};
</script>

<style lang="scss" scoped>
</style>