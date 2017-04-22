/* 柱图组件对象 */
var H5ComponentPolyline = function(name,cfg){
	var component = new H5ComponentBase(name,cfg);
	//component.text('text');
	//绘制网格线
	var w=cfg.width;
	var h=cfg.height;

	//加入一个画布（网格线背景）
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	//水平网格线100份->10份
	var step = 10;
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#AAAAAA';
	window.ctx = ctx;
	for(var i=0;i<=step+1;i++){
		var y=(h/step)*i;
		ctx.moveTo(0,y);
		ctx.lineTo(w,y);
	}
	//垂直网格线
	step = cfg.data.length+1;
	var text_w = w/step>>0;
	for(var i=0;i<=step;i++){
		var x=(w/step)*i;
		ctx.moveTo(x,0);
		ctx.lineTo(x,h);
		if(cfg.data[i]){
			var text = $('<div class="text">');
			text.text(cfg.data[i][0]);
			text.css('width',text_w).css('left',x/2);
			component.append(text);
		}
	}
	ctx.stroke();
	component.append(cns);
	//加入画布-数据层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);
	/**
	 * 绘制折线以及对应的数据和阴影
	 * @param {float} per 0到1之间的数据,会根据这个值绘制对应的中间状态
	 * @return {} [description]
	 */
	var draw = function(per){
		ctx.clearRect(0,0,w,h);
		//绘制折线数据
		//
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeStyle = '#ff8879';
		var x=0;
		var y=0;
		var row_w = (w/(cfg.data.length+1));
		// ctx.moveTo(10,10);
		// ctx.arc(10,10,5,0,2*Math.PI);  //x,y坐标，半径，起始弧度，结束弧度
		// step = cfg.data.length+1;
		//绘制点
		for(i in cfg.data){
			var item = cfg.data[i];
			x = row_w*i+row_w;
			y = h-item[1]*h*per;
			
			ctx.moveTo(x,y);
			ctx.arc(x,y,5,0,2*Math.PI);
		}
		//写数据
		ctx.moveTo(row_w,h-cfg.data[0][1]*h*per);

		for(i in cfg.data){
			var item = cfg.data[i];
			x = row_w*i+row_w;
			y = h-item[1]*h*per;
			ctx.lineTo(x,y);
		}

		//绘制阴影
		ctx.stroke();

		ctx.lineWidth = 1;
		ctx.strokeStyle = 'rgba(255,118,118,0.2)';
		ctx.lineTo(x,h);
		ctx.lineTo(row_w,h);
		ctx.fillStyle='rgba(255,118,118,0.2)';
		ctx.fill();

		for(i in cfg.data){
			var item = cfg.data[i];
			x = row_w*i+row_w;
			y = h-item[1]*h*per;
			ctx.moveTo(x,y);
			
			ctx.fillStyle = item[2] ? item[2]:'#595959';
				
			
			ctx.fillText(item[1]*100 +'%',x-10,y-10);


		}
		ctx.stroke();
	};
	
	component.on('onLoad',function(){
		//折线图生长动画
		var s=0;
		for(i=0;i<100;i++){
			setTimeout(function(){
				s+=0.01;
				draw(s);
			},i*10+500);
		}
	});
	component.on('onLeave',function(){
		//折线图生长动画
		var s=1;
		for(i=0;i<100;i++){
			setTimeout(function(){
				s-=0.01;
				draw(s);
			},i*10);
		}
	});
	return component;
};