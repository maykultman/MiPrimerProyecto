var app = app || {};

app.VistaNuevoEmpleado = Backbone.View.extend({
	el : '.contenedor_modulo',

	events : {
		'click #guardar'      : 'guardar',
		'click .opciones'	  : 'opciones'
	},

	initialize : function (){
		var self = this;

		this.$divEmpleado = this.$('#divEmpleado');		
		this.opciones('director');
	},

	render : function()	{	return this; },

	opciones : function(evento)
	{		
		this.$divEmpleado.html('');
		
		var evens = _.filter(app.coleccionEmpleados.toJSON(), 
			function(empleado)
			{ 
				var validate = false; 
				if(empleado.clavepuesto == evento || empleado.clavepuesto == $(evento.currentTarget).attr('id'))
				{
					validate = true;
				}
				return validate;

			});	

		for(x in evens)
		{
			var viewEmpleado = new app.VistaCatalogoEmpleado();
			
			/*****************************************************************************************************/
			var casa  = app.coleccionTelefonos.where ({ idpropietario : evens[x].id, tabla : 'empleados' });
				for(i in casa)
				{
					if(casa[i].get('tipo')==='movil')
					{
						evens[x].movil = casa[i].get('numero');
					}
					if(casa[i].get('tipo')==='casa')
					{
						evens[x].casa = casa[i].get('numero');
					}
				}	
			/*****************************************************************************************************/
			this.$divEmpleado.append(viewEmpleado.render({ filtrado : evens[x]}).el);
		}
	},

	guardar : function (evento)
	{
		var modeloTelefono = new Array();
		var modeloEmpleado = pasarAJson($('#registro').serializeArray());
		modeloEmpleado = limpiarJSON(modeloEmpleado);
		
 		/* nombre tiene algún valor?*/
	 	if(modeloEmpleado.nombre)
	 	{
			if(modeloEmpleado.movil!=undefined) /*... Tiene telefono movil?...*/
			{
				var movil = modeloEmpleado.movil;
				delete modeloEmpleado.movil;    /*... eliminamos movil de modelo que contiene los datos el empleado ...*/
			}
			if(modeloEmpleado.casa!=undefined) /*... Tiene telefono de casa?...*/
			{
				var casa  = modeloEmpleado.casa;					
				delete modeloEmpleado.casa;    /*... eliminamos movil de modelo que contiene los datos el empleado ...*/
			}

			Backbone.emulateHTTP = true;
			Backbone.emulateJSON = true;
			app.coleccionEmpleados.create
			(
				modeloEmpleado,
				{
					wait: true,
					success: function (exito)
					{
						if(movil) /* Esperamos un exito del post del empleado para guardar su telefono*/
						{
							modeloTelefono[0] = { id 			: '',
												  idpropietario : exito.get('id'),
												  tabla         : 'empleados', 
												  numero        : movil, 
									  			  tipo          : 'movil'
												};
		        		}
		        		if(casa)
						{
		        			modeloTelefono[1] = { id 			: '',
		        								  idpropietario : exito.get('id'),
									  			  tabla         : 'empleados', 
									  			  numero        : casa, 
									  			  tipo          : 'casa'
												};
						}						
						
						if(modeloTelefono.length>0)
						{
							Backbone.emulateHTTP = true;
							Backbone.emulateJSON = true;
							for (i in modeloTelefono) 
							{	
								app.coleccionTelefonos.create
								(
									modeloTelefono[i],
									{
										wait: true,
										success: function (exito){},
										error  : function(error){}
									}
								);						
							}
							Backbone.emulateHTTP = false;
							Backbone.emulateJSON = false;
						}
						
					}, // Fin de success...
					error: function (error) {}
				}
			);
			Backbone.emulateHTTP = false;
			Backbone.emulateJSON = false;			
		}
		evento.preventDefault();
	} /*... Fin de la función guardar ...*/

	

});

app.vistaNuevoEmpleado = new app.VistaNuevoEmpleado();


	// cargarEmpleado : function(empleado)
	// {
	// 	var vistaEmpleado = new app.VistaCatalogoEmpleado();

	// 	var casa  = app.coleccionTelefonos.where ({ idpropietario : empleado.get('id'), tabla : 'empleados' });

	// 	for(i in casa)
	// 	{
	// 		if(casa[i].get('tipo')==='movil')
	// 		{
	// 			empleado.set({'movil': casa[i].get('numero')})
	// 		}
	// 		if(casa[i].get('tipo')==='casa')
	// 		{
	// 			empleado.set({'casa': casa[i].get('numero')})
	// 		}
	// 	}	
	// 	this.$divEmpleado.append(vistaEmpleado.render({model : empleado}).el);
	// },

	// cargarEmpleados : function(callback)
	// {
	// 	app.coleccionEmpleados.each(this.cargarEmpleado, this);

	// 	callback();
	// },