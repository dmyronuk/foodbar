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
  console.log(dataRow)
  var $item = $(`
    <div class="menu-item">
      <div>
        <img src=${dataRow.imageURL}>
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
            ${(dataRow.price / 100).toFixed(2)}
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

function createCategoryHeading(category){
  return `
    <div>
      <h2>
        ${category[0].toUpperCase() + category.slice(1)}
      </h2>
    </div>
  `
};

function populateCategory(data, category){
  var categoryArr = data[category];
  var $categoryHeading = createCategoryHeading(category);
  $(".menu-item-container").append($categoryHeading);

  categoryArr.forEach(elem => {
    var $curItem = createMenuItem(elem);
    $(".menu-item-container").append($curItem);
  })
}

$(document).ready(function(){
  $(".menu_img").on("click", function(event){
    var $target = $(event.target);
    var menu_id = $target.attr("menu_id");
    console.log("menu_id", menu_id)

    $.get(`/menus/${menu_id}`, function(data){
        var $container = $(".menu-item-container");
        $container.empty();
        populateCategory(data, "appetizers");
        // populateCategory(data, "mains");
        populateCategory(data, "beverages");
      }
    )
  })
});