<template>
  <el-form ref="defendant" :model="defendant" label-width="140px">
    <el-col :span="6">
      <el-form-item label="被告姓名">
        <el-input v-model="defendant.name"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="被告性别">
        <el-radio-group v-model="defendant.sex">
          <el-radio label="M">男</el-radio>
          <el-radio label="W">女</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="被告出生日期">
        <el-date-picker
          v-model="defendant.birthday"
          type="date"
          style="width: 190px"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="被告民族">
        <el-input v-model="defendant.nation"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="被告身份证号码">
        <el-input v-model="defendant.ID"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="被告住址">
        <el-input v-model="defendant.address"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="被告联系方式">
        <el-input v-model="defendant.phone"></el-input>
      </el-form-item>
    </el-col>
  </el-form>
</template>

<script>
  export default {
    name: 'defendant',
    props:{
      defendant:{
        type : Object,
        default(){
          return {}
        }
      }
    },
    data(){
      return {
      }
    }
  }
</script>

