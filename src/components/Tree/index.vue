<template>
  <div>
    <el-tree :data="data"
             node-key="id"
             default-expand-all
             :expand-on-click-node="false">
      <span class="custom-tree-node"
            slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button type="text"
                     class="edit-button"
                     size="mini"
                     @click="() => append(data)">新增
          </el-button>
          <el-button type="text"
                     class="edit-button"
                     size="mini"
                     @click="() => edit(node, data)">编辑
          </el-button>
          <el-button type="text"
                     class="disable-button"
                     size="mini"
                     @click="() => remove(node, data)"> 删除
          </el-button>

        </span>
      </span>
    </el-tree>
  </div>
</template>
<script>
let id = 1000;
export default {
  data () {
    const data = [
      {
        id: '1',
        label: '地洲新能源',
        children: [
          {
            id: '1 - 1',
            label: '销售部',
            children: [
              {
                id: '1 - 1 - 1',
                label: '李四'
              },
              {
                id: '1 - 1 - 2',
                label: '李武'
              }
            ]
          },
          {
            id: '2 - 1',
            label: '研发部',
            children: [
              {
                id: '2 - 1 - 1',
                label: '张三'
              },
              {
                id: '2 - 1 - 2',
                label: '张思'
              }
            ]
          },
          {
            id: '3 - 1',
            label: '办公室',
            children: [
              {
                id: '3 - 1 - 1',
                label: '王柳'
              },
              {
                id: '3 - 1 - 2',
                label: '王琦'
              }
            ]
          }
        ]
      },
    ];
    return {
      data: JSON.parse(JSON.stringify(data)),
      data: JSON.parse(JSON.stringify(data))
    }
  },

  methods: {
    append (data) {
      const newChild = { id: id++, label: 'testtest', children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },

    remove (node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    edit (node, data) {
      console.log('node, data', node, data)
    },
    renderContent (h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button size="mini" type="text" on-click={() => this.append(data)}>Append</el-button>
            <el-button size="mini" type="text" on-click={() => this.remove(node, data)}>Delete</el-button>
          </span>
        </span>);
    }
  }
};
</script>

<style lang="less" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
/deep/ .el-button {
  padding: 0;
}
</style>