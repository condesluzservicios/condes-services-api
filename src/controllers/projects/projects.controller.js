const services = require('../../services/projects/projects.service');
const emailServiceProject = require('../../services/emails/emails.service');

const saveNewProject = async (req, res) => {
  const saved = await services.createNewProject(req.body);
  res.json(saved);
};

const getPaginationAllProjects = async (req, res) => {
  const { skip, flag } = req.query;
  const projectsList = await services.getPaginationAllProjects(
    Number(skip) || 0,
    flag
  );
  res.json(projectsList);
};

const getProjectById = async (req, res) => {
  const { id } = req.query;
  const projectsList = await services.getProjectById(id);
  res.json(projectsList);
};

const getProjectByIdUser = async (req, res) => {
  const { id_user, skip } = req.query;
  const projectsList = await services.getProjectByIdUser(id_user, skip);
  res.json(projectsList);
};

const updateProject = async (req, res) => {
  const { flag } = req.query;
  const updated = await services.updateProject(req.body, flag);
  res.json(updated);
};

const updateStatusProject = async (req, res) => {
  const updated = await services.updateApprovalProject(req.body);
  res.json(updated);
};

const sendEmailNotificationProjectCreated = async (req, res) => {
  const { id } = req.body;
  const response =
    await emailServiceProject.sendEmailNotificationProjectCreated(id);
  res.json(response);
};

const controllers = {
  saveNewProject,
  updateProject,
  getProjectByIdUser,
  getPaginationAllProjects,
  getProjectById,
  updateStatusProject,
  // ------------------------
  sendEmailNotificationProjectCreated,
};

module.exports = controllers;
