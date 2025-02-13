"use strict";
// Porting BY EMI INDO with c3addon-ide-plus


{
    ////////////////////////////////////////////
    // The plugin ID is how Construct identifies different kinds of plugins.
    // *** NEVER CHANGE THE PLUGIN ID! ***
    // If you change the plugin ID after releasing the plugin, Construct will think it is an entirely different
    // plugin and assume it is incompatible with the old one, and YOU WILL BREAK ALL EXISTING PROJECTS USING THE PLUGIN.
    // Only the plugin name is displayed in the editor, so to rename your plugin change the name but NOT the ID.
    // If you want to completely replace a plugin, make it deprecated (it will be hidden but old projects keep working),
    // and create an entirely new plugin with a different plugin ID.
    const PLUGIN_ID = "ValerypopoffEase";
    ////////////////////////////////////////////

    // callMap Deprecated const PLUGIN_VERSION = "2.2.1";
    const PLUGIN_CATEGORY = "general";

    const SDK = globalThis.SDK;
    const PLUGIN_CLASS = SDK.Plugins.ValerypopoffEase = class ValerypopoffEase extends SDK.IPluginBase {
        constructor() {
            super(PLUGIN_ID);

            SDK.Lang.PushContext("plugins." + PLUGIN_ID.toLowerCase());

            this._info.SetName(globalThis.lang(".name"));
            this._info.SetDescription(globalThis.lang(".description"));
            // callMap Deprecated this._info.SetVersion(PLUGIN_VERSION);
            this._info.SetCategory(PLUGIN_CATEGORY);
            this._info.SetAuthor("Valera Popov");
            this._info.SetHelpUrl(globalThis.lang(".help-url"));
            this._info.SetRuntimeModuleMainScript("c3runtime/main.js");

            // Ignore this: yes	
            this._info.SetPluginType("object");

            this._info.SetIsSingleGlobal(true);
            this._info.SetCanBeBundled(true);
            this._info.SetIsResizable(false);
            this._info.SetIsRotatable(false);
            this._info.SetHasImage(false);
            this._info.SetIsTiled(false);
            this._info.SetIsDeprecated(false);
            this._info.SetSupportsEffects(false);
            this._info.SetMustPreDraw(false);


            // Support both the C2 and C3 runtimes
            this._info.SetSupportedRuntimes(["c2", "c3"]);

            SDK.Lang.PushContext(".properties");

            this._info.SetProperties([
            ]);

            SDK.Lang.PopContext();		// .properties

            SDK.Lang.PopContext();
        }
    };

    PLUGIN_CLASS.Register(PLUGIN_ID, PLUGIN_CLASS);
}