const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      healthscore: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          max: 100,
        },
      },
      steps: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: false,
    }
  );
};
