export interface Food {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category?: string;
}

export const sampleFoods: Food[] = [
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Classic pizza with fresh tomatoes, mozzarella, and basil",
    price: 12.99,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=600&fit=crop",
  },
  {
    id: "2",
    name: "Pepperoni Pizza",
    description: "Traditional pizza with pepperoni and mozzarella cheese",
    price: 14.99,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&h=600&fit=crop",
  },
  {
    id: "3",
    name: "Chicken Burger",
    description: "Juicy grilled chicken patty with fresh vegetables",
    price: 9.99,
    category: "Burgers",
    image: "https://images.unsplash.com/photo-1606755962773-d324e588a96b?w=600&h=600&fit=crop",
  },
  {
    id: "4",
    name: "Beef Burger",
    description: "Classic beef burger with lettuce, tomato, and special sauce",
    price: 10.99,
    category: "Burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop",
  },
  {
    id: "5",
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with caesar dressing and croutons",
    price: 8.99,
    category: "Salads",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&h=600&fit=crop",
  },
  {
    id: "6",
    name: "Grilled Chicken",
    description: "Tender grilled chicken breast with herbs and spices",
    price: 15.99,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&h=600&fit=crop",
  },
  {
    id: "7",
    name: "Pasta Carbonara",
    description: "Creamy pasta with bacon, eggs, and parmesan cheese",
    price: 13.99,
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=600&fit=crop",
  },
  {
    id: "8",
    name: "Fish & Chips",
    description: "Crispy battered fish with golden fries",
    price: 11.99,
    category: "Seafood",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=600&fit=crop",
  },
  {
    id: "9",
    name: "Chocolate Cake",
    description: "Rich and moist chocolate cake with frosting",
    price: 6.99,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop",
  },
  {
    id: "10",
    name: "Ice Cream Sundae",
    description: "Vanilla ice cream with chocolate sauce and toppings",
    price: 5.99,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=600&fit=crop",
  },
  {
    id: "11",
    name: "Chicken Wings",
    description: "Spicy buffalo wings with blue cheese dip",
    price: 9.99,
    category: "Appetizers",
    image: "https://images.unsplash.com/photo-1527477396000-e27137b25c24?w=600&h=600&fit=crop",
  },
  {
    id: "12",
    name: "Nachos",
    description: "Crispy nachos with cheese, jalapeños, and salsa",
    price: 7.99,
    category: "Appetizers",
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600&h=600&fit=crop",
  },
];

