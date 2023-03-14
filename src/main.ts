// import neural from "brain.js";
import { Card, Color, Value } from "./class/Card";
import { FileParser } from "./class/Parser";

// let neuralNetwork = new neural.NeuralNetwork({
// 	inputSize : 8,
// 	hiddenLayers : [7, 4],
// 	outputSize : 2,
// 	activation : "sigmoid"
// })

FileParser.ConvertFileToArray("/home/flo/Téléchargements/IRCData/IRCdata/holdem/199504/hroster").then((data) => {
	console.log(data[0]);
});

FileParser.ConvertFileToArray("/home/flo/Téléchargements/IRCData/IRCdata/holdem/199504/hdb").then((data) => {
	console.log(data[0]);
});

FileParser.ConvertFileToArray("/home/flo/Téléchargements/IRCData/IRCdata/holdem/199504/pdb/pdb.[[").then((data) => {
	console.log(data[0]);
});