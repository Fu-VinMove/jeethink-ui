<template>
  <el-dialog title="车位相关信息填写" :visible.sync = "dialogVisible" width="90%">
    <el-row>
      <el-col :span="24">
        <el-form-item label="原告想要争取">
          <el-input-number v-model="cars.carNumber" @change="handleChange" :min="1" :max="3"
                           label="车位个数"></el-input-number>
          <span> 个车子？</span>
        </el-form-item>
      </el-col>
    </el-row>
    <span v-for="(car,index) in cars.carList" :key="index">
        <el-row>
          <el-col :span="7">
            <el-form-item label="车牌号是多少？" label-width="120px">
              <el-input v-model="car.license"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品牌是什么？(如：奥迪、奔驰)" label-width="220px">
              <el-input v-model="car.brand"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="分割想法是？" >
              <el-radio-group v-model="car.want">
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
  import { arrayChange } from './common'
  import { regionData } from 'element-china-area-data'

  export default {
    name: 'car',
    props:{
      dialogForm:{
        type : String,
        required : true
      },
      initCars:{
        type : Object,
        required: true
      },
    },
    data(){
      return {
        cars : typeof this.initCars.carNumber !='undefined' ? this.initCars : {carNumber : 1, carList : [{ license: '',brand:'',want:'' }]},
      }
    },
    computed:{
      dialogVisible :{
        get : function() {
          return this.dialogForm == 'car'
        },
        set : function() {
          this.$emit('closeDialog',false)
        }
      }
    },
    methods:{
      closeDialog(data){
        this.$emit('closeDialog',data);
        this.$emit('addClaims',this.cars,'car');
      },
      handleChange(currentValue, oldValue) {
        arrayChange(currentValue,oldValue,this.cars.carList,{ license: '',brand:'',want:'' });
      },
    }
  }
</script>

<style scoped>

</style>
