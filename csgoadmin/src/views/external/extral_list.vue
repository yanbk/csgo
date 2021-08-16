<template>
  <div class="container">
    <div style="padding: 15px">
      <el-button type="primary" size="small" @click="add()">增加</el-button>
    </div>
    <div class="list">
      <el-table
        :data="list"
        border
        :row-key="getRowKey"
        :expand-row-keys="expands"
        style="width: 100%"
        height="calc(100vh - 100px)"
      >
        <el-table-column
          type="expand"
        >
          <template slot-scope="scope">
            <el-table
              :data="scope.row.list"
              border
              :default-expand-all="true"
              style="width: 100%"
            >
              <el-table-column
                prop="name_id"
                label="ID"
                align="center"
              />
              <el-table-column
                prop="name_value"
                label="名称"
                align="center"
              />
              <el-table-column
                label="操作"
                align="center"
              >
                <template slot-scope="childscope">
                  <el-button
                    size="small"
                    type="primary"
                    @click.native.prevent="editChild(childscope.row)"
                  >
                    修改
                  </el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click.native.prevent="delChild(childscope.row)"
                  >
                    移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
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
              @click.native.prevent="add(scope.row)"
            >
              增加
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="增加"
      :visible.sync="dialog"
      :close-on-click-modal="false"
      width="700px"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item
          label="类目"
          prop="c_name"
        >
          <el-select
            v-model="form.c_name"
            placeholder=""
            :disabled="name ? true : false"
            style="width: 200px"
            value-key="c_name"
            @change="nameChange"
          >
            <el-option
              v-for="item in class_data"
              :key="item.name"
              :label="item.c_name"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-for="(item, index) in form.list" :key="index" :label="index >= 1 ? '' : '名称'" :rules="{ required: true, message: '请输入', trigger: 'blur' }">
          <el-input v-model="item.name_value" size="small" placeholder="输入名称（必填）" style="width: 200px"></el-input>
          <span style="padding-left: 20px">数据ID：</span><el-input v-model="item.name_id" size="small" placeholder="默认系统分配（非必填）" style="width: 200px; margin-left: 10px"></el-input>
          <el-button v-if="index >= 1" size="small" circle style="width: 32px; margin-left: 10px" @click="delFormList(index)">-</el-button>
          <el-button v-if="index < 1 && isAdd" size="small" circle style="width: 32px; margin-left: 10px" @click="addFormList(index)">+</el-button>
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
  external_auth_param_list,
  external_auth_param_add,
  external_auth_param_edit,
  external_auth_param_del
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
        name_id: '',
        list: [
          { name_value: '', name_id: '' }
        ]
      },
      rules: {
        c_name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        name_value: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
      name: '',
      class_data: [],
      external_auth_id: this.$route.query.id,
      expands: []
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
    getRowKey(row) {
      return row.name + row.c_name
    },
    getList() {
      external_auth_param_list({ external_auth_id: this.external_auth_id }).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.class_data = res.data.class_data
          const data = res.data.data
          const obj = {}
          this.list = []
          for (let i = 0; i < data.length; i++) {
            if (!obj[data[i].name]) {
              obj[data[i].name] = {}
              obj[data[i].name].name = data[i].name
              obj[data[i].name].c_name = data[i].c_name
              obj[data[i].name].list = []
              obj[data[i].name].list.push({ name_id: Number(data[i].name_id), name_value: data[i].name_value, name: data[i].name, c_name: data[i].c_name, id: data[i].id })
            } else {
              obj[data[i].name].list.push({ name_id: Number(data[i].name_id), name_value: data[i].name_value, name: data[i].name, c_name: data[i].c_name, id: data[i].id })
            }
          }
          for (const key in obj) {
            this.list.push(obj[key])
          }
        }
      })
    },
    edit(index, rows) {
      this.row = JSON.parse(JSON.stringify(rows[index]))
      this.dialog = true
      this.isAdd = false
    },
    delChild(row) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        external_auth_param_del([row.name_id], this.external_auth_id).then(res => {
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
    editChild(row) {
      this.isAdd = false
      this.dialog = true
      this.form = {
        name: row.name,
        c_name: row.c_name,
        list: [
          {
            name_value: row.name_value,
            name_id: row.name_id,
            id: row.id
          }
        ]
      }
      this.name = row.name
      // console.log(row)
    },
    addFormList() {
      this.form.list.push({
        name_value: ''
      })
    },
    delFormList(index) {
      this.form.list.splice(index, 1)
    },
    add(e) {
      this.isAdd = true
      this.dialog = true
      this.form = {
        name: '',
        c_name: '',
        list: [{ name_value: '' }]
      }
      this.name = ''
      if (e) {
        this.name = e.name
        this.form.name = e.name
        this.form.c_name = e.c_name
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialog = false
          if (this.isAdd) {
            // console.log(this.form)
            external_auth_param_add([{ ...this.form }], this.external_auth_id).then(res => {
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
            external_auth_param_edit([{ ...this.form }], this.external_auth_id).then(res => {
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
