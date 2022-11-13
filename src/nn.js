/*
This is the class file for implementing a very basic neural network.

NOTE: The words neuron and node are used interchangeably.
*/

class NeuralNetwork{
    // neuronCounts is an array storing the number of nodes in each layer.
    constructor(neuronCounts){
        this.levels = []
        for(let i = 0; i < neuronCounts.length - 1; i++){
            this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
        }
    }

    static feedForward(givenInputs, network){
        // Output of 1st layer.
        let outputs = Level.feedForward(givenInputs, network.levels[0]);

        // Looping through all layers to get output.
        for(let i = 1; i < network.levels.length; i++){
            outputs = Level.feedForward(outputs, network.levels[i]);
        }

        return(outputs);
    }

}


// Class for a Level of a neural network.
class Level{
    // input neurons and output neurons.
    constructor(inputCount, outputCount){
        this.inputs = new Array(inputCount);  // From car sensors.
        this.outputs = new Array(outputCount);

        this.biases = new Array(outputCount);  // Each output neuron has a bias, a value above which it will fire.
        this.weights = [];

        for(let i = 0; i < inputCount; i++){
            this.weights[i] = new Array(outputCount);  // Each input node is connected to each output node, the edges have weights associated with them.
        }

        Level.#randomBW(this);
    }

    // Static method to randomize "brain" level. (FOR NOW).
    static #randomBW(level){
        // Assign random weights.
        for(let i = 0; i < level.inputs.length; i++){
            for(let j = 0; j < level.outputs.length; j++){
                level.weights[i][j] = 2*Math.random() - 1;  // Random weight for edge connecting i-th input to j-th output; weight lies in (-1, 1);

            }
        }

        // Assign random biases.
        for(let i = 0; i < level.biases.length; i++){
            level.biases[i] = 2*Math.random() - 1;  // Random bias for the i-th output; weight lies in (-1, 1);
        }
    }

    // Static method to turn a layer of output nodes on/off.
    static feedForward(givenInputs, level){
        // Initialise inputs to level.
        for(let i = 0; i < level.inputs.length; i++){
            level.inputs[i] = givenInputs[i];
        }

        // Evaluate output for each output node.
        for(let i = 0; i < level.outputs.length; i++){
            let sum = 0;
            
            for(let j = 0; j < level.inputs.length; j++){
                // edge is from j-th input node to i-th output node.
                sum += level.inputs[j]*level.weights[j][i];   // value for i-th output node is the weighted sum of inputs. 
            }

            // Turn the output node on/off.
            if(sum > level.biases[i]){
                level.outputs[i] = 1;
            }
            else{
                level.outputs[i] = 0;
            }
        }
        
        return(level.outputs);
    }
}
