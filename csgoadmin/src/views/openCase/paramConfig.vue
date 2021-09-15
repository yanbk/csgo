<template>
  <div class="container">
    <div class="btns">
      <el-button type="primary" size="small" @click="add">添加配置</el-button>
    </div>
    <el-table
      :data="tableData"
    >
      <el-table-column label="个人充值区间" prop="">
        <template slot-scope="{ row }">[{{ row.charge_lower }}, {{ row.charge_upper }}]</template>
      </el-table-column>
      <el-table-column label="幸运值区间（每次出奖后刷新）" prop="">
        <template slot-scope="{ row }">[{{ row.luck_lower }}, {{ row.luck_upper }}]</template>
      </el-table-column>
      <el-table-column label="总出奖极限比例" prop="awardrate_total"></el-table-column>
      <el-table-column label="单次出奖最大价值系数" prop="valuerate_single"></el-table-column>
      <el-table-column label="操作" prop="" width="160">
        <template slot-scope="{ row }">
          <el-button type="primary" size="small" @click="edit(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="del(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-form :model="globalForm" label-width="200px" style="margin-top: 100px">
      <el-form-item label="全局出奖上限">
        <el-input v-model="globalForm.global_upper" size="small" style="width: 200px"></el-input>%
      </el-form-item>
      <el-form-item label="售价放大系数">
        <el-input v-model="globalForm.sell_price_multiple" size="small" style="width: 200px"></el-input>% (相对于比特的价格，网站实际使用的溢价比例)
      </el-form-item>
      <el-form-item label="提现充值门槛">
        <el-input v-model="globalForm.cash_out_limit" size="small" style="width: 200px"></el-input>(提取道具是检测，充值达标后才能提取)
      </el-form-item>
      <el-form-item label="提现需审核金额">
        <el-input v-model="globalForm.cash_out_value" size="small" style="width: 200px"></el-input>金额 (用户发起提取的道具如果大于这个金额，则需要管理员审批)
      </el-form-item>
      <el-form-item label="提取溢价上限">
        <el-input v-model="globalForm.cash_out_upper" size="small" style="width: 200px"></el-input>(向扎比特发起交易时，可接受的购买价格最大不超过开出道具时价格的x倍)
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" size="small" @click="save">保存参数</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      :title="isAdd ? '增加' : '修改'"
      :visible.sync="dialog"
      :close-on-click-modal="false"
      width="800px"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="200px" class="demo-ruleForm">
        <el-form-item
          label="充值下限"
          prop="charge_lower"
        >
          <el-input v-model="form.charge_lower" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="充值上限"
          prop="charge_upper"
        >
          <el-input v-model="form.charge_upper" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="幸运值下限"
          prop="luck_lower"
        >
          <el-input v-model="form.luck_lower" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="幸运值上限"
          prop="luck_upper"
        >
          <el-input v-model="form.luck_upper" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="总出奖极限比例"
          prop="awardrate_total"
        >
          <el-input v-model="form.awardrate_total" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="单次出奖最大价值系数"
          prop="valuerate_single"
        >
          <el-input v-model="form.valuerate_single" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="submitform">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  boxlottery,
  boxlotteryadd,
  boxlotterymod,
  boxlotterydel,
  boxglobal,
  boxglobaladd,
  boxglobalmod
} from '@/api/box'
import { formData } from '@/utils/config'
export default {
  name: 'ParamConfig',
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 10,
      total: 0,
      dialog: false,
      isAdd: false,
      form: {
        charge_lower: '',
        charge_upper: '',
        luck_lower: '',
        luck_upper: '',
        awardrate_total: '',
        valuerate_single: ''
      },
      rules: {},
      globalForm: {
        global_upper: '',
        sell_price_multiple: '',
        cash_out_limit: '',
        cash_out_value: '',
        cash_out_upper: ''
      }
    }
  },
  mounted() {
    this.getList()
    boxglobal().then(res => {
      console.log(res)
      if (res.code === 0) {
        this.globalForm = res.data.items[0] ? res.data.items[0] : {}
      } else {
        this.$message({
          type: 'error',
          message: res.message
        })
      }
    })
  },
  methods: {
    getList() {
      boxlottery().then(res => {
        console.log(res)
        if (res.code === 0) {
          this.tableData = res.data.items
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
        charge_lower: '',
        charge_upper: '',
        luck_lower: '',
        luck_upper: '',
        awardrate_total: '',
        valuerate_single: ''
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
        boxlotteryadd(formData(this.form)).then(res => {
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
        boxlotterymod(formData(this.form)).then(res => {
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
        boxlotterydel(row.id).then(res => {
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
    },
    save() {
      if (this.globalForm.id) {
        boxglobalmod(formData(this.globalForm)).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })
      } else {
        boxglobaladd(formData(this.globalForm)).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            })
            this.globalForm.id = 1
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  .btns{
    padding: 10px;
  }
  .container /deep/ .el-form-item{
    margin-bottom: 10px;
  }
</style>
