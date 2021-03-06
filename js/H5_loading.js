var h5_loading = function(images,firstPage){
	var id = this.id;
	if(this._images === undefined){
		
		window[id] = this;
		this._images = (images || []).length;
		this._loaded = 0;
		for(var s in images){
			var item = images[s];
			var img = new Image;
			img.onload = function(){
				window[id].loader();
			};
			img.src = item;
		}
		$('#rate').text('0%');
		
		return this;
	}else{
		this._loaded++;
		$('#rate').text(((this._loaded/this._images)*100>>0) + '%');
		
		if(this._loaded < this._images){
			
			return this;
		}
		
	}
	window[id] = null;
	this.el.fullpage({
			onLeave:function( index, nextIndex, direction){
               	$(this).find('.h5_component').trigger('onLeave');
               	
            },
            afterLoad:function( anchorLink, index, direction){
                $(this).find('.h5_component').trigger('onLoad');
            },
		});
		this.page[0].find('.h5_component').trigger('onLoad');
		this.el.show();
		//立刻切换到某页
		if(firstPage){
			$.fn.fullpage.moveTo(firstPage);
		}
	
};