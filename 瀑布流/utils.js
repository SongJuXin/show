var utils = (function() {
	var flag='getComputedStyle' in window
	return{
		win: function(attr, value) {
			if(value == undefined) {
				return document.documentElement[attr] || document.body[attr]
			}
			document.documentElement[attr] = document.body[attr] = value
		},
		offset: function(curEle) {
			var l = curEle.offsetLeft
			var t = curEle.offsetTop
			var par = curEle.offsetParent
			while(par) {
				if(navigator.userAgent.indexOf('MSIE 8.0') == -1) {
					l += par.clientLeft
					t += par.clientTop
				}
				l += par.offsetLeft
				t += par.offsetTop
				par = par.offsetParent
			}
			return {
				left: l,
				top: t
			}
		},
		//生成n-m的一个随机整数
		rnd: function(n, m) {
			if(isNaN(n) || isNaN(m)) {
				return Math.random() //这是传错了，返回一个友好的（0,1）
			}
			if(n > m) {
				var tmp = n
				n = m
				m = tmp
			}
			return Math.round(Math.random() * (m - n) + n)
		},
		//类数组转数组
		toArry: function(list) {
			var arr = []
			if(window.call) {
				arr = Array.prototype.slice.call(list)
			} else {
				for(var i = 0; i < list.length; i++) {
					arr.push(list[i])
				}
			}
			return arr
		},
		//通过className获取元素
		getByClass: function(strClass, curEle) {
			curEle = curEle || document
			if(document.getElementsByClassName) {
				return [].slice.call(curEle.getElementsByClassName(strClass))
			} else {
				arrClass = strClass.replace(/^( +)( +)$/g, '').split(/\s+/g)
				var nodeList = curEle.getElementsByTagName('*')
				var arr = []
				for(var i = 0; i < nodeList.length; i++) {
					var cur = nodeList[i]
					var bOk = true
					for(var j = 0; j < arrClass.length; j++) {
						var reg = new RegExp('\\b' + arrClass[j] + '\\b')
						if(!reg.test(cur.className)) {
							bOk = false
						}
					}
					if(bOk) arr.push(cur)
				}
				return arr
			}
		},
		//判断元素是否包含某个className，返回布尔
		hasClass: function(curEle, cName) {
			var reg = new RegExp('\\ ' + cName + '\\ ')
			return reg.test(curEle.className)
		},
		//添加给元素classNmae
		addClass: function(curEle, strClass) {
			var arrClass = strClass.replace(/^ +| +$/g, '').split(/ +/g)
			for(var i = 0; i < arrClass.length; i++) {
				if(curEle.className.indexOf(arrClass[i]) == -1) {
					curEle.className += ' ' + arrClass[i]
				}
			}
		},

		//删除某个className
		removeClass: function(curEle, strClass) {
			var arrClass = strClass.replace(/^( +)|( +)/g, '').split(/ +/g)
			for(var i = 0; i < arrClass.length; i++) {
				var reg = new RegExp('\\b' + arrClass[i] + '\\b')
				if(reg.test(curEle.className)) {
					//先将arrClass[i]删掉，再将开头或结尾的空格删掉，再将中间可能的重复空格变成一个空格
					curEle.className = curEle.className.replace(reg, '').replace(/^ +| +$/g, '').replace(/ +/g, ' ')
				}
			}

		},
		//获得样式
		getCss:function(curEle,attr){
			var val
			
			if(flag){
				
				val=getComputedStyle(curEle)[attr]
			}
			else{
				if(attr=='opacity'){
					return curEle.currentStyle.filter.replace(/\D/g,'')/100
				}
				val=curEle.currentStyle[attr];
			}
			reg=/^[+-]?\d+(\.\d+)?(px|pt|rem|rm)$/gi
			return reg.test(val)?parseFloat(val):val
		}
	}
})()