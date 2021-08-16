<template>
  <div class="container">
    <div style="padding: 15px">
      <el-button type="primary" size="small" @click="add">增加</el-button>
    </div>
    <div class="list">
      <el-table
        :data="list"
        border
        style="width: 100%"
        height="calc(100vh - 250px)"
      >
        <el-col :span="4">
          <el-table-column
            fixed
            prop="id"
            label="ID"
            align="center"
          />
        </el-col>
        <el-col :span="4">
          <el-table-column
            prop="name"
            label="项目名称"
            align="center"
          />
        </el-col>
        <el-col :span="4">
          <el-table-column
            prop="user_list"
            label="管理人员"
            align="center"
          />
        </el-col>
        <el-col :span="4">
          <el-table-column
            label="状态"
            align="center"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#DCDFE6"
                disabled
              >
              </el-switch>
            </template>
          </el-table-column>
        </el-col>
        <el-col :span="4">
          <el-table-column
            prop="update_time"
            label="时间"
            align="center"
          />
        </el-col>
        <el-col :span="4">
          <el-table-column
            prop="feature"
            label="备注"
            align="center"
          />
        </el-col>
        <el-col :span="4">
          <el-table-column
            prop="app_token"
            label="token"
            align="center"
          />
        </el-col>
        <el-col :span="4">
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="200px"
          >
            <template slot-scope="scope">
              <el-button
                size="small"
                @click.native.prevent="edit(scope.$index, list)"
              >
                修改
              </el-button>
              <el-button
                size="small"
                type="danger"
                @click.native.prevent="del(scope.$index, list)"
              >
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-col>
      </el-table>
      <el-pagination
        class="paginate"
        background
        layout="prev, pager, next"
        :total="total_items"
        :page-size="per_page"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
    <el-dialog
      :title="isAdd == true ? '增加' : '修改'"
      :visible.sync="dialog"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="form.name" size="small"></el-input>
        </el-form-item>
        <el-form-item
          label="管理人员"
          prop="users_id_list"
        >
          <el-select
            v-model="form.users_id_list"
            multiple
            filterable
            placeholder="请选择管理人员"
            style="width: 100%"
            @change="select"
          >
            <el-option
              v-for="item in all_user"
              :key="item.id"
              :label="item.username"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="是否启用项目"
          prop="status"
        >
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#DCDFE6"
          >
          </el-switch>
        </el-form-item>
        <el-form-item
          label="请输入备注"
          prop="feature"
        >
          <el-input v-model="form.feature" size="small"></el-input>
        </el-form-item>
        <el-form-item
          label="推送url"
          prop="push_url"
        >
          <el-input v-model="form.push_url" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  newExternalAuthList,
  newExternalAuthAdd,
  newExternalAuthEdit,
  newExternalAuthInfo,
  newExternalAuthDel
} from '@/api/external'
export default {
  name: 'ExternalList',
  components: {},
  data() {
    return {
      list: [],
      per_page: 10,
      total_items: 0,
      dialog: false,
      row: {},
      isAdd: true,
      form: {
        name: '',
        users_id_list: [],
        status: false,
        feature: '',
        push_url: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        users_id_list: [
          { required: true, message: '请选择管理人员', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '是否启用项目', trigger: 'blur' }
        ],
        feature: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ]
      },
      page: 1,
      all_user: []
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.getList()
  },
  methods: {
    select(e) {
      this.$forceUpdate()
    },
    getList() {
      newExternalAuthList({ page: this.page }).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.all_user = res.data.all_user
          this.list = res.data.items
          this.total_items = res.data._meta.total_items
          this.per_page = res.data._meta.per_page
        }
      })
    },
    edit(index, rows) {
      this.row = JSON.parse(JSON.stringify(rows[index]))
      this.dialog = true
      this.isAdd = false
      newExternalAuthInfo(rows[index]).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.row['users_id_list'] = res.data.users_id_list
          this.$nextTick(() => {
            this.form = this.row
          })
        }
      })
    },
    del(index, rows) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        newExternalAuthDel({ id: rows[index].id }).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getList()
          } else {
            this.$message({
              type: 'error',
              message: JSON.stringify(res.message)
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    add() {
      this.dialog = true
      this.isAdd = true
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            // console.log(this.form)
            newExternalAuthAdd(this.form).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '增加成功'
                })
                this.dialog = false
                this.getList()
              } else {
                this.$message({
                  type: 'error',
                  message: JSON.stringify(res.message)
                })
              }
            })
          } else {
            // console.log(this.form)
            newExternalAuthEdit(this.form).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.dialog = false
                this.getList()
              } else {
                this.$message({
                  type: 'error',
                  message: JSON.stringify(res.message)
                })
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    currentChange(e) {
      this.page = e
      this.getList()
    }
  }
}
</script>

<style lang='scss' scoped>
.container {
  height: calc(100vh - 84px);
  width: 100%;
  background-color: #fff;
  overflow: auto;
  display: flex;
  flex-direction: column;

  .list{
    overflow: auto;
  }
  .paginate{
    text-align: center;
    margin-top: 30px;
  }
}
</style>
