var app = app || {};

app.VistaNuevoEmpleado = Backbone.View.extend({
	el : '.contenedor_modulo',

	events : {
		'click #guardar' : 'guardar'
	},

	initialize : function ()
	{

	},

	render : function()
	{
		return this;
	},

	guardar : function (evento)
	{
		var modeloEmpleado = pasarAJson($('#registro').serializeArray());
		modeloEmpleado = this.limpiarJSON(modeloEmpleado);
        var f= modeloEmpleado.fecha_nacimiento;
        if(modeloEmpleado.fecha_nacimiento)
        {
        	modeloEmpleado.fecha_nacimiento = f[6]+f[7]+f[8]+f[9]+'-'+f[3]+f[4]+'-'+f[0]+f[1];
    	}
		
		if(modeloEmpleado.movil!=undefined)
		{
			var movil = modeloEmpleado.movil;
			delete modeloEmpleado.movil;
		}
		if(modeloEmpleado.casa!=undefined)
		{
			var casa  = modeloEmpleado.casa;					
			delete modeloEmpleado.casa;
		}

		var modeloTelefono = new Array();						  
		
		Backbone.emulateHTTP = true;
		Backbone.emulateJSON = true;
		app.coleccionEmpleados.create
		(
			modeloEmpleado,
			{
				wait: true,
				success: function (exito)
				{
					if(movil)
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
					
					Backbone.emulateHTTP = true;
					Backbone.emulateJSON = true;
					if(modeloTelefono.length>0)
					{
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
					}
					Backbone.emulateHTTP = false;
					Backbone.emulateJSON = false;
				},
				error: function (error) {}
			}
		);
		Backbone.emulateHTTP = false;
		Backbone.emulateJSON = false;		
		evento.preventDefault();
	},

	// -----limpiarJSON------------------------------- 
	limpiarJSON	: function (objeto) {
		/*La variable valorJson y el ciclo for eliminan los
		valores nulos o vacios de la variable objetoCliente*/
		var valorJson;
		for (var x in objeto) {
		    if ( Object.prototype.hasOwnProperty.call(objeto,x)) {
		        valorJson = objeto[x];
		        if (valorJson==="null" || valorJson===null || valorJson==="" || typeof valorJson === "undefined") {
		            delete objeto[x];
		        }

		    }
		}
		return objeto;
	}
});

app.vistaNuevoEmpleado = new app.VistaNuevoEmpleado();