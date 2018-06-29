//Ajax post to add clicked item to user's cart
function addMenuItemHandler(event){
  event.preventDefault();
  var $target = $(event.target);
  var id = $target.attr("id");

  $.ajax({
    type: "POST",
    data: $target.serialize(),
    url: `/cart/items/${id}`,
    success: function(data){
      console.log("data sent back from server: ", data);
    }
  })
}

function createMenuItem(dataRow){
  var $item = $(`
    <div class="menu-item">
      <div>
        <img src=${dataRow.imageURL}>
      </div>
      <div class="item-description-container">
        <h4>
          ${dataRow.name}
        </h4>
        <div>
          ${dataRow.description}
        </div>
        <div>
          <div>
            ${dataRow.price}
          <div>
            <form id="${dataRow.id}">
              <input name="quantity" type="text" value=1>
              <input type="submit" value="Add" class="add-to-cart">
            </form>
          </div>
        </div>
      </div>
    </div>
  `);
  $item.find("form").on("submit", addMenuItemHandler);
  return $item;
};

function appendMenuItem($item){
  $(".menu-item-container").append($item);
};

$(document).ready(function(){

  $(".menu_img").on("click", function(event){
    var $target = $(event.target);
    var menu_id = $target.attr("menu_id");

    $.ajax({
      type: "GET",
      url: `/menus/${menu_id}`,
      contentType: "application/json",
      success: function(data){
        var $container = $(".menu-item-container");
        $container.empty();
        for(var i=0; i<15; i++){
          var $curItem = createMenuItem(data);
          appendMenuItem($curItem);
        }
       }
    })
  })
});