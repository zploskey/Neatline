<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


/**
 * Get the `webDir` attribute on the filesystem adapter.
 */
function nl_getWebDir()
{
    $options = Zend_Registry::get('storage')->getAdapter()->getOptions();
    return $options['webDir'];
}


/**
 * Inject a new filesystem adapter with a custom `webDir`.
 *
 * @param string $dir The custom path.
 */
function nl_setWebDir($dir)
{

    // Create a new adapter with the path.
    $adapter = new Omeka_Storage_Adapter_Filesystem(array(
        'webDir' => $dir
    ));

    // Set the adapter on the storage.
    Zend_Registry::get('storage')->setAdapter($adapter);

}
