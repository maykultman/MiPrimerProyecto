var app = app || {};

app.VistaArchivo = Backbone.View.extend({
	tagName	: 'p',

	plantilla : _.template($('#listaArchivos').html()),

	events	: {
	},

	initialize	: function () {
		this.listenTo(this.model, 'destroy', this.remove);
	},

	render	: function () {
		this.$el.append(this.plantilla( this.model.toJSON() ));
		return this;
	}
});