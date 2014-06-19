var app = app || {};

app.VistaCatalogoEmpleado = Backbone.View.extend({

	tagName : 'div',

	plantilla : _.template($('#datosEmpleado').html()),

	events : {
		'click .icon-trash'   : 'destroyModel',
		'keypress #nombreE'   : 'editar'
	},

	initialize : function()	{ 
		this.listenTo(this.model[0], 'change', this.render);  
		this.listenTo(this.model[0], 'destroy', this.remove);
	},

	editar : function(events)
	{
		if(events.keyCode === 13)
		{
			var nombre = $(events.currentTarget).attr('name');
			// var valor = $(events.currentTarget).val();
			console.log(nombre);
			// if(rol) // La variable rol tiene valor
			// {
			// 	this.model[0].save
			// 	(
			// 		{ nombre : rol }, 
			// 		{
			// 			wait:true,
			// 			patch:true,
			// 			success: function (exito){
			// 				console.log(exito);
			// 			}, 
			// 			error: function (error){
			// 				console.log(error);
			// 			}
			// 		}
			// 	);
			// }//If de validación de la variable rol
			events.preventDefault();
		};//..if elemento.keyCode
	},

	render : function(info) 
	{			
		// console.log(info.filtrado);
		// var self = this;
		// if(info.filtrado != null){			
			this.$el.html(this.plantilla(info.filtrado));
			this.cargarSelectPuestos();
		// }else{
		// 	self.$el.html(self.plantilla(info.model.toJSON()));
		// }
		return this;
	},

	cargarSelectPuesto : function (puesto)
	{
		var vistaPuesto = new app.VistaSelectPuesto({ model : puesto});		
	    this.$('#lpuesto').append(vistaPuesto.render().el);
	},

	cargarSelectPuestos : function ()
	{	
		app.coleccionPuestos.each(this.cargarSelectPuesto, this);
	},

	destroyModel : function()
	{
		this.model[0].destroy();
	}

});