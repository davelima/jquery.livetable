# jquery.livetable

This is a simple jQuery plugin that make your tables editable.

The script was writen to facilitate CRUDs via AJAX.

Pull requests are welcome ;)


## How to use

### Enabling:

To init liveTable, just call it like any other jQuery plugin:

`$('YOUR_TABLE').liveTable();`

You can also append new editable rows to your table this way after init the plugin:

`$('YOUR_TABLE).liveTable('appendrow');`

You can also use these options:

- afterChange: (callable) runs a custom function after any <td> was edited.
- ignore: (string) selector to make plugin ignore some elements and NOT make it editable.

### Examples:

```
$('#myTable').liveTable({
  afterChange: function(td, oldValue, newValue) {
    // Element td has value oldValue and now have value newValue
  },
  ignore: '.not-editable'
});
```

