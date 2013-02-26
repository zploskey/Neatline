
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Record list controller.
 *
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Editor.Records', function(
  Records, Neatline, Backbone, Marionette, $, _) {


  Records.Router = Backbone.Router.extend({


    routes: {
      '': 'records',
      'records(/search)(/query=:q)(/start=:s)': 'records'
    },


    before: function() {
      Neatline.vent.trigger('editor:router:before');
      Neatline.execute('editor:clearContainer');
    },


    /**
     * Show the list of records.
     *
     * @param {String} query: The search query.
     * @param {String} start: The paging offset.
     */
    'records': function(query, start) {
      Neatline.execute('editor:menu:display');
      Neatline.execute('editor:search:display');
      Neatline.execute('editor:records:display');
      Neatline.execute('editor:menu:activateTab', 'records');
      Neatline.execute('editor:search:initialize', query, start);
    }


  });


});
