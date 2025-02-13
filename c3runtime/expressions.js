"use strict";

{
	var ExpsObject =
	{
		TimeProgress: function() 
		{
			var Params = Array.prototype.slice.call(arguments);
			var SetterName = Params[0];
			Params.splice(0, 1);

			for( var i=0; i<this.TweensList.length; i++ )
			if( this.checkTweenAgainst(this.TweensList, i, SetterName, [].concat(Params) ) )
			//if( this.TweensList[i].SetterName == SetterName.toLowerCase() )
			{
				if( this.TweensList[i].CurrentTime == 0 || this.TweensList[i].Duration == 0 )
					return 0;
				else					
					return this.TweensList[i].CurrentTime / this.TweensList[i].Duration;
			}

			return 0;
		},
		CurrentValue: function() 
		{
			var Params = Array.prototype.slice.call(arguments);
			var SetterName = Params[0];
			Params.splice(0, 1);
			
			for( var i=0; i<this.TweensList.length; i++ )
			if( this.checkTweenAgainst(this.TweensList, i, SetterName, [].concat(Params) ) )
			//if( this.TweensList[i].SetterName == SetterName.toLowerCase() )
			{
				return this.TweensList[i].CurrentValue;
			}

			return 0;
		},
		Parameter: function() 
		{
			var Params = Array.prototype.slice.call(arguments);
			var SetterName = Params[0];
			var index = Params[1];
			//Params.splice(0, 1);
			
			for( var i=0; i<this.TweensList.length; i++ )
			if( this.TweensList[i].SetterName == SetterName.toLowerCase() )
			{
				return this.TweensList[i].Params[index];
			}

			return 0;
		},
		FinishedParam: function(number) 
		{
			var temp = 0;

			if( this.FinishedTween === undefined || number<0 )
				temp = 0;
			else
				temp = this.FinishedTween.Params[number];

			return temp;
		},
		TickedParam: function(number) 
		{
			var temp = 0;

			if( this.TickedTween === undefined || number<0 )
				temp = 0;
			else
				temp = this.TickedTween.Params[number];

			return temp;
		},
		TickedValue: function() 
		{
			var temp = 0;

			if( this.TickedTween === undefined )
				temp = 0;
			else
				temp = this.TickedTween.CurrentValue;

			return temp;
		},
		TickedTimeProgress: function() 
		{
			var temp = 0;

			if( this.TickedTween === undefined )
				temp = 0;
			else
			{
				if( this.TickedTween.CurrentTime == 0 || this.TickedTween.Duration == 0 )
					temp = 0;
				else					
					temp = this.TickedTween.CurrentTime / this.TickedTween.Duration;
			}

			return temp;
		}
	};

	globalThis.C3.Plugins.ValerypopoffEase.Exps = {};

	for( var k in ExpsObject )
	{
		globalThis.C3.Plugins.ValerypopoffEase.Exps[k] = ExpsObject[k];
	}

}

globalThis.C3.Plugins.ValerypopoffEase.Instance.prototype.EXPS = globalThis.C3.Plugins.ValerypopoffEase.Exps;