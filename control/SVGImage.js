sap.ui.define([
    "sap/m/Image",
    "jquery.sap.global"
    ],
	function(Image, jQuery) {
	"use strict";

	return Image.extend("de.blogspot.control.SVGImage", {
		
		bInitial : true,
		
		metadata: {
			properties: {
				/**
				 * markdown text
				 */
				markdown: {
					type: "string"
				},
				/**
				 * Relative or absolute path to URL where the markdown can be found
				 */
				src : {type : "sap.ui.core.URI", group : "Data", defaultValue : null}
			}
		},
		
		init : function() {
			// shortcuts
			this.sControlId = this.getId();
			
		},	
		
		/* add nothing, just inherit the ButtonRenderer as is; 
		** In this case (since the renderer is not changed) you could also specify this explicitly with:  renderer:"sap.ui.commons.ButtonRenderer"
		**(means you reuse the ButtonRenderer instead of creating a new view */
		renderer: {}
		
	});
});