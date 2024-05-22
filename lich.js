G.AddData({
name:'lich mod',
author:'el',
desc:'A simple mod to make the game easier.',
engineVersion:1,
manifest:'modManifest.js',
requires:[],
sheets:{'elSheet':'https://github.com/that-elliott/lich-mod.git'},//custom stylesheet (note : broken in IE and Edge for the time being)
func:function()
{
	//The idea in this simple example mod is to add a few elements focused around hot sauce, because hot sauce is great and I use that stuff everywhere.
	
	//First we create a couple new resources :
	new G.Res({
		name:'lich berry',
		desc:'[lich berry]s are loaded with the souls of the dead (very nutritious).',
		icon:[0,0,'elSheet'],
		turnToByContext:{'eat':{'health':1,'happiness':3},'decay':{'lich berry':0.33,'spoiled food':0.33}},//this basically translates to : "when eaten, generate some health and happiness; when rotting, turn into either nothing or some spoiled food"
		partOf:'food',
		category:'food',
	});
	new G.Res({
		name:'soul juice',
		desc:'Made from [lich berry]s, this [soul juice] stays fresh for a while and will leave anyone panting and asking for more.',
		icon:[1,0,'elSheet'],
		turnToByContext:{'eat':{'health':2,'happiness':4},'decay':{'lich berry':0.90,'spoiled food':0.05}},//that last part makes hot sauce effectively have a 95% chance of simply not rotting (in effect, it decays into itself)
		partOf:'food',
		category:'food',
	});
	//Then we augment the base data to incorporate our new resources :
		//adding hot pepper as something that can be gathered from grass
	G.getDict('grass').res['gather']['lich berry']=5;
		//adding a new mode to artisans so they can make hot sauce from hot peppers
	G.getDict('artisan').modes['soul juice']={name:'Make soul juice',desc:'Turn 3 [lich berry]s into 2 [soul juice].',req:{'soul juice preparing':true},use:{}};
		//adding a new effect to artisans that handles the actual hot sauce preparing and is only active when the unit has the mode "hot sauce"
	G.getDict('artisan').effects.push({type:'convert',from:{'lich berry':3,},into:{'soul juice':2},every:1,mode:'soul juice'});
	
	//Finally, we add a trait that amplifies the benefits of consuming hot sauce; it will take on average 20 years to appear once the conditions (knowing the "Hot sauce preparing" tech) is fulfilled.
	new G.Trait({
		name:'soul juice obsession',
		desc:'@your people appreciate [soul juice] SO much and will be WAY happier from consuming it.',
		icon:[1,1,'elSheet'],
		chance:75,
		req:{'soul juice preparing':true},
		effects:[
			{type:'function',func:function(){G.getDict('soul juice').turnToByContext['eat']['happiness']=1;}},//this is a custom function executed when we gain the trait
		],
	});
	
	//There are many other ways of adding and changing content; refer to /data.js, the default dataset, if you want to see how everything is done in the base game. Good luck!
}
});