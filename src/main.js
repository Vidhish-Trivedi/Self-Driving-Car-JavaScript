/*
main.js
*/

// For car.
const canvas1 = document.getElementById("Canvas1");
canvas1.width = 200;

const ctx1 = canvas1.getContext("2d");

// For network.
const canvas2 = document.getElementById("Canvas2");
canvas2.width = 300;

const ctx2 = canvas2.getContext("2d");


// Instantiate a Road object.
const road = new Road(canvas1.width/2, canvas1.width*0.9);

// Instantiate a Car object.
// const car = new Car(100, 100, 30, 50);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "NN");

// Add traffic to road.
const traffic = [new Car(road.getLaneCenter(1), -100, 30, 50, "TRAFFIC", 2)];

animate();

// animate function.
function animate(){
    
    // Collision detection for traffic cars.
    for(let i = 0; i < traffic.length; i++){
        traffic[i].update(road.borders, []);  // Pass empty array instead of traffic for now. // May need to update later for traffic cars interacting with other traffic cars, ==> TRAFFIC - SELF
    }

    canvas1.height = window.innerHeight;
    canvas2.height = window.innerHeight;

    car.update(road.borders, traffic);

    ctx1.save();  // For effect of camera above car.
    ctx1.translate(0, canvas1.height*0.6 - car.y);  // For effect of camera above car.

    // Drawing traffic cars.
    road.draw(ctx1);
    for(let i = 0; i < traffic.length; i++){
        traffic[i].draw(ctx1, "red");
    }

    // Drawing main car.
    car.draw(ctx1, "green");
    
    ctx1.restore();  // For effect of camera above car.

    requestAnimationFrame(animate);
}

