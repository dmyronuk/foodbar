
function confirmOrderHandler(event){
  $.ajax({
    type: "POST",
    url:"/cart",
    success: function(data){
      console.log(data);
    }
  })
}

function removeCartItemHandler(event){
  event.preventDefault();
  let $target = $(event.target);
  var id = $target.attr("id");
  console.log($target.parent().serialize())

  $.ajax({
    type: "POST",
    data: $target.parent().serialize(),
    url: `/cart/items/${id}/delete`,
    success: function(data){
      console.log("data sent back from server: ", data);
    }
  })
}

function createDOMCart(data){
  var cart = data.cart;
  var cartKeys = Object.keys(cart);

  //the tables for the checkout line items go in <section>
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
  if(cartKeys.length > 0){
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
    cartKeys.forEach((key, i) => {
      var curObj = cart[key];
      var $curRow = $(`
        <tr>
          <td>
            <form id="${key}">
              <input name="item_id" type="hidden" value="${key}">
              <input type="submit" value="remove" class="cart-remove-button">
            </form>
          </td>
          <td>${curObj.item_name}</td>
          <td class="center-align-td">${curObj.quantity}</td>
          <td class="right-align-td">&#36;${(curObj.price * curObj.quantity / 100).toFixed(2)}</td>
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
  $cart.find(".cart-remove-button").on("click", removeCartItemHandler);
  $cart.find("#confirm-order").on("click", confirmOrderHandler);
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
