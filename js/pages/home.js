import { apiGetItems } from "../api/apiGetItems.js";

const lowStockThreshold = 5;
function lowStockAnalysis(quantity) {
  if (quantity == 0) {
    return "out-of-stock";
  }
  if (quantity < lowStockThreshold) {
    return "low-stock";
  }
}

function ItemRow(product) {
  return `
        <tr>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td class=${lowStockAnalysis(product.quantity)}>${
    product.quantity
  } ${product.unit}</td>
            <td><a href="details#${product.id}">View</a></td>
        </tr>
    `;
}

function ItemTable(items) {
  const itemRows = items.map(ItemRow);
  const itemRowHtml = itemRows.join("");
  return `
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                ${itemRowHtml}
            </tbody>
        </table>
    `;
}

function ErrorBanner(error) {
  return `
        <hgroup>
            <h2>Error Loading Product</h2>
            <p>${error.message}</p>
        </hgroup>
    `;
}

export default async function render() {
  const app = document.getElementById("app");
  app.innerHTML = `
  <section class="grid">
    <div>
        <label for="filter-quantity-select">Filter by Quantity:</label>
        <select name="" id="filter-quantity-select">
            <option value="">All</option>
            <option value="out">Out of Stock</option>
            <option value="low">Low Stock</option>
        </select>
    </div>
    <div>
        <label for="filter-category-select">Filter by Category:</label>
        <select name="" id="filter-category-select">
            <option value="">All</option>
            <option value="Grains">Grains</option>
            <option value="Beverages">Beverages</option>
            <option value="Oils">Oils</option>
            <option value="Snacks">Snacks</option>
            <option value="Legumes">Legumes</option>
        </select>
    </div>
    <div>
        <label for="sortby-select">Sort By:</label>
        <select name="" id="sortby-select">
            <option value="">None</option>
            <option value="name">Name</option>
            <option value="quantity">Quantity</option>
        </select>
    </div>
    <div>
        <label for="sortdir-select">Direction:</label>
        <select name="" id="sortdir-select">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </select>
    </div>
  </section>
  <section id="table-container"></section>`;
  const tableContainer = document.getElementById("table-container");

  const filterQuantitySelect = document.getElementById(
    "filter-quantity-select"
  );
  const filterCategorySelect = document.getElementById(
    "filter-category-select"
  );
  const sortBySelect = document.getElementById("sortby-select");
  const sortDirSelect = document.getElementById("sortdir-select");

  async function loadAndRender() {
    const filterQuantity = filterQuantitySelect.value;
    const filterCategory = filterCategorySelect.value;
    const sortBy = sortBySelect.value;
    const sortDir = sortDirSelect.value;

    const { error, data } = await apiGetItems({
      filter: filterQuantity,
      filterByCategory: filterCategory,
      sortBy,
      sortDir,
    });
    if (error) {
      tableContainer.innerHTML = ErrorBanner(error);
      return;
    }
    tableContainer.innerHTML = ItemTable(data);
  }

  filterQuantitySelect.addEventListener("change", loadAndRender);
  filterCategorySelect.addEventListener("change", loadAndRender);
  sortBySelect.addEventListener("change", loadAndRender);
  sortDirSelect.addEventListener("change", loadAndRender);

  await loadAndRender();
}
