const {
  Sequelize, DataTypes, Model, Op,
} = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});
class inventoryClass extends Model {}

const inventory = inventoryClass.init({
  country_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
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
          [Op.gte]: startYear,
        },
      },
    },
  });
}

async function getCountryWithParameters({
  // disabled camel case rule to keep the same name for variables
  // eslint-disable-next-line camelcase
  country_id, startYear, endYear, category,
}) {
  const categoriesArr = category.split(',');
  return inventory.findAll({
    where: {
      country_id,
      year: {
        [Op.and]: {
          [Op.lte]: endYear,
          [Op.gte]: startYear,
        },
      },
      category: {
        [Op.or]: categoriesArr,
      },
    },
  });
}

async function insertIntoInventory(row) {
  return inventory.create({
    ...row,
    status: 'Created',
  }, {
    fields: ['country_id', 'country_or_area', 'year', 'value', 'category'],
  });
}

async function generateDb(dataArr) {
  // eslint-disable-next-line no-restricted-syntax
  for (const row of dataArr) {
    // eslint-disable-next-line no-await-in-loop
    await insertIntoInventory(row);
  }
}

module.exports = {
  generateDb, getCountries, inventory, getCountryWithParameters,
};
