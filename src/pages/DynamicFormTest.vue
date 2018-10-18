<template>
    <dynamic-form :formList="formLists" :formModel="formModel" :formOption="formOption"></dynamic-form>
</template>

<script>
import * as _ from 'underscore'
import DynamicForm from '@/components/DynamicForm'
import { Validator } from '@/assets/js/validator'
const validators = new Validator()
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
                    min: 1,
                    max: 150,
                    placeholder: '请输入年龄'
                },
                {
                    key: 'phone',
                    type: 'number',
                    label: '手机号码',
                    model: '',
                    required: true,
                    minLength: 11,
                    maxLength: 11,
                    placeholder: '请输入电话号码'
                },
                {
                    key: 'introduce',
                    type: 'textarea',
                    label: '个人介绍',
                    model: '',
                    rows: 4,
                    placeholder: '请输入个人介绍',
                    required: true
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
                    key: 'hiredate',
                    type: 'date',
                    label: '入职日期',
                    model: '',
                    placeholder: '请选择入职日期',
                    required: true
                },
                {
                    key: 'workStartTime',
                    type: 'time',
                    label: '上班时间',
                    model: '',
                    placeholder: '请选择上班时间',
                    required: true
                },
                {
                    key: 'workEndTime',
                    type: 'time',
                    label: '下班时间',
                    model: '',
                    placeholder: '请选择下班时间',
                    required: true
                },
                {
                    key: 'birthday',
                    type: 'datetime',
                    label: '出生日期时间',
                    model: '',
                    placeholder: '请选择出生日期时间',
                    required: true
                },
                {
                    key: 'nation',
                    type: 'select',
                    label: '民族',
                    model: '',
                    placeholder: '请选择民族',
                    options: [
                        {
                            value: 1,
                            label: '汉族'
                        },
                        {
                            value: 2,
                            label: '满族'
                        },
                        {
                            value: 3,
                            label: '蒙古族'
                        },
                        {
                            value: 4,
                            label: '壮族'
                        }
                    ],
                    required: true
                },
                {
                    key: 'sex',
                    type: 'radio',
                    buttonLike: false,
                    label: '性别',
                    model: '',
                    options: [
                        {
                            value: 1,
                            label: '男'
                        },
                        {
                            value: 2,
                            label: '女'
                        },
                    ],
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
            this.formLists.forEach((item, index) => {
                var propRule = []
                // 通用规则定义
                if (item.required) {
                    if (item.type == 'select' || item.type == 'radio') {
                        propRule.push({ required: true, message: `必须填写${item.label}`, trigger: 'change'})
                    } else {
                        propRule.push({ required: true, message: `必须填写${item.label}`, trigger: 'blur'})
                    }
                }
                if (item.minLength && item.maxLength && item.minLength == item.maxLength) {
                    propRule.push({ min: item.minLength, max: item.maxLength, message: `${item.label}长度必须为${item.minLength}位`, trigger: 'blur'})
                } else {
                    if (item.minLength) {
                        propRule.push({ min: item.minLength, message: `${item.label}长度不能少于${item.minLength}`, trigger: 'blur'})
                    }
                    if (item.maxLength) {
                        propRule.push({ max: item.maxLength, message: `${item.label}长度不能超过${item.maxLength}`, trigger: 'blur'})
                    }
                }
                // 适用于number类型
                if (item.type == 'number') {
                    var hasMax = _.isNumber(item.max)
                    var hasMin = _.isNumber(item.min)
                    if (hasMax || hasMin) {
                        var rangeValidator = (rule, value, callback) => {
                            if (hasMax && value > item.max) {
                                callback(new Error(`${item.label}的最大值为${item.max}`))
                            } else if (hasMin && value < item.min) {
                                callback(new Error(`${item.label}的最小值为${item.min}`))
                            } else {
                                callback()
                            }
                        }
                        propRule.push({ validator: rangeValidator, trigger: 'blur'})
                    }
                }
                // 适用于email类型
                if (item.type == 'email') {
                    var emailValidator = (rule, value, callback) => {
                        if (!validators.isEmail(value)) {
                            callback(new Error('请输入正确的邮箱格式'))
                        } else {
                            callback()
                        }
                    }
                    propRule.push({ validator: emailValidator, trigger: 'blur'})
                }
                generateRules[item.key] = propRule
            })
            this.formOption = {
                labelWidth: '120px',
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

