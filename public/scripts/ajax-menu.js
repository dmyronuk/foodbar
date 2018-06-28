function addMenuItemHandler(event){
  let item_id = $(event.target).attr("item_id");

  $.ajax({
    type: "POST",
    url: `/items/${item_id}`,
    success: function(data){
      console.log(data);
    }
  })
}

function createMenuItem(dataRow){
  console.log(dataRow.imageURL)
  let $item = $(`
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
            <button item_id=${dataRow.id} class="add-to-cart">Add</button>
          </div>
        </div>
      </div>
    `)
  return $item;
};

function appendMenuItem($item){
  $item.on("click", addMenuItemHandler);
  $(".menu-item-container").append($item);
};

$(document).ready(function(){
  console.log("hello");

  $(".menu_img").on("click", function(event){
    let $target = $(event.target);
    var menu_id = $target.attr("menu_id");
    console.log("menu_id: ", menu_id);

    $.ajax({
      type: "GET",
      url: `/menus/${menu_id}`,
      contentType: "application/json",
      success: function(data){
        let $container = $(".menu-item-container");
        $container.empty();
        for(var i=0; i<15; i++){
          let $curItem = createMenuItem(data);
          appendMenuItem($curItem);
        }
       }
    })
  })
});