import SettingsModel from '../../Models/settings/settings.model.js';

/**
 * @returns settings created
 */
export const createSettingsCollections = async () => {
  try {
    const settings = await SettingsModel.create({});
    return settings;
  } catch (error) {
    console.log(`Error al crear settings ${error}`);
    return null;
  }
};

/**
 * @param {*} settingsToUpdate data to update settings
 * @returns settings updated
 */
export const updateSettings = async (settingsToUpdate) => {
  try {
    const settings = await getSettings();

    const setting = await settings[0];

    const settingsUpdated = await SettingsModel.findByIdAndUpdate(
      setting._id,
      { ...settingsToUpdate },
      {
        upsert: true,
      }
    );

    return settingsUpdated;
  } catch (error) {
    console.log(`Error al actualizar settings ${error}`);
    return null;
  }
};

/**
 * @returns settings List
 */
export const getSettings = async () => {
  try {
    const settings = await SettingsModel.find();
    return settings;
  } catch (error) {
    console.log(`Error al actualizar settings ${error}`);
    return null;
  }
};
