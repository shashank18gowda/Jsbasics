const { initCustModel } = require("../../model/customerModel")
const { RESPONSE } = require("../../config/global");
const { send } = require("../../config/responseHelper")
//@access private

const deleteCust = async (req, res) => {
  try {
    const { id } = req.params;
    const schema = await initCustModel();
    //console.log(schema);

    const itemToDelete = await schema.findOne({ where: { id: id, stat: true } });

    if (!itemToDelete) {
      return send(res, RESPONSE.ENTRY_NF);
    }

    const updatedItem = await schema.update(
      { stat: false },
      {
        where: { id: id, stat: true },
        returning: true
      }
    );

    if (!updatedItem) {
      return send(res, RESPONSE.ITM_NOT_FOUND);
    }

    return send(res, RESPONSE.DATA_DELETED_SUCCESSFULLY);
  } catch (err) {
    // return send(res, RESPONSE.ERROR);
    return send(res, RESPONSE.ERROR, err.stack)
  }
};

module.exports = { deleteCust }
