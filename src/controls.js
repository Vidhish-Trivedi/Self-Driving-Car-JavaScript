/*
This is the class file for Controls.
*/

class Controls{
    constructor(type){
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;
        
        // Main car, to be controlled by user.
        if(type == "KEYS"){
            this.#addKeyboardListners();
        }
        // Traffic cars simply move forward.
        else if(type == "TRAFFIC"){
            this.forward = true;
        }
    }

    // Private Method.
    #addKeyboardListners(){
        document.onkeydown = (event) => {
            switch(event.key){
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
            }
            // console.table(this);
        }
        document.onkeyup = (event) => {
            switch(event.key){
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowDown":
                    this.reverse = false;
                    break;
            }
            // console.table(this);
        }
    }


}