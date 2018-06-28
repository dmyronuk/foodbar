console.log("hey there")

function cartCancelHandler(){

};

function cartSubmitHandler(){

};

function createDOMCart(itemArr){
  let $cart = $(`
    <div class="cart-container">
      <header>
        <h1>
          Checkout
        </h1>
      </header>
      <section>
        <table>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Amount</th>
          </tr>
        </table>
      </section>
      <footer>
        <button id="confirm-order">Confirm Order</button>
      </footer>
    </div>
  `);
  let $mask = $(`<div class="page-mask"></div>`);
  let $body = $("body");
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
      createDOMCart();
      $(".page-mask").on("click", destroyDOMCart);
    }
  })
};

$(document).ready(function(){
  $(".cart-button").on("click", cartClickHandler);
});
