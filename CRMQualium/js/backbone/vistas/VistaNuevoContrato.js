app	= app || {};

app.VistaServicioSeleccionado = app.VistaServicio.extend({
	tagName	: 'tr',
	plantillaDefault	: _.template($('#servicioContratado').html()),
	events					: {
		'click .eliminar'		: 'eliminarSeleccion',
		'keyup  #descuento'		: 'establecerPrecio',
		'keyup  #cantidad'		: 'calcularTotal',
		'keyup  #precio'		: 'calcularDescuento',
		'change #descuento'		: 'establecerPrecio',
		'change #cantidad'		: 'calcularTotal',
		'change #precio'		: 'calcularDescuento'
	},
	initialize			: function () {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'change', this.calcularImporteIVATotalNeto);
	},
	eliminarSeleccion	: function (elem) {
		// console.log($(elem.currentTarget).attr('id'), ' ',this.model.get('id'));
		$('#tbody_servicios .check_posicion #servicio_'+this.model.get('id')).attr('disabled',false)
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

		/*Provocamos un click automatico para que la tabla de pagos
		  se actualice*/
		var a = $('.btn_plan');
		for (var i = 0; i < a.length; i++) {
			if ($(a[i]).is(':checked')) {
				$(a[i]).attr('checked',false);
				$(a[i]).click();
			};
		};
	}
});

app.VistaServicioContrato = app.VistaServicio.extend({
	tagName	: 'tr',
	plantillaDefault	: _.template($('#plantillaServicio').html()),
	events	: {
		'click .checkbox_servicio'		: 'apilarServicio',
	},
	apilarServicio		: function (elem) {
		var modelCopia = this.model;
		modelCopia.set({
			descuento 		: '0',
			cantidad		: '1',
			total 			: parseInt(this.model.get('precio')).toFixed(2),
			precioDefault	: parseInt(this.model.get('precio'))
		});
		var vista = new app.VistaServicioSeleccionado({ model:modelCopia });
		$('#tbody_servicios_seleccionados').append(vista.render().el);
		$(elem.currentTarget).attr('disabled',true);
		vista.calcularImporteIVATotalNeto();
	},
});

app.VistaPago = Backbone.View.extend({
	tagName 	: 'tr',
	plantilla_tr_pagos		: _.template($('#tr_pagos').html()),
	events	: {
		'click .icon-unlock'	: 'bloquear',
		'click .icon-lock'		: 'desbloquear',
		// 'keyup .input_renta'	: 'modificarPago',
		// 'change .input_renta'	: 'modificarPago',
	},
	initialize		: function () {

	},
	render			: function () {
		this.$el.html(this.plantilla_tr_pagos(this.model));
		return this;
	},
	bloquear		: function (elem) {
		$(elem.currentTarget).removeClass().addClass('icon-lock');
		this.$('.input_renta').attr('disabled',true).toggleClass('bloqueado');
	},
	desbloquear		: function (elem) {
		$(elem.currentTarget).removeClass().addClass('icon-unlock');
		this.$('.input_renta').attr('disabled',false).toggleClass('bloqueado');
	},
	// modificarPago 	: function () {}
});

