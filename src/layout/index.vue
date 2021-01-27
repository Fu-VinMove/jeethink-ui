<template>
  <vue-good-wizard
    :steps="steps"
    :onNext="nextClicked"
    :onBack="backClicked"
    :previousStepLabel="previousStepLabel"
    :nextStepLabel="nextStepLabel"
    :finalStepLabel="finalStepLabel">
    <div slot="page1">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="原告人信息" name="1" style="height: auto">
          <Plaintiff :plaintiff="plaintiff"></Plaintiff>
        </el-collapse-item>
        <el-collapse-item title="被告人信息" name="2">
          <Defendant :defendant="defendant"></Defendant>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div slot="factual"  >
      <Factual ref="factual" style="height:auto;" :factual="factual"></Factual>
    </div>


    <Claims :factual="factual" :initClaims="claims" ref="claims" slot="claims" @updateClaims="updateClaims"></Claims>
    <!--      <div slot="page4">
            <h4>Step 5</h4>
            <p>This is step 5</p>
          </div>
          <div slot="page5">
            <h4>Step 6</h4>
            <p>This is step 6</p>
          </div>-->
  </vue-good-wizard>
</template>

<script>

  import {createText,getPDF} from '../api/text/marry'
  //import {createText} from '../api/system/user'

  import { regionData , CodeToText} from 'element-china-area-data';
  import Defendant from '../views/components/defendant/defendant'
  import Plaintiff from '../views/components/plaintiff/plaintiff'
  import Factual from '../views/components/marriage/factual'
  import Claims from '../views/components/marriage/claims'

  function buildTextPlaintiff(plaintiff) {
    let textPlaintiff = plaintiff;
    return textPlaintiff
  }

  function buildTextDefendant(defendant) {
    let textDefendant = defendant;
    return textDefendant
  }

  function buildTextFactual(factual) {
    let textFactual = {};
    textFactual.acquaintanceTime = factual.acquaintanceTime;
    textFactual.registerTime  = factual.registerTime;
    let registerPlace ="";
    for( let place of factual.registerPlace){
      registerPlace=registerPlace+CodeToText[place];
    }
    textFactual.registerPlace = registerPlace;

    if(factual.remarrySituation.length > 1){
      textFactual.remarrySituationEnum = 'A'
    }else {
      if(factual.remarrySituation.length > 0){
        if("neither" != factual.remarrySituation[0]){
          textFactual.remarrySituationEnum=factual.remarrySituation[0];
        }
      }
    }
    textFactual.childs = factual.childs;
    textFactual.divorceTime  =  factual.divorceTime
    textFactual.remarryTime = factual.remarryTime
    textFactual.divorceReasonList = factual.divorceReasonList
    textFactual.sueTime = factual.sueTime
    textFactual.suitor = factual.suitor
    textFactual.sueResult = factual.sueResult

    return textFactual
  }

  function buildChildClaimText(childs) {
    let text = "婚生";
    for(let child of childs){
      if("M" == child.sex){
        text=text + "儿子";
      }else{
        text=text + "女儿";
      }
      text=text + child.name +"和";
    }
    text = text.substring(0,text.length-1);
    text=text+"由原告抚养,"
    return text;
  }

  function buildTextClaim(claims,factual) {
    let tempClaims = [];
    tempClaims.push("判令原、被告解除婚姻关系；");

    let custodysText = '';
    if(claims.claimCustody == 'Y'){
      custodysText =buildChildClaimText(factual.childs);
    }else if(claims.custodys.length > 0){
      let childs = [];
      for(let custodyName of claims.custodys){
        for(let children of factual.childs){
          if(custodyName.toString() == children.name){
            childs.push(children)
          }
        }
      }
      custodysText =buildChildClaimText(childs)
    }

    if("Y" == claims.support){
      if("M" == claims.custodyPayAction){
        custodysText = custodysText+"被告依法支付抚养费每月"+claims.custodyMoney+"元，直至子女成年；"
      }else if("O" == claims.custodyPayAction){
        custodysText = custodysText+"被告依法支付抚养费一次性"+claims.custodyMoney+"元，"
      }
    }
    custodysText = custodysText.substring(0,custodysText.length-1)+";"
    tempClaims.push(custodysText);
    tempClaims.push("本案诉讼费由被告承担。")

    let textClaims = []
    for(let i=0;i<=tempClaims.length-1;i++){
      textClaims.push((i+1)+"、"+tempClaims[i]);
    }
    return textClaims
  }

  export default {
    name: 'demo',
    data() {
      return {
        activeNames: [],
        steps: [
          {
            label: '原告信息',
            slot: 'page1',
            nextStepLabel: { default: '下一步' }
          },
          {
            label: '事实与理由',
            slot: 'factual'
          },
          {
            label: '诉讼请求',
            slot: 'claims',
            options: {
              nextDisabled: false // control whether next is disabled or not
            }
          }
        ],
        plaintiff: {  //原告
        },
        defendant: {}, //被告
        factual:{   //事实
          childNum: 0,
          hasChild: '',
          remarrySituation:[],
          childs: [{ name: '',sex:'',birth:'' }],
          divorceReasonList: [],
        },
        claims:{},
        nextStepLabel: '下一步',
        previousStepLabel: '上一步',
        finalStepLabel: '完成',
      }
    },
    components:{Defendant,Plaintiff,Factual,Claims},
    methods: {
      nextClicked(currentPage) {
        getPDF().then(response =>{
          this.openFile(response);
        }).catch(response=>{
          this.openFile(response);
        });


        if(currentPage == 2){
          let text = {};
          text.plaintiff=buildTextPlaintiff(this.plaintiff);
          text.defendant=buildTextDefendant(this.defendant);
          text.factual=buildTextFactual(this.factual);
          text.claims =buildTextClaim(this.claims,this.factual);
          let data =JSON.stringify(text);
          createText(data).then(response =>{
            this.downloadFile(response);
          }).catch(response=>{
            this.downloadFile(response);
          });
        }
        return true
      },
      openFile(data){
        const binaryData = [];
        binaryData.push(data);
        this.pdfUrl = window.URL.createObjectURL(new Blob(binaryData, { type: 'application/pdf' }));
        window.open(this.pdfUrl);
      },
      downloadFile(data){
        let blob = new Blob([data], {type: 'application/docx'})
        let url = window.URL.createObjectURL(blob)
        const link = document.createElement('a') // 创建a标签
        link.href = url
        link.download = '起诉状.doc' // 重命名文件
        link.click()
        URL.revokeObjectURL(url)
      },
      backClicked(currentPage) {
        return true //return false if you want to prevent moving to previous page
      },
      updateClaims(data){
        this.claims =data;
      }
    },
  }
</script>
