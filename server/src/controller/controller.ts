"use strict";
const db = require("../../db");
const rangeRowCount = require("../utils");

interface IController {
  getTableData: (req: Request, res: Response) => Promise<void>;
}
class Controller implements IController {
  public async getTableData(req: any, res: any) {
    const limit = req.query.limit || 10;
    const offset = req.query.page || 1;
    const firstPageIndex = (offset - 1) * limit;
    const { rows } = await db.query(
      `SELECT * FROM public."table" ORDER BY ID ASC OFFSET ${firstPageIndex} LIMIT ${limit}`
    );
    const { rowCount } = await db.query('SELECT * FROM public."table"');
    const totalPageCount = Math.ceil(rowCount / limit);
    const rowCountArr = rangeRowCount(1, totalPageCount);
    res.json({
      data: rows,
      length: rowCountArr,
    });
  }
  public async sortTable(req: any, res: any) {
    const field = req.params.field;
    const order = req.params.order.toUpperCase();
    const limit = req.query.limit || 10;
    const offset = req.query.page || 1;

    const firstPageIndex = (offset - 1) * limit;
    const { rows } = await db.query(
      `SELECT * FROM public."table" ORDER BY ${field} ${order} OFFSET ${firstPageIndex} LIMIT ${limit}`
    );
    res.json(rows);
  }

  public async filterTable(req: any, res: any) {
    const column = req.params.column;
    const operator = req.params.operator;
    const search = req.params.search;

    const { rows } = await db.query(
      `SELECT * FROM public."table" WHERE ${column} ${operator} '${search}' ORDER BY ${column} `
    );
    console.log(rows);
    res.json(rows);
  }
}

module.exports = new Controller();
