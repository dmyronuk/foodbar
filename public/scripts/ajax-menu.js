$(document).ready(function(){
  console.log("hello");

  $(".menu_img").on("click", function(event){
    let $target = $(event.target);
    var menu_name = $target.attr("menu_name");
    var restaurant_id = $target.attr("restaurant_id");
    console.log("trying to send")

    $.ajax({
      type: "GET",
      url: `/restaurants/${restaurant_id}/menus/${menu_name}`,
      data: {hi:"yes"},
      dataType: "json",
      contentType: "application/json",
      success: function(data){
        console.log("Ajax sent okay")
        console.log(data);
       }
    })
  })
});