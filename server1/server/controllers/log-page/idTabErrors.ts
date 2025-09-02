
const { logError } = require("./logError");
import type { idTabError } from "../../types";

function validateIdTabAndIndexStand(param: idTabError): boolean {
  const { idTab, IndexStand, res } = param;

  if (idTab === undefined || typeof IndexStand !== "number") {
    logError("IdTab не найден или передоваемое значение не Number");
    res.status(400).send({ error: "IdTab не найден или передоваемое значение не Number" });
    return false;
  }

  return true;
}


module.exports = {
    validateIdTabAndIndexStand
};
