<template>
  <el-form ref="plaintiff" :model="plaintiff" label-width="140px">
    <el-col :span="6">
      <el-form-item label="原告姓名">
        <el-input v-model="plaintiff.name"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="原告性别">
        <el-radio-group v-model="plaintiff.sex">
          <el-radio label="M">男</el-radio>
          <el-radio label="W">女</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="原告出生日期">
        <el-date-picker
          v-model="plaintiff.birthday"
          type="date"
          style="width: 190px"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="原告民族">
        <el-input v-model="plaintiff.nation"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="原告身份证号码">
        <el-input v-model="plaintiff.ID"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="原告住址">
        <el-input v-model="plaintiff.address"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="原告联系方式">
        <el-input v-model="plaintiff.phone"></el-input>
      </el-form-item>
    </el-col>
<!--    <el-col :span="6">
      <el-form-item label="原告工作单位">
        <el-input v-model="plaintiff.employer"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="10">
      <el-form-item label="是否委托代理人">
        <el-radio-group v-model="plaintiff.isAgent">
          <el-radio label="Y">是</el-radio>
          <el-radio label="N">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-col>
    <el-col :span="10">
      <el-form-item v-if="plaintiff.isAgent == 'Y'" label="代理人类型">
        <el-radio-group v-model="plaintiff.agentType">
          <el-radio label="L">律师</el-radio>
          <el-radio label="O">其他</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-col>-->

    <!--委托律师机构信息开始 -->
<!--    <el-col :span="6">
      <el-form-item v-if="isLawyer" label="委托律师事务所">
        <el-input v-model="plaintiff.agent.firm"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item v-if="isLawyer" label="委托代理人姓名">
        <el-input v-model="plaintiff.agent.name"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item v-if="isLawyer" label="代理人联系电话">
        <el-input v-model="plaintiff.agent.phone"></el-input>
      </el-form-item>
    </el-col>-->
    <!--委托律师机构信息结束-->

    <!--委托其他代理人信息开始 -->
<!--    <el-col :span="6">
      <el-form-item v-if="isOther" label="代理人姓名">
        <el-input v-model="plaintiff.agent.name"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item v-if="isOther" label="代理人性别">
        <el-radio-group v-model="plaintiff.agent.sex">
          <el-radio label="M">男</el-radio>
          <el-radio label="W">女</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item v-if="isOther" label="代理人民族">
        <el-input v-model="plaintiff.agent.nation"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item v-if="isOther" label="代理人身份证号码">
        <el-input v-model="plaintiff.agent.ID"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item v-if="isOther" label="代理人住址">
        <el-input v-model="plaintiff.agent.address"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item v-if="isOther" label="代理人联系电话">
        <el-input v-model="plaintiff.agent.phone"></el-input>
      </el-form-item>
    </el-col>-->
    <!--委托其他代理人信息结束 -->
  </el-form>
</template>

<script>
  export default {
    name: 'plaintiff',
    props:{
      plaintiff:{
        type : Object,
        default(){
          return {}
        }
      }
    },
    data(){
      return {}
    },
/*    computed:{
      isLawyer() {
        return this.plaintiff.isAgent == 'Y' && this.plaintiff.agentType == 'L'
      },
      isOther() {
        return this.plaintiff.isAgent == 'Y' && this.plaintiff.agentType == 'O'
      },
    }*/
  }
</script>

<style scoped>

</style>
