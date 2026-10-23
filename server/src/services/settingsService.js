const WebsiteSetting = require('../models/WebsiteSetting');

class SettingsService {
  async get() {
    return await WebsiteSetting.getSettings();
  }

  async update(data) {
    let settings = await WebsiteSetting.findOne();
    if (!settings) {
      settings = new WebsiteSetting(data);
    } else {
      Object.assign(settings, data);
    }
    await settings.save();
    return settings;
  }
}

module.exports = new SettingsService();
