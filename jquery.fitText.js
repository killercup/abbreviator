/**
 * fitText jQuery Plugin (jQuery >= 1.2.x)
 *
 * Usage:
 *
 *   $('#mydiv').fitText(); // Autofit mydiv's innerHTML content horizontally by downsizing the font-size
 *
 * This work is distributed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2009 Pascal Hertleif - switching from "..." to downsizing the font
 * 
 * Based on "Abbreviator jQuery Plugin":
 *  Have a look at http://bentlegen.github.com/abbreviator
 *  Copyright 2008 Ben Vinegar [ ben ! benlog dot org ]
 *  Copyright 2009 Chris Hoffman - would wrap when lengths were exactly the same
 */

(function($) {
  $(function() {
    // NOTE: We have to use a <span> inside a max-width <div> for IE6
    $('body').append('\
      <div id="fittext-tmp-div" style="width:9999px; left:-9999px; top:-9999px; display:block; position: absolute;">\
        <span id="fittext-tmp-span"></span>\
      </div>'
    );
  });
  
  $.fn.fitText = function(type) {
    return $(this).each(function() {
      var $this = $(this);
      
      // Grab unaltered content FIRST
      var content = $this.html();
      
      // Append our tmp div to the container element we're about
      // to abbreviate, so that it inherits the containers CSS properties
      // (font, padding, etc.)
      $("#fittext-tmp-div").appendTo(this);
      
      // Take one off for when the content exactly matches container
      // In Firefox 3 and Safari 3 the content will wrap without this
      
      if (type == "height") {
        $("#fittext-tmp-div").css({"width": $(this).width()});
        var container = $this.height() - 1;
        var content = $("#fittext-tmp-span").html(content).height();
      } else { // type == "width"
        $("#fittext-tmp-div").css({"height": $(this).height()});
        var container = $this.width() - 1;
        var content = $("#fittext-tmp-span").html(content).width();
      }
      
      // If the content fits inside the container, then skip
      // to the next element
      
      if (content <= container) {
        $('#fittext-tmp-div').appendTo('body');
        return;
      }
      
      // Instead of just removing characters one-by-one until the content
      // fits (slow), we estimate a good starting place by taking the %
      // covered in pixel space and shorten the string by that amount.
      
      var coverage = container / content;
      var l = content.length;
      
      var abbrevContent = content; //.substr(0, parseInt(l * coverage, 10));
      
      var font_size = 100; // we're using % here!
      
      if (type == "height") {
        while (($('#fittext-tmp-span').height() >= container) & (font_size > 15)) {
          font_size = font_size*0.98;
          $('#fittext-tmp-span').css({"font-size": font_size+"%"});
        }
      } else { // type == "width"
        while (($('#fittext-tmp-span').width() >= container) & (font_size > 15)) {
          font_size = font_size*0.98;
          $('#fittext-tmp-span').css({"font-size": font_size+"%"});
        }
      }
      
      // Return our tmp span back to the <body> element; otherwise it'll
      // be destroyed in the line below ...
      $('#fittext-tmp-div').appendTo('body');
      
      $this.css({"font-size": font_size+"%"});
    });
  };
})(jQuery);