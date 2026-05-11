package com.example.ecommerce;

public record Product(
    int id,
    String name,
    double price,
    String image,
    String description,
    String category,
    double rating,
    int stock
) {}
