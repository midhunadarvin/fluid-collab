

exports.renderIndex = function(req, res) {

	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);
	}

	req.session.lastVisit = new Date();
	
	res.render('index', 
		{
			title: 'Under maintenance : Sorry for the inconvenience.',
			user: JSON.stringify(req.user)
		});
};