const express = require('express');
const router = express.Router();

// middlewares
const contactMiddlaware = require('../../middlewares/public/contactUs.middleware');

// controllers
const publicController = require('../../controllers/public/public.controller');

// contact us
router.post(
  '/send-contact',
  contactMiddlaware.validateFormatContactUs,
  publicController.sendMesaggeContactUs
);

// proyects public
router.post(
  '/send-credencials-proyect',
  contactMiddlaware.validateFormatContactUs,
  publicController.sendProyectsCredencials
);

// credencials public
router.post(
  '/send-credencials',
  contactMiddlaware.validateFormatContactUs,
  publicController.sendCredencials
);

// agreements
router.post(
  '/send-agreements',
  contactMiddlaware.validateFormatContactUs,
  publicController.sendAgreements
);

// recover assword
router.post(
  '/recover-password',
  contactMiddlaware.validateFormatEmail,
  publicController.recoverPassword
);

module.exports = router;
