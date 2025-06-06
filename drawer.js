
function drawer(t, iterations, angle, length, lfactor ,axiom,rule){
	
	//generate the new string : 
	let stack = []
	let fin = generate(axiom, iterations , rule);
	for(let i = 0; i<fin.length;i++){
		switch(fin[i]){
			case 'F':
				t.penDown(); 
				t.fwd(length);
				break;
			case 'G':
				t.penUp();
				t.fwd(length);
				break;
			case '+':
				t.turn(angle);
				break;
			case '-':
				t.turn(-angle);
				break;
			case '[':
				stack.push([t.x, t.y, t.angle]);
				break;
			case ']':
				let pos = stack.pop();
				t.penUp();
				t.setpos(pos[0], pos[1]);
				t.angle = pos[2];
				t.penDown();
				break;
			case '>':
				length *= lfactor;
				break;
			case '<':
				length /= lfactor;
				break;

		}
	}
}

function generate(axiom ,iterations, rule){
	for(let i = 0; i < iterations; i++){
		axiom = axiom.split('').map(char => rule.get(char) || char).join('');
	}
	return axiom;
}

export { drawer, generate };
