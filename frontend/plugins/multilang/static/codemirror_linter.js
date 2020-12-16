// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

function convertInginiousLanguageToLinter(inginiousLanguage) {
  var languages = {
      "java7": "java",
      "java8": "java",
      "js": "javascript",
      "cpp": "cpp",
      "cpp11": "cpp",
      "c": "c",
      "c11": "c",
      "python2": "python2",
      "python3": "python3",
      "ruby": "ruby"
  };

  return languages[inginiousLanguage];
}

function webLinter(code, callback, options, editor){
  var language = convertInginiousLanguageToLinter(editor.getOption("inginiousLanguage"));
  var lintServerUrl = getLinterServerURL() + language;
 
  var serverCallback = function(response, status){
    var errors_and_warnings = JSON.parse(response);    
    callback(errors_and_warnings);
  }

  $.post(lintServerUrl, {code: code}, serverCallback);
}

(function (mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function (CodeMirror) {
  "use strict";

  CodeMirror.registerHelper("lint", "python", webLinter);
  CodeMirror.registerHelper("lint", "text/x-java", webLinter);
  CodeMirror.registerHelper("lint", "text/x-c++src", webLinter);
  CodeMirror.registerHelper("lint", "text/x-csrc", webLinter);
});
