<template>
  <div class="container">
    <div style="padding: 15px">
      <el-button type="primary" size="small" @click="add()">增加</el-button>
    </div>
    <div class="list">
      <el-table
        :data="list"
        border
        style="width: 100%"
        height="calc(100vh - 100px)"
      >
        <el-table-column
          prop="c_name"
          label="类目"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              @click.native.prevent="edit(scope.row)"
            >
              修改
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click.native.prevent="del(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="增加"
      :visible.sync="dialog"
      :close-on-click-modal="false"
      width="450px"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item
          label="类目(英文)"
          prop="name"
        >
          <el-input v-model="form.name" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="类目(中文)"
          prop="c_name"
        >
          <el-input v-model="form.c_name" size="small" clearable></el-input>
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
  external_auth_param_class_list,
  external_auth_param_class_add,
  external_auth_param_class_edit,
  external_auth_param_class_del
} from '@/api/external'
export default {
  name: 'ExtralClass',
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
        name_id: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        c_name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      external_auth_id: this.$route.query.id
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
      external_auth_param_class_list({ external_auth_id: this.external_auth_id }).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.list = res.data
        }
      })
    },
    edit(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialog = true
      this.isAdd = false
    },
    del(row) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        external_auth_param_class_del({ id: row.id }, this.external_auth_id).then(res => {
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
    add(e) {
      this.isAdd = true
      this.dialog = true
      this.form = {
        name: '',
        c_name: ''
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialog = false
          if (this.isAdd) {
            // console.log(this.form)
            external_auth_param_class_add(this.form, this.external_auth_id).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '增加成功'
                })
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
            external_auth_param_class_edit(this.form, this.external_auth_id).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
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
    nameChange(e) {
      this.form.name = e.name
      this.form.c_name = e.c_name
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
    border-bottom: 1px solid #eee;
  }
  .add-button{
    display: block;
    margin: 20px auto;
  }
  .paginate{
    text-align: center;
    margin-top: 50px;
  }
}
</style>
