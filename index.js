exports.handler = (event, context, callback) => {

    console.log('Query:', event.query);

    var jsdom   = require("jsdom");
    var fs      = require("fs");
    var express = require("express");
    var fs      = require("fs");
    var jquery  = fs.readFileSync("node_modules/jquery/dist/jquery.js", "utf-8");

    var url;

    if( event.query && event.query.url ) {
        url = event.query.url;

        jsdom.env({
            url: url,
            userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B329 Safari/8536.25",
            src: [jquery],
            done: function (err, window) {

                var $ = window.$;

                var viewportTag = $("meta[name='viewport']");
                var contentAttr = viewportTag.attr("content");

                if( contentAttr ) {
                    var result = {};
                    var contentDirectives = contentAttr.split(",");
                    contentDirectives.forEach(function(directive) {
                        var directiveSplit = directive.split("=");
                        result[ directiveSplit[0].toString().replace(/\s/g, "") ] = directiveSplit[1];
                    });
                    context.succeed(JSON.stringify(result));
                } else {
                    context.succeed(JSON.stringify({ "width": "1100px", "user-scalable": "1" }));
                }
            }
        });

    } else {
        context.succeed("URL wasn't provided.");
    }



}
