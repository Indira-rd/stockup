import { apiAddItem } from "../api/apiAddItem.js";
function loadForm() {
  return `
        <h2>Add New Pantry Item</h2>
        <hr/>
        <form id="form" action="">
        <label for="name">Item Name</label>
        <input type="text" placeholder="Enter item name" id="name"/>
        <label for="category">Category</label>
        <select name="" id="category">
            <option value="" selected disabled>Select Category</option>
            <option value="Grains">Grains</option>
            <option value="Beverages">Beverages</option>
            <option value="Oils">Oils</option>
            <option value="Snacks">Snacks</option>
            <option value="Legumes">Legumes</option>
        </select>
        <label for="stock">Quantity</label>
        <input type="number" id="stock" min="0"/>
        <label for="unit">Unit</label>
        <select name="" id="unit">
            <option value="" selected disabled>Select Unit</option>
            <option value="ltr">ltr</option>
            <option value="packs">packs</option>
            <option value="kg">kg</option>
        </select>
        <label for="expiration">Expiration</label>
        <input type="date" id="expiration"/>
        <button type="submit" id="btn">Add Item</button>
        </form>
        <P id="add-success"></P>
    `;
}

async function btnHandler(event) {
  event.preventDefault();
  if(document.getElementById("stock").value < 0){
    document.getElementById("add-success").innerText =
    "Please enter an appropriate value for quantity."
    document.getElementById("add-success").style.color = "red"
    return
  }
  const payload = {
    name: document.getElementById("name").value,
    category: document.getElementById("category").value,
    quantity: Number(document.getElementById("stock").value),
    expiration: document.getElementById("expiration").value,
    unit : document.getElementById("unit").value,
    action: "View",
  };
  console.log(payload)
  const { error } = await apiAddItem(payload);
  if (error) {
    ErrorBanner(error);
    return;
  }
  document.getElementById("add-success").innerText =
    "✅Item added successfully.";
  document.getElementById("add-success").style.color = "green";
  document.getElementById("form").reset();
}

export default function render() {
  const app = document.getElementById("app");
  app.innerHTML = `${loadForm()}`;

  const btn = document.getElementById("btn");

  btn.addEventListener("click", btnHandler);
}
