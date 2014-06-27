app	= app || {};

var VistaServicioSeleccionado = app.VistaServicio.extend({
	tagName	: 'tr',
	plantillaDefault	: _.template($('#servicioContratado').html()),
	events					: {
		'click .eliminar'		: 'eliminarSeleccion',
		'keyup #descuento'		: 'establecerPrecio',
		'keyup #cantidad'		: 'calcularTotal',
		'keyup #precio'			: 'calcularDescuento'
	},
	initialize			: function () {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'change', this.calcularImporteIVATotalNeto);
	},
	eliminarSeleccion	: function (elem) {
		this.$el.remove();
		this.calcularImporteIVATotalNeto();
	},
	establecerPrecio	: function (elem) {
		if (elem.keyCode !== 37 && elem.keyCode !== 38 && elem.keyCode !== 39 && elem.keyCode !== 40) {
			this.$('#precio').val(this.model.get('precioDefault'));
			this.calcularTotal(elem);
		};
	},
	calcularDescuento	: function (elem) {
		if (elem.keyCode !== 37 && elem.keyCode !== 38 && elem.keyCode !== 39 && elem.keyCode !== 40) {
			var precio 		= this.$('#cantidad').val() * this.$('#precio').val();
			this.$('#descuento').val(( 100 - ((precio * 100)/this.model.get('precioDefault')) ).toFixed());
			this.calcularTotal(elem);
		};
	},
	calcularTotal		: function (elem) {
		if (elem.keyCode !== 37 && elem.keyCode !== 38 && elem.keyCode !== 39 && elem.keyCode !== 40) {
			var precio 		= this.$('#cantidad').val() * this.$('#precio').val();
			var descuento 	= precio*(this.$('#descuento').val()/100);
			var json 		= pasarAJson(this.$('.inputsServicios').serializeArray());
			json.total 		= (precio - descuento).toFixed(2);
			/*Respaldamos id del input que se está editando*/
			var idHtml 		= $(elem.currentTarget).attr('id');
			
			/*Al establecer nuevos valores en el modelo,
			  ejecutaremos la función render, que está 
			  especificado en la función initialize en el
			  listener para con evento change*/
			this.model.set(json);

			/*Hacemos focus sobre el input en que se esta.
			  Al hacerlo el texto se auto selecciona, para
			  evitar tal efecto se reescribe su valor para
			  que el cursor se posiciones al fonal del texto*/
			this.$('#'+idHtml).focus().val( this.$('#'+idHtml).val() );
		};
	},
	calcularImporteIVATotalNeto	: function () {
		var totales = $('.total');
		var importe = 0;
		for (var i = 0; i < totales.length; i++) {
			importe += parseInt($(totales[i]).val());
		};
		$('#importe').text('$'+importe.toFixed(2));
		$('#IVA').text('$'+(importe*0.16).toFixed(2));
		$('#totalNeto').text('$'+(importe + (importe*0.16)).toFixed(2));

	}
});

var VistaServicio = app.VistaServicio.extend({
	tagName	: 'tr',
	plantillaDefault	: _.template($('#plantillaServicio').html()),
	events	: {
		'click label'		: 'agregarServicio',
	},
	agregarServicio		: function () {
		var modelCopia = this.model;
		modelCopia.set({descuento:'0', cantidad:'1', total:parseInt(this.model.get('precio')).toFixed(2), precioDefault:parseInt(this.model.get('precio'))});
		var vista = new VistaServicioSeleccionado({ model:modelCopia });
		$('#tbody_servicios').append(vista.render().el);
		vista.calcularImporteIVATotalNeto();
	},
});

app.VistaNuevoContrato = Backbone.View.extend({
	el						: '.contenedor_principal_modulos',
	events					: {
		'change .btn_plan'	: 'conmutarTablaPlan'
	},
	initialize				: function () {
		this.cargarClientes();
		this.cargarServicios();
		this.obtenerFechaForma();
	},
	render					: function () {},
	cargarClientes			: function () {
		$('#busqueda').autocomplete({
			source : app.coleccionClientes.pluck('nombreComercial'),

			select : function( event, ui ) {
				/*Obtenemos el modelo del cliente seleccionado*/
				var coincidencia = 	app.
									coleccionClientes.
									findWhere({nombreComercial:ui.item.value});
				/*Establecemos el id del cliente al formulario*/
				$('#hidden_idCliente').val(coincidencia.get('id'));

				/*Obtenemos el modelo del representante del cliente*/
					coincidencia = 	app.
									coleccionRepresentantes.
									findWhere({idcliente:coincidencia.get('id')});
				/*Establecemos el nombre del representante al formulario*/
				$('#input_Representante').val(coincidencia.get('nombre'));
				/*Establecemos el id del representante en el formulario*/
				$('#hidden_idRepresentante').val(coincidencia.get('id'));
			},

			change  : function (event) {
				/*Si se ha dejado vacio el campo para el nombre de
				  servicio, limpiamos los campos ocultos para el 
				  id del cliente y is del representante*/
				if ( $('#busqueda').val() == '' ) {
					$('#input_Representante').val('');
					$('#hidden_idCliente').val('');
					$('#hidden_idRepresentante').val('');
				};
			}
		});
	},
	cargarServicio			: function (servicio) {
		var vista = new VistaServicio({model:servicio});
		$('.scroll_tbody').append(vista.render().el);
	},
	cargarServicios			: function () {
		app.coleccionServicios.each(this.cargarServicio, this);
	},
	obtenerFechaForma		: function () {
		$('#fechaFirma').datepicker({ 
			dateFormat:'dd/mm/yy',  
			dayNamesMin:[
				'Do',
				'Lu',
				'Ma',
				'Mi',
				'Ju',
				'Vi',
				'Sá'
			],
			monthNames:[
				'Enero',
				'Febrero',
				'Marzo',
				'Abril',
				'Mayo',
				'Junio',
				'Julio',
				'Agosto',
				'Septiembre',
				'Octubre',
				'Noviembre',
				'Diciembre'
			]
		});
	},
	conmutarTablaPlan		: function (elem) {
		$('.tabla_visible').removeClass().addClass('tabla_oculto');
		$('#tbody_'+$(elem.currentTarget).attr('id')).removeClass().addClass('tabla_visible');
	}
});

app.vistaNuevoContrato = new app.VistaNuevoContrato();