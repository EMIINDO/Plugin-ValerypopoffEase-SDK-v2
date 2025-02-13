"use strict";

{
	var CndsObject =
	{
		InProgress: function(SetterName, Params)
		{
			for( var i=0; i<this.TweensList.length; i++ )
			{
				if( this.checkTweenAgainst(this.TweensList, i, SetterName, [].concat(Params) ) )
				//if( this.TweensList[i].SetterName == SetterName.toLowerCase() )
				{
					return true;
				}
			}

			return false;
		},
		InProgressNonVar: function(SetterName)
		{
			for( var i=0; i<this.TweensList.length; i++ )
			{
				//if( this.checkTweenAgainst(this.TweensList, i, SetterName, [].concat(Params) ) )
				//if( this.TweensList[i].SetterName == SetterName.toLowerCase() )
				if( this.checkTweenAgainst(this.TweensList, i, SetterName, [] ) )
				{
					return true;
				}
			}

			return false;
		},
		OnFinished: function(SetterName, Params)
		{
			var ret = false;

			//for( var i=0; i<this.FinishedTweensList.length; i++ )
			//if( this.FinishedTweensList[i] == SetterName.toLowerCase() )
			//if( this.checkTweenAgainst(this.FinishedTweensList, i, SetterName, [].concat(Params) ) )
			if( this.checkTweenAgainst([this.FinishedTween], 0, SetterName, [].concat(Params) ) )
			{
				//this.FinishedTweensList.splice(i, 1);
				//i--;

				ret = true;
			}


			return ret;
		},
		OnFinishedNonvar: function(SetterName, Params)
		{
			var ret = false;

			//if( this.checkTweenAgainst([this.FinishedTween], 0, SetterName, [].concat(Params) ) )
			//if( this.FinishedTween.SetterName == SetterName.toLowerCase() )
			if( this.checkTweenAgainst([this.FinishedTween], 0, SetterName, [] ) )
			{
				ret = true;
			}


			return ret;
		},
		Paused: function(SetterName, Params) 
		{
			for( var i=0; i<this.TweensList.length; i++ )
			if( this.checkTweenAgainst(this.TweensList, i, SetterName, [].concat(Params)) )
			//if( this.TweensList[i].SetterName == SetterName.toLowerCase() )
			{
				if( this.TweensList[i].Paused == true )
					return true;
			}

			return false;
		},
		PausedNonvar: function(SetterName) 
		{
			for( var i=0; i<this.TweensList.length; i++ )
			//if( this.checkTweenAgainst(this.TweensList, i, SetterName, [].concat(Params)) )
			//if( this.TweensList[i].SetterName == SetterName.toLowerCase() )
			if( this.checkTweenAgainst(this.TweensList, i, SetterName, []) )
			{
				if( this.TweensList[i].Paused == true )
					return true;
			}

			return false;
		},
		OnTicked: function(SetterName, Params)
		{
			var ret = false;

			//for( var i=0; i<this.FinishedTweensList.length; i++ )
			//if( this.FinishedTweensList[i] == SetterName.toLowerCase() )
			//if( this.checkTweenAgainst(this.FinishedTweensList, i, SetterName, [].concat(Params) ) )
			if( this.checkTweenAgainst([this.TickedTween], 0, SetterName, [].concat(Params) ) )
			{
				//this.FinishedTweensList.splice(i, 1);
				//i--;

				ret = true;
			}


			return ret;
		},
		OnTickedNonvar: function(SetterName)
		{
			var ret = false;

			//if( this.TickedTween.SetterName == SetterName.toLowerCase() )
			if( this.checkTweenAgainst([this.TickedTween], 0, SetterName, [] ) )
			{
				ret = true;
			}

			return ret;
		}
	};	

	globalThis.C3.Plugins.ValerypopoffEase.Cnds = {};

	for( var k in CndsObject )
	{
		globalThis.C3.Plugins.ValerypopoffEase.Cnds[k] = CndsObject[k];
	}
}

globalThis.C3.Plugins.ValerypopoffEase.Instance.prototype.CNDS = globalThis.C3.Plugins.ValerypopoffEase.Cnds;
