/*
File for util functions.
*/

// Function for linear interpolation, to draw lanes onto the road, draw rays for sensor, etc.
function lerp(a, b, t){
    return(a + (b - a)*t);
}

// Function to get all intersections between two line segments.
// line1 --> point A to point B, line 2 --> point C to point D.
// DETERMINANT METHOD.
function getIntersection(A, B, C, D){ 
    const tTop = (D.x - C.x)*(A.y - C.y) - (D.y - C.y)*(A.x - C.x);
    const uTop = (C.y - A.y)*(A.x - B.x) - (C.x - A.x)*(A.y - B.y);
    const bottom = (D.y - C.y)*(B.x - A.x) - (D.x - C.x)*(B.y - A.y);
    
    if(bottom != 0){
        const t = tTop/bottom;
        const u = uTop/bottom;
        if(t >= 0 && t <= 1 && u >= 0 && u <= 1){
            return{x: lerp(A.x, B.x, t), y: lerp(A.y, B.y, t), obstacleDist: t};
        }
    }
    // Else, lines have same slope, i.e. they are parallel.
    return(null);
}

// Function to check intersection of two polygons.
function polyIntersect(p1, p2){
    // We will check intersection of each edge of p1 with each edge of p2.
    for(let i = 0; i < p1.length; i++){
        for(let j = 0; j < p2.length; j++){
            const touch = getIntersection(p1[i], p1[(i + 1)%p1.length], p2[j], p2[(j + 1)%p2.length]);
            if(touch){
                return(true);
            }
        }
    }
    return(false);
}
