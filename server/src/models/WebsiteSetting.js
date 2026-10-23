const mongoose = require('mongoose');

const websiteSettingSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      default: 'JUSTICIA – Advocates & Legal Consultants',
    },
    tagline: {
      type: String,
      default: 'Defending Rights. Delivering Justice.',
    },
    logo: String,
    favicon: String,
    contact: {
      address: String,
      phone: String,
      email: String,
      workingHours: String,
      mapEmbedUrl: String,
    },
    socialLinks: {
      facebook: String,
      twitter: String,
      linkedin: String,
      instagram: String,
      youtube: String,
    },
    seo: {
      title: String,
      description: String,
      keywords: [String],
    },
    statistics: {
      experience: { type: Number, default: 15 },
      casesWon: { type: Number, default: 500 },
      successRate: { type: Number, default: 98 },
      happyClients: { type: Number, default: 1000 },
    },
  },
  {
    timestamps: true,
  }
);

websiteSettingSchema.statics.getSettings = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

const WebsiteSetting = mongoose.model('WebsiteSetting', websiteSettingSchema);
module.exports = WebsiteSetting;
