const fs = require('fs');
const parse = require('csv-parse');

const { generateDb } = require('../sqlite/sequelize');

const parser = parse({columns: true}, function (err, records) {
    let dBrows = [];
    for(let record of records){
        if(record.category && record.category.startsWith('carbon_dioxide_co2')) {
            record.category = 'CO2';
        } else if(record.category && record.category.startsWith('greenhouse_gas_ghgs')) {
            record.category = 'GHGS';
        } else if(record.category && record.category.startsWith('hydrofluorocarbons_hfcs')) {
            record.category = 'HFCS';
        } else if(record.category && record.category.startsWith('methane_ch4')) {
            record.category = 'CH4';
        } else if(record.category && record.category.startsWith('nitrogen_trifluoride_nf3')) {
            record.category = 'NF3';
        } else if(record.category && record.category.startsWith('nitrous_oxide_n2o')) {
            record.category = 'N2O';
        } else if(record.category && record.category.startsWith('perfluorocarbons_pfcs')) {
            record.category = 'PFCS';
        } else if(record.category && record.category.startsWith('sulphur_hexafluoride_sf6')) {
            record.category = 'SF6';
        } else if(record.category && record.category.startsWith('unspecified_mix_of_hydrofluorocarbons_hfcs_and_perfluorocarbons_pfcs')) {
            record.category = 'FLOUROCARBONSMIX';
        }
        dBrows.push(record);
    }
     // console.log(dBrows);
    generateDb(dBrows).then('db built!')
});


function buildDbFromCsv() {
    console.log('parsing csv file')
    fs.createReadStream(__dirname + '/greenhouse_gas_inventory_data.csv').pipe(parser);
    console.log('csv parsed')
}

module.exports = { buildDbFromCsv }
