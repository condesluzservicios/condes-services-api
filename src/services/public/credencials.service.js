const ModelCredencials = require('../../Models/public/credencials.model');

const saveCredencial = async (data) => {
  try {
    const newCredentials = new ModelCredencials(data);
    const credencialsSaved = await newCredentials.save();
    return {
      msg: 'Gaurdado exitosamente.',
      success: true,
      data: credencialsSaved,
    };
  } catch (error) {
    console.log('error al guardar credenciales.');
    return {
      msg: 'error al guardar credenciales.',
      success: false,
      data: error,
    };
  }
};

const credencialsServices = { saveCredencial };

module.exports = credencialsServices;
