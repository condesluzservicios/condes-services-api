import yup from 'yup';

export const registerProjectsStepOneSchema = yup.object().shape({
  personal_type: yup
    .string('Ingrese que tipo de personal')
    .typeError('Ingrese que tipo de personal')
    .required('Tipo de personal es querido.'),
  name: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Introduzca un Nombre valido.')
    .required('Nombre es requerido.'),
  last_name: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Introduzca un apellido valido.')
    .required('Apellido es requerido.'),
  type_identification: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Introduzca un tipo de documento.')
    .typeError('Introduzca un tipo de documento.')
    .required('Tipo de documento es requerido.'),
  identification: yup
    .number('Ingrese una identificación valida.')
    .typeError('Ingrese una identificación Uida.')
    .typeError('.')
    .required('Identificación es requerida.'),
  profession: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Introduzca una profesión.')
    .required('Profesión es requerida.'),
  specialty: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Introduzca una especialidad.')
    .required('Especialidad es requerida.'),

  category: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Introduzca una categoria.')
    .required('Categoria es requerida.'),

  last_date_promotion: yup
    .date('Introduzca una fecha.')
    .typeError('Introduzca una fecha.')
    .notRequired(),
  // .string()
  // .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Introduzca una fecha.')
  // .required('Fecha de ascenso es requerida.'),

  faculty_core: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Introduzca una facultad/núcleo.')
    .required('facultad/núcleo es requerida.'),

  research_unit: yup
    .string()
    .matches(
      /^[a-zA-Zá-üÁ-Ü ]+$/,
      'Introduzca una dependencia de investigación.'
    )
    .required('Dependencia de investigación es requerida.'),

  email: yup
    .string()
    .email('Introduzca un correo valido.')
    .required('Correo es requerido.'),
  cod_number: yup
    .string()
    .matches(/^[+0-9]+$/, 'código debe ser un formato correcto.')
    .required('codigo de teléfono es requerido.'),
  phone: yup
    .number('Ingrese un número valido')
    .typeError('Ingrese un número valido')
    .required('número es requerido.'),
  dedication: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Introduzca una dedicación valida.'),
});

export const registerProjectsStepTwoSchema = yup.object().shape({
  title: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Introduzca un titulo valido.')
    .required('titulo es requerido.'),
  type_project: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Introduzca un tipo de proyecto valido.')
    .required('Tipo de proyecto es requerido.'),
  // project_area: yup
  //   .string()
  //   .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Introduzca un area de proyecto valido.')
  //   .required('Area de proyecto es requerido.'),
  line_research: yup
    .string()
    .matches(
      /^[a-zA-Zá-üÁ-Ü , ]+$/,
      'Introduzca una línea de investigación valida.'
    )
    .required('Línea de investigación es requerido.'),
  type_research: yup
    .string()
    .matches(
      /^[a-zA-Zá-üÁ-Ü ]+$/,
      'Introduzca un tipo de investigación valida.'
    )
    .typeError('Tipo de investigación es requerido.')
    .required('Tipo de investigación es requerido.'),
  // program_code: yup
  //   .string()
  //   .matches(
  //     /^[a-zA-Zá-üÁ-Ü0-9-]+$/,
  //     'Introduzca un código del proyecto valido.'
  //   )
  //   .required('Código de proyecto es requerido.'),
});

export const registerProjectsStepThreeSchema = yup.object().shape({
  project_summary: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü;,.0-9 ]+$/, 'Introduzca un resumen de proyecto.')
    .required('Resumen del proyecto es requerido.'),
  general_objective: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü;,.0-9 ]+$/, 'Introduzca un objetivo general.')
    .required('Objetivo general es requerido.'),
  specific_objectives: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü;,.0-9 ]+$/, 'Introduzca objetivos especificos.')
    .required('Objetivos especificos son requeridos.'),
  // hypothesis: yup
  //   .string()
  //   .matches(/^[a-zA-Zá-üÁ-Ü;,.0-9 ]+$/, 'Introduzca una hipotesís especificos.'),
  methodology_used: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü;,.0-9 ]+$/, 'Introduzca una metodología valida.')
    .required('Metodología es requerida.'),
  feasibility_research: yup
    .string()
    .matches(
      /^[a-zA-Zá-üÁ-Ü;,.0-9 ]+$/,
      'Debe ingresar la viabilidad del proyecto.'
    )
    .required('La viabilidad del proyecto es requerida.'),
  // chronogram_activities: yup
  //   .string()
  //   .matches(
  //     /^[a-zA-Zá-üÁ-Ü;,.0-9 ]+$/,
  //     'Debe ingresar un cronograma de actividades.'
  //   )
  //   .required('Cronograma es requerida.'),
});

export const projectParticipantsSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Introduzca un nombre.')
    .required('Nombre es requerido.'),

  last_name: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Introduzca un apellido.')
    .required('Apellido es requerido.'),

  type_identification: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Introduzca un tipo de identificación.')
    .required('Tipo de identificación es requerida.'),

  identification: yup
    .number('Ingrese una identificación valida')
    .typeError('Ingrese una identificación valida')
    .required('Identificación es requerida.'),

  profession: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Introduzca una profesión.')
    .required('Profesión es requerida.'),

  specialty: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Introduzca una especialidad.')
    .required('Especialidad es requerida.'),

  institution: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Introduzca una institución.')
    .required('Institución es requerida.'),

  faculty_core: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Introduzca una facultad/núcleo.')
    .required('Facultad/núcleo es requerido.'),

  category: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Introduzca una categoría.')
    .required('Categoría es requerida.'),

  research_entity: yup
    .string()
    .matches(/^[a-zA-Zá-üÁ-Ü ]+$/, 'Introduzca un ente de investigación.')
    .required('Un ente de investigación es requerido.'),

  last_date_promotion: yup
    .date('Introduzca fecha de último ascenso.')
    .typeError('Introduzca fecha de último ascenso.')
    .required('Fecha de último ascenso es requerida.'),

  email: yup
    .string()
    .email('Ingrese un correo valido')
    .required('Correo electrónico es requerido'),

  cod_number: yup
    .string()
    .matches(/^[+0-9]+$/, 'código debe ser un formato correcto.')
    .required('codigo de teléfono es requerido.'),

  phone: yup
    .number('Ingrese un teléfono valido')
    .typeError('Ingrese un teléfono valido')
    .required('Fecha de último ascenso es requerida.'),

  position: yup
    .string()
    .matches(/^[-a-zA-Zá-üÁ-Ü ]+$/, 'Introduzca una posición.')
    .required('Posición es requerida.'),
});
