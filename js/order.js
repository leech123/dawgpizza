var subtotal = 0;
var tax = 0;
var grandtotal = 0;

//document ready function
$(function(){
    //create a cart model as a simple object with
    //the properties we eventually need to post to
    //the server
    var cart = {
        first: null,
        last: null,
        address1: null,
        zip: null,
        phone: null,
        items: [] //empty array
    }; //cart data

    renderPrice($('.price-template'), $('.cart-container'));

    //click event handler for all buttons with the
    //style class 'add-to-cart'
    $('.add-to-cart').click(function(){
        //use the attributes on the button to construct
        //a new cart item object that we can add to the
        //cart's items array
        var newCartItem = {
            type: this.getAttribute('data-type'),
            name: this.getAttribute('data-name'),
            size: this.getAttribute('data-size'),
            price: this.getAttribute('data-price')
        };

        //push the new item on to the items array
        cart.items.push(newCartItem);

        //render the cart's contents to the element
        //we're using to contain the cart information
        //note that you would need a <div> or some
        //other grouping element on the page that has a
        //style class of 'cart-container'
        renderCart(cart, $('.cart-template'), $('.cart-container'));
        renderPrice($('.price-template'), $('.cart-container'));
    });

    $('.start-over').click(function(){
        emptyCart(cart, $('.cart-container'));
        renderPrice($('.price-template'), $('.cart-container'));
    });

    $('.place-order').submit(function(){
        
        //TODO: validate the cart to make sure all the required
        //properties have been filled out, and that the 
        //total order is greater than $20 (see homework 
        //instructions)

        //code to execute when the form is submitted
        //this is the raw DOM form element
        //wrap it in a jQuery object so we can use jQuery methods on it
        var ordersForm = $(this);

        var firstInput = ordersForm.find('input[name="first-name"]');
        cart.first = firstInput.val();
        var lastInput = ordersForm.find('input[name="last-name"]');
        cart.last = lastInput.val();
        var phoneInput = ordersForm.find('input[name="phone"]');
        cart.phone = phoneInput.val();

        //select a descendant input element with the name "addr-1"
        var addr1Input = ordersForm.find('input[name="addr-1"]');
        var addr1Value = addr1Input.val();
        cart.address1 = addr1Value;
        var zipInput = ordersForm.find('input[name="zip"]');
        var zipValue = zipInput.val();
        cart.zip = zipValue;

        if (addr1Value && addr1Value.trim().length > 0 && zipValue && zipValue.trim().length > 0) {
            if (grandtotal >= 20) {
                ordersForm.find('input[name="cart"]').val(JSON.stringify(cart));
                ordersForm.submit();
                return true;
            } else {
                alert("Order must be minimum of $20");
                return false;
            }
        } else {
            alert("Only spaces is not allowed!");
            return false;
        }

        postCart(cart, $('.cart-form'));
    });
    



}); //doc ready

// renderCart()
// renders the current cart information to the screen
// parameters are:
//  - cart (object) reference to the cart model
//  - container (jQuery object) reference to the container <div>

function renderCart(cart, template, container) {
    var item;
    var idx;
    var instance;

    
    //empty the container of whatever is there currently
    container.empty();
    subtotal = 0;
    tax = 0;
    grandtotal = 0;

    //for each item in the cart...
    for (idx = 0; idx < cart.items.length; idx++) {
        instance = template.clone();
        item = cart.items[idx];

        instance.find('.name').html(item.name);
        instance.find('.price').html("$" + item.price);
        instance.find('.remove').attr('data-index', idx);

        
        //TODO: code to render the cart item
        instance.removeClass('template');
        instance.removeClass('cart-template');
        container.append(instance);

        subtotal += +item.price;
        tax = subtotal * 0.095;
        grandtotal = subtotal + tax;
    } //for each cart item

    $('.remove').click(function(){
        $('.cart-container').empty();
        var idxToRemove = this.getAttribute('data-index');
        cart.items.splice(idxToRemove, 1);

        renderCart(cart, $('.cart-template'), $('.cart-container'));
        renderPrice($('.price-template'), $('.cart-container'));
    });
    
} //renderCart()

//TODO: code to render sub-total price of the cart
//the tax amount (see instructions), 
//and the grand total
function renderPrice(template, container) {
    var instance;
    instance = template.clone();
    instance.find('.total').html("Total:");
    instance.find('.subtotal').html("Subtotal: $" + subtotal.toFixed(2));
    instance.find('.tax').html("Tax: $" + tax.toFixed(2));
    instance.find('.grandtotal').html("Grandtotal: $" + grandtotal.toFixed(2));
    instance.removeClass('template');
    instance.removeClass('price-template');
    container.append(instance);
}

function emptyCart(cart, container) {
    container.empty();
    cart.items = [];
    subtotal = 0;
    tax = 0;
    grandtotal = 0;
}

// postCart()
// posts the cart model to the server using
// the supplied HTML form
// parameters are:
//  - cart (object) reference to the cart model
//  - cartForm (jQuery object) reference to the HTML form
//
function postCart(cart, cartForm) {
    //find the input in the form that has the name of 'cart'    
    //and set it's value to a JSON representation of the cart model
    ordersForm.find('input[name="cart"]').val(JSON.stringify(cart));

    //submit the form--this will navigate to an order confirmation page
    ordersForm.submit();
} //postCart()