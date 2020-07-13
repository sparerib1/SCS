<template>
  <el-container>
    <el-header>
    </el-header>
    <el-container>
      <el-aside width="205px">
      </el-aside>
      <el-main>
        <div class="content-wrap">
            <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      Menulist: []
    }
  }
}
</script>

<style>
.el-header {
  /* background-color: #b3c0d1; */
  box-shadow: 0 2px 4px rgba(0,0,0,.08);
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: left;
  line-height: 200px;
  height: calc(100% + 60px);
}

.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  text-align: center;
  height: calc(100% + 60px);
  padding: 10px !important;
}
.el-container {
  height: calc(100% - 60px);
}

.content-wrap {
  border: 1px solid #dcdff7;
  border-top: none;
  height: calc(100% - 60px);
}
</style>
