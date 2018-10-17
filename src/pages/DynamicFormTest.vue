<template>
    <dynamic-form :formList="formLists" :formModel="formModel" :formOption="formOption"></dynamic-form>
</template>

<script>
import DynamicForm from '@/components/DynamicForm' 
export default {
    components: {
        DynamicForm
    },
    data() {
        return {
            formLists: [],
            formOption: {},
            formModel: {}
        }
    },
    mounted() {
        this.getFormDatas()
        this.generateFormModel()
        this.generateOptions()
    },
    methods: {
        getFormDatas() {
            this.formLists = [
                {
                    key: 'name',
                    type: 'text',
                    label: '姓名',
                    model: '',
                    required: true,
                    minLength: 2,
                    maxLength: 20,
                    placeholder: '请输入姓名'
                },
                {
                    key: 'age',
                    type: 'number',
                    label: '年龄',
                    model: '',
                    postfix: '岁',
                    required: true,
                    max: 100,
                    placeholder: '请输入年龄'
                },
                {
                    key: 'introduce',
                    type: 'textarea',
                    label: '个人介绍',
                    model: '',
                    rows: 4,
                    placeholder: '请输入个人介绍'
                },
                {
                    key: 'email',
                    type: 'email',
                    label: '个人邮箱',
                    model: '',
                    required: true,
                    placeholder: '请输入个人邮箱'
                },
                {
                    key: 'workStartTime',
                    type: 'time',
                    label: '上班时间',
                    model: '',
                    placeholder: '请选择上班时间',
                    required: true
                }
            ]
            console.log('formLists: ', this.formLists)
        },
        generateFormModel() {
            this.formLists.forEach((value, index) => {
                this.formModel[value.key] = value.model
            })
            console.log('formModel: ', this.formModel)
        },
        generateOptions() {
            var generateRules = {}
            this.formLists.forEach((value, index) => {
                var propRule = []
                if (value.required) {
                    propRule.push({ required: true, message: `必须填写${value.label}`, trigger: 'blur'})
                }
                if (value.minLength) {
                    propRule.push({ min: value.minLength, message: `${value.label}长度不能少于${value.minLength}`, trigger: 'blur'})
                }
                if (value.maxLength) {
                    propRule.push({ max: value.maxLength, message: `${value.label}长度不能超过${value.maxLength}`, trigger: 'blur'})
                }
                generateRules[value.key] = propRule
            })
            this.formOption = {
                labelWidth: '100px',
                labelPosition: 'right',
                rules: generateRules
            }
            console.log('formOption: ', this.formOption)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>

