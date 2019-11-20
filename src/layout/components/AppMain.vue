<template>
  <section class="app-main">
    <breadcrumb id="breadcrumb-container" />
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" class="app-container" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: 'AppMain',
  components: { Breadcrumb },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 0 16px;
  background: #f2f2f2;
  .app-container {
    min-height: 86vh;
    background: #fff;
    padding: 23px;
  }
}
.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    min-height: 100vh;
  }

  .fixed-header+.app-main {
    padding-top: 115px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
