$(function() {
  $("#add-field-btn").click(function() {
    // Create a clone of the custom-field form,
    // removing the old button and adding it to the clone.
    var form = $("#add-field-btn").parent()
    var btn = $("#add-field-btn").detach()
    var clone = form.clone()
    clone.append(btn)
    // Now add the clone back in.
    form.parent().append(clone)
    // And rename all the elements
    var newNumber = parseInt(form.data("fieldno"),10)+1
    clone.attr("data-fieldno", newNumber)
    clone.children("input[type=text]").attr("name", function (i,val) {
      return val.replace(/^(\w+?)\d+$/, function(match, $1) { return $1+(newNumber); })
    })
  })
})