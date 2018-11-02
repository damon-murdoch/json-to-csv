const fs = require('fs');
const path = require('path');

const items = require('./data/items.js');
const learnsets = require('./data/learnsets.js');
const moves = require('./data/moves.js');
const pokedex = require('./data/pokedex.js');
const typechart = require('./data/typechart.js');

function createNewDirectory(filepath)
{
	if(!fs.existsSync(filepath))
	{
		fs.mkdirSync(filepath);
		return true;
	}
	return false;
}

function writeToFile(filepath,content,ext)
{
	filename = path.join(filepath,ext);
	
	if(!fs.existsSync(filename))
	{
		fs.open(filename,'w',function(err,file)
		{
			if(err)
			{
				throw err;
			}
		});
	}
	
	fs.appendFile(filename,content,function(err)
	{
		console.log(content + ' written to ' + filename);
		if(err)
		{
			throw err;
		}
	});
}

function writeObjectToCSV(object,filepath)
{
	createNewDirectory(filepath);
	
	for (item in object)
	{
		temp = object[item];
		
		console.log(temp.constructor);
		
		if(temp.constructor == Object)
		{//filepath+'/'+item
			writeObjectToCSV(temp,path.join(filepath,item));
		}
		else if (temp.constructor == Function)
		{
			continue;
		}
		else
		{
			writeToFile(filepath,item+','+temp+'\n','.csv');
		}
	}
}

writeObjectToCSV(typechart,path.join(__dirname,'typechart'));