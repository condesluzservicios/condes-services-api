import * as services from '../../services/projects/projects.service.js';
import * as emailServiceProject from '../../services/emails/emails.service.js';
import * as projectsRepository from '../../repositories/projects.repositories/projects.repository.js';

export const saveNewProject = async (req, res) => {
  const saved = await projectsRepository.saveNewProject(req.body);
  res.json(saved);
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
