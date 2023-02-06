import {
  createSettingsCollections,
  getSettings,
} from '../repositories/settings.repositories/settings.repository.js';

const setSettingsMigrations = async () => {
  const settings = await getSettings();
  if (settings.length <= 0) {
    await createSettingsCollections();
  }
};

export const migrationsExec = async () => {
  await setSettingsMigrations();
};
