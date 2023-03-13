import neural from "brain.js";

let neuralNetwork = new neural.NeuralNetwork({
	inputSize : 8,
	hiddenLayers : [7, 4],
	outputSize : 2,
	activation : "sigmoid"
})
