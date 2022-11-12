/*
This is the class file for Sensor.
*/

class Sensor{
    constructor(car){
        this.car = car;
        this.rayCount = 5;
        this.rayRange = 150;
        this.raySpread = Math.PI/2;  // Total angular range.
        
        this.rays = [];

        // For detecting obstacle distance.
        this.readings = [];  // Readings for each ray.
    }

    // Private method to update rays.
    #castRays(){
        this.rays = [];
        
        // Create and add rays to this sensor.
        for(let i = 0; i < this.rayCount; i++){
            // Using utils.lerp for linear interpolation.
            // Adding this.car.angle to rotate the rays with the car.
            const rayAngle = lerp(this.raySpread/2, -this.raySpread/2, this.rayCount == 1 ? 0.5 : i/(this.rayCount - 1)) + this.car.angle;

            const start = {x:this.car.x, y:this.car.y};
            const end = {x:this.car.x - Math.sin(rayAngle)*this.rayRange, y:this.car.y - Math.cos(rayAngle)*this.rayRange};
            
            this.rays.push([start, end]);
        }
    }

    // Private method for detecting obstacle distance.
    #getReading(ray, roadBorders, traffic){
        let touches = [];

        for(let i = 0; i < roadBorders.length; i++){
            // Using util function to get multiple/all intersections between two line segments.
            // check intersection of a given ray with all borders.
            const touch = getIntersection(ray[0], ray[1], roadBorders[i][0], roadBorders[i][1]);

            if(touch){
                touches.push(touch);
            }
        }

        for(let i = 0; i < traffic.length; i++){
            const temp_poly = traffic[i].polygon;
            for(let j = 0; j < temp_poly.length; j++){
                const val = getIntersection(ray[0], ray[1], temp_poly[j], temp_poly[(j + 1)%temp_poly.length]);

                if(val){
                    touches.push(val);
                }
            }
        }

        if(touches.length == 0){
            return(null);
        }

        else{
            // Get all obstacle distances.
            const obstacleDists = touches.map(e => e.obstacleDist)
            // Find minimum obstacle distance. (First intersection).
            const minObstDist = Math.min(...obstacleDists);
            // Find and return the touch corresponding to minimum obstacle distance.
            return(touches.find(e => e.obstacleDist = minObstDist));
        }
    }

    // Road borders and traffic need to be passed here.
    update(roadBorders, traffic){
        this.#castRays();
        this.readings = [];

        // For detecting distance to road borders or traffic cars.
        // Update for all rays.
        for(let i = 0; i < this.rays.length; i++){
            this.readings.push(this.#getReading(this.rays[i], roadBorders, traffic));
        }
    }

    draw(ctx){
        for(let i = 0; i < this.rayCount; i++){

            // Check upto what distance a ray needs to be drawn.
            let end = this.rays[i][1];
            if(this.readings[i]){
                end = this.readings[i];
            }

            // Yellow part.
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "Yellow";
            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();

            // Black part.
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";
            ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        }
    }
}