import * as credenciaslProyectsServices from '../../services/public/credencialsProyects.services.js';
import * as credencialsServices from '../../services/public/credencials.service.js';
import * as agreemrntsServices from '../../services/public/agreements.service.js';
import * as passwordServices from '../../services/public/recoverPassword.service.js';
import { formtarContactUs } from '../../mail/documents/contactUs.js';
import connectMailer from '../../mail/config.js';

export const sendMesaggeContactUs = async (req, res) => {
  const htmlFormat = formtarContactUs(req.body);
  const resSendMail = await connectMailer({
    subject: 'Formulario de contacto.',
    format: htmlFormat,
  });
  res.json({ msg: 'Enviado.', success: true, data: resSendMail });
};

export const sendProyectsCredencials = async (req, res) => {
  const credenciaslProyectsSaved =
    await credenciaslProyectsServices.saveCredencialProyects(req.body);
  res.json(credenciaslProyectsSaved);
};

export const sendCredencials = async (req, res) => {
  const credenciaslSaved = await credencialsServices.saveCredencial(req.body);
  res.json(credenciaslSaved);
};

export const sendAgreements = async (req, res) => {
  const agreementsSaved = await agreemrntsServices.saveAgreements(req.body);
  res.json(agreementsSaved);
};

export const recoverPassword = async (req, res) => {
  const { email } = req.body;
  const user = await passwordServices.recoverPassword(email);
  res.json(user);
};
