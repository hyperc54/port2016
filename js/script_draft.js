// Création corde

//Valeurs à modifier pe
var presets = {
        k: 0.2, //elasticity
        g: 2 //gravity
    };
	
	
var path=new Path();
path.strokeColor = 'white';
path.strokeWidth = 10;
path.strokeCap= 'round';

var start=new Point(500,10);
var fin=new Point(450,175);

var longueur =100;

var flag_mouse=0;


path.add(start);
path.add(fin);

initialize();



function onFrame() {
//start fixe, fin y est lié par un elastique
   trans_old_x=fin.x;
   trans_old_y=fin.y;
   
	
   
   distance=math.sqrt(math.pow((fin.x-start.x),2)+math.pow((fin.y-start.y),2)); //longueur de la corde

   
   
   old_x=trans_old_x;
   old_y=trans_old_y;
	
	path.segments[1].point=fin;
    }

function onMouseUp(event) {
	flag_mouse=0;
}
	
function onMouseDown(event) {
	flag_mouse=1;
}

function onMouseMove(event) {
	if(flag_mouse==1){
					start.x=event.point.x;
					start.y=event.point.y;
					path.segments[0].point=start;
					}
}
	

function initialize() {
   old_x=fin.x;
   old_y=fin.y;
   trans_old_x=fin.x;
   trans_old_y=fin.y;
   delta=0.01;
    }