const fs = require('fs');
const path = require('path');
const obj2csv = require('./obj2csv.js');

const data = 
{
	'items' : require('./data/items.js'),
	'learnsets' : require('./data/learnsets.js'),
	'moves' : require('./data/moves.js'),
	'pokedex' : require('./data/pokedex.js'),
	'typechart' : require('./data/typechart.js')
};

for (file in data)
{
	temp = data[file];
	obj2csv.writeObjectToCSV(temp,path.join(__dirname,file));
}