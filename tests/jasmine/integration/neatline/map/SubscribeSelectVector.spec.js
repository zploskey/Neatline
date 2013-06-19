
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Map | Subscribe `select` (Vector Layers)', function() {


  var model, fx = {
    records: readFixtures('NeatlineMapSubscriptions.records.json'),
    record:  readFixtures('NeatlineMapSubscriptions.record.json')
  };


  beforeEach(function() {
    NL.loadNeatline();
  });


  it('should focus when a layer already exists', function() {

    // --------------------------------------------------------------------
    // When `select` is triggered with a record that has a vector layer
    // on the map, the map should focus on the existing layer.
    // --------------------------------------------------------------------

    NL.respondMap200(fx.records);

    // Get layer, cache request count.
    var layer = NL.vw.MAP.getVectorLayers()[0];
    var count = NL.server.requests.count;

    Neatline.vent.trigger('select', { model: layer.nModel });

    // Should not load record from server.
    expect(NL.server.requests.count).toEqual(count);

    // Map should focus.
    NL.assertMapViewport(100, 200, 10);

  });


  it('should create layer and focus when no layer exists', function() {

    // --------------------------------------------------------------------
    // When `select` is triggered with a record that does _not_ have a
    // vector layer on the map, the map should create a new layer for the
    // record and focus on it.
    // --------------------------------------------------------------------

    // Create model with no vector layer.
    var model = NL.recordFromJson(fx.record);
    var count = NL.server.requests.count;

    Neatline.vent.trigger('select', { model: model });

    // Should not load record from server.
    expect(NL.server.requests.count).toEqual(count);

    // New layer should be created for model.
    var layer = NL.vw.MAP.getVectorLayers()[0];
    expect(layer.features[0].geometry.x).toEqual(1);
    expect(layer.features[0].geometry.y).toEqual(2);

    // Map should focus.
    NL.assertMapViewport(100, 200, 10);

  });


  it('should reselect currently selected layer after ingest', function() {

    // --------------------------------------------------------------------
    // When a layer is selected and the map is refreshed, the previously-
    // selected layer should be re-selected after the new layers are added
    // to the map (it will be automatically unselected when the highlight
    // and select controls are updated with the new set of layers).
    // --------------------------------------------------------------------

    NL.respondMap200(fx.records);

    // Select model for the vector layer.
    var layer = NL.vw.MAP.getVectorLayers()[0];
    Neatline.vent.trigger('select', { model: layer.nModel });

    // Ingest fresh records.
    NL.refreshMap(fx.records);

    // Should re-select layer.
    NL.assertSelectIntent(layer);

  });


  it('should not focus when feature is clicked', function() {

    // --------------------------------------------------------------------
    // When a map feature is clicked, the map should _not_ focus on the
    // record that corresponds to the clicked feature. This prevents
    // disorienting leaps that can occur when the record's zoom level is
    // much higher is much higher or lower the current map zoom.
    // --------------------------------------------------------------------

    NL.respondMap200(fx.records);
    var feature = NL.vw.MAP.getVectorLayers()[0].features[0];

    // Set center and zoom.
    NL.setMapCenter(200, 300, 15);

    // Click on feature.
    NL.clickOnMapFeature(feature);

    // Focus should be unchanged.
    NL.assertMapViewport(200, 300, 15);

  });


});