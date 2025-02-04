import Logger from "../util/logger.js";
import Validator from "../util/validator.js";

import MysqlService from "../services/MysqlService.js";

export default {
  /**
   * Create ticket
   * @param {*} req
   * @param {*} res
   * @returns
   */
  create: async (req, res) => {
    let validation = Validator.check([
      Validator.required(req.body, "name"),
      Validator.required(req.body, "category_id"),
    ]);

    if (!validation.pass) {
      let message = Logger.message(req, res, 422, "error", validation.result);
      Logger.error([JSON.stringify(message)]);
      return res.json(message);
    }

    const { name, category_id } = req.body;

    let template;

    try {
      template = await MysqlService.create("templates", {
        name: name,
        category_id: category_id,
      });
    } catch (error) {
      let message = Logger.message(req, res, 500, "error", error);
      Logger.error([JSON.stringify(message)]);
      return res.json(message);
    }

    let message = Logger.message(req, res, 200, "template", template.insertId);
    Logger.out([JSON.stringify(message)]);
    return res.json(message);
  },
};
