class Cell {

    constructor(x, y, w, i, j){
		
		var aliveColor = "green";
		var deadColor = "hsl(0, 0%, 60%)";
		this.color = deadColor;

		this.alive = false;
		this.nextAlive = false;

		this.x = x;
		this.y = y;
		this.w = w;
		this.i = i;
		this.j = j;
		
		this.kill = function(){			
			this.alive = false;
			this.color = deadColor;						
		};
		
		this.revive = function(){			
			this.alive = true;
			this.color = aliveColor;				
		};
		
		this.toggleState = function(){			
			if (this.alive)
				this.kill();
			else
				this.revive();			
		};

		this.nextGen = function(){
			if (this.nextAlive)
				this.revive();
			else 
				this.kill();
			this.nextAlive = false;
		};
		
		this.checkCollisionWithMouse = function(mouseX, mouseY){			
			return ( (mouseX >= this.x && mouseX <= this.x + this.w) && (mouseY >= this.y && mouseY <= this.y + this.w) )			
		};
		
		this.draw = function (){
			c.fillStyle = this.color;			
			c.fillRect(this.x, this.y, this.w, this.w);
		};

    }

}