app.VistaNuevoContrato = Backbone.View.extend({
	el						: '.contenedor_principal_modulos',
	// plantilla_tr_pagos		: _.template($('#tr_pagos').html()),
	events					: {
		'change .btn_plan'		: 'conmutarTablaPlan',
		'change .n_pagos'		: 'obtenerAtributoValue',
		'keyup .input_renta'	: 'modificarPagos',
		'change .input_renta'	: 'modificarPagos',
		'click	#guardar'		: 'guardar'
	},
	initialize				: function () {
		this.cargarClientes();
		this.cargarServicios();
		this.fecha();
		var fecha;
		$('.input_fechaInicioPago').on('change', function(){
			fecha = $(this).val().split('/');
			$('#fechainicio').val(fecha[2] + "-" + fecha[1] + "-" + fecha[0]);
			var a = $('.btn_plan');
			for (var i = 0; i < a.length; i++) {
				if ($(a[i]).is(':checked')) {
					$(a[i]).attr('checked',false);
					$(a[i]).click();
				};
			};
		});

		$('#fechaFirma').on('change', function () {
			$('.input_fechaInicioPago').val($(this).val());
			fecha = $(this).val().split('/');
			$('#hidden_fechafirma').val(fecha[2] + "-" + fecha[1] + "-" + fecha[0]);
		});

		fecha = new Date();
		$('#fechacreacion').val( fecha.getFullYear() + "-" + (fecha.getMonth() +1) + "-" + fecha.getDate() );
	},
	render					: function () {},
	guardar					: function (elem) {
		var json = pasarAJson($('form').serializeArray());
		if ($('#porEvento').is(':checked') && $('#plazo').val() != "") {
			delete json.mensualidades;
			json.fechafinal = json.fechafinal[0];
		} else if ($('#iguala').is(':checked')){
			delete json.plazo;
			delete json.nPlazos;
			json.fechafinal = json.fechafinal[1];
		} else {console.log('Elija tipo de plan');};
		console.log(json);
		elem.preventDefault();
	},
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
		var vista = new app.VistaServicioContrato({model:servicio});
		$('#tbody_servicios').append(vista.render().el);
	},
	cargarServicios			: function () {
		app.coleccionServicios.each(this.cargarServicio, this);
	},
	fecha					: function () {
		$('.datepicker').datepicker({ 
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
		$('#tbody_'+$(elem.currentTarget).attr('id'))
		.removeClass()
		.addClass('tabla_visible');

		this.establecerPagos( 
			$('#tbody_'+$(elem.currentTarget).attr('id')+' .n_pagos').val(), 
			$('#totalNeto').text() );
	},
	obtenerAtributoValue	: function (elem) {
		if ($(elem.currentTarget).val() < 101) {
			this.establecerPagos( 
				$(elem.currentTarget).val(), 
				$('#totalNeto').text() );
		} else{
			$(elem.currentTarget).val(1);
			this.obtenerAtributoValue(elem);
		};
	},
	establecerPagos			: function (n, totalNeto) {
		$('#margen').text(totalNeto);
		totalNeto = totalNeto.split('');
		totalNeto.shift();

		/*Limpiamos el tbody de pagos cada vez que se entre a esta
		  función*/
		$('#tbody_pagos').html('');

		var plazo = 1;
		var aumento = 0;
		var fecha = '';
		var fechaNormal = '';
		var fecha2 = '';

		if ($('#porEvento').is(':checked') && $('#plazo').val() != "") {
			plazo = parseInt($('#plazo').val());
			aumento = plazo;
			fecha = $('#fechainicio').val();
			fecha2 = this.formatearFechaUsuario(new Date(new Date(fecha).getTime() + ((plazo*n)*24*60*60*1000)));
			$('#vencimientoPlanEvento').val( fecha2 );
			fecha2 = fecha2.split('/');
			fecha2 = fecha2[2] + "-" + fecha2[1] + "-" + fecha2[0];
			$('#fechafinalEvento').val(fecha2);
		} else if ($('#iguala').is(':checked')){
			plazo = 30;
			aumento = plazo;
			fecha = $('#fechainicio').val();
			fecha2 = this.formatearFechaUsuario(new Date(new Date(fecha).getTime() + ((plazo*n)*24*60*60*1000)));
			$('#vencimientoPlanIguala').val( fecha2 );
			fecha2 = fecha2.split('/');
			fecha2 = fecha2[2] + "-" + fecha2[1] + "-" + fecha2[0];
			$('#fechafinalIguala').val(fecha2);
		} else {console.log('Sin plan seleccionado');return;};
		
		fechaNormal = $('.input_fechaInicioPago').val();
		fecha2 = fechaNormal.split('/');

		for (var i = 0; i < n; i++) {
			var vista = new app.VistaPago({model:{ 
				n 		: i+1,
				fecha	: fechaNormal,
				fecha2	: fecha2[2] + "-" + fecha2[1] + "-" + fecha2[0],
				pago 	: (parseInt(totalNeto.join(''))/n).toFixed(2), 
			}});

			$('#tbody_pagos').append(vista.render().el);

			fechaNormal = this.formatearFechaUsuario(new Date(new Date(fecha).getTime() + (plazo*24*60*60*1000)));
			fecha2 = fechaNormal.split('/');
			plazo = plazo + aumento;
		};
		this.modificarPagos();
	},
	modificarPagos	: function (elem) {
		if (typeof elem == 'undefined') {
			$('#margen').css('color','black'); return;
		};
		
		if (elem.keyCode !== 37 && elem.keyCode !== 38 && elem.keyCode !== 39 && elem.keyCode !== 40) {
			console.log
			var margen = $('#totalNeto').text().split(''),
				rentas = $('.input_renta'),
				suma = 0.0, /*Debe inicializarse como flotante*/
				masmenos;

			margen.shift();
			margen = margen.join('');
			margen = parseInt(margen).toFixed();

			for (var i = 0; i < rentas.length; i++) {
				suma += parseFloat($(rentas[i]).val());
			};

			masmenos = suma;
			suma = suma.toFixed();
			if (suma > margen || suma < margen) {
				$('#margen').text('$'+masmenos.toFixed(2)).css('color','red');
			} else{
				$('#margen').text($('#totalNeto').text()).css('color','black');
			};
		}
	},
	formatearFechaUsuario	: function (fecha) {
		var fechaFormateada = '';
		if ((fecha.getDate()) < 10 )
		fechaFormateada = '0'+(fecha.getDate());
		else
			fechaFormateada = (fecha.getDate());
		if ((fecha.getMonth() +1) < 10 )
			fechaFormateada += '/0'+(fecha.getMonth() +1);
		else
			fechaFormateada +=  '/'+(fecha.getMonth() +1);

		fechaFormateada +=  '/'+fecha.getFullYear();

		return fechaFormateada;
	},
});

app.vistaNuevoContrato = new app.VistaNuevoContrato();