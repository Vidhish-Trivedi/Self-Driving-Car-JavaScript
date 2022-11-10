/*
This is the class file for Road.
*/

class Road{
    constructor(x, width, laneCount = 3){
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = x - width/2;
        this.right = x + width/2;

        // May need to change later.
        const infin = 1000000;

        this.top = -infin;
        this.bottom = infin;

        // road borders.
        const topL = {x:this.left, y:this.top};
        const bottomL = {x:this.left, y:this.bottom};
        const topR = {x:this.right, y:this.top};
        const bottomR = {x:this.right, y:this.bottom};
        
        this.borders = [[topL, bottomL], [topR, bottomR]];
    }

    // Method to get center of lane where car should be positioned.
    getLaneCenter(idx){
        // lane width.
        const l_width = this.width/this.laneCount;

        // Taking into account that the car should not be positioned outside the road area.
        return(this.left + (2*Math.min(idx, this.laneCount - 1) + 1)*l_width/2);
    }

    draw(ctx){
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        // Drawing intermediate road markers.
        for(let i = 1; i <= this.laneCount - 1; i++){
            const x1 = lerp(this.left, this.right, i/this.laneCount);
        
            ctx.setLineDash([20, 20]); // 20 px filled, then 20 px gap.
            ctx.beginPath();
            ctx.moveTo(x1, this.top);
            ctx.lineTo(x1, this.bottom);
            ctx.stroke();
        }

        // Drawing road borders.
        ctx.setLineDash([]);
        this.borders.forEach(b => {
            ctx.beginPath();
            ctx.moveTo(b[0].x, b[0].y);
            ctx.lineTo(b[1].x, b[1].y);
            ctx.stroke();
        });
    }
}
