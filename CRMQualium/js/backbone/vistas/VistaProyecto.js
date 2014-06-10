var app = app || {};

app.VistaProyecto = Backbone.View.extend({
	tagName	: 'tr',
	plantillaProyecto	: _.template($('#plantilla_tr_proyecto').html()),
	events	: {
		'click .eliminar'	: 'eliminar'
	},
	initialize	: function () {
		this.listenTo(this.model, 'destroy', this.remove);
	},
	render	: function () {
		this.$el.html( this.plantillaProyecto(this.model.toJSON()) );
		return this;
	},
	eliminar	: function () {
		this.model.destroy();
	}
});