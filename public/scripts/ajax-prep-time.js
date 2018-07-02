function ajaxPrepTimeHandler(event){
  event.preventDefault();
  var $target = $(event.target);
  console.log("posting")

  $.ajax({
    type: "POST",
    data: $target.serialize(),
    url: "/orders",
    success: function(data){
      console.log("data sent back from server: ", data);
    }
  })
}

$(document).ready(function(){
  console.log("okay")
  $(".order-prep-form").on("submit", ajaxPrepTimeHandler);
})