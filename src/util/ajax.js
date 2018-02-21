var ajax;

(function () {
    'use strict';

    ajax = ajax || fn;

    /**
     * @param {string} method
     * @param {string} url
     * @param {function(number, Object)} callback
     */
    function fn(method, url, callback) {
        var req = new XMLHttpRequest();
        req.open(method, url, true);
        req.onreadystatechange = function (aEvt) {
            if (req.readyState == 4) {
                callback(
                    req.status,
                    JSON.parse(req.responseText)
                );
            }
        };
        req.send(null);
    }
})();
