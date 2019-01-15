/*jslint browser: true */
/*jslint for:true */
/*global window */
////////////////////////////////////////////////////////////////////////////////
// NAME
//   Smart Transfer Warning
// FILE
//   smart_transfer_warning.js
// SYNOPSIS
//   When creating Smart Transfer package, visually end-user users if an entered
//   filepath does not meet requirements.
// DESCRIPTION
//   Textarea is polled ever .25 seconds.  If textarea is modified, each row
//   is tested against a regular expression pattern of a filepath.  False
//   match results an added red background color and information about the row
//   who's match failed.
//  NOTES
//    Version: 1.0
//    Author: Michael Stine
//    Creation Date: 20190114
//  EXAMPLE
//    PASS
//      /faspex_packages/a/hello.txt
//      /faspex_packages/a/b/
//    FAIL
//      /not_faspex_packages/not_a/hi.text
//      /
//      /faspex_packages/
////////////////////////////////////////////////////////////////////////////////
(function () {
    'use strict';
    alert('hello');
    ////////////////////////////////////////////////////////////////////////////
    // This function registers a function with an event.  The function and event
    // are passed by paramaters.  If the event has already been registered to
    // another function, do not overwrite original function, but run after.
    function addEvent(element, eventName, fn) {
        if (element.addEventListener) {
            element.addEventListener(eventName, fn, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + eventName, fn);
        }
    }
    ////////////////////////////////////////////////////////////////////////////
    // fire after entire page loads
    addEvent(window, 'load', function () {
        // Textarea element user inputs filepaths into
        var pathsTextarea = document.getElementById('transfer_source_paths');
        if (pathsTextarea !== null) {
            //var chooseSourceItemsButton = document.getElementById('transfer_source_browse');
            var sourceItemsLabel = document.getElementById('source_path_label');
            // Requirements information for end-user, placed before "Source Items"
            var helpSpan = document.createElement('span');
            helpSpan.style.color = '#ff9933';
            helpSpan.style.cssFloat = 'right';
            helpSpan.style.marginRight = '3px';
            helpSpan.innerHTML += '*(Required Path Prefix) <i>/faspex_packages/a/';
            sourceItemsLabel.parentNode.insertBefore(helpSpan, sourceItemsLabel);
            // Warnings display for end-user, placed after "Source Items"
            var warningsDiv = document.createElement('label');
            warningsDiv.style.color = '#D8000C';
            sourceItemsLabel.parentNode.insertBefore(warningsDiv, sourceItemsLabel.nextSibling);
            // Regular Expresion pattern that each line in the pathsTextarea must match.
            var requiredPathPattern = new RegExp(/^\s*\/faspex_packages\/a\/\S+\s*$/);
            // Used by interval to keeps track of the previous textarea value
            var previousValue = '';
            // fire every .25 seconds
            setInterval(function () {
                var currentValue = pathsTextarea.value;
                // test if textarea value has changed
                if (previousValue !== currentValue) {
                    // split string delimited by mac(\r), or linux(\n) or win(\rn) linebreaks into array
                    var lines = currentValue.split(/\r?\n|\r/);
                    // loop through each lines and test regex match
                    var warningsMessage = '';
                    var i;
                    var line;
                    for (i = 0; i < lines.length; i += 1) {
                        line = lines[i];
                        if (line.length > 0 && requiredPathPattern.test(line) === false) {
                            warningsMessage += '*Invalid Path <i>"' + line + '"</i><br />';
                        }
                    }
                    // display or clear warning
                    if (warningsMessage.length > 0) {
                        pathsTextarea.style.backgroundColor = '#FFBABA';
                        warningsDiv.innerHTML = warningsMessage;
                    } else {
                        pathsTextarea.style.backgroundColor = '';
                        warningsDiv.innerHTML = '';
                    }
                    //set previous value to current value, and test again in .25 seconds
                    previousValue = currentValue;
                } // end of if textarea value changed
            }, 250); // end of interval scheduler
        } // end of textarea not null
    }); // end of addEvent call
}()); // end of Smart Transfer Warnings
/* end */
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
