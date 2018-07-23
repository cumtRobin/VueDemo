<template>
    <section>
        <p>我们在管理系统中通常需要用到一个多级展开的树形组件，用来添加权限或者分配权限。</p>
        <el-tree :data="addAuthorities" show-checkbox node-key="id" ref="addtree" highlight-current :props="defaultProps">
        </el-tree>
        <el-button @click="getSelectedNodes">获取选择后的节点</el-button>
        <el-button @click="getSelectedKeys">获取选择后的key</el-button>
        <p>选择后的值：{{selectedValue}}</p>
        <p>而编辑时，往往某些用户已经具备了一些权限，那么如何在初始化时就呈现他已经有的权限呢？可以使用setCheckedNodes或setCheckedKeys来给树形组件赋值。假如某人已经有所有的一级权限1，那么setCheckedKeys需要赋值['1','1-1','1-1-1','1-2','1-2-1'];使用setCheckedNodes也可以，不过显得代码比较多</p>
        <el-button @click="setValueManual">根据权限数据展示对应的权限</el-button>
        <el-tree :data="editAuthorities" show-checkbox node-key="id" ref="edittree" highlight-current :props="defaultProps">
        </el-tree>
    </section>
</template>

<script>
import * as _ from 'underscore';
export default {
    data(){
        return {
            selectedValue: '',
            addAuthorities: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            editAuthorities: []
        }
    },
    mounted() {
        this.addAuthorities = [
            {
                id: '1',
                name: '一级权限1',
                children: [
                    {
                        id: '1-1',
                        name: '二级权限1-1',
                        children: [
                            {
                                id: '1-1-1',
                                name: '三级权限1-1-1'
                            }
                        ]
                    },
                    {
                        id: '1-2',
                        name: '二级权限1-2',
                        children: [
                            {
                                id: '1-2-1',
                                name: '三级权限1-2-1'
                            }
                        ]
                    }
                ]
            },
            {
                id: '2',
                name: '一级权限2',
                children: [
                    {
                        id: '2-1',
                        name: '二级权限2-1',
                        children: [
                            {
                                id: '2-1-1',
                                name: '三级权限2-1-1'
                            }
                        ]
                    },
                    {
                        id: '2-2',
                        name: '二级权限2-2',
                        children: [
                            {
                                id: '2-2-1',
                                name: '三级权限2-2-1'
                            }
                        ]
                    },
                    {
                        id: '2-3',
                        name: '二级权限2-3',
                        children: [
                            {
                                id: '2-3-1',
                                name: '三级权限2-3-1'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    methods: {
        getSelectedNodes() {
            this.selectedValue = JSON.stringify(this.$refs.addtree.getCheckedNodes())
        },
        getSelectedKeys() {
            this.selectedValue = JSON.stringify(this.$refs.addtree.getCheckedKeys())
        },
        setValueManual() {
            this.editAuthorities = _.clone(this.addAuthorities)
            this.$refs.edittree.setCheckedKeys(['1','1-1','1-1-1','1-2','1-2-1'])
        }
    },
}
</script>
