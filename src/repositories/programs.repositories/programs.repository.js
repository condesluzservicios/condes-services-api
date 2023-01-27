import { constants } from '../../constants/pagination.constants.js';
import ProgramModel from '../../Models/programs/programs.model.js';

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
 * @returns programs associated to user
 */
export const getProgramsWithProjectsPendingRegistrationByIdUser = async (
  id_user
) => {
  try {
    const incompletePrograms = await ProgramModel.find({
      created_by: id_user,
      $where: 'this.projects.length < 3',
    }).populate({
      path: 'created_by',
    });
    return incompletePrograms;
  } catch (error) {
    console.log(`Error al obtener programa por id de usuario ${error}`);
    return null;
  }
};

export const getProgramById = async (id) => {
  try {
    const program = await ProgramModel.findById(id);
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
export const getProgramsList = async (query, skip) => {
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
 * @param {*} id_project
 * @returns
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
