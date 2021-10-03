const { Sequelize, DataTypes, Model, Op } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory');

class inventoryClass extends Model {}

const inventory = inventoryClass.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  country_or_area: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  modelName: 'Inventory',
});

async function getCountries({ startYear, endYear }) {
  return inventory.findAll({
    where: {
      year: {
        [Op.and]: {
          [Op.lt]: endYear,
          [Op.gte]: startYear
        }
      },
    },
  });
}

async function insertIntoInventory(row) {
  return inventory.create({
    ...row,
    status: 'Created',
  }, {
    fields: ['country_or_area', 'year', 'value', 'category'],
  });
}


async function generateDb(dataArr) {
  for (let row of dataArr) {
    await insertIntoInventory(row)
  }
}

module.exports = {
  generateDb, getCountries, inventory
};
