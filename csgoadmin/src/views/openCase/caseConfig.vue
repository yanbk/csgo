<template>
  <div class="">
    <div class="btns">
      <el-button type="primary" size="small" @click="add">添加箱子</el-button>
    </div>
    <el-table
      :data="tableData"
      height="calc(100vh - 220px)"
    >
      <el-table-column lable="编号" prop=""></el-table-column>
      <el-table-column lable="箱子名称" prop=""></el-table-column>
      <el-table-column lable="封面道具" prop=""></el-table-column>
      <el-table-column lable="箱子分类" prop=""></el-table-column>
      <el-table-column lable="箱子售价" prop=""></el-table-column>
      <el-table-column lable="出金间隔" prop=""></el-table-column>
      <el-table-column lable="添加日期" prop=""></el-table-column>
      <el-table-column lable="上架状态" prop=""></el-table-column>
      <el-table-column lable="操作" prop="">
        <template>
          <el-button type="primary" size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex; justify-content: center, border-top: 1px solid #999; padding-top: 10px">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog
      title="增加"
      :visible.sync="dialog"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item
          label="箱子名称"
          prop="username"
        >
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="别名"
          prop="username"
        >
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="类型描述"
          prop="username"
        >
          <el-input v-model="form.username" type="textarea" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="类型底图"
          prop="username"
        >
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="显示排序"
          prop="username"
        >
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitform('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CaseConfig',
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 10,
      total: 0,
      dialog: false,
      form: {}
    }
  },
  methods: {
    add() {
      this.dialog = true
    }
  }
}
</script>

<style scoped>
  .btns{
    padding: 10px;
  }
</style>
