var app = app || {};

app.VistaNuevoEmpleado = Backbone.View.extend({
	el : '.contenedor_modulo',

	events : {
		'click #guardar'      : 'guardar',
		'click .opciones'	  : 'opciones'
	},

	initialize : function (){
		this.$divEmpleado = this.$('#divEmpleado');
		this.cargarEmpleados();
	},

	render : function()	{	return this; },

	opciones : function(evento)
	{		
		this.$divEmpleado.html('');
		var puesto = $(evento.currentTarget).attr('id');

		var evens = _.filter(app.coleccionEmpleados.toJSON(), 
			function(empleado)
			{ 
				var validate = false; 
				if(empleado.clavepuesto == puesto)
				{
					validate = true;
				}
				return validate;

			});

		for(i in evens){
			var viewEmpleado = new app.VistaCatalogoEmpleado();
			this.$divEmpleado.append(viewEmpleado.render({ filtrado : evens[i]}).el);
		}
	},

	cargarEmpleado : function(empleado)
	{
		var vistaEmpleado = new app.VistaCatalogoEmpleado();

		var telefono  = app.coleccionTelefonos.where ({ idpropietario : empleado.get('id'), tabla : 'empleados' });
		console.log(telefono);

		this.$divEmpleado.append(vistaEmpleado.render({model : empleado}).el);
	},

	cargarEmpleados : function()
	{
		app.coleccionEmpleados.each(this.cargarEmpleado, this);
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