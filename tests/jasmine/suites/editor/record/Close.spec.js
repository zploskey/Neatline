
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Record Form Close', function() {


  var el;


  beforeEach(function() {

    NL.loadEditor();
    NL.showRecordForm(NL.json.RecordFormClose.record);

    el = {
      close: NL.vw.RECORD.$('a[name="close"]')
    };

  });


  it('should close the form when "Close" is clicked', function() {

    // --------------------------------------------------------------------
    // When the "X" button at the top of the record edit form is clicked,
    // the form should disappear and the record list should be displayed.
    // --------------------------------------------------------------------

    // Click "X".
    el.close.trigger('click');

    // Records list should be visible.
    expect(NL.vw.EDITOR.__ui.editor).not.toContain(NL.vw.RECORD.$el);
    expect(NL.vw.EDITOR.__ui.editor).toContain(NL.vw.RECORDS.$el);

  });


  it('should refresh the exhibit', function() {

    // --------------------------------------------------------------------
    // When the form is closed, the exhibit should be refreshed to clear
    // out any unsaved geometry changes.
    // --------------------------------------------------------------------

    spyOn(Neatline.vent, 'trigger').andCallThrough();

    // Move the point to a different location.
    var feature = NL.vw.MAP.editLayer.features[0];
    NL.vw.MAP.controls.edit.feature = feature;
    feature.geometry.x = 3;
    feature.geometry.y = 4;

    // Trigger modification.
    NL.vw.MAP.controls.edit.dragComplete();

    // Click "X".
    el.close.trigger('click');

    // Should refresh the exhibit.
    expect(Neatline.vent.trigger).toHaveBeenCalledWith('refresh', {
      source: 'E:RECORD'
    });

    // Respond with original geometry.
    NL.respondMap200(NL.json.RecordFormClose.records);

    // Should revert to the saved geometry.
    var layer = NL.vw.MAP.getVectorLayers()[0];
    expect(layer.features[0].geometry.x).toEqual(1);
    expect(layer.features[0].geometry.y).toEqual(2);

  });


});
