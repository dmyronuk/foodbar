console.log("hey there")

function cartClickHandler(event){
  $.ajax({
    type: "GET",
    url: "/cart",
    success: function(data){
      console.log(data);
    }
  })
}

$(document).ready(function(){
  $(".cart-button").on("click", cartClickHandler);
})
