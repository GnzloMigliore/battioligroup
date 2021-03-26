module.exports = (sequelize, dataTypes) => {
    let alias = 'products';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_id: dataTypes.INTEGER,
        name_product: dataTypes.STRING,
        tipo_envio: dataTypes.STRING,
        place: dataTypes.STRING,
        n_tracking: dataTypes.STRING,
        weight: dataTypes.INTEGER,
        coments: dataTypes.STRING,
        date_state: dataTypes.TEXT,
      
    };

    const products = sequelize.define(alias, cols)
    
    products.associate = function(models) {
        products.hasMany(
            models.users,
            {
                as: 'users',
                foreignKey: 'product_id'
            }
        )
   }
    return products;
} 