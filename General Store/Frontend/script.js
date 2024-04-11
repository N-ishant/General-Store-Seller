const myForm = document.getElementById("my-form");
const itemNameInput = document.getElementById("itemName");
const descriptionInput = document.getElementById("description");
const priceInput = document.getElementById("price");
const quantityInput = document.getElementById("quantity");
const itemList = document.getElementById("list");

myForm.addEventListener("submit", onSubmit);

async function onSubmit(e) {
  e.preventDefault();

  try {
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

    const res = await axios.post("http://localhost:3000/add-item", items);
    showItemOnScreen(res.data.newUserItem);
    console.log(res);
  } catch (error) {
    document.body.innerHTML += "<h4>Something went wrong</h4>";
    console.log(error);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get("http://localhost:3000/get-items");
    for (let i = 0; i < res.data.allItems.length; i++) {
      showItemOnScreen(res.data.allItems[i]);
    }
  } catch (error) {
    console.log(error);
  }
});

async function showItemOnScreen(items) {
  const li = document.createElement("li");
  const details = document.createTextNode(
    `${items.itemName} : ${items.description} : ${items.price} : ${items.quantity} `
  );

  const button1 = document.createElement("input");
  button1.type = "button";
  button1.value = "Buy 1";
  button1.style.backgroundColor = "lightPink";
  button1.onclick = async () => {
    try {
      items.quantity = parseInt(items.quantity) - 1;
      if (items.quantity < 2) {
        alert("Items are low. Need to purchase more items.");
        return;
      }
      details.nodeValue = `${items.itemName} : ${items.description} : ${items.price} : ${items.quantity} `;
      await axios.put(`http://localhost:3000/edit-item/${items.id}`, items);
    } catch (error) {
      console.log(error);
    }
  };

  const button2 = document.createElement("input");
  button2.type = "button";
  button2.value = "Buy 2";
  button2.style.backgroundColor = "skyBlue";
  button2.onclick = async () => {
    try {
      items.quantity = parseInt(items.quantity) - 2;
      if (items.quantity < 1) {
        alert("Items are low. Need to purchase more items.");
        return;
      }
      details.nodeValue = `${items.itemName} : ${items.description} : ${items.price} : ${items.quantity} `;
      await axios.put(`http://localhost:3000/edit-item/${items.id}`, items);
    } catch (error) {
      console.log(error);
    }
  };

  const button3 = document.createElement("input");
  button3.type = "button";
  button3.value = "Buy 3";
  button3.style.backgroundColor = "lightCoral";
  button3.onclick = async () => {
    try {
      items.quantity = parseInt(items.quantity) - 3;
      if (items.quantity < 1) {
        alert("Items are low. Need to purchase more items.");
        return;
      }
      details.nodeValue = `${items.itemName} : ${items.description} : ${items.price} : ${items.quantity} `;
      await axios.put(`http://localhost:3000/edit-item/${items.id}`, items);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "Delete Item";
  deleteBtn.style.color = "white";
  deleteBtn.style.backgroundColor = "Red";
  deleteBtn.onclick = async () => {
    try {
      await axios.delete(`http://localhost:3000/delete-item/${items.id}`);
      console.log("Item deleted successfully");
      itemList.removeChild(li);
    } catch (error) {
      console.log(error);
    }
  };

  const editBtn = document.createElement("input");
  editBtn.type = "button";
  editBtn.value = "Edit Item";
  editBtn.style.backgroundColor = "yellowgreen";
  editBtn.onclick = () => {
    itemList.removeChild(li);
    itemNameInput.value = items.itemName;
    descriptionInput.value = items.description;
    priceInput.value = items.price;
    quantityInput.value = items.quantity;

    myForm.removeEventListener("submit", onSubmit);

    myForm.addEventListener("submit", async (e) => {
      try {
        console.log("Item updated successfully");

        const updatedItems = {
          itemName: itemNameInput.value,
          description: descriptionInput.value,
          price: priceInput.value,
          quantity: quantityInput.value,
        };

        const res = await axios.put(
          `http://localhost:3000/edit-item/${items.id}`,
          updatedItems
        );
        items.itemName = updatedItems.itemName;
        items.description = updatedItems.description;
        items.price = updatedItems.price;
        items.quantity = updatedItems.quantity;

        details.nodeValue = `${items.itemName} : ${items.description} : ${items.price} : ${items.quantity} `;

        itemNameInput.value = "";
        descriptionInput.value = "";
        priceInput.value = "";
        quantityInput.value = "";
      } catch (error) {
        console.log(error);
      }
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

  itemNameInput.value = "";
  descriptionInput.value = "";
  priceInput.value = "";
  quantityInput.value = "";
}