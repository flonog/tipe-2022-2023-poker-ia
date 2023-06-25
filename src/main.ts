import * as brain from "brain.js";
// import { Card, Color, Value } from "./class/Card";
import { FileParser } from "./class/Parser";
import { Console } from "console";
import { lstatSync, readFileSync, readdir, readdirSync, writeFileSync } from "fs";
import { Card, Color, Value } from "./class/Card";
import { Game } from "./class/Game";
import { NeuralData } from "./class/NeuralData";
import { createInterface } from "readline";
import { INeuralNetworkData, INeuralNetworkDatum } from "brain.js/dist/neural-network";

let neuralNetwork = new brain.NeuralNetwork({
	inputSize : 8,
	hiddenLayers : [20, 15, 10, 5],
	outputSize : 2,
	activation : "sigmoid"
});

let readline = createInterface({
	input: process.stdin,
	output: process.stdout
});

readline.question("Que faire ? (A : entrainer | B : tester | C : nouveau réseau)\n", (answer) => {
	switch(answer){
		case "A":
			readline.question("Où se trouve les fichiers de jeux ?\n", async (answer) => {
				if(!lstatSync(answer).isDirectory){
					console.log("Ce fichier n'est pas un dossier.")
					return;
				}

				// /home/flo/Documents/TIPE/IRCData/IRCdata/holdem

				neuralNetwork.fromJSON(JSON.parse((await readFileSync("./model.json")).toString()));

				let dirs = readdirSync(answer);
				let neurals: INeuralNetworkDatum<Partial<INeuralNetworkData>, Partial<INeuralNetworkData>>[] = [];
				console.log("Conversion des fichiers de jeux...");
				for(let i = 0; i < dirs.length; i ++){
					console.log(`${((i/dirs.length) * 100 ).toFixed(2)}%`);
					let game = await FileParser.ParseGame(answer + "/" + dirs[i] + "/hdb");
					console.log(game[0]?.playerList[0]);
					game = Game.CleanGameArray(game);
					let neuralData = NeuralData.ConvertGameArrayToNeuralData(game);
					neurals = neurals.concat(neuralData.map(x => x.ConvertToNeural()));
					writeFileSync("./data.json", JSON.stringify(neurals));
				}
				writeFileSync("./data.json", JSON.stringify(neurals));
				console.log("Conversion terminé. Entrainement...");
				neuralNetwork.train(neurals, {
					callback : ((status) => {
						console.log(`Entrainement en cours : ${(status.iterations / neurals.length).toFixed(2)}%.`)
					})
				});
				console.log("Entrainement terminé. Enregistrement du model dans un fichier.");
				writeFileSync("./model.json", JSON.stringify(neuralNetwork.toJSON()));
				console.log("Enregistrement terminé. Fin du programme.")
			})

			break;
		case "B":
			neuralNetwork.fromJSON(JSON.parse((readFileSync("./model.json")).toString()));
			let output = neuralNetwork.run([0,0,1,2,5,8200,16896,8448]);
			console.log(output)
			break;
		case "C":
			break;
		case "D":
			let neurals = JSON.parse(readFileSync("./data.json").toString());
			console.log("Entrainement...")
			neuralNetwork.train(neurals, {
				callback : ((status) => {
					console.log(`Entrainement en cours : ${(status.iterations / neurals.length).toFixed(2)}%.`)
				}),
				iterations : 3
			});
			console.log("Entrainement terminé. Enregistrement du model dans un fichier.");
			writeFileSync("./model.json", JSON.stringify(neuralNetwork.toJSON()));
			console.log("Enregistrement terminé. Fin du programme.")
			break;
		default:
			console.log("Entrée invalide. Fin du programme")
			break;
	}
});

// console.log("Convertion des fichiers de jeu.");

// FileParser.ParseGame("/home/flo/Documents/TIPE/IRCData/IRCdata/holdem/199504/hdb").then((val) => {
// 	val = Game.CleanGameArray(val);
// 	let neuralData = NeuralData.ConvertGameArrayToNeuralData(val);
// 	let neurals = neuralData.map(x => x.ConvertToNeural());
// 	writeFileSync("./db.json", JSON.stringify(neurals, null, 4));
// 	console.log("Fichier enregistré. Entrainement du réseau de neuronnes.");
// 	neuralNetwork.train(neurals, {
// 		callback : ((status) => {
// 			console.log(`Entrainement en cours : ${(status.iterations / neurals.length).toFixed(2)}%.`)
// 		})
// 	});
// 	console.log("Enregistrement du model dans un fichier.");
// 	writeFileSync("./model.json", JSON.stringify(neuralNetwork.toJSON()));
// })