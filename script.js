let cart = [];

function addToCart(name, price) {

    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    displayCart();
}

function displayCart() {

    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        totalElement.innerText = "0";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {

        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">
                <span>
                    ${item.name} × ${item.quantity}
                </span>

                <span>
                    ₹${itemTotal}
                    <button onclick="removeItem(${index})">
                        Remove
                    </button>
                </span>
            </div>
        `;
    });

    totalElement.innerText = total;
}

function removeItem(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    displayCart();
}

function placeOrder() {

    if (cart.length === 0) {
        alert("Please add food items to your cart.");
        return;
    }

    let total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    alert(
        "🎉 Order placed successfully!\n\n" +
        "Total Amount: ₹" + total
    );

    cart = [];
    displayCart();
}
