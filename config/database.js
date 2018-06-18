if (process.env.NODE_ENV === 'production') {
	module.exports = {
		mongoURI: 'mongodb://admintodolist:admint0d0list@ds143070.mlab.com:43070/node_todolist',
		googleClientID: '673216188863-p397esh5ipjprhkedlfps5lb6s0ubklp.apps.googleusercontent.com',
		googleClientSecret: '6oXFUSWlI0kbHukOCtlZESjZ'
	};
} else {
	module.exports = {
		mongoURI: 'mongodb://localhost/test',
		googleClientID: '673216188863-p397esh5ipjprhkedlfps5lb6s0ubklp.apps.googleusercontent.com',
		googleClientSecret: '6oXFUSWlI0kbHukOCtlZESjZ'
	};
}
