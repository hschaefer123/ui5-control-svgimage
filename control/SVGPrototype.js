/*eslint-disable no-console */
/* global SVGInjector */
sap.ui.define([
	"sap/m/Button",
	"sap/m/Image",
    "sap/m/MessageStrip",
    "sap/m/NotificationListBase",
    "sap/ui/unified/MenuItem",
    "sap/ui/unified/MenuTextFieldItem",
    "sap/f/Avatar", // availabel since 1.46
    "ui5/control/3rd/svg-injector.min"
    //"ui5/control/3rd/jquery-svg-inject"
    ],
    function(Button, Image, MessageStrip, NotificationListBase, MenuItem, MenuTextFieldItem, Avatar) {
    "use strict";		
    
	var _fnIsSVG = function(sSrc) {
		return sSrc.indexOf(".inline.svg") !== -1;
	};
	
	var _fnSetIconProperty = function(oControl, sProperty, sIcon) {
		// skip same image src
		if (sIcon === oControl.getProperty(sProperty)) {
			return oControl;
		}
		// force rerendering on svg image to replace img with svg onAfterRendering (bSuppressInvalidate)
		oControl.setProperty(sProperty, sIcon, !_fnIsSVG(sIcon));
	};	
	
	/*
	oControl.addEventDelegate({
		onAfterRendering: function() {
			// your code
		}
	}, this);
	*/
	
	/* sap.m.Image */
	
	var _fnImageonBeforeRendering = Image.prototype.onBeforeRendering;
	Image.prototype.onBeforeRendering = function() {
		// default handling proxiing onLoad, onError on image to get natural width
		_fnImageonBeforeRendering.apply(this, arguments);
		
		// maybe setSrc is toggling img/svg so always check for type
		if (this.getMode() === sap.m.ImageMode.Image && _fnIsSVG(this.getSrc())) {
			// svg never need @2 high size images ;-)
			this.setDensityAware(false);
		}
	};

	var _fnImageonAfterRendering = Image.prototype.onAfterRendering;
	Image.prototype.onAfterRendering = function() {
		// default handling proxiing onLoad, onError on image to get natural width
		_fnImageonAfterRendering.apply(this, arguments);
		
		// replace SVG with embedded version
		if (this.getMode() === sap.m.ImageMode.Image 
			&& _fnIsSVG(this.getSrc())
			// avoid double trouble using SVGImage control
			&& this.getMetadata().getName() !== "ui5.control.SVGImage") {
			this._injectSvg();
		}
		
		/* ORIGINAL
		var $DomNode = this.$(),
			oDomRef = $DomNode[0],
			sMode = this.getMode();
			
		if (sMode === sap.m.ImageMode.Image) {
			// bind the load and error event handler
			$DomNode.on("load", jQuery.proxy(this.onload, this));
			$DomNode.on("error", jQuery.proxy(this.onerror, this));
			
			// if image has already been loaded and the load or error event handler hasn't been called, trigger it manually.
			if (oDomRef && oDomRef.complete && !this._defaultEventTriggered) {
				// need to use the naturalWidth property instead of jDomNode.width(),
				// the later one returns positive value even in case of broken image
				if (oDomRef.naturalWidth > 0) {
					this.onload({});
				} else {
					this.onerror({});
				}
			}
		}
		*/
	};	

	/**
	 * This overrides the default setter of the src property and update the dom node.
	 *
	 * @param {sap.ui.core.URI} sSrc
	 * @public
	 */
	var _fnImageSetSrc = Image.prototype.setSrc;
	Image.prototype.setSrc = function(sSrc) {
		// skip same image src
		if (sSrc === this.getSrc()) {
			return this;
		}
		
		if (this.getMode() === sap.m.ImageMode.Image && _fnIsSVG(sSrc)) {
			// force rerendering of image to allow replacement of image with svg inside onAfterRendering
			this.setProperty("src", sSrc, false);
		} else {
			_fnImageSetSrc.apply(this, arguments);
		}
	};
	
	Image.prototype._injectSvg = function() {
		var $DomNode = this.$(),
			//oDomRef = $DomNode[0];
			oParent = this.getParent(),
			sParentClassName = oParent.getMetadata().getName();
			
		// check if root is image or find it
		if (sParentClassName === "sap.uxap.ObjectPageHeader") {
			$DomNode = oParent.getParent().$().find(".sapMImg");
		} else if (!$DomNode.is("img")) {
			$DomNode = $DomNode.find(".sapMImg");
		}
			
		// if is image add custom classname and inject SVG
		if ($DomNode.is("img")) {
			// add custom class
			$DomNode.addClass("uiSVGImage");
			
			// fix for ObjectPageLayout rerendering issue setting "sapMNoImg" on $DomNode
			$DomNode.removeClass("sapMNoImg");
			
			// inject SVG
			SVGInjector($DomNode);
		}
	};	
	
	/* sap.m.MessageStrip */
	
	MessageStrip.prototype.onAfterRendering = function() {
		if (_fnIsSVG(this.getCustomIcon())) {
			// replace SVG with embedded version
			SVGInjector(this.$().find(".sapMMsgStripIcon img"));
		}
	};
	
	MessageStrip.prototype.setCustomIcon = function(sCustomIcon) {
		// skip same image src
		if (sCustomIcon === this.getCustomIcon()) {
			return this;
		}
		
		this.setProperty("customIcon", sCustomIcon, !_fnIsSVG(sCustomIcon));	
	};
	
	/* sap.ui.unified.MenuItem */
	
	MenuItem.prototype.onAfterRendering = function() {
		if (_fnIsSVG(this.getIcon())) {
			// replace SVG with embedded version
			SVGInjector(this.$().find(".sapUiMnuItmIco img"));
		}
	};
	
	MenuItem.prototype.setIcon = function(sIcon) {
		_fnSetIconProperty(this, "icon", sIcon);
	};	

	/* sap.ui.unified.MenuTextFieldItem */
	
	MenuTextFieldItem.prototype.onAfterRendering = function() {
		if (_fnIsSVG(this.getIcon())) {
			// replace SVG with embedded version
			SVGInjector(this.$().find(".sapUiMnuItmIco img"));
		}
	};
	
	MenuTextFieldItem.prototype.setIcon = function(sIcon) {
		_fnSetIconProperty(this, "icon", sIcon);
	};	
	
	/* sap.m.NotificationListBase */
	
	NotificationListBase.prototype.setAuthorPicture = function(sAuthorPicture) {
		// skip same image src
		if (sAuthorPicture === this.getAuthorPicture()) {
			return this;
		}
		
		this.setProperty("authorPicture", sAuthorPicture, true);
		//_fnSetIconProperty(this, "authorPicture", sAuthorPicture);
		
		var oImage = this.getAggregation("_authorImage");
		
		if (oImage) {
			_fnSetIconProperty(oImage, "src", sAuthorPicture);
		}
	};	
	
}, /* bExport= */ false);