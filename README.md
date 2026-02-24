# Sarte Restro - Food Ordering Website

A modern food ordering website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ✅ User authentication (login/logout)
- ✅ Browse food items with beautiful cards
- ✅ Add items to shopping cart
- ✅ View and manage cart
- ✅ Place orders with delivery information
- ✅ View order history
- ✅ Responsive design

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Login
- Navigate to the login page
- Enter any email and password (demo mode - no validation)
- Click "Sign in"

### Browse Menu
- After logging in, you'll see the food menu
- Browse through various food items displayed as cards

### Add to Cart
- Click "Add to Cart" on any food item
- The cart icon in the navbar will show the item count

### View Cart
- Click "Cart" in the navbar
- Adjust quantities or remove items
- Click "Proceed to Checkout"

### Place Order
- Fill in delivery address and phone number
- Select payment method
- Click "Place Order"

### View Orders
- Click "Orders" in the navbar
- View all your past and current orders
- See order status and details

### Logout
- Click "Logout" in the navbar
- You'll be redirected to the login page

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── cart/           # Cart page
│   ├── checkout/       # Checkout page
│   ├── login/          # Login page
│   ├── orders/         # Orders page
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home/Menu page
├── components/          # React components
│   ├── FoodCard.tsx    # Food item card
│   └── Navbar.tsx      # Navigation bar
├── contexts/           # React contexts
│   ├── AuthContext.tsx # Authentication state
│   ├── CartContext.tsx # Shopping cart state
│   └── OrdersContext.tsx # Orders state
└── data/               # Sample data
    └── sampleFoods.ts  # Food items data
```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Context API** - State management
- **LocalStorage** - Data persistence

## Notes

- This is a demo application with client-side only authentication
- Data is stored in browser localStorage
- For production, you'll need to integrate with a backend API
- Authentication is simplified for demo purposes

## Build for Production

```bash
npm run build
npm start
```

