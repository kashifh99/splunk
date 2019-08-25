define(['underscore', 'jquery', 'util/console'], function (_, $, console) {

    var HTML_COMMENTS_PATTERN = /<!--.+?-->/gmi;
    var BAD_NODE_SELECTOR = 'script,base,link,meta,head,*[type="text/javascript"]';
    //var ALLOWED_URLS = /^(?:\/[^\/]|https?:|#)/g;
    var BAD_URL_SCHEMES = /(?:javascript|jscript|livescript|vbscript|data|about|mocha):/i;
    var WITH_SCRIPT = /<script>(.*?)<\/script>/i;
    var WITH_MULTI_LINE_SCRIPT = /<script>(.+)((\s)+(.+))+<\/script>/i;
    var EVENT_HANDLER_ATTRIBUTE_PREFIX = "on";
    var CSS_NODE_SELECTOR = 'style';
    var CSS_EXPRESSION_PATTERN = /(^|[\s\W])expression(\s*\()/gmi;
    var CSS_EXPRESSION_REPLACE = '$1no-xpr$2';
    var URL_ATTRIBUTES = {
        link: ['href'],
        applet: ['code', 'object'],
        iframe: ['src', 'srcdoc'],
        img: ['src'],
        embed: ['src'],
        layer: ['src'],
        a: ['href']
    };
    function removeBadNodes($root, options) {
        var badNodeSelector = BAD_NODE_SELECTOR;
        if (options.additionalBadNodeSelector) {
            badNodeSelector += (',' + options.additionalBadNodeSelector);
        }
        if($root.is(badNodeSelector)) {
            return $([]);
        }
        $root.find(badNodeSelector).remove();
        return $root;
    }

    function cleanupUrl(url) {
        var decodedURI = $.trim(url || '');
        try {
            decodedURI = decodeURIComponent(decodedURI);
        } catch (err) {
            console.log('Caught an exception: ' + err);
            decodedURI = _.unescape(decodedURI);
        }
        return decodedURI.replace(/\s/gmi, '');
    }

    function isBadUrl(url) {
        return BAD_URL_SCHEMES.test(cleanupUrl(url));
    }

    function isBadNodeValue(val) {
        var convertedStr = (_.unescape($.trim(val || ''))).replace(/\s/gmi, '');
        return BAD_URL_SCHEMES.test(convertedStr) || WITH_MULTI_LINE_SCRIPT.test(convertedStr) || WITH_SCRIPT.test(convertedStr);
    }

    function cleanAttributes($root) {
        _($root).each(function (node) {
            var $node = $(node),
                nodeName = (node.tagName||'').toLowerCase(),
                attrs = node.attributes,
                badNodes= [];
            if (nodeName === 'embed'){
                $node.attr('allowScriptAccess', 'never');
                $node.attr('allownetworking', 'internal');
            }
            _.each(attrs, function (attr) {
                if (attr) {
                    var attrName = attr.name.toLowerCase();
                    if ((attrName.indexOf(EVENT_HANDLER_ATTRIBUTE_PREFIX) === 0) || isBadNodeValue(attr.nodeValue)) {
                        badNodes.push(attr.name);
                    } else {
                        var urlAttrs = URL_ATTRIBUTES[nodeName];
                        if (urlAttrs && _(urlAttrs).contains(attrName)) {
                            if (isBadUrl(attr.value)) {
                                $node.attr(attr.name, '#');
                            }
                        }
                    }
                }
            });

            // removal of nodes needs to happen after the node check occurs
            _.each(badNodes, function (attr) {
                $node.removeAttr(attr);
            });

            _($node.children()).chain().map($).each(cleanAttributes);
        });
    }

    function stripComments(txt) {
        return txt.replace(HTML_COMMENTS_PATTERN, '');
    }

    function cleanStylesheets($root) {
        _($('<div />').append($root).find(CSS_NODE_SELECTOR)).each(cleanStylesheet);
    }

    function cleanStylesheet(styleNode) {
        var $style = $(styleNode);
        var cssText = $style.html();
        var newText = cleanCssText(cssText);
        if (cssText != newText) {
            $style.text(newText);
        }
    }

    function cleanCssText(cssText) {
        CSS_EXPRESSION_PATTERN.lastIndex = 0;
        return cssText.replace(CSS_EXPRESSION_PATTERN, CSS_EXPRESSION_REPLACE);
    }

    function cleanInlineStyles($html) {
        $html.find('[style]').removeAttr('style');
    }

    /**
     *
     * @param htmlText {string}
     * @param options {object}
     * @param options.allowInlineStyles {boolean}
     * @param options.allowIframes {boolean}
     * @returns {*}
     */
    function cleanHtml(htmlText, options) {
        options || (options = {});
        var $html = $(stripComments("<div>" + htmlText + "</div>"));
        var nodeRemovalOptions = {
            additionalBadNodeSelector: options.allowIframes === false ? 'iframe' : null
        };
        $html = removeBadNodes($html, nodeRemovalOptions);
        cleanAttributes($html);
        cleanStylesheets($html);
        if (options.allowInlineStyles === false) {
            cleanInlineStyles($html);
        }
        return $html.html();
    }

    return {
        clean: cleanHtml,
        isBadUrl: isBadUrl,
        isBadNodeValue: isBadNodeValue,
        _stripComments: stripComments,
        _cleanAttributes: cleanAttributes,
        _removeScripts: removeBadNodes,
        _cleanStylesheets: cleanStylesheets,
        _cleanCssText: cleanCssText
    };

});
