const changeQuantity = document.querySelectorAll("input[name='quantity']");
if(changeQuantity.length > 0) {
  changeQuantity.forEach( input => {
    input.addEventListener("change", (e) => {
      const productId = input.getAttribute("item-id");
      const value = parseInt(input.value);
      if(value > 0) {
        window.location.href = `/cart/quantity/${productId}/${value}`;
      }
    });
  });
}