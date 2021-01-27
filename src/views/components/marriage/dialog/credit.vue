<template>
  <el-dialog title="债权信息" :visible.sync = "dialogVisible" width="90%">
    <el-row>
      <el-col :span="24">
        <el-form-item label="原告想要争取">
          <el-input-number v-model="credits.creditNumber" @change="handleChange" :min="1" :max="3"
                           label=""></el-input-number>
          <span>  笔债权？</span>
        </el-form-item>
      </el-col>
    </el-row>
    <span v-for="(credit,index) in credits.creditList" :key="index">
        <el-row>
          <el-col :span="7">
            <el-form-item label="谁借了你们钱？" label-width="120px">
              <el-input v-model="credit.borrower"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="借了你们多少钱？" label-width="130px">
              <el-input v-model="credit.amount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="借钱的时间是？">
              <el-date-picker
                v-model="credit.amount"
                type="date"
                style="width: 190px"
                placeholder="选择日期">
              </el-date-picker>
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
  import {arrayChange} from './common'

  export default {
    name: 'credit',
    props:{
      dialogForm:{
        type : String,
        required : true
      },
      initCredits:{
        type : Object,
        required: true
      },
    },
    data(){
      return {
        credits :typeof this.initCredits.creditNumber != 'undefined' ? this.initCredits : {creditNumber : 1, creditList : [{ borrower: '',amount:'',time:'' }]},
      }
    },
    computed:{
      dialogVisible :{
        get : function() {
          return this.dialogForm == 'credit'
        },
        set : function() {
          this.$emit('closeDialog',false)
        }
      }
    },
    methods:{
      closeDialog(data){
        this.$emit('closeDialog',data);
        this.$emit('addClaims',this.credits,'credit');
      },
      handleChange(currentValue, oldValue) {
        arrayChange(currentValue,oldValue,this.credits.creditList,{borrower: '',amount:'',time:'' });
      },
    }
  }
</script>

<style scoped>

</style>
