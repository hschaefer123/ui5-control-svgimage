sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"ui5/control/SVGPrototype"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("openui5developer.svgimage.demo.controller.App", {
		
		onInit: function() {
			var oView = this.getView();
			
			// ui model
			var oViewModel = new JSONModel({
				selectTheme : "uiThemeOpenUI5",
				logoSrc : "svg/SVG_Logo.inline.svg",
				imageSrc : "svg/OpenUI5.inline.svg",
				usePrototype : false 
			});
			oView.setModel(oViewModel, "ui");
			
			// menu
			this._fMenu = sap.ui.xmlfragment("openui5developer.svgimage.demo.view.MenuItem", this);
			oView.addDependent(this._fMenu);
			oView.byId("sapMenuButton").attachBrowserEvent("tab keyup", function(oEvent){
				this._bKeyboard = oEvent.type === "keyup";
			}, this);
		},
		
		// sadly class is currently not bindable ;-( 
		onLibSelect: function(oEvent) {
			var sAddClass = oEvent.getParameter("key"),
				sRemoveClass = (sAddClass === "uiThemeOpenUI5") ? "uiThemeSAPUI5" : "uiThemeOpenUI5";
				
			// set theme root class to BODY
			$("body").removeClass(sRemoveClass);
			$("body").addClass(sAddClass);
		},
		
		onMenu: function(oEvent) {
			var oButton = oEvent.getSource(),
				eDock = sap.ui.core.Popup.Dock;
				
			this._fMenu.open(this._bKeyboard, oButton, eDock.BeginTop, eDock.BeginBottom, oButton);
		}
		
	});
	
});