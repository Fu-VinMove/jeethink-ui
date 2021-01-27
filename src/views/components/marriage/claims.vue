<template>
  <div>
  <el-form ref="claims" :model="claims" label-width="200px">
    <el-row v-if="hasChild">
      <el-col v-if="factual.childs.length == 1" :span="24">
        <el-form-item label="原告想不想争取小孩抚养权？">
          <el-radio-group v-model="claims.claimCustody">
            <el-radio label="Y">想要争取</el-radio>
            <el-radio label="N">不想争取</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col v-else :span="24">
        <el-form-item label="原告想要抚养哪个小孩 ？">
          <el-checkbox-group v-model="claims.custodys" @change="exclusiveChoice">
            <el-checkbox v-for="(child,index) in factual.childs" :key="index" :label="child.name" ></el-checkbox>
            <el-checkbox label="neither">都不要</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-col>
    </el-row>
    <div v-if="isclaimCustody">
      <el-row >
        <el-col :span="24">
          <el-form-item label="原告想不想被告支付抚养费？" label-width="200px">
            <el-radio-group v-model="claims.support">
              <el-radio label="Y">想被告支付</el-radio>
              <el-radio label="A">双方互不支付抚养费</el-radio>
              <el-radio label="N">不想被告支付抚养费</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <div v-if="claims.support == 'Y'">
        <el-row >
          <el-col :span="8">
            <el-form-item label="原告想被告怎么支付抚养费？" label-width="200px">
              <el-radio-group v-model="claims.custodyPayAction">
                <el-radio label="O">一次性支付</el-radio>
                <el-radio label="M">按月支付</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="金额">
              <el-input v-model="claims.custodyMoney"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </div>
<!--    <el-row>
      <el-col :span="24">
        <el-form-item label="原告想对以下哪些进行分割？">
          <el-checkbox-group v-model="claims.propertyList" @change="exclusiveChoice">
            <el-checkbox label="house" @change="propertyDetail">房子</el-checkbox>
            <el-checkbox label="park"  @change="propertyDetail">车位</el-checkbox>
            <el-checkbox label="car" @change="propertyDetail">车子</el-checkbox>
            <el-checkbox label="deposit">存款</el-checkbox>
            <el-checkbox label="credit" @change="propertyDetail">他人欠你们的钱 (债权)</el-checkbox>
            <el-checkbox label="你们欠他人的钱 (债务)" @change="propertyDetail"></el-checkbox>
            <el-checkbox label="neither">以上都不需要分割</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="原告还想争取以下哪些特殊财产？" label-width="240px">
          <el-checkbox-group v-model="this.claims.propertyList" @change="exclusiveChoice">
            <el-checkbox label="彩礼"></el-checkbox>
            <el-checkbox label="公积金"></el-checkbox>
            <el-checkbox label="养老保险金"></el-checkbox>
            <el-checkbox label="保险 (例：保费的续交、保险利益的归属)"></el-checkbox>
            <el-checkbox label="公司、企业股份"></el-checkbox>
            <el-checkbox label="个体工商户"></el-checkbox>
            <el-checkbox label="个人独资企业"></el-checkbox>
            <el-checkbox label="有价证券"></el-checkbox>
            <el-checkbox label="家电、家具、首饰等生活用品"></el-checkbox>
            <el-checkbox label="军人复员费、转业费"></el-checkbox>
            <el-checkbox label="neither">没有以上财产需要争取</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-col>
    </el-row>-->
    <el-row>
      <el-col :span="24">
        <el-form-item label="原告需要被告支付离婚损害赔偿金吗？" label-width="260px">
          <el-radio-group v-model="claims.divorceDamages">
            <el-radio label="O">需要</el-radio>
            <el-radio label="M">不需要</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>

    <!--房产内容对话框-->
    <!--<House @closeDialog="closeDialog" @addClaims="addClaims" :dialog-form="dialogForm" :initHouses="this.claims.houses"></House>
    <Park @closeDialog="closeDialog" @addClaims="addClaims" :dialog-form="dialogForm" :initParks="this.claims.parks"></Park>
    <Car @closeDialog="closeDialog" @addClaims="addClaims" :dialog-form="dialogForm"  :initCars="this.claims.cars"></Car>
    <Credit @closeDialog="closeDialog" @addClaims="addClaims" :dialog-form="dialogForm" :initCredits="this.claims.credits"></Credit>-->
  </el-form>
  </div>
</template>

<script>
  import Park from './dialog/park'
  import House from './dialog/house'
  import Car from './dialog/car'
  import Credit from './dialog/credit'

  export default {
    name: 'claims',
    props:{
      factual:{
        type : Object,
        required: true
      },
      initClaims:{
        type : Object,
        required: true
      },
    },
    data(){
      return {
        dialogForm : '',
        formLabelWidth:'120px',
        claims:{
          custodys: typeof this.initClaims.custodys != 'undefined' ? this.initClaims.custodys : [],
        }
      }
    },
    watch:{
      claims:{
        handler(newVal,oldValue){
          this.$emit('updateClaims',newVal)
        },
        deep:true,
        immediate:true
      }
    },
    computed: {
      hasChild() {
        return this.factual.hasChild == 'Y'
      },
      isclaimCustody(){
        if(this.factual.hasChild === 'Y'){
          if(this.factual.childNum == 1){
            return this.claims.claimCustody == 'Y';
          }
          else{
            return  this.claims.custodys.length > 0 &&  !this.claims.custodys.includes('neither')
          }
        }
      }
    },
    methods:{
      exclusiveChoice(value) {
        if (value.length > 1) {
          const index = value.indexOf('neither');
          if (index == 0) {
            value.splice(0, 1);
          }
          if (index > 0) {
            value.splice(0, value.length - 1);
          }
        }
      },
    },
  }
</script>

<style scoped>

</style>
