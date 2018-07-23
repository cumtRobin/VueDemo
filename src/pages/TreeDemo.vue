<template>
    <section>
        <p>我们在管理系统中通常需要用到一个多级展开的树形组件，用来添加权限或者分配权限</p>
        <el-tree :data="addAuthorities" show-checkbox node-key="id" ref="addtree" highlight-current :props="defaultProps">
        </el-tree>
        <el-button @click="getSelectedNodes">获取选择后的节点</el-button>
        <el-button @click="getSelectedKeys">获取选择后的key</el-button>
        <p>选择后的值：{{selectedValue}}</p>
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
            }
        }
    },
    mounted() {
        this.addAuthorities = [
            {
                id: '1',
                name: '一级菜单',
                children: [
                    {
                        id: '1-1',
                        name: '二级菜单1-1',
                        children: [
                            {
                                id: '1-1-1',
                                name: '三级菜单1-1-1'
                            }
                        ]
                    },
                    {
                        id: '1-2',
                        name: '二级菜单1-2',
                        children: [
                            {
                                id: '1-2-1',
                                name: '三级菜单1-2-1'
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
        }
    },
}
</script>
