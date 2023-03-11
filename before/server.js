const express = require('express');
const { authUser, authRole } = require('./basicAuth');
const app = express();
const {
    users,
    ROLE: { ADMIN, BASIC },
} = require('./data');
const projectRouter = require('./routes/projects');

app.use(express.json());
app.use(setUser);
app.use('/projects', projectRouter);

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.get('/dashboard', authUser, (req, res) => {
    res.send('Dashboard Page');
});

app.get('/admin', authUser, authRole(ADMIN), (req, res) => {
    res.send('Admin Page');
});

function setUser(req, res, next) {
    const userId = req.body.userId;
    if (userId) {
        req.user = users.find((user) => user.id === userId);
    }
    next();
}

app.listen(3000);
