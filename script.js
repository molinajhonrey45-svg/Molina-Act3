function calculateItemAmount(price, quantity) {
    return Number(price) * Number(quantity);
  }
  
  function calculateDiscount(subtotal) {
    const sub = Number(subtotal);
    if (sub >= 5000) {
      return sub * 0.11; 
    } else if (sub >= 3000) {
      return sub * 0.07; 
    } else if (sub >= 1000) {
      return sub * 0.05; 
    } else {
      return 0; 
    }
  }
  
  function getDeliveryFee(option) {
    const opt = Number(option);
    switch (opt) {
      case 1:
        return 0; 
      case 2:
        return 80; 
      case 3:
        return 150; 
      default:
        return 0;
    }
  }
  

  function generateProductInputs() {
    const count = Number(document.getElementById('productCount').value);
    const container = document.getElementById('productContainer');
    container.innerHTML = '';
  
    if (isNaN(count) || count <= 0) {
      document.getElementById('validationMessage').innerText = 'Please enter a valid number of products.';
      return;
    }
  
    document.getElementById('validationMessage').innerText = '';
  
    for (let i = 0; i < count; i++) {
      const productDiv = document.createElement('div');
      productDiv.style.margin = '10px 0';
      productDiv.innerHTML = `
        <h3>Product ${i + 1}</h3>
        <label for="productName-${i}">Product Name</label>
        <input type="text" id="productName-${i}"><br>
  
        <label for="productPrice-${i}">Price</label>
        <input type="number" id="productPrice-${i}"><br>
  
        <label for="productQuantity-${i}">Quantity</label>
        <input type="number" id="productQuantity-${i}">
      `;
      container.appendChild(productDiv);
    }
  }
  

  function processOrder() {
    const customerName = document.getElementById('customerName').value.trim();
    const countInput = document.getElementById('productCount').value;
    const count = Number(countInput);
    const validationMsg = document.getElementById('validationMessage');
    
    validationMsg.innerText = '';
  
    if (!customerName) {
      validationMsg.innerText = 'Customer name cannot be empty.';
      return;
    }
  
    if (isNaN(count) || count <= 0) {
      validationMsg.innerText = 'Product count must be a valid positive number.';
      return;
    }
  
    let subtotal = 0;
    let itemsHTML = '';
  

    for (let i = 0; i < count; i++) {
      const nameElem = document.getElementById(`productName-${i}`);
      const priceElem = document.getElementById(`productPrice-${i}`);
      const qtyElem = document.getElementById(`productQuantity-${i}`);
  
      if (!nameElem || !priceElem || !qtyElem) {
        validationMsg.innerText = 'Please generate and fill out product fields.';
        return;
      }
  
      const pName = nameElem.value.trim();
      const pPrice = Number(priceElem.value);
      const pQty = Number(qtyElem.value);
  
      if (!pName || isNaN(pPrice) || pPrice <= 0 || isNaN(pQty) || pQty <= 0) {
        validationMsg.innerText = `Please enter valid positive values for Product ${i + 1}.`;
        return;
      }
  
      const itemAmount = calculateItemAmount(pPrice, pQty);
      subtotal += itemAmount;
  
      itemsHTML += `
        <p>
          <strong>${i + 1}. ${pName}</strong><br>
          Price: ₱${pPrice.toFixed(2)}<br>
          Quantity: ${pQty}<br>
          Amount: ₱${itemAmount.toFixed(2)}
        </p>
      `;
    }

    const discountAmount = calculateDiscount(subtotal);
    
    let discountRate = '0%';
    if (subtotal >= 5000) discountRate = '11%';
    else if (subtotal >= 3000) discountRate = '7%';
    else if (subtotal >= 1000) discountRate = '5%';
  
    const deliveryOption = document.getElementById('deliveryOption').value;
    const deliveryFee = getDeliveryFee(deliveryOption);
  
    let deliveryTypeLabel = 'Store Pick-up';
    if (Number(deliveryOption) === 2) deliveryTypeLabel = 'Standard Delivery';
    if (Number(deliveryOption) === 3) deliveryTypeLabel = 'Express Delivery';
  
    const finalAmount = subtotal - discountAmount + deliveryFee;

    const orderSummaryDiv = document.getElementById('orderSummary');
    orderSummaryDiv.innerHTML = `
      <h2>MINI STORE CHECKOUT SYSTEM</h2>
      <p>Customer: ${customerName}</p>
      ${itemsHTML}
      <h3>ORDER SUMMARY</h3>
      <p>Subtotal: ₱${subtotal.toFixed(2)}</p>
      <p>Discount Rate: ${discountRate}</p>
      <p>Discount Amount: ₱${discountAmount.toFixed(2)}</p>
      <p>Delivery Type: ${deliveryTypeLabel}</p>
      <p>Delivery Fee: ₱${deliveryFee.toFixed(2)}</p>
      <p><strong>Final Amount: ₱${finalAmount.toFixed(2)}</strong></p>
    `;
  }
  
