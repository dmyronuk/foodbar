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
  var formattedPrice = (dataRow.price / 100).toFixed(2);
  var $item = $(`
    <div class="menu-item">
      <div>
        <img src=${dataRow.url}>
      </div>
      <div class="item-description-container">
        <h4>
          ${dataRow.item_name}
        </h4>
        <div>
          ${dataRow.description}
        </div>
        <div>
          <div>
            ${formattedPrice}
          <div>
            <form id="${dataRow.item_id}">
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

function createCategoryHeading(category){
  return `
    <div>
      <h2>
        ${category[0].toUpperCase() + category.slice(1)}
      </h2>
    </div>
  `
};


$(document).ready(function(){
  $(".menu_img").on("click", function(event){
    var $target = $(event.target);
    var menu_id = $target.attr("menu_id");
    console.log("menu_id", menu_id)

    $.get(`/menus/${menu_id}`, function(data){
      var $container = $(".menu-item-container");
      $container.empty();
      for(category of ["appetizers", "beverages"]){
        var $heading = createCategoryHeading(category);
        $container.append($heading);

        curMenuArr = data[category];
        curMenuArr.forEach(elem => {
          let $curItem = createMenuItem(elem)
          $container.append($curItem);
        })

      }
    })
  })
});