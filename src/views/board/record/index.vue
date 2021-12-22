<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class Home extends Vue {
}
</script>
<style lang="scss">
.record-board{
  margin: 20px;
  .new-item {
    .box-card {
      .record-icon {
        size:10px
      }
      border: 1px black dashed;
      margin-bottom: 20px;
    }
  }
  .all-data {
    .el-divider {
    margin-top: 10px;
    }
  }
}

</style>
