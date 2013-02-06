/**
 * @license RequireJS html 0.0.1 Copyright (c) 2012-2012, Gabriel Reitz Giannattasio All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/gartz/html for details
 */
/*jslint regexp: true */
/*global define: false */
  
define(['text'], function (text) {
    'use strict';

    var html = {
        load: function (name, req, load, config) {
            req(['text!' + name], function (value) {
                var doc = document.createDocumentFragment();
                var re = /<html(.*)<\/html|<head(.*)<\/head/gi;
                var match = !!value.match(re);
                
                var el = document.createElement(match ? 'html' : 'body');
                el.innerHTML = value;
                
                if (el.children) {
                    for (var i = 0, max = el.children.length; i < max; i++) {
                        doc.appendChild(el.children[0]);
                    }
                }
                
                var stash = doc.cloneNode(true);
                
                doc.stash = function () {
                    this.appendChild(stash.cloneNode(true));
                };
                
                doc.path = name;
                doc.source = value;
                
                load(doc);
            });
        }
    };

    return html;
});