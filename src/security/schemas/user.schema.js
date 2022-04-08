const yup = require('yup');

const userLoginSchema = yup.object().shape({
  email: yup
    .string('email must be a text')
    .email('email must be a correct format')
    .required('email is required'),
  password: yup.string().required(),
});

const updateUserSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'name must be valid format')
    .required('name is required'),
  last_name: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'last name must be valid format')
    .required('last name is required'),

  country: yup.string().required('last name is required'),
  isCompany: yup.boolean(),
});

const userDataSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Debe ingresar un formato valido')
    .required('Nombre es requerido'),
  last_name: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Debe ingresar un apellido valido')
    .required('Apellido es requerido'),
  email: yup
    .string('Correo debe ser textp')
    .email('Ingrese un correo corecto')
    .required('Correo electrónico es requerido'),
  password: yup
    .string()
    .min(8, 'Se requieren, al menos, 8 caracteres')
    .required('Contraseña es requerida'),
  password_two: yup
    .string()
    .min(8, 'Se requieren, al menos, 8 caracteres')
    .required('Por favor repita su contraseña')
    .oneOf([yup.ref('password')], 'Contraseñas no coinciden'),
  // country: yup.string().required('Seleccione un pais'),
  isCompany: yup
    .boolean('Debe indicar si es una empresa')
    .typeError('Indique si es una compañia.'),
  cod_number: yup.string(),
  phone: yup.number().typeError('Teléfono debe ser númerico'),
});

// update data user
const nameAndLastNameSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Debe ingresar un nombre valido')
    .required('Nombre es requerido'),
  last_name: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Debe ingresar un apellido valido')
    .required('Apellido es requerido'),
});

const emailSchema = yup.object().shape({
  email: yup
    .string('Correo debe ser texto')
    .email('Ingrese un correo valido')
    .required('Correo electrónico es requerido'),
});

const passwordsSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Se requieren, al menos, 8 caracteres')
    .required('Contraseña es requerida'),
  password_two: yup
    .string()
    .min(8, 'Se requieren, al menos, 8 caracteres')
    .required('Por favor repita su contraseña')
    .oneOf([yup.ref('password')], 'Contraseñas no coinciden'),
});

const userSchemas = {
  userLoginSchema,
  updateUserSchema,
  userDataSchema,
  // update user from user
  nameAndLastNameSchema,
  emailSchema,
  passwordsSchema,
};

module.exports = userSchemas;
