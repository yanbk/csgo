<template>
  <div class="">
    <div class="btns">
      <el-button type="primary" size="small" @click="add">添加分类</el-button>
    </div>
    <el-table
      :data="tableData"
      height="calc(100vh - 220px)"
    >
      <el-table-column label="分类名称" prop="boxtypename"></el-table-column>
      <el-table-column label="别名" prop="aliasname"></el-table-column>
      <el-table-column label="类型描述" prop="boxtypedes"></el-table-column>
      <el-table-column label="箱子类型底图" prop="boxtypepic"></el-table-column>
      <el-table-column label="当前包含箱子数量" prop="boxnumber"></el-table-column>
      <el-table-column label="排序" prop="level"></el-table-column>
      <el-table-column label="操作" prop="" width="160">
        <template slot-scope="{ row }">
          <el-button type="primary" size="small" @click="edit(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="del(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="border-top: 1px solid #999; padding-top: 10px; text-align: center">
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
      width="600"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item
          label="分类名称"
          prop="boxtypename"
        >
          <el-input v-model="form.boxtypename" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="别名"
          prop="aliasname"
        >
          <el-input v-model="form.aliasname" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="类型描述"
          prop="boxtypedes"
        >
          <el-input v-model="form.boxtypedes" type="textarea" autocomplete="off" />
        </el-form-item>
        <el-form-item
          v-if="!isAdd"
          label="分类底图图"
          prop="boxtypepic"
        >
          <el-input v-model="form.boxtypepic" disabled autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="排序优先级"
          prop="level"
        >
          <el-input v-model="form.level" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="上传底图"
          prop="file"
        >
          <el-upload
            action=""
            list-type="picture-card"
            :limit="1"
            :auto-upload="false"
            :file-list="fileList"
            :on-change="fileChange"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
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
  boxtype,
  boxtypeadd,
  boxtypedel,
  boxtypemod
} from '@/api/box'
import { _URL } from '@/utils/config'
export default {
  name: 'CaseCategory',
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 10,
      total: 0,
      dialog: false,
      isAdd: false,
      form: {
        boxtypename: '',
        aliasname: '',
        boxtypedes: '',
        level: '',
        boxtypepic: '',
        file: ''
      },
      rules: {},
      fileList: [],
      url: _URL
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      boxtype().then(res => {
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
        boxtypename: '',
        aliasname: '',
        boxtypedes: '',
        level: '',
        boxtypepic: '',
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
      this.fileList = [{ url: this.url + this.form.boxtypepic }]
    },
    submitform() {
      const data = new FormData()
      for (var key in this.form) {
        data.append(key, this.form[key])
      }
      console.log(this.form)
      if (this.isAdd) {
        boxtypeadd(data).then(res => {
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
        boxtypemod(data).then(res => {
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
    handleRemove(file) {
      this.fileList = []
    },
    fileChange(file) {
      console.log(file)
      this.form.file = file.raw
    },
    del(row) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        boxtypedel(row.id).then(res => {
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
