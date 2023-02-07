import {
  getSettings,
  updateSettings,
} from '../../repositories/settings.repositories/settings.repository.js';

export const updateSettingsController = async (req, res) => {
  const body = req.body;

  const updated = await updateSettings(body);

  if (!updated) {
    res.json({
      success: false,
      message: 'Error al actualizar configuración',
      data: null,
    });
    return;
  }

  res.json({
    success: true,
    message: 'configuración actualizada exitosamente.',
    data: updated,
  });
};

export const getSettingsController = async (req, res) => {
  const settingsList = await getSettings();

  if (!settingsList) {
    res.json({
      success: false,
      message: 'Error al obtener configuración',
      data: null,
    });
    return;
  }

  res.json({
    success: true,
    message: 'Lista de configuración',
    data: settingsList,
  });
};
