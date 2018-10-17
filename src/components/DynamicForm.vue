<template>
    <el-form ref="dynamicForm" :model="modelSchema" :label-width="formOption.labelWidth" :label-position="formOption.labelPosition" :rules="formOption.rules">
        <el-form-item v-for="(formItem, index) in formSchema" :key="index" :label="formItem.label" :prop="formItem.key">
            <el-input v-if="formItem.type == 'text'" :type="formItem.type" v-model="modelSchema[formItem.key]" :placeholder="formItem.placeholder"></el-input>
            <el-input v-if="formItem.type == 'textarea'" :type="formItem.type" :rows="formItem.rows" v-model="modelSchema[formItem.key]" :placeholder="formItem.placeholder"></el-input>
            <el-input v-if="formItem.type == 'number'" :type="formItem.type" v-model="modelSchema[formItem.key]" :placeholder="formItem.placeholder">
                <template slot="append" v-if="formItem.postfix">{{formItem.postfix}}</template>
            </el-input>
            <el-input v-if="formItem.type == 'email'" :type="formItem.type" v-model="modelSchema[formItem.key]" :placeholder="formItem.placeholder"></el-input>
            <el-time-picker class="dynamic-date-editor"
                v-if="formItem.type == 'time'"
                :placeholder="formItem.placeholder"
                v-model="modelSchema[formItem.key]"
            ></el-time-picker>
        </el-form-item>
        <el-form-item>
            <el-button @click="reset">重置</el-button>
            <el-button @click="submit">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import * as _ from 'underscore'
export default {
    props: {
        formList: {
            required: true
        },
        formOption: {
            required: true
        },
        formModel: {
            required: true
        }
    },
    data() {
        return {
            formSchema: [],
            modelSchema: {}
        }
    },
    mounted() {
    },
    methods: {
        submit() {
            this.$refs.dynamicForm.validate(valid => {
                if (valid) {
                    this.$alert('提交成功', '温馨提示')
                    console.log(this.modelSchema)
                }
            })
        },
        reset() {
            this.$refs.dynamicForm.resetFields()
        }
    },
    watch: {
        formList: function(val) {
            this.formSchema = $.extend(true, {}, val)
        },
        formModel: function(val) {
            this.modelSchema = $.extend(true, {}, val)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>

