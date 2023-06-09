const express = require('express');
const { authUser } = require('../basicAuth');
const router = express.Router();
const { projects } = require('../data');
const { canViewProject, scopedProjects } = require('../permissions/project');

router.get('/', (req, res) => {
    res.json(scopedProjects(req.user, projects));
});

router.get('/:projectId', setProject, authUser, authGetProject, (req, res) => {
    res.json(req.project);
});

function setProject(req, res, next) {
    const projectId = parseInt(req.params.projectId);
    req.project = projects.find((project) => project.id === projectId);

    if (req.project == null) {
        res.status(404);
        return res.send('Project not found');
    }
    next();
}

function authGetProject(req, res, next) {
    if (!canViewProject(req.user, req.project)) {
        return res.status(401).send('Not allowed');
    }
    next();
}

module.exports = router;
