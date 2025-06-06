
export class Turtle{
	constructor(p) {
		this.p = p; // p5
		this.x = p.width / 2; 
		this.y = p.height / 2;
		this.angle = 270; // ANGLE IS IN DEGREES DO NOT FORGET THAT
		this.pendown = true; // true by default 
	}

	fwd(distance){
		let prevx = this.x;
		let prevy = this.y;
//		let rad = radians(this.angle);
		this.x += distance * Math.cos(this.angle*Math.PI/180);
		this.y += distance * Math.sin(this.angle*Math.PI/180); 

		//actually drawing the line, from the old position to the new updated one 
		if(this.pendown){
			this.p.line(prevx, prevy, this.x, this.y);
		}
	}

	back(distance){
		this.fwd(-distance);

	}

	turn(angle){
		this.angle += angle;
	}//by default turns in anti clockwise direction. Remember that. 

	turnTo(angle){
		this.angle = angle;
	}

	penUp(){
		this.pendown = false;
	}

	penDown(){
		this.pendown = true;
	}

	setpos(xl,yl){
		let prevx = this.x;
		let prevy = this.y;

		this.x = xl;
		this.y = yl;

		if(this.pendown){//WILL DRAW IF PENDOWN IS TRUE. manually set to false for teleporting. 
			this.p.line(prevx, prevy, this.x, this.y);
		}
	}

	clear(){
		setpos(width/2, height/2); 
		this.angle = 0; 
		this.p.background(255); 
	}
}


