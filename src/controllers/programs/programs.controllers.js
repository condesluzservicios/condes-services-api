import {
  getAmountProgramsRegistered,
  getProgramById,
  getProgramsList,
  getProgramsWithProjectsPendingRegistrationByIdUser,
  registerNewProgram,
} from '../../repositories/programs.repositories/programs.repository.js';
import { generateSequentialNumberProgramAndProject } from '../../utils/projects.utils.js';

export const registerNewProgramController = async (req, res) => {
  const body = req.body;

  const amountPrograms = await getAmountProgramsRegistered();

  const code = generateSequentialNumberProgramAndProject(
    amountPrograms + 1,
    body.type_program
  );

  body.program_code = code;

  const programSaved = await registerNewProgram(body);

  if (!programSaved) {
    res.json({
      success: false,
      msg: 'Error al registrar programa.',
      data: null,
    });
    return;
  }

  res.json({
    success: true,
    msg: 'Programa registrado exitosamente.',
    data: programSaved,
  });
};

export const getProgramsWithProjectsPendingRegistrationController = async (
  req,
  res
) => {
  const { id_user } = req.query;

  const programsList = await getProgramsWithProjectsPendingRegistrationByIdUser(
    id_user
  );

  if (!programsList) {
    res.json({
      success: false,
      msg: 'Error al obtener programas.',
      data: null,
    });
    return;
  }

  res.json({
    success: true,
    msg: 'Lista de programas pendientes.',
    data: programsList,
  });
};

export const getProgramByIdController = async (req, res) => {
  const { id_program } = req.query;

  const programData = await getProgramById(id_program);

  if (!programData) {
    res.json({
      message: 'Error al obtener programa',
      success: false,
      data: null,
    });
    return;
  }

  res.json({
    message: 'Datos del programa',
    success: true,
    data: programData,
  });
};

export const getProgramsByStatusController = async (req, res) => {
  const { skip, flag } = req.query;

  const programsList = await getProgramsList(flag, Number(skip) | 0);

  res.json({
    success: true,
    message: 'Lista de programas',
    data: programsList,
  });
};
