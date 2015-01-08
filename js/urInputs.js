// jQuery urInputs v4.2.0 (2015-01-08) | MIT
;(function($, undefined) {
  var UrInputs = function(element, options) {
    var container = $(element),
        self = this,
        settings = $.extend({
          replaceRadios: false,
          replaceCheckboxes: false,
          customizedClass: 'customizedElement',
          disabledClass: 'customDisabled',
          radioClass: 'customRadio',
          radioClassChecked: 'customRadioChecked',
          checkboxClass: 'customCheckbox',
          checkboxClassChecked: 'customCheckboxChecked'
        }, options || {});

    // toggle custom radio
    // after default radiobutton change
    function changeCustomRadio(radiobutton) {
      var radiobutton_name = radiobutton.attr('name'),
      radiobutton_id = radiobutton.attr('id');

      $('input[name=' + radiobutton_name + ']').each(function() {
        var rbtn = $(this),
            rbtn_custom = rbtn.data('custom');

        if (rbtn.is(':checked')) {
          rbtn_custom.addClass(settings.radioClassChecked);
        } else {
          rbtn_custom.removeClass(settings.radioClassChecked);
        }
      });
    };

    // toggle default hidden radiobutton
    // after custom radio click
    function checkDefaultRadiobutton(radiobutton) {
      if ( radiobutton.attr('disabled') ) {
        return;
      }
      var radiobutton_name = radiobutton.attr('name'),
          radiobutton_id = radiobutton.attr('id');

      $('input[name=' + radiobutton_name + ']').each(function() {
        var rbtn = $(this),
            rbtn_custom = rbtn.data('custom');

        if ( rbtn.attr('id') === radiobutton_id ) {
          rbtn.prop('checked', true);
          rbtn_custom.addClass(settings.radioClassChecked);
        } else {
          rbtn.prop('checked', false);
          rbtn_custom.removeClass(settings.radioClassChecked);
        }
      });
    };

    // toggle custom checkbox
    // after default checkbox change
    function changeCustomCheckbox(checkbox) {
      var checkbox_custom = checkbox.data('custom');

      if (checkbox.is(':checked')) {
        checkbox_custom.addClass(settings.checkboxClassChecked);
      } else {
        checkbox_custom.removeClass(settings.checkboxClassChecked);
      }
    };

    // toggle default hidden checkbox
    // after custom checkbox click
    function checkDefaultCheckbox(checkbox) {
      if ( checkbox.attr('disabled') ) {
        return;
      }

      var checkbox_custom = checkbox.data('custom');

      if (checkbox.is(':checked')) {
        checkbox.prop('checked', false);
        checkbox_custom.removeClass(settings.checkboxClassChecked);
      } else {
        checkbox.prop('checked', true);
        checkbox_custom.addClass(settings.checkboxClassChecked);
      }
    };

    // customize radiobuttons
    self.customizeRadios = function() {
      $('input:radio', container).each(function() {
        var radio = $(this);
        if ( !radio.hasClass(settings.customizedClass) ) {
          var customRadio = $('<div></div>');
          customRadio
            .addClass(settings.radioClass)
            .data('input', radio)
            .insertBefore(radio)
            .on('click.urinp', function() {
              checkDefaultRadiobutton(radio);
            });

          if ( radio.is(':checked') ) {
            customRadio.addClass(settings.radioClassChecked)
          }

          if ( radio.attr('disabled') ) {
            customRadio.addClass(settings.disabledClass);
          }

          radio
            .data('custom', customRadio)
            .addClass(settings.customizedClass)
            .on('change', function() {
              var changed = $(this),
                  changed_custom = changed.data('custom');

              if ( changed_custom ) {
                changeCustomRadio(changed);
              }
            });
        }
      });
    };

    // customize checkboxes
    self.customizeCheckboxes = function() {
      $('input:checkbox', container).each(function() {
        var checkbox = $(this);
        if ( !checkbox.hasClass(settings.customizedClass) ) {
          var customCheckbox = $('<div></div>');
          customCheckbox
            .addClass(settings.checkboxClass)
            .data('input', checkbox)
            .insertBefore(checkbox)
            .on('click.urinp', function() {
              checkDefaultCheckbox(checkbox);
            });

          if ( checkbox.is(':checked') ) {
            customCheckbox.addClass(settings.checkboxClassChecked)
          }

          if ( checkbox.attr('disabled') ) {
            customCheckbox.addClass(settings.disabledClass);
          }

          checkbox
            .data('custom', customCheckbox)
            .addClass(settings.customizedClass)
            .on('change', function() {
              var changed = $(this),
              changed_custom = changed.data('custom');

              if ( changed_custom ) {
                changeCustomCheckbox(changed);
              }
            });
        }
      });
    };

    // update custom element
    // after inputs modified
    self.updateElement = function(element) {
      var custom = element.data('custom');

      if (typeof custom === 'undefined') {
        return;
      }

      if ( element.attr('disabled') ) {
        custom.addClass(settings.disabledClass);
      }

      if ( element.attr('type') === 'radio' ) {
        if ( element.is(':checked') ) {
          custom.addClass(settings.radioClassChecked);
        } else {
          custom.removeClass(settings.radioClassChecked);
        }
      }

      if ( element.attr('type') === 'checkbox' ) {
        if ( element.is(':checked') ) {
          custom.addClass(settings.checkboxClassChecked);
        } else {
          custom.removeClass(settings.checkboxClassChecked);
        }
      }
    };

    self.update = function() {
      $('input:radio, input:checkbox', container).each(function() {
        self.updateElement( $(this) );
      });
    };

    // implementation
    self.init = function() {
      if ( settings.replaceRadios ) {
        self.customizeRadios();
      }
      if ( settings.replaceCheckboxes ) {
        self.customizeCheckboxes();
      }
    }();
  };

  $.fn.urInputs = function (options) {
    return this.each(function() {
      var container = $(this);
      if ( container.data('urInputs') ) {
        return;
      }
      var urInputs = new UrInputs(this, options);
      container.data('urInputs', urInputs);
    });
  };
})(jQuery);
