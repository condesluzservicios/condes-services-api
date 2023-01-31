import { userRoles } from '../../constants/entities.js';
import {
  getProgramById,
  searchProgramsList,
  getProgramsListByCommissionsRoleWithOutAssignmentRepository,
  getProgramsByIdUser,
  getProgramsWithProjectsPendingRegistration,
  updateStatusProgram,
} from '../../repositories/programs.repositories/programs.repository.js';
import {
  assignProgramToEvaluatorsService,
  registerNewProgramService,
} from '../../services/programs/programs.services.js';

export const registerNewProgramController = async (req, res) => {
  const body = req.body;

  const programSaved = await registerNewProgramService(body);

  res.json(programSaved);
};

export const getProgramsByIdUserController = async (req, res) => {
  const { id_user } = req.query;

  const programsList = await getProgramsByIdUser(id_user);

  if (!programsList) {
    res.json({
      success: false,
      msg: 'Error al obtener tus programas.',
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

  const programsList = await searchProgramsList(flag, Number(skip) | 0);

  res.json({
    success: true,
    message: 'Lista de programas',
    data: programsList,
  });
};

export const getProgramsByCommissionsRoleWithoutAssignmentController = async (
  req,
  res
) => {
  const { id_user, role, commissionsRole, skip, flag } = req.query;

  const programs =
    await getProgramsListByCommissionsRoleWithOutAssignmentRepository({
      id_user: id_user,
      role: role,
      commissionsRole,
      skip: Number(skip) || 0,
      flag,
    });

  if (!programs) {
    res.json({
      msg: 'Error al obtener programas',
      success: false,
      data: null,
    });
    return;
  }

  res.json({
    success: true,
    message: 'Lista de programas',
    data: programs,
  });
};

export const getProgramsWithProjectsPendingRegistrationController = async (
  req,
  res
) => {
  const { skip } = req.query;

  const programs = await getProgramsWithProjectsPendingRegistration(
    Number(skip) | 0
  );

  if (!programs) {
    res.json({
      success: false,
      message: 'Error al obtener programas',
      data: null,
    });
    return;
  }

  res.json({
    success: false,
    message: 'Lista de programas disponibles',
    data: programs,
  });
};

export const assignProgramToEvaluatorsController = async (req, res) => {
  const { id_program, id_assignedBy, id_evaluator, role } = req.body;

  if (id_assignedBy === id_evaluator) {
    res.json({
      success: false,
      msg: 'No se puede asignar el proyecto al mismo usuario que lo asigna',
      data: null,
    });

    return;
  }

  if (role !== userRoles.coordinator) {
    res.json({
      success: false,
      msg: 'No tiene permiso para esta acción',
      data: null,
    });

    return;
  }

  const assigned = await assignProgramToEvaluatorsService(
    id_program,
    id_assignedBy,
    id_evaluator
  );

  res.json(assigned);
};

export const updateStatusProgramController = async (req, res) => {
  const { id_program, isApproval } = req.body;

  const updatedProgram = await updateStatusProgram(id_program, isApproval);

  if (!updatedProgram) {
    res.json({
      success: false,
      message: 'Error al actualizar programa',
      data: null,
    });
    return;
  }

  // TODO: notificar de esta actualizacion por correo

  res.json({
    success: true,
    message: 'Programa actualizado exitosamente.',
    data: updatedProgram,
  });
};
