// const name = "Ashot"
// let count = 0

// console.log(name)
// console.log(count)

// count = count + 1
// console.log(count)



// const kmToMiles = (km) => {
//   return km * 0.843;
// };

// let result = kmToMiles(300);

// console.log(result); 

// import readline from "readline";

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// function playerInfo(name, craft) {
//     return "Բարև " + name + ", քո craft-ը " + craft + " է:";
// }

// rl.question("Գրիր անունը: ", (name) => {
//     rl.question("Գրիր craft-ը: ", (craft) => {

//         console.log(playerInfo(name, craft));

//         rl.close();
//     });
// });



const itsPosition = {
  latitude: 40.7128,
  longitude: -74.0060
};

console.log(itsPosition.latitude);
console.log(itsPosition.longitude);

console.log(itsPosition["latitude"]);
console.log(itsPosition["longitude"]);

const latKey = "latitude";
const longKey = "longitude";

console.log(itsPosition[latKey]);
console.log(itsPosition[longKey]);