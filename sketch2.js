import { Turtle } from './turtle.js';
import { drawer, generate } from './drawer.js';


const lmao = document.getElementById("heading");
var style = window.getComputedStyle(lmao);
let previter;

//Arrow functions don't assign their own 'this', they inherit it from the parent scope.
// tbh the sketch doesn't need the 'this', but i've already rewritten it twice like this, so whatever.

const sketch = (p) => {
	p.setup = function() {
		const titheight = lmao.offsetHeight + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
		const rulewidth =  document.getElementById('Rules').offsetWidth;//also includes the padding 
		let canvas = p.createCanvas((p.windowWidth - rulewidth),(p.windowHeight - titheight - 5));//windowWidth and windowHeight are pfjs , full viewport size 
		//debug 
		console.log("Canvas Width:", p.windowWidth - rulewidth);
		console.log("Canvas Height:", p.windowHeight - titheight);
		//
		canvas.parent('draw-area');
		p.background(255);
		p.angleMode(p.DEGREES); 	

		previter = parseInt(document.getElementById('iter').value);


		document.getElementById('start').value = `${p.width / 2},${p.height / 2}`;//set the default start position to the center of the canvas
		p.t = new Turtle(p);//using this later in sendit so gotta make it a property of the sketch instanc
	};

	p.windowResized = function() {
		const titheight = lmao.offsetHeight + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
		const rulewidth =  document.getElementById('Rules').offsetWidth;//also includes the padding 
		p.resizeCanvas(p.windowWidth - rulewidth, p.windowHeight - titheight);

		//turtle needs to be repositioned after resize as well
		document.getElementById('start').value = `${p.width / 2},${p.height / 2}`;
		p.t.penUp();
		p.t.setpos(parseFloat(start[0]), parseFloat(start[1]));
		p.t.penDown();
		console.log("Canvas resized to:", p.width, "x", p.height);


	};

	p.sendit = function() {// not inbuilt, calling this from an html button. 
			       //mapping it out to the sketch instance to call it outside of the scope.
		//obtain inputs.
		p.clear();
		p.background(255);

		const axiom = document.getElementById('axiom').value.trim();
		const angle = parseFloat(document.getElementById('angle').value);
		const length = parseFloat(document.getElementById('len').value);
		const iter = parseInt(document.getElementById('iter').value);
		const lfactor = parseFloat(document.getElementById('lsf').value);
		
		const start = (document.getElementById('start').value.trim()).split(",");
		const rules = document.getElementById('rules').value.trim().split('\n');//mistyped rules as Rules, got to know that divs are undefined.

		//user errors. 
		if (rules.length < 1 || rules[0] === "") {
			alert("Please enter at least one rule in the format: A=B");
			return;
		}
		if (start.length < 2) {
			alert("Please enter a valid starting position in the format: x,y");
			return;
		}

		// get the turtle setup
		p.t.penUp();
		p.t.setpos(parseFloat(start[0]), parseFloat(start[1]));
		p.t.penDown();
		p.t.turnTo(270);
		// generate the ruleset
		const rule = new Map(
			rules.map(entry =>{
				const [key, value] = entry.split('=');
				return [key.trim(), value.trim()];
			})
		);
		
		//debug
		console.log("Rule Map:", rule);
		console.log("Axiom:", axiom);
		console.log("Angle:", angle);
		console.log("Length:", length); 	
		console.log("Iterations:", iter);
		console.log("Length Factor:", lfactor);
		console.log("Start Position:", start);
		console.log("Rules:", rules);

	
		//move the turtle
		drawer(p.t,iter, angle, length, lfactor, axiom ,rule);
		
		//debug
		console.log(generate(axiom, iter, rule));
	}
}

let sketchinstance;

window.addEventListener('load', () => {//DOMcontentloaded not working 
	sketchinstance = new p5(sketch);
	console.log("Sketch instance created:");
});

document.getElementById('regen').addEventListener('click', () => {
	if (sketchinstance) {//undefined is a false value
		sketchinstance.sendit();
		console.log("Regenerated sketch with new parameters.");
	}
});

document.getElementById('saver').addEventListener('click', () => {
	if (sketchinstance) {
		let fname = prompt("Enter a filename (without extension):", "l-system-sketch");
		sketchinstance.saveCanvas(fname, 'png');
		console.log("Save as "+ fname + ".png");
	}
});

document.getElementById('iter').addEventListener('change', () => {
	if(sketchinstance) {
		const iter = parseInt(document.getElementById('iter').value);
		if (iter < 0) {
			alert("Iterations cannot be negative.");
			document.getElementById('iter').value = previter;
			return;
		}
		if (iter > previter) {
		document.getElementById('len').value --;
		}

		previter = iter;
	}


});
