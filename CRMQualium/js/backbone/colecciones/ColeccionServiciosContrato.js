var app = app || {};

var ColeccionServiciosContrato = Backbone.Collection.extend({
	model	: app.ModeloServicioContrato,
	url		: 'http://crmqualium.com/api_serviciosContrato'
});