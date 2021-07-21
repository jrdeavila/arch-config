"use strict";
/**
 * Beautify Pug(former jade) file.
 *
 * var pugBeautify = require('pug-beautify');
 * var beautifiedString = pugBeautify-beautify(code,{fill_tab:true,omit_div:false,tab_size:4});
 *
 * @param  {string} code - strings to be beautified.
 * @param  {Object} opt - options.
 * @param  {boolean} opt.fill_tab - fill whether tab or space, default true.
 * @param  {boolean} opt.omit_div - whether omit 'div' tag, default false.
 * @param  {number} opt.tab_size - when 'fill_tab' is false, fill 'tab_size' spaces, default 4.
 * @param  {boolean} opt.separator_space - When 'separator_space' is true, the attribute separator is comma, default true.
 * @param  {boolean} opt.omit_empty_lines - When 'separator_space' is false, delete line blank, default true.
 * @return {string} code - strings beautified.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(code, opt) {
    'use strict';
    opt = (typeof opt === 'undefined') ? {} : opt;
    if (typeof code !== 'string')
        quit('Code must be a string text.');
    if (typeof opt !== 'undefined' && typeof opt !== 'object')
        quit('Option must be a object.');
    var fill_tab = (typeof opt.fill_tab !== 'undefined') ? opt.fill_tab : true;
    var omit_div = (typeof opt.omit_div !== 'undefined') ? opt.omit_div : false;
    var tab_size = (typeof opt.tab_size !== 'undefined') ? opt.tab_size : 4;
    var separator = opt.separator_space ? ' ' : ', ';
    var empty_lines = (typeof opt.omit_empty_lines !== 'undefined') ? opt.omit_empty_lines : true;
    var debug = (typeof opt.debug !== 'undefined') ? opt.debug : false;
    if (debug)
        console.log(fill_tab, omit_div, tab_size, debug, separator);
    // list of indents
    var indentList = [];
    var prevIndent = {
        type: 'code',
        indent: 0,
        tab: 0,
        input: '',
    };
    if (!empty_lines) {
        code = code.replace(/^\s*[\r\n]/gm, '');
    }
    var lines = code.split('\n');
    lines.forEach(function (line, n) {
        // it return matching space --> data[0], data[index] = 0, remained input --> data.input
        var data = line.match(/^\s*/);
        // when tab and space mixed, it replace all tab to spaces.
        var tmp = data[0].replace(/\t/g, Array(tab_size + 1).join(' '));
        var remainedInput = data.input.replace(/^\s*/, '');
        var indent = (remainedInput.length === 0) ? 0 : tmp.length;
        var tab = 0;
        var type = (remainedInput.match(/^\/\/|^\/\*|^\*/)) ? 'remark' : 'code';
        if (omit_div) {
            remainedInput = remainedInput.replace(/^div(\.|#)/i, '$1');
        }
        if (indent === 0) {
            tab = 0;
        }
        else {
            // when this line & prev line is 'remark', it fallow prev line tab.
            if (indentList.length > 0 && type === 'remark' && indentList[indentList.length - 1].type === 'remark') {
                tab = prevIndent.tab;
            }
            else {
                if (indent === prevIndent.indent) { // when same indent, follow prev tab.
                    tab = prevIndent.tab;
                }
                else if (indent > prevIndent.indent) { // when indented, add tab
                    tab = prevIndent.tab + 1;
                }
                else { // when new indent, if find the same indent, and follow it's tab.
                    for (var i = indentList.length - 1; i >= 0; i--) {
                        if (indent == indentList[i].indent) {
                            tab = indentList[i].tab;
                            break;
                        }
                    }
                }
            }
        }
        if (debug)
            console.log(n + 1, indent, tab, prevIndent.indent);
        if (remainedInput.match(/\w+\(.+(,|\s).*\)/)) {
            if (debug)
                console.log('antes =>', remainedInput);
            if (remainedInput.match(/\w+=('|").+('|")\s?,\s/)) {
                remainedInput = remainedInput.replace(/('|")(,\s+)(([\w-]+=("|'))|$)/g, '$1' + separator + '$4');
                if (debug)
                    console.log('new(' + separator + ')=>', remainedInput);
            }
        }
        var curIndent = {
            type: type,
            indent: indent,
            tab: tab,
            input: remainedInput,
        };
        indentList.push(curIndent);
        if (remainedInput.length !== 0) { // discard null line
            prevIndent = curIndent;
        }
    });
    // // Here,it reformat with it's tab count.
    var formatedLine = indentList.map(function (line, n) {
        var space = Array(line.tab + 1).join('\t');
        //when fill with space
        if (!fill_tab)
            space = space.replace(/\t/g, Array(tab_size + 1).join(' '));
        if (debug)
            console.log(n + 1, line.indent, line.tab, space + line.input);
        return space + line.input;
    });
    //Rewrite data
    return formatedLine.join('\n');
}
exports.default = default_1;
;
function quit(reason) {
    throw new Error(reason);
}
//# sourceMappingURL=pug-beautify.js.map