/*
This is the class file for Car.
*/

class Car{
    constructor(x, y, width, height, controlType, maxSpeed = 3){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.maxspeed = maxSpeed;
        this.acc = 0.2;
        this.friction = 0.05;

        this.angle = 0;

        // For collision detection.
        this.damaged = false;

        // Using the Controls class from controls.js
        this.controls = new Controls(controlType);

        // Instantiate sensors only for main car and not traffic.
        if(controlType == "KEYS"){
            this.sensor = new Sensor(this);
        }
        else{
            this.sensor = null;
        }

        this.polygon = null;  // for non-main cars.
    }

    // Update method.
    update(roadBorders, traffic){
        // Moving and checking for collisions.
        if(!this.damaged){
            this.#move();
            this.polygon = this.#createPolygon();
            this.damaged = this.#checkDamage(roadBorders, traffic);
        }

        // Update sensor to detect road borders and traffic.
        if(this.sensor){
            this.sensor.update(roadBorders, traffic);
        }
    }

    // Helper function to check for collision of main car.
    #checkDamage(roadBorders, traffic){
        // Collision with road borders.
        for(let i = 0; i < roadBorders.length; i++){
            // Using util function, used to check intersection of two polygons.
            if(polyIntersect(this.polygon, roadBorders[i])){
                return(true);
            }
        }

        // Collision with traffic.
        for(let i = 0; i < traffic.length; i++){
            // Using util function, used to check intersection of two polygons.
            if(polyIntersect(this.polygon, traffic[i].polygon)){
                return(true);
            }
        }
        return(false);
    }

    // Helper method for collisions.
    #createPolygon(){
        const points = [];  // array of corners of car.

        // Radius is taken as half of diagonal of rectangle in this case.
        const radius = Math.hypot(this.width, this.height)/2;
        
        // alpha = arctan(width/height);
        const alpha = Math.atan(this.width/this.height);
        // top-left
        points.push({
            x: this.x - Math.sin(this.angle - alpha)*radius, 
            y: this.y - Math.cos(this.angle - alpha)*radius
        });
        // top-right
        points.push({
            x: this.x - Math.sin(this.angle + alpha)*radius, 
            y: this.y - Math.cos(this.angle + alpha)*radius
        });
        // bottom-left
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle - alpha)*radius, 
            y: this.y - Math.cos(Math.PI + this.angle - alpha)*radius
        });
        // bottom-right
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle + alpha)*radius, 
            y: this.y - Math.cos(Math.PI + this.angle + alpha)*radius
        });
        return(points);
    }

    // Move method, using keyboard input.
    #move(){
        if(this.controls.forward){
            this.speed += this.acc;
        }
        if(this.controls.reverse){
            this.speed -= this.acc;
        }

        // Forward.
        if(this.speed > this.maxspeed){
            this.speed = this.maxspeed;
        }

        // Reverse.
        if(this.speed < -this.maxspeed){
            this.speed = -this.maxspeed;
        }

        // Friction.
        if(this.speed > 0){
            this.speed -= this.friction;
        }
        if(this.speed < 0){
            this.speed += this.friction;
        }

        // Rounding off speed.
        if(Math.abs(this.speed) < this.friction){
            this.speed = 0;
        }

        // Rotate only when car is moving.
        if(this.speed != 0){
            const flip = this.speed > 0 ? 1 : -1;  // Managing rotation while moving forward or backward.
            if(this.controls.left){
                this.angle += 0.03*flip;
            }
            if(this.controls.right){
                this.angle -= 0.03*flip;
            }
        }

        // Change car position.
        this.x -= Math.sin(this.angle)*this.speed;
        this.y -= Math.cos(this.angle)*this.speed;
    }

    // Draw method, to draw onto canvas.
    draw(ctx, color){
        if(this.damaged){
            ctx.fillStyle = "gray";
        }
        else{
            ctx.fillStyle = color;
        }

        // Draw car using polygon.
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for(let i = 1; i < this.polygon.length; i++){
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y)
        }
        ctx.fill();

        if(this.sensor){
            this.sensor.draw(ctx);
        }
    }
}