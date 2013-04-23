
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Editor.Exhibit.Search', function(
  Search, Neatline, Backbone, Marionette, $, _) {


  this.ID = 'EDITOR:EXHIBIT:SEARCH';


  this.addInitializer(function() {
    this.__view = new Search.View();
  });


});
