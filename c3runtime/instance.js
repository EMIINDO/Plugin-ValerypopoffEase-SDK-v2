"use strict";



{
    // Ignore this: yes
    globalThis.C3.Plugins.ValerypopoffEase.Instance = class ValerypopoffEaseInstance extends globalThis.ISDKInstanceBase {
        constructor() {
            super();

            const properties = this._getInitProperties();

            // Backward compatibility for C2 runtime
            this.properties = properties;


            this.TweensList = [];
            //this.FinishedTweensList = [];
            this.FinishedTween = undefined;
            this.TickedTween = undefined;

            this.CustomJSTweening = undefined;
            this.CustomConstructTweening = undefined;

            var this_ = this;

            this.TweensListEntry = function (SetterName, StartValue, EndValue, Duration, Tweening, Comeback, Params) {
                this.SetterName = SetterName;
                this.StartValue = StartValue;
                this.EndValue = EndValue;
                this.Comeback = Comeback;
                this.Params = [].concat(Params);

                //console.log("TweensListEntry Params: " + this.Params);

                //this.Duration = Duration;
                //if( this.Duration <= 0 ) this.Duration = 0;

                this.Duration = (Duration >= 0) ? Duration : 0

                this.Paused = false;
                this.CurrentValue = this.StartValue;
                this.CurrentTime = 0;

                switch (Tweening) {
                    case 0: this.TweeningFunc = this_.linearTween; break;
                    case 1: this.TweeningFunc = this_.easeInQuad; break;
                    case 2: this.TweeningFunc = this_.easeOutQuad; break;
                    case 3: this.TweeningFunc = this_.easeInOutQuad; break;
                    case 4: this.TweeningFunc = this_.easeInCubic; break;
                    case 5: this.TweeningFunc = this_.easeOutCubic; break;
                    case 6: this.TweeningFunc = this_.easeInOutCubic; break;
                    case 7: this.TweeningFunc = this_.easeInQuart; break;
                    case 8: this.TweeningFunc = this_.easeOutQuart; break;
                    case 9: this.TweeningFunc = this_.easeInOutQuart; break;
                    case 10: this.TweeningFunc = this_.easeInQuint; break;
                    case 11: this.TweeningFunc = this_.easeOutQuint; break;
                    case 12: this.TweeningFunc = this_.easeInOutQuint; break;
                    case 13: this.TweeningFunc = this_.easeInSine; break;
                    case 14: this.TweeningFunc = this_.easeOutSine; break;
                    case 15: this.TweeningFunc = this_.easeInOutSine; break;
                    case 16: this.TweeningFunc = this_.easeInExpo; break;
                    case 17: this.TweeningFunc = this_.easeOutExpo; break;
                    case 18: this.TweeningFunc = this_.easeInOutExpo; break;
                    case 19: this.TweeningFunc = this_.easeInCirc; break;
                    case 20: this.TweeningFunc = this_.easeOutCirc; break;
                    case 21: this.TweeningFunc = this_.easeInOutCirc; break;

                    // custom JS
                    case 22:
                        {
                            this.TweeningFunc = new Function("curr_time", "start_value", "delta", "duration", this_.CustomJSTweening || "");

                        } break;

                    // custom Construct
                    case 23:
                        {
                            this.TweeningFunc = function (curr_time, start_value, delta, duration) {
                                try {
                                    if (__CONSTRUCT2_RUNTIME2__ || __CONSTRUCT3_RUNTIME2__)
                                        return window["c2_callFunction"](this_.CustomConstructTweening || "", [curr_time, start_value, delta, duration]);

                                    if (__CONSTRUCT3_RUNTIME3__)
                                        return window["c3_callFunction"](this_.CustomConstructTweening || "", [curr_time, start_value, delta, duration]);
                                }
                                catch (err) {
                                    console.error("Valerypopoff Ease Plugin error: Probably Construct 'Function' plugin is not added to the project" + "\n" + err);
                                }
                            }

                        } break;
                }
            };


            // Start ticking
            if (__CONSTRUCT2_RUNTIME2__ || __CONSTRUCT3_RUNTIME2__)
                this.runtime.tickMe(this);

            if (__CONSTRUCT3_RUNTIME3__)
                this._StartTicking();

        }

        _release() {
            super._release();
        }

        _saveToJson() {
            return {}
        }

        _loadFromJson(o) {
            //Function has one argument called "o"
        }

        _tick() {

            //console.log("this.TweensList.length: " + this.TweensList.length);
            //console.log("first: " + JSON.stringify(this.TweensList[0]));
            //console.log("second: " + JSON.stringify(this.TweensList[1]));

            for (var i = 0; i < this.TweensList.length; i++) {
                var LAST = false;
                var value;

                // Ignore if paused -----------------------------------------

                if (this.TweensList[i].Paused)
                    continue;



                // Increment current time ------------------------------------

                var DT;

                if (__CONSTRUCT2_RUNTIME2__ || __CONSTRUCT3_RUNTIME2__)
                    DT = this.runtime.dt;

                if (__CONSTRUCT3_RUNTIME3__)
                    DT = this.runtime.GetDt(this.runtime);

                this.TweensList[i].CurrentTime += DT;

                if (this.TweensList[i].flipped)
                    this.TweensList[i].BackCurrentTime -= DT;



                // Easing finished ------------------------------------------

                if (this.TweensList[i].CurrentTime > this.TweensList[i].Duration) {
                    LAST = true;

                    // Last current values that are either end value or start value
                    if (this.TweensList[i].Comeback)
                        value = this.TweensList[i].StartValue;
                    else
                        value = this.TweensList[i].EndValue;

                    //continue;
                    //console.log("GOTCHA! " + value);
                }



                // Calculate the next value according to the easing function --------------------

                if (!LAST) {
                    // Bounce back enabled
                    if (this.TweensList[i].Comeback) {
                        // First halfduration
                        if (this.TweensList[i].CurrentTime < this.TweensList[i].Duration / 2)
                            value =

                                this.TweensList[i].TweeningFunc(
                                    this.TweensList[i].CurrentTime,
                                    this.TweensList[i].StartValue,
                                    this.TweensList[i].EndValue - this.TweensList[i].StartValue,
                                    this.TweensList[i].Duration / 2)
                        else
                        // Second halfduration
                        {
                            // In comeback mode use a different current time that starts from 0
                            // But the regular current time must increase too so we know when to end the asing
                            if (!this.TweensList[i].flipped) {
                                this.TweensList[i].flipped = true;
                                this.TweensList[i].BackCurrentTime = this.TweensList[i].CurrentTime;

                                value = this.TweensList[i].EndValue;
                            }
                            else
                                value =
                                    this.TweensList[i].TweeningFunc(
                                        this.TweensList[i].BackCurrentTime,
                                        this.TweensList[i].StartValue,
                                        this.TweensList[i].EndValue - this.TweensList[i].StartValue,
                                        this.TweensList[i].Duration / 2)
                        }
                    }
                    // Bounce back disabled
                    else {
                        value = this.TweensList[i].TweeningFunc(
                            this.TweensList[i].CurrentTime,
                            this.TweensList[i].StartValue,
                            this.TweensList[i].EndValue - this.TweensList[i].StartValue,
                            this.TweensList[i].Duration);
                    }
                }




                // Call a setter-function with the value as aparameter ---------------------------

                this.TweensList[i].CurrentValue = value;
                var setterFunc;

                try {
                    if (__CONSTRUCT2_RUNTIME2__ || __CONSTRUCT3_RUNTIME2__)
                        setterFunc = window["c2_callFunction"];

                    if (__CONSTRUCT3_RUNTIME3__)
                        setterFunc = window["c3_callFunction"];

                    //console.log("Setter Params: " + this.TweensList[i].Params);

                    setterFunc(this.TweensList[i].SetterName, [this.TweensList[i].CurrentValue].concat(this.TweensList[i].Params));
                }
                catch (err) {
                    //console.error("Valerypopoff Ease Plugin error: Probably Construct 'Function' plugin is not added to the project" + "\n" + err);
                }


                this.TickedTween = this.TweensList[i];
                // Fire OnTicked trigger
                if (__CONSTRUCT2_RUNTIME2__)
                    this.runtime.trigger(this.CNDS.OnTicked, this);

                if (__CONSTRUCT3_RUNTIME2__) {
                    this.runtime.trigger(this.CNDS.OnTicked, this);
                    this.runtime.trigger(this.CNDS.OnTickedNonvar, this);
                }

                if (__CONSTRUCT3_RUNTIME3__) {
                    this._trigger(this.CNDS.OnTicked)
                    this._trigger(this.CNDS.OnTickedNonvar)
                }


                // End everything ----------------------------------------------------------------

                if (LAST) {
                    // Put finished easing name (only one copy) to a finished list

                    /*
                    var thereis = false;
                	
                    for( var k=0; k<this.FinishedTweensList.length; k++ )
                    if( this.checkTweenAgainst(this.FinishedTweensList, k, this.TweensList[i].SetterName, this.TweensList[i].Params ) )
                    //if( this.FinishedTweensList[k] == this.TweensList[i].SetterName )
                    {
                        thereis = true;
                        break;
                    }
                	
                    if( !thereis )
                        this.FinishedTweensList.push( this.TweensList[i] );
                    */
                    this.FinishedTween = this.TweensList[i];

                    // Remove easing from tweening list
                    this.TweensList.splice(i, 1);
                    i--;


                    // Fire OnFinished trigger
                    if (__CONSTRUCT2_RUNTIME2__)
                        this.runtime.trigger(this.CNDS.OnFinished, this);

                    if (__CONSTRUCT3_RUNTIME2__) {
                        this.runtime.trigger(this.CNDS.OnFinished, this);
                        this.runtime.trigger(this.CNDS.OnFinishedNonvar, this);
                    }

                    if (__CONSTRUCT3_RUNTIME3__) {
                        this._trigger(this.CNDS.OnFinished)
                        this._trigger(this.CNDS.OnFinishedNonvar)
                    }
                }
            }
        }

        _tick2() {

        }

    };


    var InstanceFunctionsObject = {
        checkTweenAgainst: function (list, index, SetterName, Params) {
            if (list === undefined)
                return false;

            if (list[index] === undefined)
                return false;


            if (list[index].SetterName != SetterName.toLowerCase())
                return false;

            //var Params = [].concat( _Params );

            for (var i = 0; i < Params.length; i++) {
                if (list[index].Params[i] != Params[i])
                    return false;
            }

            return true;
        },

        linearTween: function (t, b, c, d) {
            return c * t / d + b;
        },


        // ---------------------------------------
        easeInQuad: function (t, b, c, d) {
            t /= d;
            return c * t * t + b;
        },

        easeOutQuad: function (t, b, c, d) {
            t /= d;
            return -c * t * (t - 2) + b;
        },

        // quadratic easing in/out - acceleration until halfway, then deceleration
        easeInOutQuad: function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        },


        // ---------------------------------------
        // cubic easing in - accelerating from zero velocity
        easeInCubic: function (t, b, c, d) {
            t /= d;
            return c * t * t * t + b;
        },

        // cubic easing out - decelerating to zero velocity
        easeOutCubic: function (t, b, c, d) {
            t /= d;
            t--;
            return c * (t * t * t + 1) + b;
        },

        // cubic easing in/out - acceleration until halfway, then deceleration
        easeInOutCubic: function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        },


        // ---------------------------------------
        // quartic easing in - accelerating from zero velocity

        easeInQuart: function (t, b, c, d) {
            t /= d;
            return c * t * t * t * t + b;
        },

        // quartic easing out - decelerating to zero velocity
        easeOutQuart: function (t, b, c, d) {
            t /= d;
            t--;
            return -c * (t * t * t * t - 1) + b;
        },

        // quartic easing in/out - acceleration until halfway, then deceleration
        easeInOutQuart: function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t * t + b;
            t -= 2;
            return -c / 2 * (t * t * t * t - 2) + b;
        },


        // ---------------------------------------
        // quintic easing in - accelerating from zero velocity
        easeInQuint: function (t, b, c, d) {
            t /= d;
            return c * t * t * t * t * t + b;
        },


        // quintic easing out - decelerating to zero velocity
        easeOutQuint: function (t, b, c, d) {
            t /= d;
            t--;
            return c * (t * t * t * t * t + 1) + b;
        },

        // quintic easing in/out - acceleration until halfway, then deceleration
        easeInOutQuint: function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t * t * t + 2) + b;
        },


        // ---------------------------------------
        // sinusoidal easing in - accelerating from zero velocity
        easeInSine: function (t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },

        // sinusoidal easing out - decelerating to zero velocity
        easeOutSine: function (t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },

        // sinusoidal easing in/out - accelerating until halfway, then decelerating
        easeInOutSine: function (t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },


        // ---------------------------------------
        // exponential easing in - accelerating from zero velocity
        easeInExpo: function (t, b, c, d) {
            return c * Math.pow(2, 10 * (t / d - 1)) + b;
        },

        // exponential easing out - decelerating to zero velocity
        easeOutExpo: function (t, b, c, d) {
            return c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },

        // exponential easing in/out - accelerating until halfway, then decelerating
        easeInOutExpo: function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            t--;
            return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
        },


        // ---------------------------------------
        // circular easing in - accelerating from zero velocity
        easeInCirc: function (t, b, c, d) {
            t /= d;
            return -c * (Math.sqrt(1 - t * t) - 1) + b;
        },

        // circular easing out - decelerating to zero velocity
        easeOutCirc: function (t, b, c, d) {
            t /= d;
            t--;
            return c * Math.sqrt(1 - t * t) + b;
        },

        // circular easing in/out - acceleration until halfway, then deceleration
        easeInOutCirc: function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            t -= 2;
            return c / 2 * (Math.sqrt(1 - t * t) + 1) + b;
        }
    }
    for (var k in InstanceFunctionsObject) {
        globalThis.C3.Plugins.ValerypopoffEase.Instance.prototype[k] = InstanceFunctionsObject[k];
    }

}