import valdiateFormat from '../../security/helpers/validateFormats.js';
import * as contactusSchema from '../../security/schemas/contactUs.schema.js';

export const validateFormatContactUs = async (req, res, next) => {
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

export const validateFormatEmail = async (req, res, next) => {
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
