import ModelCredencialsProyects from '../../Models/public/cedencialsProyects.model.js';

export const saveCredencialProyects = async (data) => {
  try {
    const newCredentialsProyects = new ModelCredencialsProyects(data);
    const credencialsProyectsSaved = await newCredentialsProyects.save();
    return {
      msg: 'Gaurdado exitosamente.',
      success: true,
      data: credencialsProyectsSaved,
    };
  } catch (error) {
    console.log('error al guardar credenciales del proyecto.');
    return {
      msg: 'error al guardar credenciales del proyecto.',
      success: false,
      data: error,
    };
  }
};
