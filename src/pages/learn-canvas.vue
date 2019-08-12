<template>
    <div>
        <canvas id="canvas"></canvas>
        <el-form inline>
            <el-form-item>
                <el-button @click="drawTriangle">三角形</el-button>
                <el-button @click="drawRect">矩形</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="drawArc">圆弧</el-button>
                <el-form-item label="开始弧度">
                    <el-input v-model.number="startDeg"></el-input>
                </el-form-item>
                <el-form-item label="结束弧度">
                    <el-input v-model.number="endDeg"></el-input>
                </el-form-item>
                <el-form-item label="逆时针">
                    <el-switch
                        v-model="isAntiClockWise"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
            </el-form-item>
            <el-form-item>
                <el-button @click="drawQuadraticCurve">二次贝塞尔</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="drawBezierCurve">三次贝塞尔</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="drawRoundedRect">圆角矩形</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
let ctx = null;
let canvas = null;

export default {
    data() {
        return {
            ctx: null,
            startDeg: 0,
            endDeg: 90,
            isAntiClockWise: false
        }
    },
    mounted() {
        this.initCanvas()
    },
    methods: {
        initCanvas() {
            canvas = document.getElementById('canvas');
            if (canvas.getContext) {
                ctx = canvas.getContext('2d');
                this.drawTriangle();
            }
        },
        resetDrawer() {
            ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
        },
        drawTriangle() {
            this.resetDrawer();
            ctx.beginPath();
            ctx.moveTo(100, 0);
            ctx.lineTo(200, 100);
            ctx.lineTo(0, 100);
            ctx.closePath();
            ctx.stroke();
        },
        drawRect() {
            this.resetDrawer();
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.strokeStyle = "#333";
            ctx.lineTo(100, 0);
            ctx.strokeStyle = "#444";
            ctx.lineTo(100, 100);
            ctx.strokeStyle = "#555";
            ctx.lineTo(0, 100);
            ctx.strokeStyle = "#666";
            ctx.closePath();
            ctx.stroke();
        },
        drawArc() {
            this.resetDrawer();
            ctx.beginPath();
            ctx.arc(50, 50, 50, this.deg2Radian(this.startDeg), this.deg2Radian(this.endDeg), this.isAntiClockWise)
            ctx.stroke();
        },
        drawQuadraticCurve() {
            this.resetDrawer();
            ctx.beginPath();
            ctx.moveTo(75,25);
            ctx.quadraticCurveTo(25,25,25,62.5);
            ctx.quadraticCurveTo(25,100,50,100);
            ctx.quadraticCurveTo(50,120,30,125);
            ctx.quadraticCurveTo(60,120,65,100);
            ctx.quadraticCurveTo(125,100,125,62.5);
            ctx.quadraticCurveTo(125,25,75,25);
            ctx.stroke();
        },
        drawBezierCurve() {
            this.resetDrawer();
            ctx.beginPath();
            ctx.moveTo(75,40);
            ctx.bezierCurveTo(75,37,70,25,50,25);
            ctx.bezierCurveTo(20,25,20,62.5,20,62.5);
            ctx.bezierCurveTo(20,80,40,102,75,120);
            ctx.bezierCurveTo(110,102,130,80,130,62.5);
            ctx.bezierCurveTo(130,62.5,130,25,100,25);
            ctx.bezierCurveTo(85,25,75,37,75,40);
            ctx.fill();
        },
        drawRoundedRect() {
            this.resetDrawer();
            this.roundedRect(0, 0, 100, 100, 10);
        },
        deg2Radian(deg) {
            return Math.PI / 180 * deg
        },
        roundedRect(x, y, width, height, radius){
            ctx.beginPath();
            ctx.moveTo(x, y + radius);
            // 画y轴正向
            ctx.lineTo(x, y + height - radius);
            // 画圆角
            ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
            // 画x轴正向
            ctx.lineTo(x + width - radius, y + height);
            // 画圆角
            ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
            // 画y轴负向
            ctx.lineTo(x + width, y + radius);
            // 画圆角
            ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
            // 画x轴负向
            ctx.lineTo(x + radius, y);
            // 画圆角
            ctx.quadraticCurveTo(x, y, x, y + radius);
            ctx.stroke();
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
