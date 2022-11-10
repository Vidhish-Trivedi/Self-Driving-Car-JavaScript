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
const car = new Car(road.getLaneCenter(3), 100, 30, 50);

animate();


// animate function.
function animate(){
    canvas.height = window.innerHeight;

    car.update();

    ctx.save();  // For effect of camera above car.
    ctx.translate(0, canvas.height*0.6 - car.y);  // For effect of camera above car.

    road.draw(ctx);
    car.draw(ctx);
    
    ctx.restore();  // For effect of camera above car.

    requestAnimationFrame(animate);
}

