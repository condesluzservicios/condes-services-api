const yup = require('yup');

const contactUsSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'name must be valid format')
    .required('name is required'),
  last_name: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'last name must be valid format')
    .required('last name is required'),
  email: yup
    .string('email must be a text')
    .email('email must be a correct format')
    .required('email is required'),
  country: yup.string().required('last name is required'),
  cod_number: yup
    .string()
    .matches(/^[+0-9]+$/, 'código debe ser un formato correcto.')
    .required('codigo de teléfono es requerido.'),
  phone: yup
    .number('Ingrese un número valido')
    .required('número es requerido.'),
});

const emailSchema = yup.object().shape({
  email: yup
    .string('email must be a text')
    .email('email must be a correct format')
    .required('email is required'),
});

const contactSchemas = { contactUsSchema, emailSchema };

module.exports = contactSchemas;
