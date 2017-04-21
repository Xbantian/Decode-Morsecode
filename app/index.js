'use strict';
import  DM from './decodeMorse';

//.--......-.. ..... -..... ......-.-.- ..-..
var DecodeMorse = function(event) {
	var model=event&&event.currentTarget.id==="decodeMorse"?0:1;

	var processedTextCon = document.getElementById("processedText");
	var wordCount = document.getElementById("wordCount");
	var sourceText = document.getElementById("sourceText").value;

	processedTextCon.value='';
	document.getElementById("wordCount").innerHTML=0;
	sourceText = sourceText.trim();

	var res1 = DM.changeChart(sourceText);
	if (!res1) {
		processedTextCon.value="请确保只输入了两种字符";
		return;
	}
	var c1 = res1.chart1;
	var c2 = res1.chart2;
	res1 = res1.sourceText;

	var res=DM.Decode(res1);

	if (model == 1) { //过滤部分字符
		res = DM.wordFilter(res);
	}

	wordCount.innerHTML=res.length;
	processedTextCon.value=res.join('\n');
}

window.onload=function () {
	console.log('(╯°Д°)╯︵ ┻━┻ ');
	//绑定回车键
	document.addEventListener('keydown',function (event) {
		if (event.keyCode ==13) {
			DecodeMorse();
		}
	});
	//按钮绑定事件
	document.getElementById("decodeMorse").addEventListener('click',DecodeMorse,false);
	document.getElementById("decodeMorse1").addEventListener('click',DecodeMorse,false);

};

