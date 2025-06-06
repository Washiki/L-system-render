# A no-nonsense Lindenmayer System diagram renderer

A Quick and Dirty 2-D Lindenmayer system renderer for visualizing L-systems. 
Works in any browser. 

(Work in progress)

## Usage 
***Section assumes you have a basic understanding of [L-systems](https://en.wikipedia.org/wiki/L-system ) .***

**Rules**: 
  - Each rule should be in the format `A=B`, where `A` is the symbol to be replaced and `B` is the string to replace it with.
  - Multiple rules can be separated by newlines. 
  
  ##### Example:
  ```
  F=F+F-F-F+F
  X=X+YF+
  ```
  >These are two separate rules : F will be replaced by F+F-F-F+F, and X will be replaced by X+YF+.
### Keywords:
  - `F`: Move forward and draw a line.
  - `G` : Move forward without drawing a line.
  - `X`, `Y`: Non-drawing symbols, used for branching.
  - `+`: Turn right by the specified angle.
  - `-`: Turn left by the specified angle.
  - `>`: Increase the length of the line segment by the specified scale factor.
  - `<`: Decrease the length of the line segment by the specified scale factor.
  - `[` and `]`: Save and restore the current state (position and angle) of the turtle.

> **[** : the open square bracket takes the current turtle coordinates and angles, and pushes them onto a stack. 
> **]** : Close square bracket then pops the most recently stored turtle coordinate and angle, and returns the turtle to that state,
> 
> This essentially allows you to "save" the state of the turtle and return back to it later. 

These particular symbols are the Turtle Commands. Write the rules using these symbols to actually have the output of the L string rendered on the canvas.  Any other symbols will be non drawing symbols. 

- **Rules**: The rewriting rules for the system.
- **Axiom**: The starting string of the L-system.
- **Iterations**: The number of times to apply the rule to the axiom.
- **Angle**: The angle to turn when encountering a `+` or `-` in the string.
- **Length**: The length of each line segment drawn.
- **Length Scale Factor**: The factor by which length is scaled when encountering a `>` or `<` in the string.

## Resources and getting started:

L systems are pretty cool, but coming across good resources and examples on it hasn't (personally) been a very easy task.
Here are some compiled resources that are very helpful. 

1. [Professor Paul Bourke's Website ](https://paulbourke.net/fractals/lsys/) ( *University of Western Australia* ) has a good collection of L systems, both well known and some that he has found. Also has great work on fractals. 

**Note:**  *This particular article was written in 1991 for an L system renderer that (to the best of my knowledge) is not available anymore. Scroll past the software specific  stuff  to get to the patterns.*


2. [Dr. P. Prusinkiewicz et Jim Hanan](https://algorithmicbotany.org/papers/lsfp.pdf) ( *Biological Modelling and Visualization research group, Dept. of Computer Science, University of Calgary*) have worked on a very thorough book, which walks through L systems and Fractals as found in nature.  This is much more academic in its writing, but is a great resource for anyone who wishes to dig deeper. 



