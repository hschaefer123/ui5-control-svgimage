/* global SVGInjector */

//https://github.com/iconic/SVGInjector
//https://github.com/robbue/jquery.svgInject
sap.ui.define([
    "sap/m/Image",
    "jquery.sap.global",
    "ui5/control/3rd/svg-injector.min"
    //"ui5/control/3rd/jquery-svg-inject"
    ],
	function(Image, jQuery) {
	"use strict";

	return Image.extend("ui5.control.SVGImage", {
		
		init: function() {
			// svg images are always loaded without @2
			this.setDensityAware(false);
			
			this.addEventDelegate({
				onAfterRendering: function() {
					// replace SVG with embedded version
					if (this.getMode() === sap.m.ImageMode.Image && this._isSVG(this.getSrc())) {
						this._injectSvg();
					}
				}
			}, this);
		},	
		
		_isSVG: function(sSrc) {
			return sSrc.indexOf(".inline.svg") !== -1;
		},
		
		_injectSvg: function() {
			var $DomNode = this.$();
			
			// if is image add custom classname and inject SVG
			if ($DomNode.is("img")) {
				// add custom class
				$DomNode.addClass("uiSVGImage");
				
				// fix for ObjectPageLayout rerendering issue setting "sapMNoImg" on $DomNode
				$DomNode.removeClass("sapMNoImg");
				
				// inject SVG
				SVGInjector($DomNode);
			}
		},
		
		/* add nothing, just inherit the ButtonRenderer as is; 
		** In this case (since the renderer is not changed) you could also specify this explicitly with:  renderer:"sap.ui.commons.ButtonRenderer"
		**(means you reuse the ButtonRenderer instead of creating a new view */
		renderer: {}
		
	});
});