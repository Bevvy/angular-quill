angular-quill
================

Angular Quill is an angular directive for the Quill editor. http://quilljs.com/

This version was forked and modified to support Quill v1.0+, and has been tested with Quill v1.1.0 and AngularJS v1.5.8.

Usage
--------------

1. Include the quill libraries
2. In your angular application register angular-quill as a dependency.
3. Add the necessary html to view the editor.

Registration

```js

// Angular Registration
angular.module('app', ['angular-quill']);

```

Bare Minimum Html
```html
<div ng-model="article" quill></div>
```

With Options
```html
 <div ng-model="article" quill="{
      modules: {
        'toolbar': [
            [{ 'header': [2, 3, 4, false] }],
            ['bold', 'italic', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image']
        ]
      },
      theme: 'snow'
    }"></div>
```

You can pass options directly to Quill editor by specifying them as the value of the `quill` attribute.

