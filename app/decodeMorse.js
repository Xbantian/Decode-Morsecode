'use strict';

import  wordList from './words.txt';
var wordArray=wordList.split('\n');
// console.log(typeof xx);
// console.log(wordArray);
// import wordArray from wordPath;
// console.log(wordPath);

// let wordArray=[];

// var xhr = new XMLHttpRequest();
// xhr.open('GET', '../node_modules/word-list'+wordPath,false);
// xhr.send();
// xhr.onreadystatechange=function() {
    
//     if (xhr.readyState == 4 && xhr.status == 200) {
//         if (xhr.response.indexOf("stopSend") != -1) {
//         	 wordArray=xhr.responseText.split('\n');
//         	 console.log(wordArray);
//         }
//     }
// }


// console.log(s);


// var wordArray = require(wordPath);

var reader = new FileReader();

var EC = function(data) {
	//EC:EscapeCharacter
	return data.replace(/\./g, '\\\.');
}

//试图过滤部分不正常的结果
var wordFilter = function(data) {
	// data = data.filter(function(item, index) {
	// 	var pa = new RegExp('(\.)(\\1){2,}');
	// 	if (index == 1) {
	// 		//console.log(pa)
	// 	}
	// 	if (!pa.test(item)) {
	// 		return true;
	// 	} else {
	// 		console.log(item);
	// 	}
	// }); //过滤掉有三个+重复字母的

	// return data;
	return data.filter(function (item,inde) {
		if (wordArray.indexOf(item)!==-1) {
			return true;
		}else{
			console.log(item);
		}
	})

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
var calDecode = function(data, data1) {
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

			calDecode(pData, preRes);
		}
		if (!pData) { //完美结束
			res.push(preRes + codeList[i].letter);
			//return true;
		}
	}
}
var res=[];
function Decode(data) {
	res=[];
	calDecode(data);
	return wordFilter(res);
}



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

var outputObj={
	wordFilter:wordFilter,
	changeChart:changeChart,
	Decode:Decode
}

 export default outputObj;