
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Records list public API.
 *
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Editor.Records', function(
  Records, Neatline, Backbone, Marionette, $, _) {


  /**
   * Append the list to the editor container.
   */
  var display = function() {
    Records.__view.showIn(Neatline.request('editor:getContainer'));
  };
  Neatline.commands.addHandler('editor:records:display', display);


  /**
   * Query for new records.
   *
   * @param {Object} params: The query parameters.
   */
  var load = function(params) {
    Records.__collection.update(params, function(records) {
      ingest(records);
    });
  };
  Neatline.commands.addHandler('editor:records:load', load);


  /**
   * Render a records collection in the list.
   *
   * @param {Object} records: The collection of records.
   */
  var ingest = function(records) {
    Records.__view.ingest(records);
  };
  Neatline.commands.addHandler('editor:records:ingest', ingest);


  /**
   * Navigate to the record list.
   */
  var navToList = function() {
    Records.__router.navigate('records', true);
  };
  Neatline.commands.addHandler('editor:records:navToList', navToList);


});
