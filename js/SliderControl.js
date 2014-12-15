L.Control.SliderControl = L.Control.extend({
    options: {
        position: 'topright',
        layers: null,
        maxValue: -1,
        minValue: -1,
        markers: null,
        range: false,
        activeLayers: [],
        follow: false
    },

    initialize: function (options) {
        L.Util.setOptions(this, options);
        this._layer = this.options.layer;

    },

    setPosition: function (position) {
        var map = this._map;

        if (map) {
            map.removeControl(this);
        }

        this.options.position = position;

        if (map) {
            map.addControl(this);
        }
        this.startSlider();
        return this;
    },

    onAdd: function (map) {
        this.options.map = map;

        // Create a control sliderContainer with a jquery ui slider
        var sliderContainer = L.DomUtil.create('div', 'slider', this._container);
        $(sliderContainer).append('<div id="leaflet-slider" style="width:300px"><div class="ui-slider-handle"></div><div id="slider-timestamp" style="width:300px; margin-top:10px;"></div></div>');
        //Prevent map panning/zooming while using the slider
        $(sliderContainer).mousedown(function () {
            map.dragging.disable();
        });
        $(document).mouseup(function () {
            map.dragging.enable();
            //Only show the slider timestamp while using the slider
            $('#slider-timestamp').html('');
        });

        var options = this.options;
        this.options.markers = [];

        //If a layer has been provided: calculate the min and max values for the slider
        if (this._layer) {
            this._layer.eachLayer(function (layer) {
                if (options.minValue === -1) {
                    options.minValue = layer._leaflet_id;
                }
                options.maxValue = layer._leaflet_id;
                options.markers[layer._leaflet_id] = layer;
            });
            this.options = options;
        } else {
            console.log("Error: You have to specify a layer via new SliderControl({layer: your_layer});");
        }
        return sliderContainer;
    },

    onRemove: function (map) {
        //Delete all markers which where added via the slider and remove the slider div
        for (i = this.options.minValue; i < this.options.maxValue; i++) {
            map.removeLayer(this.options.markers[i]);
        }
        $('#leaflet-slider').remove();
    },

    startSlider: function () {
        var breakPoints = [25, 1750, 8618, 18162, 27031, 27786, 29803];
        _options = this.options;
        $("#leaflet-slider").slider({
            range: _options.range,
            value: _options.minValue + 1,
            min: _options.minValue,
            max: breakPoints[6],
            step: 1,
            slide: function (e, ui) {
                var map = _options.map;

                for (var i = 0; i < breakPoints.length; i++) {
                    if (ui.value >= breakPoints[i]) {
                        var layerIsActive = false;
                        for (var j = 0; j < _options.activeLayers.length; j++) {
                            if (breakPoints[i] === _options.activeLayers[j]) {
                                layerIsActive = true;
                            }
                        }
                        if (!layerIsActive && breakPoints[i] !== breakPoints[6]) {
                           _options.map.addLayer(_options.markers[breakPoints[i]]);
                           _options.activeLayers.push(breakPoints[i]);
                        }
                        
                        if (breakPoints[i] !== breakPoints[6]) {
                            $('#slider-timestamp').html(_options.markers[breakPoints[i]].options.time.substr(0, 19));
                        }
                    } else {
                        if (ui.value < breakPoints[i] && i !== 6) {
                            for (var k = 0; k < _options.activeLayers.length; k++) {
                                if (breakPoints[i] === _options.activeLayers[k]) {
                                    _options.map.removeLayer(_options.markers[breakPoints[i]]);
                                    _options.activeLayers.splice(k, 1);
                                }
                            }
                        }
                    }
                }
            }
        });
        _options.map.addLayer(_options.markers[_options.minValue]);
        _options.activeLayers.push(_options.minValue);
    }
});

L.control.sliderControl = function (options) {
    return new L.Control.SliderControl(options);
};
