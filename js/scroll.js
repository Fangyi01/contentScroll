function fun(option) {
	//基础属性
	this.wrap = ""
	this.dom = null;
	this.subDom = null;
	//设置定时器
	this.interval = null;

	this.scrollX = 0;
	//参数
	this.options = {
		dom: ".gridBox",
		subDom: ".grid",
		speed: 1,
	}
	//回调事件
	this.events = {}
	// 合并参数
	this.program = Object.assign({}, this.options, this.events, option)
	this.dom = $(this.program.dom)
	this.init()
}

fun.prototype.init = function () {
	var _this = this
	_this.initDom()
}
//初始化dom节点
fun.prototype.initDom = function () {
	var _this = this
	$(_this.program.subDom).clone().appendTo(_this.program.dom);
	$(_this.program.dom).wrapInner("<div class='scrollBox'>")
	$(_this.program.subDom).eq(1).css({
		position: 'absolute',
		left: '1000px',
		right: '0px',
	});
}
fun.prototype.runActive = function () {
	let _this = this
	_this.activeRequest()
}
fun.prototype.activeTranslate = function () {
	let _this = this;
	let width = this.dom.width()
	_this.interval = setInterval(function () {
		if (_this.scrollX <= width) {
			$(_this.program.dom).find('.scrollBox').css({'transform': 'translateX(-' + _this.scrollX + 'px)'})
		}
		_this.scrollX += _this.program.speed
		if (_this.scrollX > width) {
			$(_this.program.dom).find('.scrollBox').css({'transform': 'translateX(' + 0 + 'px)'})
			_this.scrollX = 0
		}
	}, 20)
},
fun.prototype.activeAnimate = function () {
	let _this = this;
	let width = this.dom.width()
	_this.interval = setInterval(function () {
		$(_this.program.dom).find('.scrollBox').animate({left: "-" + width + "px"}, 10000, 'linear', function () {
			$(_this.program.dom).find('.scrollBox').css({left: "0px"})
		})
	}, 10)
}
fun.prototype.activeRequest = function () {
	let _this = this;
	let width = $(_this.dom).width()
	if (_this.scrollX <= width) {
		$(_this.program.dom).find('.scrollBox').css({'transform': 'translateX(-' + _this.scrollX + 'px)'})
	}
	_this.scrollX += _this.program.speed
	if (_this.scrollX > width) {
		$(_this.program.dom).find('.scrollBox').css({'transform': 'translateX(' + 0 + 'px)'})
		_this.scrollX = 0
	}
	_this.interval = requestAnimationFrame(_this.activeRequest.bind(this));
}
fun.prototype.stopActive = function () {
	cancelAnimationFrame(this.interval)
}//鼠标移上时，清除定时器，停止滚动


