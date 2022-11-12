/*
main.js
*/

const canvas = document.getElementById("Canvas1");
canvas.width = 200;

// Context for canvas.
const ctx = canvas.getContext("2d");

// Instantiate a Road object.
const road = new Road(canvas.width/2, canvas.width*0.9);

// Instantiate a Car object.
// const car = new Car(100, 100, 30, 50);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "KEYS");

// Add traffic to road.
const traffic = [new Car(road.getLaneCenter(1), -100, 30, 50, "TRAFFIC", 2)];

animate();

// animate function.
function animate(){
    
    // Collision detection for traffic cars.
    for(let i = 0; i < traffic.length; i++){
        traffic[i].update(road.borders, []);  // Pass empty array instead of traffic for now. // May need to update later for traffic cars interacting with other traffic cars, ==> TRAFFIC - SELF
    }

    canvas.height = window.innerHeight;

    car.update(road.borders, traffic);

    ctx.save();  // For effect of camera above car.
    ctx.translate(0, canvas.height*0.6 - car.y);  // For effect of camera above car.

    // Drawing traffic cars.
    road.draw(ctx);
    for(let i = 0; i < traffic.length; i++){
        traffic[i].draw(ctx, "red");
    }

    // Drawing main car.
    car.draw(ctx, "green");
    
    ctx.restore();  // For effect of camera above car.

    requestAnimationFrame(animate);
}

