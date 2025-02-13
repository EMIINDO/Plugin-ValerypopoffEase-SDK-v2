"use strict";

{
var ActsObject = 
{
		Ease: function(SetterName, StartValue, EndValue, Duration, Tweening, Comeback, Params)
		{
			//console.log("Ease Params: " + Params);

			// Remember lowercase tick-function name because Construct Functions names are non-case-sensitive
			var tween = new this.TweensListEntry( SetterName.toLowerCase(), StartValue, EndValue, Duration, Tweening, Comeback==1?true:false, Params );

			/*
			for( var i=0; i<this.TweensList.length; i++ )
			if( this.TweensList[i].SetterName == SetterName.toLowerCase() )
			{
				this.TweensList[i] = tween;
				return;
			}*/

			this.TweensList.push(tween);
		},
		EaseNonvar: function(SetterName, StartValue, EndValue, Duration, Tweening, Comeback, Param0, Param1, Param2, Param3, Param4)
		{
			//console.log("Ease Params: " + Params);

			// Remember lowercase tick-function name because Construct Functions names are non-case-sensitive
			var tween = new this.TweensListEntry( SetterName.toLowerCase(), StartValue, EndValue, Duration, Tweening, Comeback==1?true:false, [Param0, Param1, Param2, Param3, Param4] );

			this.TweensList.push(tween);
		},
		SetCustomJS: function(code)
		{
			this.CustomJSTweening = code;
		},
		SetCustomConstruct: function(funcname)
		{
			this.CustomConstructTweening = funcname;
		},
		Pause: function(SetterName, Params)
		{
			for( var i=0; i<this.TweensList.length; i++ )
			if( this.checkTweenAgainst(this.TweensList, i, SetterName, [].concat(Params) ) )
			//if( this.TweensList[i].SetterName == SetterName.toLowerCase() )
			{
				this.TweensList[i].Paused = true;
				//return;
			}
		},
		PauseNonvar: function(SetterName)
		{
			for( var i=0; i<this.TweensList.length; i++ )
			//if( this.checkTweenAgainst(this.TweensList, i, SetterName, [].concat(Params) ) )
			//if( this.TweensList[i].SetterName == SetterName.toLowerCase() )
			if( this.checkTweenAgainst(this.TweensList, i, SetterName, [] ) )
			{
				this.TweensList[i].Paused = true;
				//return;
			}
		},
		Resume: function(SetterName, Params)
		{
			for( var i=0; i<this.TweensList.length; i++ )
			if( this.checkTweenAgainst(this.TweensList, i, SetterName, [].concat(Params) ) )
			//if( this.TweensList[i].SetterName == SetterName.toLowerCase() )
			{
				this.TweensList[i].Paused = false;
				//return;
			}
		},
		ResumeNonvar: function(SetterName)
		{
			for( var i=0; i<this.TweensList.length; i++ )
			//if( this.checkTweenAgainst(this.TweensList, i, SetterName, [].concat(Params) ) )
			//if( this.TweensList[i].SetterName == SetterName.toLowerCase() )
			if( this.checkTweenAgainst(this.TweensList, i, SetterName, [] ) )
			{
				this.TweensList[i].Paused = false;
			}
		},
		Terminate: function(SetterName, Params)
		{
			for( var i=0; i<this.TweensList.length; i++ )
			if( this.checkTweenAgainst(this.TweensList, i, SetterName, [].concat(Params) ) )
			//if( this.TweensList[i].SetterName == SetterName.toLowerCase() )
			{
				this.TweensList.splice(i, 1);
				i--;
				//return;
			}
		},
		TerminateNonvar: function(SetterName)
		{
			for( var i=0; i<this.TweensList.length; i++ )
			//if( this.checkTweenAgainst(this.TweensList, i, SetterName, [].concat(Params) ) )
			//if( this.TweensList[i].SetterName == SetterName.toLowerCase() )
			if( this.checkTweenAgainst(this.TweensList, i, SetterName, [] ) )
			{
				this.TweensList.splice(i, 1);
				i--;
				//return;
			}
		}
};

	globalThis.C3.Plugins.ValerypopoffEase.Acts = {};

	for( var k in ActsObject )
	{
		globalThis.C3.Plugins.ValerypopoffEase.Acts[k] = ActsObject[k];
	}
}

globalThis.C3.Plugins.ValerypopoffEase.Instance.prototype.ACTS = globalThis.C3.Plugins.ValerypopoffEase.Acts;
