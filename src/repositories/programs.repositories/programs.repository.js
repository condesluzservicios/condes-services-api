import {
  flagsToGetPrograms,
  statusProgramsAndProject,
  userRoles,
} from '../../constants/entities.js';
import { constants } from '../../constants/pagination.constants.js';
import ProgramModel from '../../Models/programs/programs.model.js';
import projectsModel from '../../Models/projects/projects.model.js';

/**
 * @param {*} program_data
 * @returns program registered
 */
export const registerNewProgram = async (program_data) => {
  try {
    const newProgram = new ProgramModel(program_data);
    const programSaved = await newProgram.save();

    return programSaved;
  } catch (error) {
    console.log(`Error al registrar programa ${error}`);
    return null;
  }
};

/**
 * @param {*} id_user
 * @returns programs list
 */
export const getProgramsByIdUser = async (id_user, skip) => {
  try {
    skip = (skip - 1) * constants.ITEM_PER_PAG;

    const count = await ProgramModel.estimatedDocumentCount();

    const programsList = await ProgramModel.find({ created_by: id_user })
      .populate({
        path: 'created_by',
      })
      .populate({
        path: 'assigned_to',
        select: '_id name last_name email line_research',
      })
      .skip(skip)
      .limit(constants.ITEM_PER_PAG)
      .sort({ createdAt: -1 });

    const pageCount = Math.ceil(count / constants.ITEM_PER_PAG); // 8 / 6 = 1,3

    const data = {
      pagination: {
        count,
        pageCount,
      },
      data: programsList,
    };
    return data;
  } catch (error) {
    console.log(`Error al obtener programa por id de usuario ${error}`);
    return null;
  }
};

/**
 * @param {*} id_user
 * @returns programs associated to user
 */
export const getProgramsWithProjectsPendingRegistration = async (
  id_user,
  skip
) => {
  try {
    skip = (skip - 1) * constants.ITEM_PER_PAG;

    const count = await ProgramModel.estimatedDocumentCount({
      created_by: id_user,
      $where: 'this.projects.length < 3',
    });

    const incompletePrograms = await ProgramModel.find({
      created_by: id_user,
      $where: 'this.projects.length < 3',
    })
      .populate({
        path: 'created_by',
      })
      .skip(skip)
      .limit(constants.ITEM_PER_PAG)
      .sort({ createdAt: -1 });

    const pageCount = Math.ceil(count / constants.ITEM_PER_PAG); // 8 / 6 = 1,3

    const data = {
      pagination: {
        count,
        pageCount,
      },
      data: incompletePrograms,
    };

    return data;
  } catch (error) {
    console.log(`Error al obtener programas para asignar ${error}`);
    return null;
  }
};

/**
 * @param {*} id
 * @returns program data
 */
export const getProgramById = async (id) => {
  try {
    const program = await ProgramModel.findById(id)
      .populate({
        path: 'projects',
      })
      .populate({
        path: 'assigned_to',
        select: '_id name last_name email line_research',
      });
    return program;
  } catch (error) {
    console.log(`Error al obtener programa ${error}`);
    return null;
  }
};

/**
 * @param {*} query to search
 * @param {*} skip amount skip
 * @returns programs list
 */
export const searchProgramsList = async (query, skip) => {
  let ProgramsList = [];
  let count = 0;

  try {
    skip = (skip - 1) * constants.ITEM_PER_PAG;

    if (query === '') {
      count = await ProgramModel.estimatedDocumentCount();

      ProgramsList = await ProgramModel.find()
        // .populate({
        //   path: 'participants',
        // })
        .skip(skip)
        .limit(constants.ITEM_PER_PAG)
        .sort({ createdAt: -1 });
    } else {
      ProgramsList = await ProgramModel.find({
        status_program: { $regex: `^${query}$`, $options: 'i' },
      })
        // .populate({
        //   path: 'participants',
        // })
        .skip(skip)
        .limit(constants.ITEM_PER_PAG)
        .sort({ createdAt: -1 });

      count = ProgramsList.length;
    }

    const pageCount = Math.ceil(count / constants.ITEM_PER_PAG); // 8 / 6 = 1,3

    const data = {
      pagination: {
        count,
        pageCount,
      },
      data: ProgramsList,
    };

    return data;
  } catch (error) {
    console.log('error al obtener programas ->', error);
    return null;
  }
};

/**
 * @param {*} id_program
 * @param {*} data_update
 * @returns program updated
 */
export const updateProgramById = async (id_program, data_update) => {
  try {
    const programUpdated = await ProgramModel.findByIdAndUpdate(
      id_program,
      {
        ...data_update,
      },
      {
        upsert: true,
      }
    );

    return programUpdated;
  } catch (error) {
    console.log(`Error al actualizar programa ${error}`);
    return null;
  }
};

/**
 * @param {*} id_program
 * @param {*} id_project
 * @returns program updated
 */
