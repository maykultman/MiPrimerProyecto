var app = app || {};

var ColeccionPerfiles = Backbone.Collection.extend({
	url : 'http://crmqualium.com/api_roles',
	model : app.ModeloPerfil,

	parse : function (response) {
		return response;
	}
});

app.coleccionPerfiles = new ColeccionPerfiles();