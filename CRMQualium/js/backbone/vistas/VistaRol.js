var app = app || {};

app.VistaRol = Backbone.View.extend({
	tagName	: 'option',
	className	: 'optionRol',

	events	: {
	},

	plantilla : _.template($('#option_rol').html()),

	initialize		: function () {
		this.idRol;
	},

	render			: function () {
		this.$el.html( this.plantilla( this.model.toJSON() ) );
		this.$el.attr('id',this.model.get('id'));
		this.$el.attr('value', this.model.get('id')+'_'+this.model.get('nombre'));
		return this;
	},
	guardarRol		: function (modelo, callBack) {/**/
		var esto = this;
		Backbone.emulateHTTP = true;
		Backbone.emulateJSON = true;
		app.coleccionRoles.create(
			modelo,
			{
				wait	: true,
				success : function (exito) {
					// esto.globalizarId(exito.get('id'));
					if (!(!variable)) {
						callBack(exito.get('id'));
					};
				},
				error 	: function (error) {}
			}
		);
		Backbone.emulateHTTP = false;
		Backbone.emulateJSON = false;
	}
});