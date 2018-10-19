<template>
    <section>
        <div>表单由数据动态生成，数据源：{{JSON.stringify(formList)}}</div>
        <el-form ref="dynamicForm" :model="modelSchema" :label-width="formOption.labelWidth" :label-position="formOption.labelPosition" :rules="formOption.rules">
            <el-form-item v-for="(formItem, index) in formSchema" :key="index" :label="formItem.label" :prop="formItem.key">
                <el-input v-if="formItem.type == 'text'" :type="formItem.type" v-model="modelSchema[formItem.key]" :placeholder="formItem.placeholder"></el-input>
                
                <el-input v-if="formItem.type == 'textarea'" :type="formItem.type" :rows="formItem.rows" v-model="modelSchema[formItem.key]" :placeholder="formItem.placeholder"></el-input>
                
                <el-input v-if="formItem.type == 'number'" :type="formItem.type" v-model="modelSchema[formItem.key]" :placeholder="formItem.placeholder">
                    <template slot="append" v-if="formItem.postfix">{{formItem.postfix}}</template>
                </el-input>
                
                <el-input v-if="formItem.type == 'email'" :type="formItem.type" v-model="modelSchema[formItem.key]" :placeholder="formItem.placeholder"></el-input>
                
                <el-time-picker
                    v-if="formItem.type == 'time'"
                    class="dynamic-date-editor"
                    :placeholder="formItem.placeholder"
                    v-model="modelSchema[formItem.key]">
                </el-time-picker>
                
                <el-date-picker
                    v-if="formItem.type == 'date'"
                    class="dynamic-date-editor"
                    v-model="modelSchema[formItem.key]"
                    type="date"
                    :placeholder="formItem.placeholder">
                </el-date-picker>
                
                <el-date-picker
                    v-if="formItem.type == 'datetime'"
                    class="dynamic-date-editor"
                    v-model="modelSchema[formItem.key]"
                    type="datetime"
                    :placeholder="formItem.placeholder">
                </el-date-picker>
                
                <el-select
                    v-if="formItem.type == 'select'"
                    class="dynamic-select"
                    v-model="modelSchema[formItem.key]"
                    :placeholder="formItem.placeholder">
                    <el-option
                        v-for="optionItem in formItem.options"
                        :key="optionItem.value"
                        :label="optionItem.label"
                        :value="optionItem.value">
                    </el-option>
                </el-select>
                
                <el-radio-group
                    v-if="formItem.type == 'radio'"
                    v-model="modelSchema[formItem.key]">
                    <el-radio-button
                        v-if="formItem.buttonLike"
                        v-for="optionItem in formItem.options"
                        :key="optionItem.value"
                        :label="optionItem.value">
                        {{optionItem.label}}
                    </el-radio-button>
                    <el-radio
                        v-if="!formItem.buttonLike"
                        v-for="optionItem in formItem.options"
                        :key="optionItem.value"
                        :label="optionItem.value">
                        {{optionItem.label}}
                    </el-radio>
                </el-radio-group>
                
                <el-checkbox-group
                    v-if="formItem.type == 'checkbox'"
                    v-model="modelSchema[formItem.key]">
                    <el-checkbox
                        v-for="optionItem in formItem.options"
                        :key="optionItem"
                        :label="optionItem">
                    </el-checkbox>
                </el-checkbox-group>

                <el-upload
                    v-if="formItem.type == 'file'"
                    class="dynamic-upload"
                    drag
                    :action="$store.state.config.API_ROOT"
                    :limit="1"
                    :show-file-list="true"
                    :auto-upload="false">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button @click="reset">重置</el-button>
                <el-button @click="submit">提交</el-button>
            </el-form-item>
        </el-form>
    </section>
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
            modelSchema: null
        }
    },
    created() {
        this.formSchema = $.extend(true, [], this.formList)
        this.modelSchema = $.extend(true, {}, this.formModel)
    },
    mounted() {
    },
    methods: {
        submit() {
            this.$refs.dynamicForm.validate(valid => {
                if (valid) {
                    this.$alert('提交成功', '温馨提示')
                    let submitForms = {}
                    _.each(this.formSchema, (item, index) => {
                        if (item.type == 'checkbox') {
                            // 如果是checkbox，需要依据勾选的label数组转为value数组
                            let labelModel = this.modelSchema[item.key]
                            let valueModel = []
                            labelModel.forEach(element => {
                                let originalOption = _.find(item.originalOptions, o => {
                                    return o.label == element
                                })
                                valueModel.push(originalOption.value)
                            })
                            submitForms[item.key] = valueModel
                        } else {
                            submitForms[item.key] = this.modelSchema[item.key]
                        }
                    })
                    console.log(submitForms)
                }
            })
        },
        reset() {
            this.$refs.dynamicForm.resetFields()
        }
    },
    watch: {
        formList: function(val) {
            this.formSchema = $.extend(true, [], val)
        },
        formModel: function(val) {
            this.modelSchema = $.extend(true, {}, val)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>

