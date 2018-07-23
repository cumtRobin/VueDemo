<template>
    <section>
        <el-button @click="openImgDialog">打开摄像头和图片上传组件</el-button>

        <el-dialog title="上传图片" :visible.sync="imgDialogVisible" :close-on-click-modal="false" custom-class="camera-dialog" width="960px" @close="closeUserCamera">
			<div class="camera-dialog-container">
				<div class="camera-container">
					<div class="camera-wrap">
						<div class="camera-title">现场拍照</div>
						<div class="camera-body">
							<video class="camera-video" id="video" ref="video" autoplay webkit-playsinline playsinline></video>
							<canvas class="photo-canvas" :width="canvasWidth" :height="canvasHeight" ref="photoCanvas"></canvas>
							<div class="photograph-icon" @click="photograph"></div>
						</div>
					</div>
					<div class="camera-wrap img-list-wrap">
						<div class="camera-title">本地图片</div>
						<div class="camera-body my_scroll">
							<el-upload class="my-el-upload"
								:action="uploadUrl"
								list-type="picture-card"
								multiple
								accept="image/*"
								:limit="maxNum"
								:on-remove="handleRemove"
								:on-change="progress"
								:on-exceed="exceedMax"
                                :auto-upload="false"
								:show-file-list="true">
								<i class="el-icon-plus"></i>
							</el-upload>
							<el-checkbox class="img-checkbox" :style="calcPosition(index)" v-for="(item, index) in localImgList" :key="index" v-model="item.checked" v-if="item" @change="checkboxChange(index)"></el-checkbox>
						</div>
					</div>
				</div>
				<div class="split-hz-line"></div>
				<div class="selected-container">
					<div class="selected-title">已选择（{{selectedList.length}}/5）</div>
					<div class="selected-list">
						<div class="selected-img" v-for="(item,index) in 5" :key="index">
							<img :src="selectedList[index].Base64String" class="wait-upload-img" v-if="selectedList[index]">
							<div class="delete-img-icon" v-if="selectedList[index]" @click="deleteSelected(index)"></div>
						</div>
					</div>
				</div>
				<div class="button-container">
					<div class="btn confirm" @click="uploadToBackEnd">上传</div>
					<div class="btn cancel" @click="imgDialogVisible = false">取消</div>
				</div>
			</div>
		</el-dialog>
    </section>
</template>

