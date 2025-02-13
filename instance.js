"use strict";

{
    const SDK = globalThis.SDK;
    const PLUGIN_CLASS = SDK.Plugins.ValerypopoffEase;

    // Ignore this: yes
    PLUGIN_CLASS.Instance = class ValerypopoffEaseInstance extends SDK.IInstanceBase {
        constructor(sdkType, inst) {
            super(sdkType, inst);
        }

        Release() {
        }

        OnCreate() {
        }

        OnPropertyChanged(id, value) {
        }

        LoadC2Property(name, valueString) {
            switch (name) {
            }

            return false;
        }
    };
}