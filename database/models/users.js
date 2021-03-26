module.exports = (sequelize, dataTypes) => {
    let alias = 'users';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        first_name: dataTypes.STRING,
        last_name: dataTypes.STRING,
        full_name: dataTypes.STRING,
        email: dataTypes.STRING,
        password: dataTypes.STRING,
        telephone: dataTypes.INTEGER,
        adress: dataTypes.STRING,
        dni: dataTypes.STRING,
        gender: dataTypes.STRING,
        roles: dataTypes.INTEGER,
        product_id: dataTypes.INTEGER,
        
    };

    const users = sequelize.define(alias, cols)
    users.associate = function(models) {
        users.belongsTo(
            models.products,
            {
                as: 'products',
                foreignKey: 'product_id'
            }
        )  
    } 
    return users;
} 