<template>
  <div>
  <el-form label-width="180px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="原被告认识的时间">
          <el-date-picker
            v-model="factual.acquaintanceTime"
            type="date"
            style="width: 190px"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="原被告登记时间">
          <el-date-picker
            v-model="factual.registerTime"
            type="date"
            style="width: 190px"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="原被告登记地区">
          <el-cascader
            size="large"
            :options="options"
            v-model="factual.registerPlace">
          </el-cascader>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="原被告是否育有小孩">
          <el-radio-group v-model="factual.hasChild">
            <el-radio label="Y">是</el-radio>
            <el-radio label="N">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item v-if="isHasChilds" label="原被告有">
          <el-input-number v-model="factual.childNum" @change="handleChange" :min="1" :max="3"
                           label="描述文字"></el-input-number>
          <span> 个小孩</span>
        </el-form-item>
      </el-col>
    </el-row>
    <span v-if="isHasChilds" v-for="(child,index) in factual.childs" :key="index">
            <el-row>
            <el-col :span="8">
              <el-form-item label="小孩姓名">
                <el-input v-model="child.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="小孩性别">
              <el-radio-group v-model="child.sex">
                <el-radio label="M">男</el-radio>
                <el-radio label="W">女</el-radio>
              </el-radio-group>
            </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="小孩出生日期">
                <el-date-picker
                  v-model="child.birth"
                  type="date"
                  style="width: 190px"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            </el-row>
          </span>
    <el-col :span="24">
      <el-form-item label="原被告双方谁属于再婚">
        <el-checkbox-group v-model="factual.remarrySituation" @change="exclusiveChoice">
          <el-checkbox label="Y" >原告</el-checkbox>
          <el-checkbox label="B" >被告</el-checkbox>
          <el-checkbox label="neither">都不属于再婚</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-col>
    <el-row>
      <el-col :span="12">
        <el-form-item label="原被告双方是否具有曾经离婚然后又复婚的情形" label-width="320px">
          <el-radio-group v-model="factual.reMarry">
            <el-radio label="Y">是</el-radio>
            <el-radio label="N">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-col :span="24">
      <el-form-item label="原被告双方有以下哪些情形存在？" label-width="240px">
        <el-checkbox-group v-model="factual.divorceReasonList" @change="exclusiveChoice">
          <el-checkbox label="双方感情不和长期分居"></el-checkbox>
          <el-checkbox label="双方结婚后没有在一起生活"></el-checkbox>
          <el-checkbox label="被告有出轨、重婚、与他人同居的情形"></el-checkbox>
          <el-checkbox label="被告有家暴、吸毒、赌博、遗弃、虐待的过错"></el-checkbox>
          <el-checkbox label="被告下落不明、杳无音讯"></el-checkbox>
          <el-checkbox label="被告在监狱坐牢"></el-checkbox>
          <el-checkbox label="被告长期患病"></el-checkbox>
          <el-checkbox label="双方性格不合经常争吵"></el-checkbox>
          <el-checkbox label="双方家庭关系不融洽 (如：婆媳矛盾、妯娌矛盾)"></el-checkbox>
          <el-checkbox label="被告游手好闲、毫无上进心"></el-checkbox>
          <el-checkbox label="因孩子生育问题、生育观念导致双方感情不和"></el-checkbox>
          <el-checkbox label="双方对孩子的教育理念差距巨大"></el-checkbox>
          <el-checkbox label="被告不尽家庭责任、对原告不管不问"></el-checkbox>
          <el-checkbox label="被告对原告不尊重、态度轻蔑"></el-checkbox>
          <el-checkbox label="双方性生活不和谐"></el-checkbox>
          <el-checkbox label="双方经济关系十分紧张，物质问题深重"></el-checkbox>
          <el-checkbox label="双方学识、生活环境和生活习惯、价值观念差异较大"></el-checkbox>
          <el-checkbox label="neither">没有以上问题</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-col>
    <el-row>
      <el-col :span="8">
        <el-form-item label="原告是否还有其他离婚原因存在？" label-width="240px">
          <el-radio-group v-model="factual.otherReason">
            <el-radio label="Y">是</el-radio>
            <el-radio label="N">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="16">
        <el-form-item v-if="factual.otherReason == 'Y'" label="具体是什么原因？">
          <el-input v-model="factual.reason"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <el-form-item label="原被告曾经到法院起诉过离婚吗？" label-width="240px">
          <el-radio-group v-model="factual.sfqsglh">
            <el-radio label="Y">是</el-radio>
            <el-radio label="N">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-if="factual.sfqsglh == 'Y'">
      <el-col :span="8">
        <el-form-item label="什么时候起诉的？">
          <el-date-picker
            v-model="factual.sueTime"
            type="date"
            style="width: 190px"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item  label="是谁去法院起诉的？">
          <el-radio-group v-model="factual.suitor">
            <el-radio label="Y">原告</el-radio>
            <el-radio label="B">被告</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item  label="诉讼结果是？">
          <el-radio-group v-model="factual.sueResult">
            <el-radio label="A">我撤诉</el-radio>
            <el-radio label="B">被驳回</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  </div>
</template>

<script>
  import { regionData , CodeToText} from 'element-china-area-data';

  export default {
    name: 'factual',
    props:{
      factual:{
        type : Object,
        default(){
          return {}
        }
      }
    },
    data() {
      return {
        /*factual: {
          childNum: 0,
          hasChild: '',
          selectedOptions: [],
          childs: [{ name: '',sex:'',birth:'' }],
          checkList: [],
          divorceReasonList: [],
          ischeckList: true
        },*/
        options: regionData,
      }
    },
    methods: {
      handleChange(currentValue, oldValue) {
        if (oldValue > currentValue) {
          this.factual.childs.pop()
        } else {
          this.factual.childs.push({ name: '' })
        }
      },
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
      }
    },
    computed: {
        isHasChilds() {
          return this.factual.hasChild === 'Y'
        },
    }
  }
</script>

<style scoped>

</style>