<script>
import * as _ from 'underscore'
export default {
    data(){
        return {
			imgDialogVisible: false,//显示上传图片dialog
			selectedList: [],//选中待上传图片
			localImgList: [],//本地图片列表
			uploadUrl: '/',
			maxNum: 10,
			canvasWidth: 450,
            canvasHeight: 250,
            videoTrack: null
        }
    },
    methods: {
        // 打开图片上传dialog
		openImgDialog() {
			this.imgDialogVisible = true;
			this.$nextTick(() => {
				this.canvasWidth = $('video').width()
				this.canvasHeight = $('video').height()
				this.showUserCamera()
			})
		},
		photograph() {
			var context = this.$refs.photoCanvas.getContext("2d");
			context.drawImage(this.$refs.video, 0, 0, 450, 250);
			var newImg = {
				SourceImageType: "image/png",
				Base64String: this.$refs.photoCanvas.toDataURL("image/png"),
				uid: this.$refs.photoCanvas.toDataURL("image/png")
			};
			if (this.selectedList.length < 5) {
				this.selectedList.push(newImg);
			} else {
				this.$message({
					message: '最多选择5张照片!',
					type: 'warning'
				})
			}
		},
		handleRemove(file, fileList) {
			var findLocal = _.find(this.localImgList, item => {
				return item.uid === file.uid
			});
			let index = _.indexOf(this.localImgList, findLocal);
			if (index !== -1) {
				this.localImgList.splice(index, 1)
			}

			var findSelect = _.find(this.selectedList, item => {
				return item.uid === file.uid
			});
			let indexSelect = _.indexOf(this.selectedList, findSelect);
			if (indexSelect !== -1) {
				this.selectedList.splice(indexSelect, 1)
			}
		},
		exceedMax(files, fileList) {
			this.$message({
				message: '最多选择' + this.maxNum + '张本地图片!',
				type: 'warning'
			})
		},
		progress(file, fileList) {
			var index = _.indexOf(fileList, file)
			let type = file.raw.type
			this.convertImgToBase64(file, type, index, (dataURL, imgIndex, uid) => {
				let obj = {
					Base64String: dataURL,
					SourceImageType: type,
					checked: false,
					uid: uid
				};
				this.$set(this.localImgList, imgIndex, obj)
			});
		},
		convertImgToBase64(file, outputFormat, index, callback){
			var canvas = document.createElement('canvas'),
				ctx = canvas.getContext('2d'),
				img = new Image()
			img.crossOrigin = 'Anonymous'
			img.onload = function(){
				canvas.height = img.height
				canvas.width = img.width
				ctx.drawImage(img,0,0)
				var dataURL = canvas.toDataURL(outputFormat || 'image/png')
				callback(dataURL, index, file.uid)
				canvas = null
			};
			img.src = file.url
		},
		calcPosition(index) {
			let imgWidth = 123;
			let imgHeight = 69;
			let imgMarginBottom = 11;
			let imgMarginRight = 19;
			let distance = 4;
			let checkBoxWidth = 18;
			let row = Math.ceil((index + 1) / 3);
			let col = (index + 1) - (row - 1) * 3;
			return {
				top: distance + (imgHeight + imgMarginBottom) * (row - 1) + 'px',
				left: 0 - checkBoxWidth - distance + (imgWidth + imgMarginRight) * col + 'px',
				marginLeft: '0'
			}
		},
		checkboxChange(index) {
			if (this.localImgList[index].checked) {
				if (this.selectedList.length >= 5) {
					this.localImgList[index].checked = false;
					this.$message({
						message: '最多选择5张照片!',
						type: 'warning'
					})
				} else {
					this.selectedList.push({
						Base64String:this.localImgList[index].Base64String,
						SourceImageType:this.localImgList[index].SourceImageType,
						uid: this.localImgList[index].uid
					});
				}
			} else {
				var findSelected = _.find(this.selectedList, item => {
					return item.Base64String === this.localImgList[index].Base64String
				});
				var selectIndex = _.indexOf(this.selectedList, findSelected)
				if (selectIndex !== -1) {
					this.selectedList.splice(selectIndex, 1)
				}
			}
		},
		deleteSelected(index) {
			let uid = this.selectedList[index].uid;
			let findLocal = _.find(this.localImgList, item => {
				return item.uid === uid
			});
			let localIndex = _.indexOf(this.localImgList, findLocal)
			if (localIndex !== -1) {
				this.localImgList[localIndex].checked = false
			}
			this.selectedList.splice(index, 1)
		},
		uploadToBackEnd() {
			if (this.selectedList.length > 0) {
				var list = _.map(this.selectedList, item => {
					return {
						Base64String :item.Base64String.replace('data:'+item.SourceImageType+';base64,', ''),
						SourceImageType : item.SourceImageType.replace("image/","")
					}
				});
				this.$http.post("/File/UploadBase64", {base64StringArray: list}, success => {
					this.imgDialogVisible = false;
					this.$message({
						message: success.description,
						type: success.status?'success':"warning"
					})
				});
			} else {
				this.$message({
					message: '请选择要上传的照片！',
					type: 'warning'
				})
			}
		},
		showUserCamera() {
            if (navigator.mediaDevices) {
                var constraints = window.constraints = {
                    audio: false,
                    video: true
                };
                navigator.mediaDevices.getUserMedia(constraints).then(stream => {
                    this.videoTrack = stream.getVideoTracks()[0];
                    this.$refs.video.srcObject = stream;
                }).catch(function(error) {
                    let message = ''
                    if (error.name === 'ConstraintNotSatisfiedError') {
                        message = 'The resolution ' + constraints.video.width.exact + 'x' +
                            constraints.video.width.exact + ' px is not supported by your device.'
                    } else if (error.name === 'PermissionDeniedError') {
                        message = 'Permissions have not been granted to use your camera and ' +
                        'microphone, you need to allow the page access to your devices in ' +
                        'order for the demo to work.'
                    }
                    this.$message({message: message, type: 'error'})
                });
            } else if (navigator.getUserMedia) {
				navigator.getUserMedia({ video: true }, (stream) => {
					this.videoTrack = stream.getTracks()[0]
					this.$refs.video.src = URL.createObjectURL(stream)
					this.$refs.video.play();
				}, (err) => {
					this.$message({message: '您拒绝了打开摄像头或无摄像头可用', type: 'error'})
					console("发生了以下错误: " + err.name);  
				});  
			} else {
				this.$message({message: '您的浏览器不支持调用摄像头', type: 'error'})
			}
        },
        closeUserCamera() {
            if (this.videoTrack) {
				this.videoTrack.stop()
				this.videoTrack = null
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

