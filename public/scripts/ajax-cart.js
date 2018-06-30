function cartCancelHandler(){

};

function cartSubmitHandler(){

};

function createDOMCart(data){
  var groupedItemsObj = data.groupedItemsObj;
  var groupedItemsKeys = Object.keys(groupedItemsObj);

  var $cart = $(`
    <div class="cart-container">
      <header>
        <h1>
          Checkout
        </h1>
      </header>
      <section>
      </section>
      <footer>
        <div>
          Total: &#36;${data.total}
        </div>
        <button id="confirm-order">Confirm Order</button>
      </footer>
    </div>
  `);

  //if cart is not empty, populate table
  if(groupedItemsKeys.length > 0){
    var $table=$(`
      <table>
        <tr>
          <th></th>
          <th>Item</th>
          <th>Quantity</th>
          <th class="dollar-value-td">Amount</th>
        </tr>
      </table>
      `);
    groupedItemsKeys.forEach((key, i) => {
      var curObj = groupedItemsObj[key];
      var $curRow = $(`
        <tr>
          <td>
            <button class="cart-remove-button">remove</button>
          </td>
          <td>${key}</td>
          <td>${curObj.quantity}</td>
          <td class="right-align-td">&#36;${(curObj.price / 100).toFixed(2)}</td>
        </tr>
      `);
      if(i % 2 === 0) $curRow.addClass("colored-row");
      $table.append($curRow);
    });

    $table.append(`
      <tr class="spacer-row">
        <td colspan=4></td>
      </tr>
      <tr>
          <td colspan=2></td>
          <td right-align-td>Subtotal: </td>
          <td class="right-align-td">&#36;${data.subTotal}</td>
      </tr>
      <tr>
          <td colspan=2></td>
          <td class="right-align-td">Tax: </td>
          <td class="right-align-td">&#36;${data.tax}</td>
      </tr>
      <tr>
          <td colspan=2></td>
          <td class="right-align-td">Total: </td>
          <td class="right-align-td">&#36;${data.total}</td>
      </tr>
    `)
    $cart.find("section").append($table);

  //else cart is empty
  }else{

  }

  var $mask = $(`<div class="page-mask"></div>`);
  var $body = $("body");
  $body.prepend($mask);
  $body.prepend($cart);
};

function destroyDOMCart(){
  $(".cart-container").remove();
  $(".page-mask").remove();
};

function cartClickHandler(event){
  $.ajax({
    type: "GET",
    url: "/cart",
    success: function(data){
      createDOMCart(data);
      $(".page-mask").on("click", destroyDOMCart);
    }
  })
};

$(document).ready(function(){
  $(".cart-button").on("click", cartClickHandler);
});
