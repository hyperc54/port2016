var TEST=0;

function corde(x_pin,y_pin,canvas_i){


    this.data = {
        fps: +30,
        intervalId: null,
        gravity: +9.81,
        pixelsPerMeter: +200,
	items: [],
	nbItems: +30,
	length: +250,
	relaxationIterations: +40
    };


    this.context = {
        canvas: null,
        drawingContext: null,
        size: { w: +0, h: +0 },
        center: { x: +0, y: +0 },
        mouse: { x: +0, y: +0 },
        isGrabbing: false
    };


    this.debug = function(){
       alert("ok!");
    };





    this.go = function(){
        this.context.canvas = canvas_i;
        this.context.drawingContext = this.context.canvas.getContext("2d");
        this.context.size.w = this.context.canvas.width;
        this.context.size.h = this.context.canvas.height;
        this.context.center.x = this.context.size.w * +0.5;
        this.context.center.y = this.context.size.h * +0.5;
	
	var ro=this;
        this.context.canvas.onmousemove = function (e) {
            if (e.offsetX) {
                ro.context.mouse.x = e.offsetX;
                ro.context.mouse.y = e.offsetY;
            } else if (e.layerX) {
                ro.context.mouse.x = e.layerX;
                ro.context.mouse.y = e.layerY;
            }
        };

	
        this.context.canvas.onmousedown = function (e) {
            ro.context.isGrabbing = true;
        };

        this.context.canvas.onmouseup = function (e) {
            ro.context.isGrabbing = false;
        };

        this.context.canvas.onmouseout = function (e) {
            ro.context.isGrabbing = false;
        };



	this.data.items = [];
	for (var i = 0; i < ro.data.nbItems; i++) {
		var x = i * ro.data.length / ro.data.nbItems;
		ro.data.items[i] = {
		    x: x,
		    y: +0,
		    old_x: x,
		    old_y: +0,
		    isPinned: false
		};


   	}

	this.data.items[0].isPinned=true;
	
	this.data.intervalId = setInterval(this.step, +1000 / this.data.fps);
	
    }; //FIN GO


    this.step = function(){
	this.apply_physic();
	this.draw;
    };


    this.apply_physic = function(){
	var ro=this;
		    var itemLength = ro.data.length / ro.data.nbItems;
		    var ellapsedTime = +1 / ro.data.fps;

		    if (ro.context.isGrabbing) {
			ro.data.items[ro.data.length-1].x = ro.context.mouse.x - ro.context.center.x;
			ro.data.items[ro.data.length-1].y = ro.context.mouse.y - ro.context.center.y;
		    }


    };

    this.draw = function(){
	for (var i in this.data.items){
		
	}
    };




}



function init() {
	canvas1=document.getElementById("canvas");
	test2= new corde(1,1,canvas1);
	test2.go();
	test2.debug();
    }

init();
