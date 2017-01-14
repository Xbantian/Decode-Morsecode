var EC = function(data) {
	//EC:EscapeCharacter
	return data.replace(/\./g, '\\\.');
}
//结果数组
var res = [];

//按钮绑定事件
var DecodeMorse = function(model) {
	$("#processedText").val('');
	$("#wordCount").html(0);

	res = [];
	var sourceText = $("#sourceText").val();
	sourceText = sourceText.trim();

	var res1 = changeChart(sourceText);
	if (!res1) {
		$("#processedText").val("请确保只输入了两种字符");
		return;
	}
	var c1 = res1.chart1;
	var c2 = res1.chart2;
	res1 = res1.sourceText;

	Decode(res1);

	if (model == 1) { //过滤部分字符
		res = wordFilter(res);
	}


	$("#wordCount").html(res.length);
	$("#processedText").val(res.join('\n'));
}

//试图过滤部分不正常的结果
var wordFilter = function(data) {
	data = data.filter(function(item, index) {
		var pa = new RegExp('(\.)(\\1){2,}');
		if (index == 1) {
			//console.log(pa)
		}
		if (!pa.test(item)) {
			return true;
		} else {
			console.log(item);
		}
	}); //过滤掉有三个+重复字母的

	return data;


	//  var url='https://www.baidu.com'
	// //var url='http://fanyi.youdao.com/translate'

	// var ajax = {
	// 	url: url,
	// 	data: 'delData',
	// 	type: 'Post',
	// 	dataType: 'json',
	// 	cache: false,
	// 	success: function (result) {
	// 		console.log(result);
	// 	}
	// };
	// $.ajax(ajax);
}

//对输入字符进行处理
var changeChart = function(data) {
	var d1 = data.trim();
	d1 = d1.replace(/\n|\s/g, '');

	var d2 = [];
	for (var i = 0; i < d1.length; i++) {
		d2.push(d1[i]);
	}
	var c1 = d2[0];
	var c2 = '';
	for (var i = 0; i < d2.length; i++) {
		if (d2[i] != c1) {
			c2 = d2[i];
			break;
		}
	}

	var sc1 = '.';
	var sc2 = '-'

	var isFalse = false;
	d2.forEach(function(item, index, array) {
		if (item == c1) {
			array[index] = sc1;
		} else if (item == c2) {
			array[index] = sc2;
		} else {
			isFalse = true;
		}
	});

	if (isFalse) {
		return false;
	}
	d2 = d2.join('');

	return {
		sourceText: d2,
		chart1: c1,
		chart2: c2
	};
	console.log(d2);
	// var t=new RegExp();
}

//递归算法
var Decode = function(data, data1) {
	//var remain=data
	if (data1 == undefined) {
		data1 = '';
	}
	for (var i = 0; i < codeList.length; i++) {

		var remain = data;
		var preRes = data1;

		var testCode = '^' + EC(codeList[i].mCode); //尝试码
		testCode = new RegExp(testCode);
		var pData = remain.replace(testCode, '');

		if (pData && pData != remain) { //如果存在且未结束
			preRes += codeList[i].letter;

			Decode(pData, preRes);
		}
		if (!pData) { //完美结束
			res.push(preRes + codeList[i].letter);
			//return true;
		}
	}
}

//绑定回车键
$(function() {
	$(document).keydown(function(event) {
		if (event.keyCode == 13) {
			DecodeMorse();
		}
	});
});

//摩斯码枚举
var codeList=[
		{letter:'a',mCode:'.-'},
		{letter:'b',mCode:'-...'},
		{letter:'c',mCode:'-.-.'},
		{letter:'d',mCode:'-..'},
		{letter:'e',mCode:'.'},
		{letter:'f',mCode:'..-.'},
		{letter:'g',mCode:'--.'},
		{letter:'h',mCode:'....'},
		{letter:'i',mCode:'..'},
		{letter:'j',mCode:'.---'},
		{letter:'k',mCode:'-.-'},
		{letter:'l',mCode:'.-..'},
		{letter:'m',mCode:'--'},
		{letter:'n',mCode:'-.'},
		{letter:'o',mCode:'---'},
		{letter:'p',mCode:'.--.'},
		{letter:'q',mCode:'--.-'},
		{letter:'r',mCode:'.-.'},
		{letter:'s',mCode:'...'},
		{letter:'t',mCode:'-'},
		{letter:'u',mCode:'..-'},
		{letter:'v',mCode:'...-'},
		{letter:'w',mCode:'.--'},
		{letter:'x',mCode:'-..-'},
		{letter:'y',mCode:'-.--'},
		{letter:'z',mCode:'--..'},
	];