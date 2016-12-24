# ui5-control-svgimage
UI5 SVGImage control to embed svg image

# SVGImage

_UI5 svg image control_

SVGImage embedds referenced svg files by replacing DOM image with embedded SVG object.

See (https://github.com/hschaefer123/ui5-control-svgimage) for complete docs and demos.

## Install

### Download

+ [masonry.pkgd.js](https://github.com/desandro/masonry/raw/master/dist/masonry.pkgd.js) un-minified, or
+ [masonry.pkgd.min.js](https://github.com/desandro/masonry/raw/master/dist/masonry.pkgd.min.js) minified

### CDN

Link directly to Masonry files on [unpkg](https://unpkg.com/).

``` html
<script src="https://unpkg.com/masonry-layout@4.1/dist/masonry.pkgd.js"></script>
<!-- or -->
<script src="https://unpkg.com/masonry-layout@4.1/dist/masonry.pkgd.min.js"></script>
```

### Package managers

Bower: `bower install ui5-control-svgimage --save`

[npm](https://www.npmjs.com/package/masonry-layout): `npm install ui5-control-svgimage --save`

## Initialize

With UI5

``` js
new ui5.control.SVGImage({
	src : "{svg/OpenUI5.svg}"
});
```

With XMLView

Add a `data-masonry` attribute to your element. Options can be set in JSON in the value.

``` html
xmlns:uc="openui5.control"
...
<uc:SVGImage src="svg/OpenUI5.svg" />
```

## License

SVGImage is released under the [MIT license](http://desandro.mit-license.org). Have at it.

* * *

Made by Holger Schäfer
=======
UI5 SVGImage control to embed svg image 

# bower register using
$ bower register ui5-control-svgimage git://github.com/hschaefer123/ui5-control-svgimage.git