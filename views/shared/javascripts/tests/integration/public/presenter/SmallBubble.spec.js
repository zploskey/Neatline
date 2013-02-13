
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Rendering tests for small bubble.
 *
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Small Bubble', function() {


  var layer1, layer2, feature1, feature2, els;


  beforeEach(function() {

    _t.loadNeatline();

    layer1 = _t.vw.map.layers[0];
    layer2 = _t.vw.map.layers[1];

    feature1 = layer1.features[0];
    feature2 = layer2.features[0];

    els = {
      title:  _t.vw.smallBubble.$('.title'),
      body:   _t.vw.smallBubble.$('.body')
    };

  });


  afterEach(function() {
    _t.el.smallBubble.remove();
  });


  it('should show bubble on feature hover', function() {

    // --------------------------------------------------------------------
    // The bubble should be displayed when the cursor hovers on a feature.
    // --------------------------------------------------------------------

    // Hover on feature1.
    _t.hoverOnMapFeature(layer1, feature1);

    // Bubble should be visible.
    expect(_t.el.smallBubble).toBeVisible();

    // Title and body should be rendered.
    expect(els.title.text()).toEqual('_title1');
    expect(els.body.text()).toEqual('_body1');

  });


  it('should track the cursor when visible', function() {

    // --------------------------------------------------------------------
    // The bubble should track the cursor when visible and unfrozen.
    // --------------------------------------------------------------------

    // Hover on feature1.
    _t.hoverOnMapFeature(layer1, feature1);

    // Move the cursor.
    _t.vw.map.map.events.triggerEvent('mousemove', {
      xy: new OpenLayers.Pixel(0,0),
      clientX: 3,
      clientY: 4
    });

    // Bubble should track the cursor.
    var offset = _t.el.smallBubble.offset();
    expect(offset.left).toEqual(3+_t.vw.smallBubble.options.padding.x);
    expect(offset.top).toEqual(4-_t.vw.smallBubble.options.padding.y);

  });


  it('should hide bubble on feature unhover', function() {

    // --------------------------------------------------------------------
    // The bubble should be hidden when the cursor leaves a feature.
    // --------------------------------------------------------------------

    // Highlight feature, then unhighlight.
    _t.hoverOnMapFeature(layer1, feature1);
    _t.unHoverOnMapFeature(_t.vw.map.layers);

    // Bubble should be visible.
    expect(_t.el.smallBubble).not.toBeVisible();

  });


  it('should hide bubble when the cursor leaves the exhibit', function() {

    // --------------------------------------------------------------------
    // The bubble should be hidden when the cursor leaves the exhibit.
    // --------------------------------------------------------------------

    // Move cursor out of the exhibit.
    _t.hoverOnMapFeature(layer1, feature1);
    _t.triggerMapMouseout();

    // Bubble should be visible.
    expect(_t.el.smallBubble).not.toBeVisible();

  });


  it('should freeze bubble on feature select', function() {

    // --------------------------------------------------------------------
    // The bubble should be frozen when a feature is selected. The bubble
    // should stop tracking the cursor and should remain visible when the
    // cursor leaves the feature1.
    // --------------------------------------------------------------------

    // Highlight feature, then select.
    _t.hoverOnMapFeature(layer1, feature1);
    _t.clickOnMapFeature(layer1, feature1);
    var offset = _t.el.smallBubble.offset();

    // Move the cursor.
    _t.vw.map.map.events.triggerEvent('mousemove', {
      xy: new OpenLayers.Pixel(0,0),
      clientX: 3,
      clientY: 4
    });

    // Bubble should not move.
    expect(_t.el.smallBubble.offset()).toEqual(offset);

    // Bubble should be visible after unhover.
    _t.unHoverOnMapFeature(_t.vw.map.layers);
    expect(_t.el.smallBubble).toBeVisible();

  });


  it('should not respond to hover events when frozen', function() {

    // --------------------------------------------------------------------
    // When the bubble is frozen and the cursor hovers over a feature for
    // a different record, the bubble should not show the data for the new
    // record and should not track the cursor.
    // --------------------------------------------------------------------

    // Hover on feature, then select.
    _t.hoverOnMapFeature(layer1, feature1);
    _t.clickOnMapFeature(layer1, feature1);
    var offset = _t.el.smallBubble.offset();

    // Hover on a different feature.
    _t.hoverOnMapFeature(layer2, feature2);

    // Bubble values should be unchanged.
    expect(els.title.text()).toEqual('_title1');
    expect(els.body.text()).toEqual('_body1');

    // Move the cursor.
    _t.vw.map.map.events.triggerEvent('mousemove', {
      xy: new OpenLayers.Pixel(0,0),
      clientX: 3,
      clientY: 4
    });

    // Bubble should not move.
    expect(_t.el.smallBubble.offset()).toEqual(offset);

  });


  it('should unselect bubble on feature unselect', function() {

    // --------------------------------------------------------------------
    // When a feature is unselected, the bubble should disappear and start
    // responding to new hover events.
    // --------------------------------------------------------------------

    // Hover on feature, then select.
    _t.hoverOnMapFeature(layer1, feature1);
    _t.clickOnMapFeature(layer1, feature1);

    // Unselect the feature.
    _t.clickOffMapFeature(_t.vw.map.layers);

    // Bubble should disappear.
    expect(_t.el.smallBubble).not.toBeVisible();

    // Hover on a different feature.
    _t.hoverOnMapFeature(layer2, feature2);
    var offset = _t.el.smallBubble.offset();

    // Bubble values should be changed.
    expect(els.title.text()).toEqual('_title2');

    // Move the cursor.
    _t.vw.map.map.events.triggerEvent('mousemove', {
      xy: new OpenLayers.Pixel(0,0),
      clientX: 3,
      clientY: 4
    });

    // Bubble should track the cursor.
    expect(_t.el.smallBubble.offset()).not.toEqual(offset);

  });


  it('should hide the bubble on deactivate', function() {

    // --------------------------------------------------------------------
    // When the bubble is visible and the presenter is deactivated, the
    // bubble should disappear.
    // --------------------------------------------------------------------

    // Hover on feature, then select.
    _t.hoverOnMapFeature(layer1, feature1);
    _t.clickOnMapFeature(layer1, feature1);

    // Deactivate the presenter.
    Neatline.execute('presenter:deactivate');

    // Bubble should disappear.
    expect(_t.el.smallBubble).not.toBeVisible();

  });


  it('should not respond to cursor events when deactivated', function() {

    // --------------------------------------------------------------------
    // When the presenter is deactivated, the bubble should not respond to
    // hover or select events.
    // --------------------------------------------------------------------

    // Deactivate the presenter.
    Neatline.execute('presenter:deactivate');

    // Hover on feature1.
    _t.hoverOnMapFeature(layer1, feature1);

    // Bubble should not be visible.
    expect(_t.el.smallBubble).not.toBeVisible();

    // Click on feature1.
    _t.clickOnMapFeature(layer1, feature1);

    // Bubble should not be visible.
    expect(_t.el.smallBubble).not.toBeVisible();

  });


  it('should responding to hover events when activated', function() {

    // --------------------------------------------------------------------
    // When the presenter is re-activated after being deactivated, the
    // bubble should start responding to hover and select events.
    // --------------------------------------------------------------------

    // Deactivate and activate the presenter.
    Neatline.execute('presenter:deactivate');
    Neatline.execute('presenter:activate');

    // Hover on feature1.
    _t.hoverOnMapFeature(layer1, feature1);

    // Bubble should be visible.
    expect(_t.el.smallBubble).toBeVisible();

  });


});