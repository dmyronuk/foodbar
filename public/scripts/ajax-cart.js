console.log("hey there")

function cartCancelHandler(){

};

function cartSubmitHandler(){

};

function createDOMCart(data){
  var subTotal = data.total;
  var tax = subTotal * 0.13;
  var total = subTotal + tax;

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
          Total: &#36;${total}
        </div>
        <button id="confirm-order">Confirm Order</button>
      </footer>
    </div>
  `);

  //if cart is not empty, populate table
  if(data.items.length > 0){
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
    data.items.forEach((elem, i) => {
      var $curRow = $(`
        <tr>
          <td>
            <button class="cart-remove-button">remove</button>
          </td>
          <td>Item Name</td>
          <td>${elem.quantity}</td>
          <td class="right-align-td">&#36;${elem.cost}</td>
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
          <td class="right-align-td">&#36;${subTotal}</td>
      </tr>
      <tr>
          <td colspan=2></td>
          <td class="right-align-td">Tax: </td>
          <td class="right-align-td">&#36;${tax}</td>
      </tr>
      <tr>
          <td colspan=2></td>
          <td class="right-align-td">Total: </td>
          <td class="right-align-td">&#36;${total}</td>
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
      console.log(data);
      createDOMCart(data);
      $(".page-mask").on("click", destroyDOMCart);
    }
  })
};

$(document).ready(function(){
  $(".cart-button").on("click", cartClickHandler);
});
