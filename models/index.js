// import models
const Product = require('./product');
const Category = require('./category');
const Tag = require('./tag');
const ProductTag = require('./productTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: 'CASCADE',
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "category_id",
  onDelete: 'CASCADE',
})
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tags, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: 'product_tags'
})
// Tags belongToMany Products (through ProductTag)
Tags.belongsToMany(Products, {
  through: {
    model: ProductTag,
    unique: false
  },
  as 'tagged_products'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
