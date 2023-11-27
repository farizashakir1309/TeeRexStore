# TeeRex Store (React)
This project T-Shirt WebApp is a simple React-based web application that allows customers to browse a catalog of t-shirts, search for specific items, apply filters, add items to a shopping cart, and view and manage the contents of the shopping cart.

## Table of Contents
- [Link](#link)
- [Features](#features)
- [Getting Started](#getting-started)
- [API Usage](#api-usage)

## Link
https://guileless-blini-79c244.netlify.app/home

<img width="948" alt="image" src="https://github.com/farizashakir1309/TeeRexStore/assets/69107931/c148c1cc-3aaa-4991-a53d-0e15f5094b9f">

## Features
1. Product Listing Page: Displays a catalog of t-shirts with each card containing an image, name, and price.
2. Search: Users can search for t-shirts using free text, combining attributes like name, color, and type.
3. Filters: Users can filter t-shirts based on gender, color, price range, and type.
4. Shopping Cart: Users can add one or more t-shirts to the shopping cart. The shopping cart icon allows users to view and manage the contents of the cart. Users can increase quantity or delete items from the shopping cart. The total amount in the shopping cart is displayed.

## Getting Started
Follow these steps to set up and run the project locally:

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Run the development server using `npm start`.

## API Usage
This project uses the Users API to retrieve user data for display and interaction. The API endpoint is [https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json])

Sample API Response:

```json
[
  {
      "id": 1,
      "imageURL": "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/black-polo-men.png",
      "name": "Black Polo",
      "type": "Polo",
      "price": 250,
      "currency": "INR",
      "color": "Black",
      "gender": "Men",
      "quantity": 3
    },
    {
      "id": 2,
      "imageURL": "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/blue-polo-women.png",
      "name": "Blue Polo",
      "type": "Polo",
      "price": 350,
      "currency": "INR",
      "color": "Blue",
      "gender": "Women",
      "quantity": 3
    },
  // ...
]
