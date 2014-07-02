var app = app || {};

var ColeccionCotizaciones = Backbone.Collection.extend({
	localStorage 	: new Backbone.LocalStorage('tareas-backbone'),
	model : app.ModeloCotizacion,
});

app.coleccionCotizaciones = new ColeccionCotizaciones(app.coleccionDeCotizaciones);