var app = app || {};
app.ModeloServicioContrato	= Backbone.Model.extend({
	urlRoot	: 'http://qualium.mx/sites/crmqualium/api_serviciosContrato'
});
var ColeccionServiciosContrato = Backbone.Collection.extend({
	model	: app.ModeloServicioContrato,
	url		: 'http://qualium.mx/sites/crmqualium/api_serviciosContrato'
});