function Signature(canvasObj) {
    this._canvas = canvasObj
    this._context = this._canvas.getContext('2d')
    this.status = 'up'
    this.speed = 1
    this.preTime = null
    this.preOffsetX = 0
    this.preOffsetY = 0
    this.enable = true
    this.signed = false
    this.initEvents()
}

function mousedownHandler() {
    if (!this.enable) {
        return
    }
    this.status = 'down'
    // 开始签名
    this._context.beginPath()
    // moveTo指定线的起点
    this._context.moveTo(event.offsetX, event.offsetY)
}

function mousemoveHandler() {
    if (!this.enable) {
        return
    }
    if (this.status == 'down' || this.status == 'moving') {
        this.status = 'moving'
        if (!this.preTime) {
            // 记录最近一次的时间
            this.preTime = new Date().getTime()
        } else {
            // 根据距离和时间计算速度
            this.speed = (Math.sqrt(Math.pow(this.preOffsetX - event.offsetX, 2) + Math.pow(this.preOffsetY - event.offsetY, 2))) / (new Date().getTime() - this.preTime)
            // 记录最近一次的时间
            this.preTime = new Date().getTime()
        }
        // 速度越快则笔画越细
        this._context.lineWidth = 3 / this.speed > 4 ? 4 : 3 / this.speed
        // moveTo指定线的终点
        this._context.lineTo(event.offsetX, event.offsetY)
        // stroke是真正的绘制线的方法
        this._context.stroke()
        // 开始新的一笔
        this._context.beginPath()
        this._context.moveTo(event.offsetX, event.offsetY)
        // 记录最近一次移动的坐标
        this.preOffsetX = event.offsetX
        this.preOffsetY = event.offsetY
        this.signed = true
    }
}

function mouseupHandler() {
    if (!this.enable) {
        return
    }
    if (this.status == 'down' || this.status == 'moving') {
        this.status = 'up'
        // 鼠标松开，绘制最后一笔
        this._context.stroke()
    }
}

function mouseleaveHandler() {
    if (!this.enable) {
        return
    }
    if (this.status == 'down' || this.status == 'moving') {
        this.status = 'out'
        // 鼠标离开，绘制最后一笔
        this._context.stroke()
    }
}

Signature.prototype.initEvents = function() {
    this._canvas.addEventListener('mousedown', mousedownHandler.bind(this))
    this._canvas.addEventListener('mousemove', mousemoveHandler.bind(this))
    this._canvas.addEventListener('mouseup', mouseupHandler.bind(this))
    this._canvas.addEventListener('mouseleave', mouseleaveHandler.bind(this))
}

Signature.prototype.removeEvents = function() {
    this._canvas.removeEventListener('mousedown', mousedownHandler.bind(this))
    this._canvas.removeEventListener('mousemove', mousemoveHandler.bind(this))
    this._canvas.removeEventListener('mouseup', mouseupHandler.bind(this))
    this._canvas.removeEventListener('mouseleave', mouseleaveHandler.bind(this))
}

Signature.prototype.getBase64String = function() {
    return this._canvas.toDataURL()
}

Signature.prototype.reset = function() {
    this._canvas.width = this._canvas.width
}

Signature.prototype.destory = function() {
    this.removeEvents()
    this._context = null
    this._canvas = null
}

Signature.prototype.getSigned = function() {
    return this.signed
}

Signature.prototype.setSigned = function(value) {
    this.signed = value
}

export {
    Signature
}