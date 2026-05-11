require('dotenv').config();

const express = require('express');
const path = require('path');
const sequelize = require('./config/sequelize');
const invitationRoutes = require('./routes/invitationRoute');
const adminRoutes = require('./routes/adminRoute');
const wishesRoutes = require('./routes/wishesRoute');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.use('/', invitationRoutes);
app.use('/admin', adminRoutes);
app.use('/wishes', wishesRoutes);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL connected with Sequelize');

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('DB connection error:', error.message);
    }
})();