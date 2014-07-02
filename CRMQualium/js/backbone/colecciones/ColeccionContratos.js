var app = app || {};
var f = new Date();
app.ModeloContrato	= Backbone.Model.extend({
	urlRoot	: 'http://crmqualium.com/api_contratos',
	defaults	: {
		fechacreacion : f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate()
	}
});
var ColeccionContratos = Backbone.Collection.extend({
	model	: app.ModeloContrato,
	url		: 'http://crmqualium.com/api_contratos'
});