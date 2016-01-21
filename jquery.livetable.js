/**
 * Simple jQuery plugin to edit tables in realtime
 *
 * @author David Lima
 * @copyright 2016, David Lima
 */
$.fn.liveTable = function(options, action) {
  if (action == 'appendrow') {
    var table = $(this),
        tdCount = table.find('thead tr:first th').length,
        tr = $('<tr></tr>')

    for (var i = 0; i < tdCount; i ++) {
      tr.append($('<td></td>').css('height', table.find('td').first().height()));
    }

    table.find('tbody').append(tr);
  }

/**
 * Available options
 */
  var settings = $.extend({
    afterChange: null, // Callback after update an <td> text
    ignore: '.livetable-ignore' // Not editable <td> elements
  }, options );

  return $(this).each(function() {
    var table = $(this);

    table.find('tbody td').on('click', function() {
      var td = $(this),
          tdText = td.text();
      
      if (td.hasClass(settings.ignore)) {
        return false;
      }

      var keydownEvent = jQuery.Event('keydown');
      keydownEvent.which = 13;
      keydownEvent.shiftKey = true;
      table.find('td').not(this).find('textarea').trigger(keydownEvent);

      if (! td.data('editing')) {
        td.text('');
        textarea = $('<textarea></textarea>').css({
          'background': '#FFFFBA',
          'resize': 'none',
          'height': td.height(),
          'border': 'none',
          'outline': 'none',
          'white-space': 'pre',
          'width': '100%'
        }).text(tdText).appendTo(td);
        textarea.focus();

        textarea.on('keydown', function(e) {
          if (e.which == 8 && e.shiftKey && textarea.val() == '') {
            td.parent('tr').remove();
          }

          var totalLines = textarea.val().match(/\n/g);
          if (totalLines) {
            totalLines = totalLines.length;
            totalLines += 3;
            textarea.css('height', totalLines * parseInt(textarea.css('line-height')));
          } else {
            textarea.css('height', td.height());
          }
          if (e.which == 13 && e.shiftKey) {
            newText = textarea.val();
            textarea.remove();
            td.text(newText);
            td.data('editing', false);

            if (settings.afterChange) {
              settings.afterChange(td, tdText, newText);
            }
          }
        });
        td.data('editing', true);
        textarea.trigger('keydown');
      }
    });
  });
}
