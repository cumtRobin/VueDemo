<template>
    <div class="input-num__wrap">
        <div class="input-num">
            <span class="input-num__decrease" @click="decrease"><i class="icon-arrow-down"></i></span>
            <span class="el-input-num__increase" @click="increase"><i class="icon-arrow-up"></i></span>
            <input
                type="text"
                class="input__inner"
                :value="value"
                @input="handleInput"
                @blur="handleInputBlur"
                @keydown.up="increase"
                @keydown.down="decrease"
            >
        </div>
    </div>
</template>

<script>
export default {
    model: {
        prop: 'value',
        event: 'input'
    },
    props: {
        value: {
            type: String
        },
        max: {
            required: true,
            type: Number
        },
        autoPrefix: {
            type: Boolean,
            default: true
        },
        loop: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            lastValue: this.value
        }
    },
    methods: {
        updateValue(value) {
            this.$emit('input', value);
            this.lastValue = value;
        },
        increase() {
            let value = Number(this.value);
            if (value < this.max) {
                value = this.prefixZero(++value);
            } else if (this.loop) {
                value = '00';
            } else {
                return;
            }
            this.updateValue(value);
        },
        decrease() {
            let value = Number(this.value);
            if (value > 0) {
                value = this.prefixZero(--value);
            } else if (this.loop) {
                value = this.prefixZero(this.max);
            } else {
                return;
            }
            this.updateValue(value);
        },
        handleInput(event) {
            let value = event.target.value;
            if (/^\d{1,2}$/.test(value)) {
                // 如果是2位的数字
                if (Number(value) > this.max) {
                    value = String(this.max);
                }
            } else {
                // 去掉非数字的部分
                let replaceValue = value.replace(/\D/g, '');
                if (replaceValue.length > 2) {
                    // 如果长度超过2，则取上次记住的值lastValue
                    value = this.lastValue;
                } else {
                    // 否则，就取去掉非数字的部分
                    value = replaceValue;
                }
            }
            event.target.value = value;
            this.updateValue(value);
        },
        handleInputBlur() {
            if (this.autoPrefix && this.value.length === 1) {
                let value = this.prefixZero(this.value);
                this.updateValue(value);
            }
        },
        prefixZero(str) {
            if (typeof str === 'number') {
                str = String(str);
            }
            if (str.length === 1) {
                str = '0' + str;
            }
            return str;
        }
    }
}
</script>

<style lang="scss">
.input-num__wrap{
    display: inline-block;
    .input-number{
        width: 100px;
    }
    .input-number__decrease, .input-number__increase{
        width: 30px;
    }
}
</style>
