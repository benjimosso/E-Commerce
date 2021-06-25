// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const { belongsTo } = require('./Category');

// Products belongsTo Category
Product.belongsTo(Category, {
    foreignKey: 'category_id',
});
// Categories have many Products
Category.hasMany(Product, {
    as: 'Productos',
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
        through: {
            model: ProductTag,
            unique: false,
        },
        as: 'Producto - etiqueta'
    })
    // Tags belongToMany Products (through ProductTag)

Tag.belongsToMany(Product, {
    through: {
        model: ProductTag,
        unique: false,
    },
    as: 'etiqueta-producto'
});



module.exports = {
    Product,
    Category,
    Tag,
    ProductTag,
};