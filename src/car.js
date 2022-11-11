/*
This is the class file for Car.
*/

class Car{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.maxspeed = 3;
        this.acc = 0.2;
        this.friction = 0.05;

        this.angle = 0;

        // Using the Controls class from controls.js
        this.controls = new Controls();

        // Instantiate sensors.
        this.sensor = new Sensor(this);
    }

    // Update method.
    update(roadBorders){
        this.#move();
        this.sensor.update(roadBorders);
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
    draw(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);

        // Draw the car.
        ctx.beginPath();
        ctx.rect(-this.width/2, -this.height/2, this.width, this.height);
        ctx.fill();

        ctx.restore();

        this.sensor.draw(ctx);
    }
}