const myForm = document.getElementById("my-form");
const itemNameInput = document.getElementById("itemName");
const descriptionInput = document.getElementById("description");
const priceInput = document.getElementById("price");
const quantityInput = document.getElementById("quantity");
const itemList = document.getElementById("list");

myForm.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const itemName = e.target.itemName.value;
  const description = e.target.description.value;
  const price = e.target.price.value;
  const quantity = e.target.quantity.value;

  const items = {
    itemName,
    description,
    price,
    quantity,
  };

  //Sending a POST Request to Backend
  axios
    .post("http://localhost:3000/add-item", items)
    .then((res) => {
      showItemOnScreen(res.data.newUserItem);
      console.log(res);
    })
    .catch((error) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h4>Something went wrong</h4>";
      console.log(error);
    });
}

//Sending a GET Request to Backend
window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/get-items")
    .then((res) => {
      for (var i = 0; i < res.data.allItems.length; i++) {
        showItemOnScreen(res.data.allItems[i]);
      }
    })
    .catch((error) => console.log(error));
});

function showItemOnScreen(items) {
  const li = document.createElement("li");
  const details = document.createTextNode(
    `${items.itemName} : ${items.description} : ${items.price} : ${items.quantity} `
  );

  const button1 = document.createElement("input");
  button1.type = "button";
  button1.value = "Buy 1";
  button1.style.backgroundColor = "lightPink";
  button1.onclick = () => {
    //Update the quantity
    items.quantity = parseInt(items.quantity) - 1;

    if (items.quantity < 2) {
      alert("Items are low. Need to purchase more items.");
      return;
    }

    //Update details text
    details.nodeValue = `${items.itemName} : ${items.description} : ${items.price} : ${items.quantity} `;

    //Update quantity on Backend
    axios
      .put(`http://localhost:3000/edit-item/${items.id}`, {
        itemName: items.itemName,
        description: items.description,
        price: items.price,
        quantity: items.quantity,
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  };

  const button2 = document.createElement("input");
  button2.type = "button";
  button2.value = "Buy 2";
  button2.style.backgroundColor = "skyBlue";
  button2.onclick = () => {
    //Update the quantity
    items.quantity = parseInt(items.quantity) - 2;

    if (items.quantity < 2) {
      alert("Items are low. Need to purchase more items.");
      return;
    }

    //Update details text
    details.nodeValue = `${items.itemName} : ${items.description} : ${items.price} : ${items.quantity} `;

    //Update quantity on Backend
    axios
      .put(`http://localhost:3000/edit-item/${items.id}`, {
        itemName: items.itemName,
        description: items.description,
        price: items.price,
        quantity: items.quantity,
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  };

  const button3 = document.createElement("input");
  button3.type = "button";
  button3.value = "Buy 3";
  button3.style.backgroundColor = "lightCoral";
  button3.onclick = () => {
    //Update the quantity
    items.quantity = parseInt(items.quantity) - 3;

    if (items.quantity < 2) {
      alert("Items are low. Need to purchase more items.");
      return;
    }

    //Update details text
    details.nodeValue = `${items.itemName} : ${items.description} : ${items.price} : ${items.quantity} `;

    //Update quantity on Backend
    axios
      .put(`http://localhost:3000/edit-item/${items.id}`, {
        itemName: items.itemName,
        description: items.description,
        price: items.price,
        quantity: items.quantity,
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  };

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "Delete Item";
  deleteBtn.style.color = "white";
  deleteBtn.style.backgroundColor = "Red";
  deleteBtn.onclick = () => {
    //Sending a Delete Request to Backend
    axios
      .delete(`http://localhost:3000/delete-item/${items.id}`)
      .then((res) => {
        console.log("Item deleted successfully");
        itemList.removeChild(li);
      })
      .catch((error) => console.log(error));
  };

  const editBtn = document.createElement("input");
  editBtn.type = "button";
  editBtn.value = "Edit Item";
  editBtn.style.backgroundColor = "yellowgreen";
  editBtn.onclick = () => {
    itemList.removeChild(li);
    document.getElementById("itemName").value = items.itemName;
    document.getElementById("description").value = items.description;
    document.getElementById("price").value = items.price;
    document.getElementById("quantity").value = items.quantity;

    //Replace the Existing Event Listener with new one
    myForm.removeEventListener("submit", onSubmit);

    myForm.addEventListener("submit", (e) => {
      console.log("Item updated successfully");

      const updatedItems = {
        itemName: document.getElementById("itemName").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        quantity: document.getElementById("quantity").value,
      };

      axios
        .put(`http://localhost:3000/edit-item/${items.id}`, updatedItems)
        .then((res) => {
          //Update the items object
          items.itemName = updatedItems.itemName;
          items.description = updatedItems.description;
          items.price = updatedItems.price;
          items.quantity = updatedItems.quantity;

          //Update the details text node
          details.nodeValue = `${items.itemName} : ${items.description} : ${items.price} : ${items.quantity} `;

          //Clear the form after updating
          itemNameInput.value = "";
          descriptionInput.value = "";
          priceInput.value = "";
          quantityInput.value = "";
        })
        .catch((error) => console.log(error));

      //Restore the original Event Listener
      myForm.addEventListener("submit", onSubmit);
    });
  };

  li.appendChild(details);
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);
  li.appendChild(button1);
  li.appendChild(button2);
  li.appendChild(button3);
  itemList.appendChild(li);

  //Clear Fields
  itemNameInput.value = "";
  descriptionInput.value = "";
  priceInput.value = "";
  quantityInput.value = "";
}