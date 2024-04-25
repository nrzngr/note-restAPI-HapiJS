const { method } = require("lodash");
const {
	addNoteHandler,
	getAllNotesHandler,
	getNoteById,
	editNote,
	deleteById,
} = require("./handler");

const routes = [
	{
		method: "POST",
		path: "/notes",
		handler: addNoteHandler,
	},
	{
		method: "GET",
		path: "/notes",
		handler: getAllNotesHandler,
	},
	{
		method: "GET",
		path: "/notes/{id}",
		handler: getNoteById,
	},
	{
		method: "PUT",
		path: "/notes/{id}",
		handler: editNote,
	},
	{
		method: "DELETE",
		path: "/notes/{id}",
		handler: deleteById,
	},
];

module.exports = routes;
