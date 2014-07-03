var app = app || {};
app.ModeloPago	= Backbone.Model.extend({
	urlRoot	: 'http://crmqualium.com/api_pagos'
});
var ColeccionPagos= Backbone.Collection.extend({
	model	: app.ModeloPago,
	url		: 'http://crmqualium.com/api_pagos'
});

var ColeccionPagos= Backbone.Collection.extend({
	model	: app.ModeloPago,
	localStorage 	: new Backbone.LocalStorage('ColeccionPagos_LocalStorage-backbone'),
	ordenSiguente	: function () {
		if (!this.length) {
			return 1;
		};
		return this.last().get('id') + 1;
	}
});