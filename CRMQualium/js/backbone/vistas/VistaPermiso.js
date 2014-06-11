var app = app || {};

app.VistaPermiso = Backbone.View.extend({
	tagName : 'tr',

	plantilla : _.template($('#listarPermisos').html()),

	events : {},

	initialize : function ()
	{

	},

	render : function (){
		this.$el.html(this.plantilla(this.model.toJSON()));
		return this;
	}
});