const { nanoid } = require("nanoid");
const { notes } = require("./notes");
const { findIndex } = require("lodash");

const addNoteHandler = (request, h) => {
	const { title, tags, body } = request.payload;

	const id = nanoid(16);
	const createdAt = new Date().toISOString();
	const updatedAt = createdAt;

	const newNote = {
		title,
		tags,
		boyd,
		id,
		createdAt,
		updatedAt,
	};

	notes.push(newNote);

	const isSuccess = notes.filter(note => note.id === id).length > 0;

	if (isSuccess) {
		const response = h.response({
			status: "Success",
			message: "catatan berhasil ditambahkan",
			data: {
				noteId: id,
			},
		});
		response.code(201);
		return response;
	}

	const response = h.response({
		status: "Gagal",
		message: "Gagal menambahkan note baru",
	});
	response.code(500);
	return response;
};

const getAllNotesHandler = () => ({
	status: "Success",
	data: { notes },
});

const getNoteById = (request, h) => {
	const { id } = request.params;
	const note = notes.filter(n => n.id === id)[0];

	if (note !== undefined) {
		return {
			status: "Success",
			data: { note },
		};
	}
	const response = h.response({
		status: "Gagal",
		message: "Catatan tidak ditemukan",
	});
	response.code(404);
	return response;
};

const editNote = (request, h) => {
	const { id } = request.params;
	const { title, tags, body } = request.payload;
	const updatedAt = new Date().toISOString();

	const index = notes.findIndex(note => note.id === id);

	if (index !== -1) {
		notes[index] = {
			...notes[index],
			title,
			tags,
			body,
			updatedAt,
		};

		const response = h.response({
			status: "Success",
			message: "Catatan berhasil diperbarui",
		});
		response.code(200);
	}

	const response = h.response({
		status: "Gagal",
		message: "Gagal memperbarui catatan, id tidak ditemukan",
	});
	response.code(404);
};

const deleteById = (request, h) => {
	const { id } = request.params;

	const index = notes.findIndex(note => note.id === id);

	if (index !== -1) {
		notes.splice(index, 1);
		const response = h.response({
			status: "success",
			message: "catatan berhasil dihapus",
		});
		response.code(200);
		return response;
	}
	const response = h.response({
		status: "Gagal",
		message: "Gagal menghapus catatan, id tidak ditemukan",
	});
	response.code(404);
	return response;
};

module.exports = { addNoteHandler, getAllNotesHandler, getNoteById, editNote, deleteById };
