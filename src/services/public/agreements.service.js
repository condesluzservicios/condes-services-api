import ModelAgreements from '../../Models/public/agreements.model.js';

export const saveAgreements = async (data) => {
  try {
    const newAgreements = new ModelAgreements(data);
    const AgrementsSaved = await newAgreements.save();
    return {
      msg: 'Gaurdado exitosamente.',
      success: true,
      data: AgrementsSaved,
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
