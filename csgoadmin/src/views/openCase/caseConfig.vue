<template>
  <div class="">
    <div class="btns">
      <el-button type="primary" size="small" @click="add">添加箱子</el-button>
    </div>
    <el-table
      :data="tableData"
      height="calc(100vh - 220px)"
    >
      <el-table-column label="箱子名称" prop="boxname"></el-table-column>
      <el-table-column label="封面道具名" prop="facename"></el-table-column>
      <el-table-column label="箱子分类" prop="boxtypename"></el-table-column>
      <el-table-column label="箱子售价" prop="boxprice"></el-table-column>
      <el-table-column label="出金间隔" prop="timecell"></el-table-column>
      <el-table-column label="上架状态" prop="stat">
        <template slot-scope="{ row }">{{ getLabel(stat, row.stat) }}</template>
      </el-table-column>
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
      :title="isAdd ? '增加' : '编辑'"
      :visible.sync="dialog"
      :close-on-click-modal="false"
      width="1000px"
    >
      <el-dialog
        width="650px"
        title="道具配置"
        :visible.sync="itemDialog"
        append-to-body
      >
        <el-dialog
          width="500px"
          title="道具配置"
          :visible.sync="itemInnerDialog"
          append-to-body
        >
          <div class="box-item-wrap" style="background: none">
            <img :src="itemConfigData.imageUrl" alt="">
            <div class="item-list-desc">
              <p>{{ itemConfigData.itemName }}</p>
              <p>类型：{{ itemConfigData.typeName }}</p>
              <p>稀有度：{{ itemConfigData.qualityName }}</p>
            </div>
            <div class="item-list-price">
              <p>在售数量 {{ itemConfigData.quantity }}</p>
              <p>最低售价 ${{ itemConfigData.price }}</p>
            </div>
          </div>
          <el-form :model="itemConfig" :rules="rules" label-width="120px">
            <el-form-item label="显示概率" prop="displayrate">
              <el-input v-model="itemConfig.displayrate" size="small"></el-input>
            </el-form-item>
            <el-form-item label="普通掉率" prop="normalrate">
              <el-input v-model="itemConfig.normalrate" size="small"></el-input>
            </el-form-item>
            <el-form-item label="高级掉率" prop="advancedrate">
              <el-input v-model="itemConfig.advancedrate" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="addItemConfig">添加道具</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-form :model="itemForm" inline label-width="100px">
          <el-form-item label="道具类型">
            <el-select v-model="itemForm.type" size="small" clearable>
              <el-option v-for="item in searchtype.WPType" :key="item.id" :label="item.name" :value="item.searchKey"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品质">
            <el-select v-model="itemForm.rarity" size="small" clearable>
              <el-option v-for="item in searchtype.Rarity" :key="item.id" :label="item.name" :value="item.searchKey"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="质量">
            <el-select v-model="itemForm.quality" size="small" clearable>
              <el-option v-for="item in searchtype.Quality" :key="item.id" :label="item.name" :value="item.searchKey"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="外观">
            <el-select v-model="itemForm.exterior" size="small" clearable>
              <el-option v-for="item in searchtype.Exterior" :key="item.id" :label="item.name" :value="item.searchKey"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收藏品">
            <el-cascader
              v-model="itemSetValue"
              size="small"
              clearable
              :options="itemSet"
              :props="{ label: 'name', value: 'searchKey' }"
              @change="itemSetChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="最大价格">
            <el-input v-model="itemForm.maxPrice" size="small" style="width: 194px"></el-input>
          </el-form-item>
          <el-form-item label="最小价格">
            <el-input v-model="itemForm.minPrice" size="small" style="width: 194px"></el-input>
          </el-form-item>
          <el-form-item label="关键字">
            <el-input v-model="itemForm.keyword" size="small" style="width: 194px"></el-input>
          </el-form-item>
          <div style="text-align: center; margin: 10px 0">
            <el-button type="primary" size="small" @click="boxitemsearch">查询</el-button>
          </div>
        </el-form>
        <div v-if="boxItemTotal > 0" class="box-items">
          <div v-for="item in searchList" :key="item.itemId" class="box-item-wrap">
            <img :src="item.imageUrl" alt="">
            <div class="item-list-desc">
              <p>{{ item.itemName }}</p>
              <p>类型：{{ item.typeName }}</p>
              <p>稀有度：{{ item.qualityName }}</p>
            </div>
            <div class="item-list-price">
              <p>在售数量 {{ item.quantity }}</p>
              <p>最低售价 ${{ item.price }}</p>
            </div>
            <el-button type="primary" size="small" @click="configBtn(item)">配置</el-button>
          </div>
          <div style="text-align: center; margin-top: 15px">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="boxItemTotal"
              @current-change="currentChange"
            >
            </el-pagination>
          </div>
        </div>
      </el-dialog>
      <el-form ref="form" :model="form" :rules="rules" inline label-width="120px" class="demo-ruleForm">
        <el-form-item
          label="箱子名称"
          prop="boxname"
        >
          <el-input v-model="form.boxname" autocomplete="off" />
        </el-form-item>
        <!-- <el-form-item
          label="封面道具名"
          prop="facename"
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
        </el-form-item> -->
        <el-form-item
          label="箱子分类"
          prop="boxtypeid"
        >
          <el-select v-model.number="form.boxtypeid">
            <el-option v-for="item in boxtype" :key="item.id" :label="item.boxtypename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="箱子售价"
          prop="boxprice"
        >
          <el-input v-model="form.boxprice" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="出金间隔"
          prop="timecell"
        >
          <el-input v-model.number="form.timecell" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="上架状态"
          prop="stat"
        >
          <el-select v-model="form.stat">
            <el-option v-for="item in stat" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="!isAdd"
          label="正常掉落配置"
          prop=""
        >
          <div style="width: 800px; display: flex; flex-wrap: wrap">
            <div v-for="(item, index) in boxitemData.items" :key="index" class="box-item-list">
              <img :src="item.imageUrl" alt="">
              <div class="close-config"><el-button type="danger" icon="el-icon-close" circle style="width: 20px; height: 20px" @click="delItemConfig(item)"></el-button></div>
              <p>${{ item.price }}</p>
              <p>{{ item.displayrate }}%</p>
              <p>普 {{ item.normalrate }}%</p>
              <p>高 {{ item.advancedrate }}%</p>
            </div>
            <div class="addbtn" @click="additem">
              <i class="el-icon-plus"></i>
            </div>
          </div>
        </el-form-item>
        <div style="text-align: center">
          <el-button type="primary" size="small" @click="submitform">提交</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  boxtype,
  boxconfig,
  boxconfigadd,
  boxconfigdel,
  boxconfigmod,
  boxitemlist,
  boxitemsearch,
  searchtype,
  boxitemset,
  boxitemdel
} from '@/api/box'
import {
  getLabel,
  stat,
  formData
} from '@/utils/config'
import { _URL } from '@/utils/config'
export default {
  name: 'CaseConfig',
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 10,
      total: 0,
      dialog: false,
      itemDialog: false,
      itemInnerDialog: false,
      isAdd: false,
      form: {
        boxname: '',
        facename: '',
        boxtypeid: '',
        boxprice: '',
        timecell: '',
        stat: ''
      },
      itemForm: {
        exterior: '',
        quality: '',
        rarity: '',
        type: '',
        itemSet: '',
        maxPrice: '',
        minPrice: '',
        keyword: ''
      },
      itemConfig: {
        displayrate: '',
        normalrate: '',
        advancedrate: ''
      },
      rules: {},
      fileList: [],
      url: _URL,
      getLabel,
      stat,
      boxtype: [],
      boxitemData: {},
      itemTotal: 0,
      itemPage: 1,
      searchtype: {},
      itemSet: [],
      itemSetValue: [],
      searchList: [],
      itemConfigData: {},
      boxItemTotal: 0
    }
  },
  mounted() {
    this.getList()
    boxtype().then(res => {
      if (res.code === 0) {
        this.boxtype = res.data.items
      } else {
        this.$message({
          type: 'error',
          message: res.message
        })
      }
    })
    searchtype().then(res => {
      if (res.code === 0) {
        this.searchtype = res.data
        this.itemSet = [
          { name: '武器收藏品', searchKey: '1', children: res.data.WPitemSet },
          { name: '地图收藏品', searchKey: '2', children: res.data.MAPitemSet }
        ]
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
      boxconfig().then(res => {
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
        boxname: '',
        facename: '',
        boxtypeid: '',
        boxprice: '',
        timecell: '',
        stat: ''
      }
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    },
    edit(row) {
      this.isAdd = false
      this.dialog = true
      this.form = JSON.parse(JSON.stringify(row))
      this.getItemConfig()
    },
    getItemConfig() {
      boxitemlist(this.form.id).then(res => {
        if (res.code === 0) {
          this.boxitemData = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    submitform() {
      const data = new FormData()
      for (var key in this.form) {
        data.append(key, this.form[key])
      }
      console.log(this.form)
      this.dialog = false
      if (this.isAdd) {
        boxconfigadd(data).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.getList()
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })
      } else {
        boxconfigmod(data).then(res => {
          console.log(res)
          if (res.code === 0) {
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
        boxconfigdel(row.id).then(res => {
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
    additem() {
      this.itemDialog = true
    },
    boxitemsearch() {
      boxitemsearch(formData({ ...this.itemForm, page: this.itemPage })).then(res => {
        if (res.code === 0) {
          this.searchList = res.data.list
          this.boxItemTotal = res.data.total
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    configBtn(item) {
      this.itemInnerDialog = true
      this.itemConfigData = item
    },
    currentChange(e) {
      this.itemPage = e
      this.boxitemsearch()
    },
    itemSetChange(e) {
      this.itemForm.itemSet = e[1] ? e[1] : ''
    },
    addItemConfig() {
      boxitemset(formData({ boxid: this.form.id, ...this.itemConfigData, ...this.itemConfig })).then(res => {
        if (res.code === 0) {
          this.itemInnerDialog = false
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.getItemConfig()
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    delItemConfig(item) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        boxitemdel(formData({ boxid: this.form.id, itemid: item.id })).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getItemConfig()
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
  .box-item-list, .addbtn{
    width: 80px;
    height: 80px;
    border: 1px solid #999;
    background: #aaa;
    font-size: 14px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-right: 10px;
    margin-bottom: 10px;
    position: relative;
  }
  .addbtn{
    cursor: pointer;
  }
  .box-item-list p{
    padding: 0;
    margin: 0;
    line-height: 18px;
    position: relative;
    z-index: 5;
  }
  .box-item-list img{
    width: 80%;
    position: absolute;
    z-index: 1;
  }
  .close-config{
    height: 20px;
    position: absolute;
    right: -5px;
    top: -5px;
    line-height: 20px;
  }
  .close-config /deep/ .el-button--medium{
    font-size: 12px;
    padding: 0;
  }
  .box-items{
    padding: 10px;
    background: #ddd;
    font-size: 12px;
    color: #666;
  }
  .box-item-wrap{
    display: flex;
    padding: 5px 15px 5px 7px;
    justify-content: space-between;
    align-items: center;
    background: #aaa;
    margin-bottom: 5px;
  }
  .box-item-wrap img{
    display: block;
    width: 80px;
    height: 80px;
    padding: 0;
    margin: 0;
  }
  .box-item-desc, .item-list-price{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .box-item-desc p, .item-list-price p{
    line-height: 20px;
    padding: 0;
    margin: 0;
  }
</style>
