<template>
  <div class="">
    <div class="btns">
      <el-button type="primary" size="small" @click="add">添加分类</el-button>
    </div>
    <el-table
      :data="tableData"
      height="calc(100vh - 220px)"
    >
      <el-table-column label="级别" prop="grade"></el-table-column>
      <el-table-column label="流水下限" prop="money_limit"></el-table-column>
      <el-table-column label="流水上限" prop="money_upper"></el-table-column>
      <el-table-column label="返利比" prop="rate"></el-table-column>
      <el-table-column label="排序" prop="level"></el-table-column>
      <el-table-column label="操作" prop="" width="160">
        <template slot-scope="{ row }">
          <el-button type="primary" size="small" @click="edit(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="del(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="isAdd ? '增加' : '修改'"
      :visible.sync="dialog"
      :close-on-click-modal="false"
      width="600"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item
          label="返利级别"
          prop="grade"
        >
          <el-input v-model="form.grade" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="流水下限"
          prop="money_limit"
        >
          <el-input v-model="form.money_limit" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="流水上限"
          prop="money_upper"
        >
          <el-input v-model="form.money_upper" type="textarea" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="返利比"
          prop="rate"
        >
          <el-input v-model="form.rate" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="排序优先级"
          prop="level"
        >
          <el-input v-model="form.level" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitform">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  rebate,
  rebateadd,
  rebatemod,
  rebatedel
} from '@/api/roll'
import { formData } from '@/utils/config'
export default {
  name: 'Promote',
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 10,
      total: 0,
      dialog: false,
      isAdd: false,
      form: {
        grade: '',
        money_limit: '',
        money_upper: '',
        rate: '',
        level: ''
      },
      rules: {}
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      rebate().then(res => {
        console.log(res)
        if (res.code === 0) {
          this.tableData = res.data.items
          this.total = res.data._meta.total_items
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    add() {
      this.dialog = true
      this.isAdd = true
      this.form = {
        grade: '',
        money_limit: '',
        money_upper: '',
        level: '',
        rate: '',
        file: ''
      }
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    },
    edit(row) {
      this.isAdd = false
      this.dialog = true
      this.form = JSON.parse(JSON.stringify(row))
    },
    submitform() {
      if (this.isAdd) {
        rebateadd(formData(this.form)).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.dialog = false
            this.getList()
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })
      } else {
        rebatemod(formData(this.form)).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.dialog = false
            this.getList()
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })
      }
    },
    del(row) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        rebatedel(row.id).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })
      })
    }
  }
}
</script>

<style scoped>
  .btns{
    padding: 10px;
  }
</style>
