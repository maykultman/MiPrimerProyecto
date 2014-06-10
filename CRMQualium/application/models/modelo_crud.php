<?php
	class Modelo_crud extends CI_Model
	{
		public function __construct()
		{	
		 	parent::__construct();			
		}

        public function where($id)
      	{
	        $reply = 'result';
	        if ( $id ) 
	        { 
	          $reply = 'row';   # row devuelve una sola fila.
	          $this->db->where( 'id', $id  );  # Ejecutamos el metodo where...      
	        }
	        return $reply;
      	}

		# Destruimos el $this despues de usarlo en esta clase
		function __destruct(){	unset($this);  }
		
	} # Fin de la clase Model_crud

		// protected $tabla; # Variables globales
		// protected $quer;
		# En esta clase Modelo_crud es generico sirve para hacer 
		# consultas crud a casi toda la base de datos..........
		# ¿Qué Necesita para funcionar?, fácil, 
		# El nombre de la Tabla donde quieres hacer la consulta
		# El nombre de la consulta que quieres hacer, insert, get, update, delete
		# El ID de la consulta esto son para consultas get, update y delete.
		# El argumento en caso de que sea un INSERT o un Update necesitará datos para almacenar en la BD.
		# Public function crud('Nombre_tabla', 'QUERY', 'ID', $args){}

		// public function crud($id=FALSE, $datos=FALSE)
		// {	$query = $this->quer;
		// 	$result = 'result';
		// 	if($id){   $this->db->where('id', $id); $result = 'row'; }

		// 	if($query==='get'&&$datos){$this->db->select($datos);}

		// 	if($query==='get'||$query==='delete')
		// 	{
		// 		$respuesta = $this->db->$query($this->tabla);
		// 		return ( $query === 'delete' ) ? $respuesta : $respuesta->$result();
		// 	}

		// 	if($datos)
		// 	{
		// 		$resp = $this->db->$query($this->tabla, $datos); 
		// 		return ($query==='insert') ? $this->crud($this->tabla, 'get', $this->db->insert_id()) : $resp;
		// 	}						
		// }


		// public function crud($tabla, $query,  $id=FALSE, $datos=FALSE)
		// {	
		// 	$result = 'result';
		// 	if($id){ $this->db->where('id', $id); $result = 'row'; }
		// 	if($datos)
		// 	{
		// 		$resp = $this->db->$query($tabla, $datos); 
		// 		return ($query==='insert') ? $this->crud($tabla, 'get', $this->db->insert_id()) : $resp;
		// 	}	

		// 	$respuesta = $this->db->$query($tabla);
		// 	return ( $query === 'delete' ) ? $respuesta : $respuesta->$result();						
		// }

		// protected function create($args)
		// {   
		// 	$this->db->insert($this->tabla, $args);
		// 	return $this->get($this->db->insert_id());	   
		// }

		// # Esta línea hace dos cosas devuelve todos los registros o devuelve el especificado con el ID
		// public function get($id=FALSE) 
		// { 	
		// 	$result = 'result';						
		// 	if($id) {	$this->db->where('id', $id); $result = 'row'; }
		// 	return $this->db->get($this->tabla)->$result();			 		
		// }

		// public function save($id, $args) {	return $this->db->update($this->tabla, $args, array('id' => $id) );	}		

		// # Elimina el registro que sea igual al ID especificado..	
		// protected function destroy($id){	return $this->db->delete($this->tabla, array('id' => $id));	}
