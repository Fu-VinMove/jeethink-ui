<template>
  <el-dialog title="房产信息" :visible.sync = "dialogVisible"  width="90%">
    <el-row>
      <el-col :span="24">
        <el-form-item label="原告想要争取">
          <el-input-number v-model="houses.houseNumber" @change="handleChange" :min="1" :max="3"
                           label="房产套数"></el-input-number>
          <span> 套房产？</span>
        </el-form-item>
      </el-col>
    </el-row>
    <span v-for="(house,index) in houses.houseList" :key="index">
        <el-row>
          <el-col :span="7">
            <el-form-item label="房子位于哪里？" label-width="120px">
              <el-cascader
                size="large"
                :options="options"
                v-model="house.addr">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房子详细地址？" label-width="120px">
              <el-input v-model="house.detail"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="房产的分割想法是？" >
              <el-radio-group v-model="house.want">
                <el-radio label="A">平均分割</el-radio>
                <el-radio label="M">归你所有</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </span>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="closeDialog(true)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { regionData } from 'element-china-area-data'
  import { arrayChange } from './common'

  export default {
    name: 'house',
    props:{
      dialogForm:{
        type : String,
        required : true
      },
      initHouses:{
        type : Object,
        required: true
      },
    },
    data(){
      return {
        options: regionData,
        houses: typeof this.initHouses.houseNumber == 'undefined'?  {houseNumber : 1, houseList : [{ addr: '',detail:'',want:'' }]} : this.initHouses ,
      }
    },
    computed:{
      dialogVisible :{
        get : function() {
            return this.dialogForm == 'house'
        },
        set : function() {
            this.$emit('closeDialog',false)
        }
      }
    },
    methods:{
      closeDialog(data){
        this.$emit('closeDialog',data);
        this.$emit('addClaims',this.houses,'house');

      },
      handleChange(currentValue, oldValue) {
        arrayChange(currentValue,oldValue,this.houses.houseList,{ addr: '',detail:'',want:'' });
      },
    }
  }
</script>

<style scoped>

</style>
