module.exports ={
	wheelSurf(canvasId,options){
		function Truntable(ctx,options){
			var _default = {
						outerCircle: {
							color: '#df1e15'
						},
						innerCircle: {
							color: '#f4ad26'
						},
						dots: ["#FBF0B0", "#FFFFFF"],
						disk: ['#ffb933', '#ffe8b5', '#ffb933', '#ffd57c', '#ffb933', '#ffe8b5', '#ffd57c'],
						title: {
							color: '#5c1e08',
							font: '10px Arial'
						}
			}
			_default = Object.assign(_default, options);
			
			var width = _default.width;
			var height = _default.height;
			var imgs = [];
			var awardTitle = [];
			var awardPic = [];
			var first=true;
			for (var item in _default.list) {
			        awardTitle.push(_default.list[item].title)
			        imgs.push(_default.list[item].image)
			}
			var num = imgs.length;
			        // 圆心
			var x = width / 2;
			var y = height / 2;
						
			Truntable.prototype.init = function(angelTo) { 
				
				ctx.translate(x, y);
                angelTo = angelTo || 0;
                ctx.clearRect(0,0, width, height);

                // 平分角度
                var angel = (2 * Math.PI / 360) * (360 / num);
                var startAngel = 2 * Math.PI / 360 * (-90);
                var endAngel = 2 * Math.PI / 360 * (-90) + angel;

                // 旋转画布
                ctx.save();
				
                ctx.rotate(angelTo * Math.PI / 180);
                ctx.shadowOffsetX=0;
            	ctx.shadowOffsetY=0;
            	ctx.shadowBlur=10;
            	ctx.shadowColor="rgba(80,0,0,0.5)";
                // 画外圆
                ctx.beginPath();
                ctx.lineWidth = 30;
					
                ctx.strokeStyle = _default.outerCircle.color;
                ctx.arc(0, 0, x-20, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.shadowOffsetX=0;
            	ctx.shadowOffsetY=0;
            	ctx.shadowBlur=0;
            	ctx.shadowColor="rgba(0,0,0,0.9)";
				 
				
                // 画里圆
                ctx.beginPath();
                ctx.lineWidth = 15;
                ctx.strokeStyle = _default.innerCircle.color;
                ctx.arc(0, 0, x-30-7.5, 0, 2 * Math.PI);
                ctx.stroke();

                // 装饰点
                var dotColor = _default.dots;
                for (var i = 0; i < 24; i++) {
                    // 装饰点 圆心 坐标计算
                    ctx.beginPath();
                    var radius = x-18;
                    var xr = radius * Math.cos(startAngel);
                    var yr = radius * Math.sin(startAngel);

                    ctx.fillStyle = dotColor[i % dotColor.length];
                    ctx.arc(xr, yr, 4, 0, 2 * Math.PI);
                    ctx.fill();

                    startAngel += (2 * Math.PI / 360) * (360 / 24);

                }
                // 画里转盘                
                var colors = _default.disk
                for (var i = 0; i < num; i++) {
                    ctx.beginPath();
                    ctx.lineWidth = x-45;
                    ctx.strokeStyle = colors[i % colors.length]
                    ctx.arc(0, 0, x/2-15, startAngel, endAngel)
                    ctx.stroke();
                    startAngel = endAngel
                    endAngel += angel
                }
				startAngel = angel / 2;
				for (var i = 0; i < num; i++) {
				    var text=awardTitle[i];
				     var line_height = _default.title.lineHeight;
				    ctx.save();
				    ctx.rotate(startAngel);
					
				    ctx.font = _default.title.font;
				    ctx.fillStyle = _default.title.color;
				    ctx.textAlign = "center";
				    var ry=-(x/2)-25;
				    if(text.indexOf("\n")>0){//换行
					  var texts = text.split("\n");
					  for(var j = 0; j<texts.length; j++){  
						   ctx.fillText(texts[j], 0, ry+j * line_height);  
					  }
				    }else if(text.indexOf("\n") == -1 && text.length>6){//奖品名称长度超过一定范围 
					  text = text.substring(0,6)+"||"+text.substring(6);
					  var texts = text.split("||");
					  for(var j = 0; j<texts.length; j++){
						   ctx.fillText(texts[j], 0, ry+j * line_height);  
					  }
				    }else{ 
					  ctx.fillText(text, 0, ry); 
					}
				    startAngel += angel;
				    ctx.restore();
				}
				startAngel = angel / 2;
				for (var i = 0; i < num; i++) {
				    ctx.save();
				    ctx.rotate(startAngel);
					ctx.drawImage(imgs[i], -17, -90,32,32);
				    startAngel += angel;
				    ctx.restore();
				}
				if(first){
					first=false;
					setTimeout(function(){
						ctx.draw();
					},100)
				}else{
					ctx.draw();
				}
				
            };    
			
			
			
			Truntable.prototype.lottery = function (angel, callback) { 
                angel = angel || 0;
                angel = 360-angel;
                angel += 1440;
                // 基值（减速）
                var baseStep = 50;
                // 起始滚动速度
                var baseSpeed =1;
                // 步长
                var count = 1;
                var _this = this;
                var timer = setInterval(function () {
                    _this.init(count);
                    if (count == angel) {
                        clearInterval(timer);
                        if (typeof callback == "function") {
                            callback();
                        }
                    }
                    count = count + baseStep * (((angel - count) / angel) > baseSpeed ? baseSpeed : ((angel - count) / angel))+0.1;
                    if (angel - count < 0.5) {
                        count = angel;
                    }
                }, 25);
            };
			
			
			
		}
		 var ctx=uni.createCanvasContext(canvasId,options.$this)
		 var Truntable = new Truntable(ctx,options);
		 Truntable.init();
		 return Truntable;
	}
}