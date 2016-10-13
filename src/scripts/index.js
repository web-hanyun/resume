//js的入口文件
//引入zepto, _custom文件有tap功能,可在官网上查看
var $ = require('./components/zepto-modules/_custom');
		require('./components/zepto-modules/ajax');
		module.exports = $;
	//引入iscroll
var Iscroll = require('./components/iscroll/build/iscroll.js');

//设置iscroll对象默认为hide
$('#mainContent').hide();
$('.swiper-container').hide();

$('#enter').tap(function(){
	
	$('#mainContent').show();
	$('.swiper-container').hide();
	
	//需要进行post请求,然后请求/api/skill,需要把数据列表显示在iscroll里
	$.post('/api/skill', {}, function(response){
 		var html = "";
 		for(var i=0;i<response.length;i++){
 			html += "<li>" + response[i].name + "</li>";
 		}
 		$("#scroller ul").html(html);
	
//调用iscroll
var myScroll = new Iscroll('#wrapper', {
		scrollbars: true,
		mouseWheel: true,
		interactiveScrollbars: true,
		shrinkScrollbars: 'scale',
		fadeScrollbars: true
	});


document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);})

});


//引用swiper
//他自身有module可查看
var Swiper = require('./components/swiper/swiper.min.js');
//swiper.animate需要加module.exports
var SwiperAnimate = require('./components/swiper/swiper.animate1.0.2.min.js');

var mySwiper = new Swiper ('.swiper-container', {
	effect:'flip',
  onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
    SwiperAnimate.swiperAnimateCache(swiper); //隐藏动画元素 
    SwiperAnimate.swiperAnimate(swiper); //初始化完成开始动画
  }, 
  onSlideChangeEnd: function(swiper){ 
    SwiperAnimate.swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
  } 
  })

$('#footer div').tap(function(){
	
	var apiTarget = $(this).attr('id');
	$.post('/api/'+apiTarget, {}, function(response){
   		var html = "";
   		for(var i=0;i<response.length;i++){
   			html += "<li>" + response[i].category + "</li>";
   		}
   		$("#scroller ul").html(html);
	})   
});   

var interval = setInterval(function(){
	if(document.readyState === 'complete'){
		clearInterval(interval);
		$('#preload').hide();
		$('.swiper-container').show();
		//swiper容器大小尺寸重置
		mySwiper.updateContainerSize();
		mySwiper.updateSlidesSize();
		console.log(1);
	}else{
		$('#preload').show();
	}
},100);



