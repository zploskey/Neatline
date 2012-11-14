<?php

/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2; */

/**
 * Javascript templates.
 *
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

?>

<!-- Records container. -->
<script id="record-list" type="text/templates">
  <ul class="records"></ul>
</script>

<!-- Listing for individual record. -->
<script id="record-row" type="text/templates">
  <span class="record-title"><%= title %></span>
</script>


<!-- Record edito form. -->
<script id="edit-form" type="text/templates">

  <form class="form-stacked">

    <h3 class="head"></h3>

    <ul class="nav nav-tabs">
      <li><a href="#form-text" data-toggle="tab">Text</a></li>
      <li><a href="#form-spatial" data-toggle="tab">Spatial</a></li>
      <li><a href="#form-style" data-toggle="tab">Style</a></li>
    </ul>

    <div class="tab-content">

      <div class="tab-pane" id="form-text">

        <div class="control-group">
          <label for="title"><?php echo __('Title'); ?></label>
          <div class="controls">
            <textarea name="title"></textarea>
          </div>
        </div>

        <div class="control-group">
          <label for="description"><?php echo __('Body'); ?></label>
          <div class="controls">
            <textarea name="body"></textarea>
          </div>
        </div>

      </div>

      <div class="tab-pane" id="form-spatial">
      </div>

      <div class="tab-pane" id="form-style">

        <label><?php echo __('Shape Color'); ?></label>
        <div class="controls">
          <div class="inline-inputs">
            <input type="text" name="vector-color" />
          </div>
        </div>

        <label><?php echo __('Line Color'); ?></label>
        <div class="controls">
          <div class="inline-inputs">
            <input type="text" name="stroke-color" />
          </div>
        </div>

        <label><?php echo __('Selected Color'); ?></label>
        <div class="controls">
          <div class="inline-inputs">
            <input type="text" name="select-color" />
          </div>
        </div>

        <label><?php echo __('Shape Opacity'); ?></label>
        <div class="controls">
          <div class="inline-inputs">
            <input type="text" name="vector-opacity" />
          </div>
        </div>

        <label><?php echo __('Selected Opacity'); ?></label>
        <div class="controls">
          <div class="inline-inputs">
            <input type="text" name="select-opacity" />
          </div>
        </div>

        <label><?php echo __('Line Opacity'); ?></label>
        <div class="controls">
          <div class="inline-inputs">
            <input type="text" name="stroke-opacity" />
          </div>
        </div>

        <label><?php echo __('Graphic Opacity'); ?></label>
        <div class="controls">
          <div class="inline-inputs">
            <input type="text" name="graphic-opacity" />
          </div>
        </div>

        <label><?php echo __('Line Width'); ?></label>
        <div class="controls">
          <div class="inline-inputs">
            <input type="text" name="stroke-width" />
          </div>
        </div>

        <label><?php echo __('Point Radius'); ?></label>
        <div class="controls">
          <div class="inline-inputs">
            <input type="text" name="point-radius" />
          </div>
        </div>

        <div class="control-group">
          <label><?php echo __('Point Graphic'); ?></label>
          <div class="controls">
            <div class="inline-inputs">
              <input name="point-image" type="text" />
            </div>
          </div>
        </div>

        <div class="control-group">
          <div class="controls">
            <div class="inline-inputs">
              <button name="map-focus" class="btn">
                <?php echo __('Set Map Focus'); ?>
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>

    <div class="fieldset">
      <div class="form-actions">
        <button name="save" class="btn btn-large btn-primary">
          <?php echo __('Save'); ?>
        </button>
        <button name="close" class="btn btn-large">
          <?php echo __('Close'); ?>
        </button>
      </div>
    </div>

  </form>

</script>
