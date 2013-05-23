<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


/**
 * Define a 3-tier ACL:
 *
 *  - Researchers can create/update/delete their own exhibits and records
 *  inside their own exhibits. They can also update and delete records in
 *  their own exhibits that were created by other users.
 *
 *  - Contributors have all the same privileges as Researchers, but with
 *  the added ability to create/update/delete their own records in _other_
 *  users' exhibits. They can't update/delete other users' records in
 *  other users' exhibits, and can't update/delete other users' exhibits.
 *
 *  - Supers and Admins can do everything.
 *
 * @param string $list A comma-delimited list.
 */
function nl_defineAcl($acl)
{


    // Register resources.
    if (!$acl->has('NeatlineExhibit')) {
        $acl->addResource('NeatlineExhibit');
    }
    if (!$acl->has('NeatlineRecord')) {
        $acl->addResource('NeatlineRecord');
    }


    $acl->deny();


    // Public:
    // --------------------------------------------------------------------

    // Anyone can view exhibits.
    $acl->allow(null, 'NeatlineExhibit', array(
        'index',
        'show',
        'browse',
        'get'
    ));

    // Anyone can view records.
    $acl->allow(null, 'NeatlineRecord', array(
        'index',
        'list',
        'get'
    ));


    // Researcher and Contributor:
    // --------------------------------------------------------------------

    $rc = array('researcher', 'contributor');

    // R&C can create exhibits.
    $acl->allow($rc, 'NeatlineExhibit', 'add');

    // R&C can edit their own exhibits.
    $acl->allow($rc, 'NeatlineExhibit', array(
        'editSelf',
        'editorSelf',
        'putSelf',
        'importSelf',
        'delete-confirm',
        'deleteSelf'
    ));
    $acl->allow($rc, 'NeatlineExhibit', array(
        'edit',
        'editor',
        'put',
        'import',
    ), new Omeka_Acl_Assert_Ownership);

    // R&C can edit their own records.
    $acl->allow($rc, 'NeatlineRecord', array(
        'postSelf',
        'putSelf',
        'deleteSelf'
    ));
    $acl->allow($rc, 'NeatlineRecord', array(
        'post',
        'put',
        'delete'
    ), new Neatline_Acl_Assert_ExhibitOrRecordOwnership);


    // Contributor:
    // --------------------------------------------------------------------

    // Contributors can access the editor for all exhibits.
    $acl->allow('contributor', 'NeatlineExhibit', 'editor');


    // Super and Admin:
    // --------------------------------------------------------------------

    // Supers and admins can do everything.
    $acl->allow(array('super', 'admin'), 'NeatlineExhibit');
    $acl->allow(array('super', 'admin'), 'NeatlineRecord');

}
