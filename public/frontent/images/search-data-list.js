


$(document).ready(function(){
    var BASE_URL = "https://www.teachcoders.com/"
  var countries = [
    {value:'Javascript', data: ''+BASE_URL+'Javascript/'},
    { value: 'How many types of script', data: BASE_URL+'Javascript/how-many-types-of-script' },
    { value: 'Add Html Tag in Javascript', data: BASE_URL+'Javascript/add-Html-tag-in-javascript' },
    { value: 'Comment (Javascript)', data: BASE_URL+'Javascript/comments' },
    { value: 'Variable', data: BASE_URL+'Javascript/variable' },
    { value: 'Global & Local Variable', data: BASE_URL+'Javascript/global-local-variable' },
    { value: 'Data Type', data: BASE_URL+'Javascript/data-type' },
    { value: 'Object', data: BASE_URL+'Javascript/object/' },
    { value: 'Operators', data: BASE_URL+'Javascript/operators/' },
    { value: 'Arithmetic Operators', data: BASE_URL+'Javascript/arthmetic-operators' },
    { value: 'Assignment Opertors', data: BASE_URL+'Javascript/assignment-operators' },
    { value: 'Comparison Operator', data: BASE_URL+'Javascript/comparison-operators' },
    { value: 'Logical Operators', data: BASE_URL+'Javascript/comparison-operators' },
    { value: 'conditional operator', data: BASE_URL+'Javascript/comparison-operators' },
    { value: 'Concatenation operator', data: BASE_URL+'Javascript/concatenation-operators' },
    { value: 'If Statement', data: BASE_URL+'Javascript/if-statement' },
    { value: 'If else', data: BASE_URL+'Javascript/if-else' },
    { value: 'If else If ', data: BASE_URL+'Javascript/nested-if-else' },
    { value: 'Swithch Case', data: BASE_URL+'Javascript/switcb-case' },
    { value: 'Continue & Break', data: BASE_URL+'Javascript/break-and-continue' },
    { value: 'Continue & Break', data: BASE_URL+'Javascript/break-and-continue' },
    { value: 'Function', data: BASE_URL+'Javascript/function' },
    { value: 'Function with Parameter', data: BASE_URL+'Javascript/function-without-parameter' },
    { value: 'Function without Parameter', data: BASE_URL+'Javascript/function-without-parameter' },
    { value: 'Function with Return Value', data: BASE_URL+'Javascript/function-with-return-value' },
    { value: 'Events', data: BASE_URL+'Javascript/events' },
    { value: 'Loop', data: BASE_URL+'Javascript/loop' },
    { value: 'while Loop', data: BASE_URL+'Javascript/while-loop' },
    { value: 'do/while Loop', data: BASE_URL+'Javascript/do-while-loop' },
    { value: 'for loop', data: BASE_URL+'Javascript/for-loop' },
    { value: 'for/in Loop', data: BASE_URL+'Javascript/for-in-loop' },
    { value: 'for/Of Loop', data: BASE_URL+'Javascript/for-of-loop' },
    { value: 'Array', data: BASE_URL+'Javascript/array' },
    { value: 'new Array()', data: BASE_URL+'Javascript/new-Array' },
    { value: 'Add Array Value through Index', data: BASE_URL+'Javascript/add-or-edit-array' },
    { value: 'Multidimensional Array', data: BASE_URL+'Javascript/multidimensional-array' },
    { value: 'Array With Object', data: BASE_URL+'Javascript/array-with-object' },
    { value: 'Sort()', data: BASE_URL+'Javascript/sort' },
    { value: 'reverse()', data: BASE_URL+'Javascript/reverse' },
    { value: 'push()', data: BASE_URL+'Javascript/push' },
    { value: 'pop()', data: BASE_URL+'Javascript/pop' },
    { value: 'unshift()', data: BASE_URL+'Javascript/unshift' },
    { value: 'concat()', data: BASE_URL+'Javascript/concat' },
    { value: 'join()', data: BASE_URL+'Javascript/join' },
    { value: 'slice()', data: BASE_URL+'Javascript/slice' },
    { value: 'splice()', data: BASE_URL+'Javascript/splice' },
    { value: 'isArray()', data: BASE_URL+'Javascript/isArray' },
    { value: 'indexOf()', data: BASE_URL+'Javascript/indexOf' },
    { value: 'lastIndexOf()', data: BASE_URL+'Javascript/lastIndexOf' },
    { value: 'includes()', data: BASE_URL+'Javascript/includes' },
    { value: 'some()', data: BASE_URL+'Javascript/some' },
    { value: 'every()', data: BASE_URL+'Javascript/every' },
    { value: 'find()', data: BASE_URL+'Javascript/find' },
    { value: 'findIndex()', data: BASE_URL+'Javascript/findIndex' },
    { value: 'filter()', data: BASE_URL+'Javascript/filter' },
    { value: 'filter()', data: BASE_URL+'Javascript/fill' },
    { value: 'forEach()', data: BASE_URL+'Javascript/forEach' },
    { value: 'Object', data: BASE_URL+'Javascript/Object' },
    { value: 'Object with String Value', data: BASE_URL+'Javascript/object-string-value' },
    { value: 'Object with String & Number value', data: BASE_URL+'Javascript/object-string-number-value' },
    { value: 'Object with Array value', data: BASE_URL+'Javascript/object-array-value' },
    { value: 'Object with function() value', data: BASE_URL+'Javascript/object-function-value' },   
    { value: 'Edit / Add Object Property Value', data: BASE_URL+'Javascript/edit-opject-property-value-and-create-object-with-new-Object-method' },
    { value: 'Number Method()', data: BASE_URL+'Javascript/number-method' },
    { value: 'Math Method()', data: BASE_URL+'Javascript/math-method' },
    { value: 'Date Method()', data: BASE_URL+'Javascript/date-method' },
    { value: 'DOM - Introducation (getElementById, getElementsByClass, getElementsByTag)', data: BASE_URL+'Javascript/dom' },
    { value: 'DOM - querySelector & querySelectorAll', data: BASE_URL+'Javascript/dom-query-selector' },
    { value: 'DOM - get value', data: BASE_URL+'Javascript/dom-get-value' },
    { value: 'Dom Css Method', data: BASE_URL+'Javascript/dom-css-method' },
    { value: 'Dom style Method', data: BASE_URL+'Javascript/dom-style' },
    { value: 'Dom className', data: BASE_URL+'Javascript/dom-className' },
    { value: 'Dom classList', data: BASE_URL+'Javascript/dom-ClassList' },
    { value: 'Dom addEventListener()', data: BASE_URL+'Javascript/dom-addEventListener' },
    { value: 'Dom addEventListener with Capture', data: BASE_URL+'Javascript/dom-addEventListener-with-capture' },
    { value: 'Dom removeEventListener', data: BASE_URL+'Javascript/dom-removeEventListener' },
    { value: 'Dom Parent Element & Prenet Node', data: BASE_URL+'Javascript/dom-parent-element' },
    { value: 'Dom Children Element & Children Node', data: BASE_URL+'Javascript/dom-children-element' },
    { value: 'dom firstElementChild, lastElementChild, firstChild, lastChild', data: BASE_URL+'Javascript/dom-firstElementChild-lastElementChild-firstChild-lastChild' },
    { value: 'Dom nextElementSibling, previousElementSibling, nextSibling, previousSibling', data: BASE_URL+'Javascript/dom-nextElementSibling-previousElementSibling-nextSibling-previousSibling' },
    { value: 'Dom createElement, createTextNode, createComment', data: BASE_URL+'Javascript/dom-createElement-createTextNode-createComment' },
    { value: 'appendChild', data: BASE_URL+'Javascript/dom-appendChild' },
    { value: 'replaceChild & removeChild', data: BASE_URL+'Javascript/dom-replacechild-and-removechild' },
    { value: 'cloneNode', data: BASE_URL+'Javascript/dom-cloneNode' },
    { value: 'contains', data: BASE_URL+'Javascript/dom-contains' },
    { value: 'hasAttribute', data: BASE_URL+'Javascript/dom-hasAttribute-and-hasChildNodes' },
    { value: 'isEqualNode', data: BASE_URL+'Javascript/dom-isEqualNode' },
    { value: 'Blur Event, Focus Event, input Event', data: BASE_URL+'Javascript/dom-blur-focus-input-event' },
    { value: 'Blur Event, Focus Event, input Event', data: BASE_URL+'Javascript/dom-select-submit-input'},

    { value: 'setInterval, clearInterval', data: BASE_URL+'Javascript/dom-setInterval&clearInterval'},
    { value: 'setTimeout, & clearTimeout', data: BASE_URL+'Javascript/dom-setTimeout-and-clearTimeout'},
    { value: 'window with, window height', data: BASE_URL+'Javascript/dom-window-with-and-height'},
    { value: 'window open, window close', data: BASE_URL+'Javascript/dom-window-open-method-and-window-close-method'},
    { value: 'window scrollBy, window ScrollTo', data: BASE_URL+'Javascript/dom-window-ScrollBy-and-window-scrollTo'},
    { value: 'querySelectorAll with forEach', data: BASE_URL+'Javascript/dom-style#forEach'},
    { value: 'Window property & Object', data: BASE_URL+'<?=BASE_URL?>Javascript/dom-dom-location-property-and-object'},
    { value: 'Window history & Object', data: BASE_URL+'<?=BASE_URL?>Javascript/dom-window-history-and-his-object'},

     { value: 'select, submit, input', data: BASE_URL+'Javascript/object-with-object-value' },

     // Moderrn Javascript topic List

        { value: 'Let & Const Variable', data: BASE_URL+'modern-javascript/let-and-const-variable' },
        { value: 'Template Literals', data: BASE_URL+'modern-javascript/template-literals' },
        { value: 'Arrow Functions', data: BASE_URL+'modern-javascript/arrow-functions' },
        { value: 'Rest Parameters', data: BASE_URL+'modern-javascript/rest-parameters' },
        { value: 'Spread Operator', data: BASE_URL+'modern-javascript/spread-operator' },
        { value: 'Array Destructuring', data: BASE_URL+'modern-javascript/array-destructuring' },
        { value: 'Object Literals', data: BASE_URL+'modern-javascript/object-literals' },
        { value: 'Object Destructuring', data: BASE_URL+'modern-javascript/object-destructuring' },
        { value: 'class, constructor, method (Oops)', data: BASE_URL+'modern-javascript/class-constructor-and-methods' },
        { value: 'Multiple class inheritance (Oops)', data: BASE_URL+'modern-javascript/multiple-class-inheritance' },
        { value: 'Modules(Import & Export)', data: BASE_URL+'modern-javascript/javaScript-modules' },
        { value: 'Modules (* & as keyword)', data: BASE_URL+'modern-javascript/javaScript-modules-with-star-and-as-keyword' },
        { value: 'Javascript Call Back Function', data: BASE_URL+'modern-javascript/javaScript-call-back-function' },
        { value: 'JavaScript Promise Object', data: BASE_URL+'modern-javascript/JavaScript-Promise' },
        { value: 'JavaScript Promise.all Object', data: BASE_URL+'modern-javascript/JavaScript-Promise-all' },
        { value: 'JavaScript Ajax', data: BASE_URL+'modern-javascript/JavaScript-ajax' },
        { value: 'JavaScript Fetch Api', data: BASE_URL+'Javascript/JavaScript-fetch-api' },
        { value: 'Fetch Api with async-and-await', data: BASE_URL+'modern-javascript/JavaScript-fetch-api' },
        { value: 'Symbol Data Type', data: BASE_URL+'modern-javascript/symbol-data-type' },
        { value: 'Symbol.iterator', data: BASE_URL+'modern-javascript/symbol-with-iterator' },
        { value: 'custom iterator', data: BASE_URL+'modern-javascript/custom-iterator' },
        { value: 'Generator Functions', data: BASE_URL+'modern-javascript/generator-function' },
        { value: 'Strict mode', data: BASE_URL+'modern-javascript/strict-mode' },
        { value: 'Exception (Error) Handling ', data: BASE_URL+'exception-handling' }

    ];
    
  $i=0;
  $('.serch_course').autocomplete({
    lookup: countries,
    showNoSuggestionNotice: true,
    onSelect: function (suggestion) {

            var urlData = suggestion.data;
            $("#search_data_list").attr('href',urlData);      
      $("#search_data_list").attr('data-tag',suggestion.value);
      if($("#search_data_list").attr('href')!="" && $("#search_data_list").attr('href')!="#"){
        window.location=$("#search_data_list").attr('href');
       ga('send', 'event', $("#search_data_list").attr('data-tag'),'search', 'home banner search');
      }
    },
    onInvalidateSelection:function(){
      $("#search_data_list").attr('href','');
    }
  });
  
});
