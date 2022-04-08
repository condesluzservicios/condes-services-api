const credenciaslProyectsServices = require('../../services/public/credencialsProyects.services');
const credencialsServices = require('../../services/public/credencials.service');
const agreemrntsServices = require('../../services/public/agreements.service');
const passwordServices = require('../../services/public/recoverPassword.service');
const formtarContactUs = require('../../mail/documents/contactUs');
const connectMailer = require('../../mail/config');

const sendMesaggeContactUs = async (req, res) => {
  const htmlFormat = formtarContactUs(req.body);
  const resSendMail = await connectMailer({
    subject: 'Formulario de contacto.',
    format: htmlFormat,
  });
  res.json({ msg: 'Enviado.', success: true, data: resSendMail });
};

const sendProyectsCredencials = async (req, res) => {
  const credenciaslProyectsSaved =
    await credenciaslProyectsServices.saveCredencialProyects(req.body);
  res.json(credenciaslProyectsSaved);
};

const sendCredencials = async (req, res) => {
  const credenciaslSaved = await credencialsServices.saveCredencial(req.body);
  res.json(credenciaslSaved);
};

const sendAgreements = async (req, res) => {
  const agreementsSaved = await agreemrntsServices.saveAgreements(req.body);
  res.json(agreementsSaved);
};

const recoverPassword = async (req, res) => {
  const { email } = req.body;
  const user = await passwordServices.recoverPassword(email);
  res.json(user);
};

const controller = {
  sendMesaggeContactUs,
  sendProyectsCredencials,
  sendCredencials,
  sendAgreements,
  recoverPassword,
};

module.exports = controller;
