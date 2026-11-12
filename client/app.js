const API_BASE_URL = "http://localhost:5100/api/produce";

const CATEGORIES = {
  1: "Tubers & Grains",
  2: "Fresh Vegetables",
  3: "Seasonal Fruits",
  4: "Poultry & Dairy",
  5: "Farm Seedlings & Inputs"
};

const productForm = document.querySelector("#product-form");
const formHeading = document.querySelector("#add-product-heading");
const submitButton = document.querySelector("#submit-button");
const cancelEditButton = document.querySelector("#cancel-edit-button");
const productIdInput = document.querySelector("#product-id");

const productsContainer = document.querySelector("#products");
const statusMessage = document.querySelector("#status");
const refreshButton = document.querySelector("#refresh-button");
const searchInput = document.querySelector("#search-input");
const categoryFilter = document.querySelector("#category-filter");

let allProducts = [];

function setStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.dataset.error = String(isError);
}

async function request(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const details = await response.text();
    throw new Error(details || `Request failed (${response.status})`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function startEdit(product) {
  productIdInput.value = product.id;
  productForm.elements["sku"].value = product.sku;
  productForm.elements["name"].value = product.name;
  productForm.elements["description"].value = product.description || "";
  productForm.elements["price"].value = product.price;
  productForm.elements["categoryId"].value = String(product.categoryId);
  productForm.elements["isAvailable"].checked = Boolean(product.isAvailable);

  formHeading.textContent = `Edit Produce: ${product.name}`;
  submitButton.textContent = "Save Changes";
  cancelEditButton.classList.remove("hidden");
  productForm.scrollIntoView({ behavior: "smooth" });
}

function resetFormMode() {
  productForm.reset();
  productIdInput.value = "";
  formHeading.textContent = "Add Farm Produce";
  submitButton.textContent = "Add to Inventory";
  cancelEditButton.classList.add("hidden");
}

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = `product-card ${product.isAvailable ? "" : "unavailable"}`;

  const topRow = document.createElement("div");
  topRow.className = "card-top";

  const catBadge = document.createElement("span");
  catBadge.className = "badge";
  catBadge.textContent = CATEGORIES[product.categoryId] || `Category #${product.categoryId}`;

  const stockBadge = document.createElement("span");
  stockBadge.className = `badge ${product.isAvailable ? "" : "out"}`;
  stockBadge.textContent = product.isAvailable ? "In Stock" : "Out of Stock";

  topRow.append(catBadge, stockBadge);

  const name = document.createElement("h3");
  name.textContent = product.name;

  const sku = document.createElement("p");
  sku.className = "product-meta";
  sku.textContent = `SKU: ${product.sku}`;

  const description = document.createElement("p");
  description.className = "product-description";
  description.textContent = product.description || "Fresh farm harvest.";

  const price = document.createElement("p");
  price.className = "product-price";
  price.textContent = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN"
  }).format(product.price);

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.className = "edit-button";
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => startEdit(product));

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-button";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteProduct(product.id));

  actions.append(editButton, deleteButton);
  card.append(topRow, name, sku, description, price, actions);
  return card;
}

function renderFilteredProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filtered = allProducts.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" || String(p.categoryId) === selectedCategory;
    const matchesSearch =
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.sku.toLowerCase().includes(query) ||
      (p.description && p.description.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  productsContainer.replaceChildren();
  for (const product of filtered) {
    productsContainer.append(createProductCard(product));
  }

  setStatus(
    filtered.length === 0
      ? "No matching produce found."
      : `Showing ${filtered.length} of ${allProducts.length} produce item(s).`
  );
}

async function loadProducts() {
  setStatus("Loading farm inventory...");
  productsContainer.replaceChildren();

  try {
    allProducts = await request(API_BASE_URL);
    renderFilteredProducts();
  } catch (error) {
    setStatus(`Could not load produce: ${error.message}`, true);
  }
}

async function saveProduct(event) {
  event.preventDefault();
  const formData = new FormData(productForm);
  const existingId = productIdInput.value;

  const price = Number(formData.get("price"));
  if (Number.isNaN(price) || price <= 0) {
    setStatus("Price must be greater than 0 NGN.", true);
    return;
  }

  const payload = {
    sku: formData.get("sku").trim(),
    name: formData.get("name").trim(),
    description: formData.get("description").trim(),
    price,
    categoryId: Number(formData.get("categoryId")),
    isAvailable: formData.has("isAvailable")
  };

  try {
    if (existingId) {
      payload.id = Number(existingId);
      await request(`${API_BASE_URL}/${existingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setStatus("Produce updated.");
    } else {
      await request(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setStatus("New harvest item added.");
    }

    resetFormMode();
    await loadProducts();
  } catch (error) {
    setStatus(`Could not save produce: ${error.message}`, true);
  }
}

async function deleteProduct(id) {
  try {
    await request(`${API_BASE_URL}/${id}`, { method: "DELETE" });
    if (productIdInput.value === String(id)) {
      resetFormMode();
    }
    setStatus("Produce item removed.");
    await loadProducts();
  } catch (error) {
    setStatus(`Could not delete produce: ${error.message}`, true);
  }
}

productForm.addEventListener("submit", saveProduct);
cancelEditButton.addEventListener("click", resetFormMode);
refreshButton.addEventListener("click", loadProducts);
searchInput.addEventListener("input", renderFilteredProducts);
categoryFilter.addEventListener("change", renderFilteredProducts);

loadProducts();