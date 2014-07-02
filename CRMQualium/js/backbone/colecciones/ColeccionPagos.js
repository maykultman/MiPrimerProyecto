var app = app || {};
app.ModeloPago	= Backbone.Model.extend({
	urlRoot	: 'http://crmqualium.com/api_pagos'
});
var ColeccionPagos= Backbone.Collection.extend({
	model	: app.ModeloPago,
	url		: 'http://crmqualium.com/api_pagos'
});