<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: mandy
 * @Date: 2021-03-03 15:00:36
 * @LastEditors: mandy
 * @LastEditTime: 2021-03-04 09:59:20
-->
<template>
  <div class="dz-control-button">
    <ul>
      <li v-for="(item, index) in buttonList"
          :key="index"
          :class="[{'li-active':liIndex === index}]"
          @click="selectLi(item, index)">
        <em>{{item.name}}</em>
        <div v-if="item.name === '实时工况模式'"
             class="working-condition">
          <el-switch v-model="value2"
                     active-color="#00A854"
                     active-value="00000000"
                     inactive-color="#CCCCCC"
                     :active-text="activeText"
                     inactive-value="10000000">
          </el-switch>
          <span v-for="(it, ind) in workingList"
                :key="ind">{{it.name}}</span>
        </div>
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      liIndex: 0,
      buttonList: [
        {
          name: '实时工况模式',
          id: '1'
        },
        {
          name: '报警模式',
          id: '2'
        },
        {
          name: '静默模式',
          id: '3'
        }
      ],
      workingList: [
        {
          name: '全部',
          id: 'all'
        },
        {
          name: '过街系统',
          id: 'w1'
        },
        {
          name: '公交站系统',
          id: 'w2'
        },
        {
          name: '景观步道系统',
          id: 'w3'
        },
        {
          name: '道路引导系统',
          id: 'w4'
        },
        {
          name: '照明系统',
          id: 'w5'
        },
        {
          name: '停车系统',
          id: 'w6'
        },
        {
          name: '幕墙系统',
          id: 'w7'
        },
        {
          name: '市政系统',
          id: 'w8'
        }
      ],
      value2: true,
      activeText: '关闭'
    }
  },
  methods: {
    selectLi (item, index) {
      this.liIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../../style/color.less";
.dz-control-button {
  display: flex;
  ul {
    display: flex;
    li {
      padding: 10px 16px;
      background: rgba(7, 14, 71, 0.5);
      mix-blend-mode: normal;
      border-radius: 2px;
      margin-right: 10px;
      color: @white;
      cursor: pointer;
      font-weight: 600;
      display: flex;
      em {
        font-style: normal;
      }
      .working-condition {
        display: flex;
        span {
          display: block;
          margin-left: 10px;
          font-weight: 500;
        }
      }
    }
    .li-active {
      em {
        color: #35e9ff;
      }
    }
  }
}
/deep/ .el-switch {
  position: relative;
  height: 20px;
  line-height: 20px;
  margin-left: 10px;
  &.is-checked {
    .el-switch__core {
      border-color: #41bda2;
      background-color: #41bda2;
      &:after {
        margin-left: -18px;
        height: 18px !important;
        width: 18px !important;
        border-color: #41bda2;
        background-color: #41bda2;
      }
    }
  }
  .el-switch__label,
  .el-switch__core {
    width: 40px !important;
    height: 20px;
    // border-color: #ececec;
    // background-color: #ececec;
  }
  .el-switch__core {
    border-radius: 12px;
    border: none;
    background: #cccccc;
    &:after {
      box-shadow: 0px 0px 4px 0px rgba(7, 14, 71, 1);
      background: rgba(7, 14, 71, 1);
      height: 18px !important;
      width: 18px !important;
    }
  }
  .el-switch__label.is-active {
    color: #333;
  }
  .el-switch__label--right {
    margin-left: 0px;
    &.is-active {
      color: #fff;
      right: 20px;
    }
    > span {
      font-size: 12px;
      font-weight: normal;
    }
  }
}
.el-switch.is-checked {
  .el-switch__core {
    width: 40px;
    border-color: #ececec;
    background-color: #ececec;
  }
}
.el-switch.is-disabled {
  opacity: 1;
}
.el-switch.is-disabled .el-switch__core,
.el-switch.is-disabled .el-switch__label {
  cursor: pointer !important;
}
</style>
