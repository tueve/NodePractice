if (process.env.NODE_ENV === 'production') {
	module.exports = {
		mongoURI:
			'mongodb://node_todolist:adminpassword@ds143070.mlab.com:43070/node_todolist'
	};
} else {
	module.exports = {
		mongoURI: 'mongodb://localhost/test'
	};
}
