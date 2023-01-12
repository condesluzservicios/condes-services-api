import ModelCredencials from '../../Models/public/credencials.model.js';

export const saveCredencial = async (data) => {
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
