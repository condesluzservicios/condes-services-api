import connectMailer from '../../mail/config.js';
import { formatEmailNotificationRegisterProgram } from '../../mail/documents/formatsPrograms.js';
import { formatEmailNotificationAssignmentProgramToEvaluator } from '../../mail/documents/registeredProject.js';
import {
  getAmountProgramsRegistered,
  getProgramById,
  registerNewProgram,
  updateProgramById,
} from '../../repositories/programs.repositories/programs.repository.js';
import { getUserByIdRepository } from '../../repositories/users.repositories/users.repository.js';
import { generateSequentialNumberProgramAndProject } from '../../utils/projects.utils.js';

export const registerNewProgramService = async (data_program) => {
  const amountPrograms = await getAmountProgramsRegistered();

  const code = generateSequentialNumberProgramAndProject(
    amountPrograms + 1,
    data_program.type_program
  );

  data_program.program_code = code;

  const programSaved = await registerNewProgram(data_program);

  if (!programSaved) {
    return {
      success: false,
      msg: 'Error al registrar programa.',
      data: null,
    };
  }

  // * enviar correo para notificar al responsable del programa
  const notification = await connectMailer({
    email_dest: data_program.email,
    subject: 'Notificación de registro de programa.',
    format: formatEmailNotificationRegisterProgram(programSaved),
  });

  if (!notification.accepted.length > 0) {
    return {
      msg: 'Programa registrado exitosamente. Error al enviar correo para notificar el registro del programa.',
      success: true,
      data: programSaved,
    };
  }

  return {
    success: true,
    msg: 'Programa registrado exitosamente',
    data: programSaved,
  };
};

// * coordinates and evaluators
export const assignProgramToEvaluatorsService = async (
  id_program,
  id_assignedBy,
  id_evaluator
) => {
  try {
    //* buscamos el Programa
    const programSelected = await getProgramById(id_program);

    if (programSelected.id_assignedBy || programSelected.assigned_to) {
      return {
        success: false,
        msg: 'Programa ya ha sido asignado.',
        data: null,
      };
    }

    programSelected.id_assignedBy = id_assignedBy;
    programSelected.assigned_to = id_evaluator;

    const evaluator_data = await getUserByIdRepository(id_evaluator);
    const coordinator_data = await getUserByIdRepository(id_assignedBy);

    const assigned = await updateProgramById(id_program, {
      id_assignedBy: id_assignedBy,
      assigned_to: id_evaluator,
    });

    programSelected.assignmentBy =
      coordinator_data.name + ' ' + coordinator_data.last_name;

    const notification = await connectMailer({
      email_dest: evaluator_data.email,
      subject: 'Notificación de asignación de programa.',
      format:
        formatEmailNotificationAssignmentProgramToEvaluator(programSelected),
    });

    if (!notification.accepted.length > 0) {
      return {
        msg: 'Proyecto asignado exitosamente. Error al enviar correo de asignación de proyecto.',
        success: true,
        data: assigned,
      };
    }

    return {
      msg: 'Programa asignado exitosamente.',
      success: true,
      data: assigned,
    };
  } catch (error) {
    console.log(`error al asignar programa ${error}`);
    return {
      msg: 'Error al asignar programa',
      success: true,
      data: error,
    };
  }
};
