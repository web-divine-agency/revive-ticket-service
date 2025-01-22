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
      res.status(422);

      let message = {
        endpoint: `${req.method} ${req.originalUrl} ${res.statusCode}`,
        error: validation.result,
      };

      Logger.error([JSON.stringify(message)]);
      return res.json(message);
    }

    const { name } = req.body;

    let ticket_type;

    try {
      ticket_type = await MysqlService.create("ticket_types", {
        name: name,
      });
    } catch (error) {
      res.status(500);

      let message = {
        endpoint: `${req.method} ${req.originalUrl} ${res.statusCode}`,
        error: error,
      };

      Logger.error([JSON.stringify(message)]);
      return res.json(message);
    }

    res.status(200);

    let message = {
      endpoint: `${req.method} ${req.originalUrl} ${res.statusCode}`,
      ticket_type: ticket_type.insertId,
    };

    Logger.out([JSON.stringify(message)]);
    return res.json(message);
  },
};
