<template>
  <el-dialog title="车位相关信息填写" :visible.sync = "dialogVisible" width="90%">
    <el-row>
      <el-col :span="24">
        <el-form-item label="原告想要争取">
          <el-input-number v-model="parks.parkNumber" @change="handleChange" :min="1" :max="3"
                           label="车位个数"></el-input-number>
          <span> 个车位？</span>
        </el-form-item>
      </el-col>
    </el-row>
    <span v-for="(park,index) in parks.parkList" :key="index">
        <el-row>
          <el-col :span="7">
            <el-form-item label="车位在哪里？" label-width="120px">
              <el-cascader
                size="large"
                :options="options"
                v-model="park.addr">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车位详细地址？" label-width="120px">
              <el-input v-model="park.detail"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="车位的分割想法是？" >
              <el-radio-group v-model="park.want">
                <el-radio label="A">平均分割</el-radio>
                <el-radio label="M">归你所有</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </span>
    <div slot="footer" class="dialog-footer">
      <el-button  @click="closeDialog(false)">取消</el-button>
      <el-button type="primary" @click="closeDialog(true)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { regionData } from 'element-china-area-data'
  import { arrayChange } from './common'

  export default {
    name: 'park',
    data(){
      return {
        options: regionData,
        parks : typeof  this.initParks.parkNumber !='undefined' ? this.initParks : {parkNumber : 1, parkList : [{ addr: '',detail:'',want:'' }]},
      }
    },
    computed:{
      dialogVisible :{
        get : function() {
          return this.dialogForm == 'park'
        },
        set : function() {
          this.$emit('closeDialog',false)
        }
      }
    },
    props:{
      dialogForm:{
        type : String,
        required : true
      },
      initParks:{
        type : Object,
        required: true
      },
    },
    methods:{
      closeDialog(data){
        this.$emit('closeDialog',data);
        this.$emit('addClaims',this.parks,'park');
      },
      handleChange(currentValue, oldValue) {
        arrayChange(currentValue,oldValue,this.parks.parkList,{ addr: '',detail:'',want:'' });
      },
    }
  }
</script>

<style scoped>

</style>
