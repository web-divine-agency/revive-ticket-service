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
    let validation = Validator.check([Validator.required(req.body, "name")]);

    if (!validation.pass) {
      let message = Logger.message(req, res, 422, "error", validation.result);
      Logger.error([JSON.stringify(message)]);
      return res.json(message);
    }

    const { name, description } = req.body;

    MysqlService.create("template_categories", {
      name: name,
      description: description,
    })
      .then((response) => {
        let message = Logger.message(req, res, 200, "template", response.insertId);
        Logger.out([JSON.stringify(message)]);
        return res.json(message);
      })
      .catch((error) => {
        let message = Logger.message(req, res, 500, "error", error);
        Logger.error([JSON.stringify(message)]);
        return res.json(message);
      });
  },
};