export const updateProgramAssociateProject = async (id_program, id_project) => {
  try {
    const associated = await ProgramModel.findByIdAndUpdate(id_program, {
      $push: { projects: id_project },
    });

    return associated;
  } catch (error) {
    console.log(`error al asociar proyecto a programa ${error}`);
    return null;
  }
};

/**
 * @returns (Number) amount programs registered
 */
export const getAmountProgramsRegistered = async () => {
  try {
    const amount = await ProgramModel.estimatedDocumentCount();
    return amount;
  } catch (error) {
    console.log(`error al obtener cantidad de programas registrados ${error}`);
    return null;
  }
};

/**
 * @param {*} param0
 * @returns lista de programas por linea de insvestigacion
 */
export const getProgramsListByLineSearchWithOutAssignmentRepository = async ({
  id_user,
  role,
  line_research,
  skip,
  flag,
}) => {
  skip = skip > 0 ? (skip - 1) * constants.ITEM_PER_PAG : skip;

  try {
    if (role === userRoles.coordinator) {
      const count =
        flag === flagsToGetPrograms.assigned
          ? await ProgramModel.count({
              line_research,
              id_assignedBy: id_user,
              // assigned_to: { $exists: false },
              // status_project: 'por aprobar',
            })
          : await ProgramModel.count({
              line_research,
              id_assignedBy: { $exists: false },
              assigned_to: { $exists: false },
              // status_project: 'por aprobar',
            });

      const projectsList =
        flag === flagsToGetPrograms.assigned
          ? await ProgramModel.find({
              line_research,
              id_assignedBy: id_user,
              // assigned_to: { $exists: false },
              // status_project: 'por aprobar',
            })
              .populate({
                path: 'assigned_to',
                select: '_id name last_name email line_research',
              })
              .skip(skip)
              .limit(constants.ITEM_PER_PAG)
              .sort({ createdAt: -1 })
          : await ProgramModel.find({
              line_research,
              id_assignedBy: { $exists: false },
              assigned_to: { $exists: false },
              // status_project: 'por aprobar',
            })
              .populate({
                path: 'assigned_to',
                select: '_id name last_name email line_research',
              })
              .skip(skip)
              .limit(constants.ITEM_PER_PAG)
              .sort({ createdAt: -1 });

      const pageCount = Math.ceil(count / constants.ITEM_PER_PAG); // 8 / 6 = 1,3

      return {
        pagination: {
          count,
          pageCount,
        },
        data: projectsList,
      };
    }

    if (role === userRoles.evaluator) {
      const count = await ProgramModel.count({
        line_research,
        assigned_to: id_user,
        status_program: 'por aprobar',
      });

      const projectsList = await ProgramModel.find({
        line_research,
        assigned_to: id_user,
        status_program: 'por aprobar',
      })
        .populate({
          path: 'assigned_to',
          select: '_id name last_name email line_research',
        })
        .skip(skip)
        .limit(constants.ITEM_PER_PAG)
        .sort({ createdAt: -1 });

      const pageCount = Math.ceil(count / constants.ITEM_PER_PAG); // 8 / 6 = 1,3

      return {
        pagination: {
          count,
          pageCount,
        },
        data: projectsList,
      };
    }

    const count = await ProgramModel.count({
      line_research,
      id_assignedBy: { $exists: false },
      assigned_to: { $exists: false },
      status_project: 'por aprobar',
    });

    const projectsList = await ProgramModel.find({
      line_research,
      id_assignedBy: { $exists: false },
      assigned_to: { $exists: false },
      status_project: 'por aprobar',
    })
      .populate({
        path: 'assigned_to',
        select: '_id name last_name email line_research',
      })
      .skip(skip)
      .limit(constants.ITEM_PER_PAG)
      .sort({ createdAt: -1 });

    const pageCount = Math.ceil(count / constants.ITEM_PER_PAG); // 8 / 6 = 1,3

    return {
      pagination: {
        count,
        pageCount,
      },
      data: projectsList,
    };
  } catch (error) {
    console.log('Error al actualizar proyecto.', error);
    return null;
  }
};

/**
 * @param {*} id_program
 * @param {*} isApproval
 * @returns updated program
 */
export const updateStatusProgram = async (id_program, isApproval) => {
  try {
    const statusProgramUpdated = await ProgramModel.findByIdAndUpdate(
      id_program,
      {
        status_program: isApproval
          ? statusProgramsAndProject.approved
          : statusProgramsAndProject.disapproved,
      },
      { upsert: true }
    );

    for (const project of statusProgramUpdated.projects) {
      await projectsModel.findByIdAndUpdate(
        project,
        {
          status_project: isApproval
            ? statusProgramsAndProject.approved
            : statusProgramsAndProject.disapproved,
        },
        { upsert: true }
      );
    }

    return statusProgramUpdated;
  } catch (error) {
    console.log(`error al actualizar programa ${error}`);
    return null;
  }
};

export const updateStatusProjectsAssociatedToProgram = async () => {
  try {
  } catch (error) {
    console.log(`error al actualizar proyectos al programa ${error}`);
    return null;
  }
};
