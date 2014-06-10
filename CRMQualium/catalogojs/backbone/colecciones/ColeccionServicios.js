var app = app || {};

var ColeccionServicios = Backbone.Collection.extend({
	url	: 'http://crmqualium.com/api_servicios',
	model: app.ModeloServicio,

	parse : function (response) {
		//Se ejecuta cuando se hace un fetch a la colección
		return response;
	}
});

app.coleccionServicios = new ColeccionServicios(app.coleccionDeServicios);