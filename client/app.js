const API_BASE_URL = "http://localhost:5233/api/products";

const productForm = document.querySelector("#product-form");
const productsContainer = document.querySelector("#products");
const statusMessage = document.querySelector("#status");
const refreshButton = document.querySelector("#refresh-button");

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

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";

  const name = document.createElement("h3");
  name.textContent = product.name;

  const sku = document.createElement("p");
  sku.className = "product-meta";
  sku.textContent = `SKU: ${product.sku}`;

  const description = document.createElement("p");
  description.className = "product-description";
  description.textContent = product.description || "No description provided.";

  const price = document.createElement("p");
  price.className = "product-meta";
  price.textContent = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD"
  }).format(product.price);

  const availability = document.createElement("p");
  availability.className = "product-meta";
  availability.textContent = product.isAvailable ? "Available" : "Unavailable";

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteProduct(product.id));

  card.append(name, sku, description, price, availability, deleteButton);
  return card;
}

async function loadProducts() {
  setStatus("Loading products...");
  productsContainer.replaceChildren();

  try {
    const products = await request(API_BASE_URL);
    for (const product of products) {
      productsContainer.append(createProductCard(product));
    }

    setStatus(
      products.length === 0
        ? "No products found. Add one using the form above."
        : `${products.length} product(s) loaded.`
    );
  } catch (error) {
    setStatus(`Could not load products: ${error.message}`, true);
  }
}

async function addProduct(event) {
  event.preventDefault();
  const formData = new FormData(productForm);
  const product = {
    sku: formData.get("sku").trim(),
    name: formData.get("name").trim(),
    description: formData.get("description").trim(),
    price: Number(formData.get("price")),
    categoryId: Number(formData.get("categoryId")),
    isAvailable: formData.has("isAvailable")
  };

  try {
    await request(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });
    productForm.reset();
    setStatus("Product added.");
    await loadProducts();
  } catch (error) {
    setStatus(`Could not add product: ${error.message}`, true);
  }
}

async function deleteProduct(id) {
  try {
    await request(`${API_BASE_URL}/${id}`, { method: "DELETE" });
    setStatus("Product deleted.");
    await loadProducts();
  } catch (error) {
    setStatus(`Could not delete product: ${error.message}`, true);
  }
}

productForm.addEventListener("submit", addProduct);
refreshButton.addEventListener("click", loadProducts);
loadProducts();
