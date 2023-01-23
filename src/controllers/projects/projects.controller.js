import * as services from '../../services/projects/projects.service.js';
import * as emailServiceProject from '../../services/emails/emails.service.js';
import * as projectsRepository from '../../repositories/projects.repositories/projects.repository.js';
import { userRoles } from '../../constants/entities.js';

export const saveNewProject = async (req, res) => {
  const saved = await projectsRepository.saveNewProject(req.body);
  res.json({
    msg: 'Proyecto registrado exitosamente',
    success: true,
    data: saved,
  });
};

export const getPaginationAllProjects = async (req, res) => {
  const { skip, flag } = req.query;
  const projectsList = await services.getPaginationAllProjects(
    Number(skip) || 0,
    flag
  );
  res.json(projectsList);
};

export const getProjectById = async (req, res) => {
  const { id } = req.query;
  const projectsList = await services.getProjectById(id);
  res.json(projectsList);
};

export const getProjectByIdUser = async (req, res) => {
  const { id_user, skip } = req.query;
  const projectsList = await services.getProjectByIdUser(id_user, skip);
  res.json(projectsList);
};

export const updateProject = async (req, res) => {
  const { flag } = req.query;
  const updated = await services.updateProject(req.body, flag);
  res.json(updated);
};

export const updateStatusProject = async (req, res) => {
  const updated = await services.updateApprovalProject(req.body);
  res.json(updated);
};

export const sendEmailNotificationProjectCreated = async (req, res) => {
  const { id } = req.body;
  const response =
    await emailServiceProject.sendEmailNotificationProjectCreated(id);
  res.json(response);
};

export const searchProjectByQuery = async (req, res) => {
  const { query } = req.query;
  const projectsList = await services.searchProjectsByQueryFromDb(query);
  res.json(projectsList);
};

export const assignProjectsToEvaluatorsController = async (req, res) => {
  const { id_project, id_assignedBy, id_evaluator, role } = req.body;

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

  const assigned = await services.assignProjectsToEvaluators(
    id_project,
    id_assignedBy,
    id_evaluator
  );

  res.json(assigned);
};

export const getProjectsByLineSearchWithoutAssignmentController = async (
  req,
  res
) => {
  const { id_user, role, line_research, skip } = req.query;

  const projects =
    await projectsRepository.getProjectListByLineSearchWithOutAssignmentRepository(
      {
        id_user: id_user,
        role: role,
        line_research,
        skip: Number(skip) || 0,
      }
    );

  if (!projects) {
    res.json({
      msg: 'Error al obtener proyectos',
      success: false,
      data: null,
    });
    return;
  }

  res.json({
    msg: 'Lista de proyectos',
    success: true,
    data: projects,
  });
};
