# Hyperlocal Store App - Assignment

## Overview

Build a full-stack web application with the following capabilities:

- Users should be able to view a list of stores nearby.
- Users can select a store and view the fruits/vegetables available.
- Users can add products to their cart.
- Users can place an order by submitting their name and confirming their cart.

Design appropriate data models and API structure yourself.

## Requirements

- **Backend**: Node.js with Express.js and MongoDB.
- **Frontend**: React.js or any other framework (Flutter preferred)
- **Database**: MongoDB or any other NoSQL

## Features

- List all stores on Home Page.
- View products for a store.
- Add products to Cart.
- Checkout and place an order.

## Folder Structure

- `backend/` (Express.js server)
- `frontend/` (React.js app)
- `sample-data/` (Sample JSON data for MongoDB)

## Wireframes

### Home Page

- List of stores (clickable)

---

## | Hyperlocal Stores |

| [ Fresh Mart ] (MG Road) |
| [ Organic Hub ] (Indiranagar) |
| [ Local Greens ] (Koramangala) |

---

### Store Page

- List of products with "Add to Cart" button

---

## | Fresh Mart - Products |

| Apple ₹150 [ Add to Cart ] |
| Banana ₹50 [ Add to Cart ] |
| |
| [ View Cart ] |

---

### Cart Page

---

## | Your Cart |

| Apple ₹150 Qty: 1 |
| Banana ₹50 Qty: 2 |

---

## | Total: ₹250 |

| Name: [__________] |
| [ Place Order ] |

---

### Order Confirmation Page

- Thank you message

---

## | Thank you, [User Name]! |

| Your order has been placed successfully. |
| [ Go Back to Home ] |

---

📌 Notes for Candidates

The UI doesn’t have to look exactly like this.

Feel free to improve styling, add animations, or even make it prettier if you have time.

The focus is on functionality and a clean, usable flow.

---

## Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Manibingi/Hyperlocal-store
cd Hyperlocal-store
```

### 2. Add items into products.json and stores.json files in sample-data folder (already sample data is there). Run this command

```bash
cd backend
node importData.js
```

### 3. Setup backend

```bash
cd backend
npm install
```

## Create .env file

````env
MONGODB_URI=your_mongoDB-url
PORT=your_port

## Run the server

```bash
nodemon index.js
````

### 4. Setup frontend

## Create .env file

```env
VITE_API_BASE_URL=your_backend_url
```

```bash
cd frontend
npm install
npm run dev
```

### API Endpoints

Stores
GET /api/stores — get all stores

Products
GET /api/products/:storeId — get products by store

Orders
POST /api/orders — place an order

```

```
