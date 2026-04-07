const Invitation = require('../models/invitations');

exports.renderHome = async (req, res) => {
    try {
        const guestName = req.query.to || 'Guest Name';

        let invitation = await Invitation.findOne({
            where: { guest_name: guestName },
        });

        if (!invitation) {
            invitation = {
                guest_name: guestName,
                wedding_title: 'THE WEDDING OF',
                couple_name: 'IMAM NANDIRA',
                photo_url: '/images/couple.jpg',
                loading_text: 'LOADING...',
            };
        } else {
            invitation = invitation.toJSON();
        }

        res.render('home', {
            invitation: {
                guestName: invitation.guest_name,
                weddingTitle: invitation.wedding_title,
                coupleName: invitation.couple_name,
                photoUrl: invitation.photo_url,
                loadingText: invitation.loading_text,
            },
            progress: 0,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan');
    }
};