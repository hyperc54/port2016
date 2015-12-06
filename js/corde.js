function corde(x_pin,y_pin,canvas_i){

    var ro=this;

    this.data = {
        fps: +30,
        intervalId: null,
        gravity: +9.81,
        pixelsPerMeter: +200,
	items: [],
	points: [],
	path:null,
	nbItems: +10,
	length: +200,
	relaxationIterations: +40,
	panneau:null
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
	    ro.data.items[ro.data.items.length-1].isPinned=true;
        };

        this.context.canvas.onmouseup = function (e) {
            ro.context.isGrabbing = false;
	    ro.data.items[ro.data.items.length-1].isPinned=false;
        };

        this.context.canvas.onmouseout = function (e) {
            ro.context.isGrabbing = false;
	    ro.data.items[ro.data.items.length-1].isPinned=false;
        };



	this.data.items = [];

	for (var i = 0; i < ro.data.nbItems; i++) {
		var x = x_pin + (i * ro.data.length / ro.data.nbItems);
		ro.data.items[i] = {
		    x: x,
		    y: y_pin,
		    old_x: x,
		    old_y: +0,
		    isPinned: false
		    isConst:false
		};
	}

	ro.data.path = new paper.Path({
				strokeColor: '#ffffff',
				strokeWidth: 10,
				strokeCap: 'round'
			});

	//paper
	for (var i = 0; i < ro.data.nbItems; i++) {
		ro.data.points[i]= new paper.Point(ro.data.items[i].x,ro.data.items[i].y);
		ro.data.path.add(ro.data.points[i]);
   	}

	


	

	this.data.items[0].isPinned=true;
	
	this.data.intervalId = setInterval(this.step, +1000 / this.data.fps);
	
    }; //FIN GO


    this.step = function(){
	ro.apply_physic();
	ro.draw();
    };


    this.apply_physic = function(){

	var itemLength = ro.data.length / ro.data.nbItems;
	var ellapsedTime = +1 / ro.data.fps;

		    if (ro.context.isGrabbing) {
			ro.data.items[ro.data.items.length-1].x = ro.context.mouse.x;
			ro.data.items[ro.data.items.length-1].y = ro.context.mouse.y;
		    }

	
	//1st integration
	    for (var index in ro.data.items) {
		var item = ro.data.items[index];

		var old_x = item.x;
		var old_y = item.y;


		if (!item.isPinned) {
		    item.x = 2 * item.x - item.old_x; // No acceleration here
		    item.y = 2 * item.y - item.old_y + ro.data.gravity * ellapsedTime * ellapsedTime * ro.data.pixelsPerMeter;
		}

		item.old_x = old_x;
		item.old_y = old_y;
	    }

	//relaxation- Left to right puis right to left
	    for (var iterations = 0; iterations < ro.data.relaxationIterations; iterations++) {

		for (var index in ro.data.items) {
		    var item = ro.data.items[index];

		    if (!item.isPinned) {
		        if (index > +0) {
		            var previous = ro.data.items[+index - 1];
		            ApplyUnitaryDistanceRelaxation(item, previous, itemLength);
		        }
		    }
		}

		for (var index in ro.data.items) {
		    var item = ro.data.items[ro.data.nbItems - 1 - index];

		    if (!item.isPinned) {
		        if (index > 0) {
		            var next = ro.data.items[ro.data.nbItems - index];
		            ApplyUnitaryDistanceRelaxation(item, next, itemLength);
		        }
		    }
		}
	    }

    };

    this.draw = function(){
	for (var i = 0; i < ro.data.nbItems; i++) {
		ro.data.path.segments[i].point.x=ro.data.items[i].x;
		ro.data.path.segments[i].point.y=ro.data.items[i].y;
   	}

	ro.data.path.smooth();
	paper.view.draw();
    };




}


function ApplyUnitaryDistanceRelaxation(item, from, targettedLength) {
            var dx = item.x - from.x;
            var dy = item.y - from.y;
            var dstFrom = Math.sqrt(dx * dx + dy * dy);

            if (dstFrom > targettedLength && dstFrom != 0) {
                item.x -= (dstFrom - targettedLength) * (dx / dstFrom) * 0.5;
                item.y -= (dstFrom - targettedLength) * (dy / dstFrom) * 0.5;
            }
	}



function init() {
	canvas1=document.getElementById("canvas");
	cordedroite= new corde(500,5,canvas1);
	cordegauche= new corde(100,5,canvas1);
	cordedroite.go();
	cordegauche.go();

	cordegauche.debug();
    }




init();
