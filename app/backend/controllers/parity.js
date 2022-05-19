'use strict';
const { Parity, sequelize } = require('../models');
const { readSheet, sourceMap, sqs } = require('../helpers');

module.exports = {
  async findAll(req, res, next) {
    try {
      const data = await Parity.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },
  async addSource(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const excelSource = req.files.workbook.path;
      const { checkinDate, checkoutDate } = req.fields;
      const jsonSource = readSheet(excelSource);
      const parityData = sourceMap(jsonSource, checkinDate, checkoutDate);
      const dbInput = await Parity.bulkCreate(parityData, {
        transaction: t,
        returning: true,
      });
      const sendQueue = await Promise.all(parityData.map(async (entry) => {
        return await sqs.sendMessage(entry);
      }));
      if (sendQueue.some(m => m instanceof Error)) {
        throw sendQueue.find(m => m instanceof Error);
      }
      t.commit();
      res.status(201).json(dbInput);
    } catch (error) {
      console.log(error.status);
      t.rollback();
      // next(error);
      res.status(500).json(error);
    }
  },
  async bulkUpdate(req, res, next) {
    //awaiting type of respond data to be decided
  },
};
