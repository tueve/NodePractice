if (process.env.NODE_ENV === 'production') {
	module.exports = {
		mongoURI: 'mongodb://admintodolist:admint0d0list@ds143070.mlab.com:43070/node_todolist',
		googleClientID: '673216188863-p397esh5ipjprhkedlfps5lb6s0ubklp.apps.googleusercontent.com',
		googleClientSecret: '6oXFUSWlI0kbHukOCtlZESjZ',
		facebookClientSecret: '9d9663e8bf81462141cd637b67b20167',
		facebookClientID: '223715935095663'
	};
} else {
	module.exports = {
		mongoURI: 'mongodb://localhost/test',
		googleClientID: '673216188863-p397esh5ipjprhkedlfps5lb6s0ubklp.apps.googleusercontent.com',
		googleClientSecret: '6oXFUSWlI0kbHukOCtlZESjZ',
		facebookClientSecret: '9d9663e8bf81462141cd637b67b20167',
		facebookClientID: '223715935095663'
	};
}
