const API_URL = "https://fakestoreapi.com/products";

// Get all products
export async function getProducts() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Request failed");
    }

    return await response.json();
  } catch {
    throw new Error("Could not load products");
  }
}

// Get one product
export async function getProduct(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Request failed");
    }

    return await response.json();
  } catch {
    throw new Error("Product not found");
  }
}

// Add a product
export async function addProduct(product) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    return await response.json();
  } catch {
    throw new Error("Could not add product");
  }
}

// Update a product
export async function updateProduct(id, product) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    return await response.json();
  } catch {
    throw new Error("Could not update product");
  }
}

// Delete a product
export async function deleteProduct(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    return await response.json();
  } catch {
    throw new Error("Could not delete product");
  }
}
