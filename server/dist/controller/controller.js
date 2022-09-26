"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const db = require("../../db");
const rangeRowCount = require("../utils");
class Controller {
    getTableData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const limit = req.query.limit || 10;
            const offset = req.query.page || 1;
            const firstPageIndex = (offset - 1) * limit;
            const { rows } = yield db.query(`SELECT * FROM public."table" ORDER BY ID ASC OFFSET ${firstPageIndex} LIMIT ${limit}`);
            const { rowCount } = yield db.query('SELECT * FROM public."table"');
            const totalPageCount = Math.ceil(rowCount / limit);
            const rowCountArr = rangeRowCount(1, totalPageCount);
            res.json({
                data: rows,
                length: rowCountArr,
            });
        });
    }
    sortTable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const field = req.params.field;
            const order = req.params.order.toUpperCase();
            const limit = req.query.limit || 10;
            const offset = req.query.page || 1;
            const firstPageIndex = (offset - 1) * limit;
            const { rows } = yield db.query(`SELECT * FROM public."table" ORDER BY ${field} ${order} OFFSET ${firstPageIndex} LIMIT ${limit}`);
            res.json(rows);
        });
    }
    filterTable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const column = req.params.column;
            const operator = req.params.operator;
            const search = req.params.search;
            const { rows } = yield db.query(`SELECT * FROM public."table" WHERE ${column} ${operator} '${search}' ORDER BY ${column} `);
            console.log(rows);
            res.json(rows);
        });
    }
}
module.exports = new Controller();
