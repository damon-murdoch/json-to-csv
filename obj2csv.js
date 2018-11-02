const fs = require('fs');
const path = require('path');

module.exports = 
{
	createNewDirectory: function(filepath)
	{
		if(!fs.existsSync(filepath))
		{
			fs.mkdirSync(filepath);
			return true;
		}
		return false;
	},

	writeToFile: function(filepath,content,ext)
	{
		filename = path.join(filepath,ext);

		fs.appendFileSync(filename,content,function(err)
		{
			if(err)
			{
				throw err;
			}
		});
	},

	writeObjectToCSV: function(object,filepath)
	{
		module.exports.createNewDirectory(filepath);
		
		for (item in object)
		{
			temp = object[item];

			if(temp == null)
			{
				module.exports.writeToFile(filepath,item+','+',null\n','data.csv');
			}
			else if(temp.constructor == Object)
			{
				module.exports.writeObjectToCSV(temp,path.join(filepath,item));
			}
			else if (temp.constructor == Function)
			{
				module.exports.writeToFile(filepath,item+',Function()\n','data.csv');
			}
			else
			{
				module.exports.writeToFile(filepath,item+','+temp+'\n','data.csv');
			}
		}
	}
}