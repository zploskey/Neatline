
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Data access helpers.
 *
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


/**
 * Get DOM collection of editor record listings.
 *
 * @return {Array}: The DOM collection of <a> elements.
 */
_t.getRecordRows = function() {
  return this.el.records.find('a');
};


/**
 * Get DOM collection of editor tag listings.
 *
 * @return {Array}: The DOM collection of <a> elements.
 */
_t.getTagRows = function() {
  return this.el.tags.find('a');
};


/**
 * Get the array of models from the record list collection.
 *
 * @return {Array}: The models.
 */
_t.getRecordModels = function() {
  return Neatline.Editor.Records.__collection.models;
};


/**
 * Get the array of models from the tag list collection.
 *
 * @return {Array}: The models.
 */
_t.getTagModels = function() {
  return Neatline.Editor.Tags.__collection.models;
};


/**
 * Get vector layers on the map.
 *
 * @return {Array}: The layers.
 */
_t.getVectorLayers = function() {

  // Filter for features.length > 0.
  return this.vw.map.map.getLayersBy('features', {
    test: function(prop) {
      return !_.isUndefined(prop) && prop.length > 0;
    }
  });

};


/**
 * Get the vector layer by record title.
 *
 * @param {String} title: The record title.
 * @return {Object}: The layer.
 */
_t.getVectorLayerByTitle = function(title) {

  // Get map layers.
  var layers = this.getVectorLayers();

  // Search layers for title.
  return _.find(layers, function(layer) {
    return layer.name == title;
  });

};


/**
 * Construct a record model instance from a JSON string.
 *
 * @param {String} json: The JSON string.
 * @return {Object} model: The model.
 */
_t.buildModelFromJson = function(json) {
  return new Neatline.Record.Model(JSON.parse(json));
};


/**
 * Get DOM selections for the elements on the record form.
 *
 * @return {Object}: A hash of elements.
 */
_t.getRecordFormElements = function(json) {
  return {
    lead:           _t.el.record.find('p.lead'),
    title:          _t.el.record.find('textarea[name="title"]'),
    body:           _t.el.record.find('textarea[name="body"]'),
    coverage:       _t.el.record.find('textarea[name="coverage"]'),
    tags:           _t.el.record.find('input[name="tags"]'),
    vectorColor:    _t.el.record.find('input[name="vector-color"]'),
    strokeColor:    _t.el.record.find('input[name="stroke-color"]'),
    selectColor:    _t.el.record.find('input[name="select-color"]'),
    vectorOpacity:  _t.el.record.find('input[name="vector-opacity"]'),
    selectOpacity:  _t.el.record.find('input[name="select-opacity"]'),
    strokeOpacity:  _t.el.record.find('input[name="stroke-opacity"]'),
    imageOpacity:   _t.el.record.find('input[name="image-opacity"]'),
    strokeWidth:    _t.el.record.find('input[name="stroke-width"]'),
    pointRadius:    _t.el.record.find('input[name="point-radius"]'),
    minZoom:        _t.el.record.find('input[name="min-zoom"]'),
    maxZoom:        _t.el.record.find('input[name="max-zoom"]'),
    pointImage:     _t.el.record.find('input[name="point-image"]'),
    mapFocus:       _t.el.record.find('input[name="map-focus"]'),
    mapZoom:        _t.el.record.find('input[name="map-zoom"]')
  };
};
