const valdiateFormat = require('../../security/helpers/validateFormats');
const contactusSchema = require('../../security/schemas/contactUs.schema');

const validateFormatContactUs = async (req, res, next) => {
  try {
    const isValid = await valdiateFormat(
      contactusSchema.contactUsSchema,
      req.body
    );

    if (!isValid)
      return res.json({
        msg: 'Datos no son correctos. Por favor verifique.',
        success: false,
        data: [],
      });

    next();
  } catch (error) {
    console.log('error to validate format user', error);
    res.json({
      msg: 'error to validate format user',
      success: false,
      data: error,
    });
  }
};

const validateFormatEmail = async (req, res, next) => {
  try {
    const isValid = await valdiateFormat(contactusSchema.emailSchema, req.body);

    if (!isValid)
      return res.json({
        msg: 'Datos no son correctos. Por favor verifique.',
        success: false,
        data: [],
      });

    next();
  } catch (error) {
    console.log('error to validate format user', error);
    res.json({
      msg: 'error to validate format user',
      success: false,
      data: error,
    });
  }
};

const middleware = { validateFormatContactUs, validateFormatEmail };

module.exports = middleware;
