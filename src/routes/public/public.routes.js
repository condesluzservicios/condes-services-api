import express from 'express';
const router = express.Router();

// middlewares
import {
  validateFormatContactUs,
  validateFormatEmail,
} from '../../middlewares/public/contactUs.middleware.js';

// controllers
import * as publicController from '../../controllers/public/public.controller.js';

// contact us
router.post(
  '/send-contact',
  validateFormatContactUs,
  publicController.sendMesaggeContactUs
);

// projects public
router.post(
  '/send-credencials-proyect',
  validateFormatContactUs,
  publicController.sendProyectsCredencials
);

// credentials public
router.post(
  '/send-credencials',
  validateFormatContactUs,
  publicController.sendCredencials
);

// agreements
router.post(
  '/send-agreements',
  validateFormatContactUs,
  publicController.sendAgreements
);

// recover password
router.post(
  '/recover-password',
  validateFormatEmail,
  publicController.recoverPassword
);

export default router;
