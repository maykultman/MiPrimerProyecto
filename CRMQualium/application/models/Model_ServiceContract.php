<?php
 require_once 'Modelo_crud.php';

 class Model_ServiceContract extends Modelo_crud
 {
 	public function __construct(){}

 	public function create($post)
 	{
 		$this->db->insert('servicios_contrato', $post);
		return $this->get( $this->db->insert_id() );
 	}

 	public function get ( $id = FALSE )
 	{
 		$reply = $this->where( $id );
 		return $this->db->get( 'servicios_contrato')->$reply();
 	}

 	public function save ( $id, $put )
 	{
 		return $this->db->update ( 'servicios_contrato', $put, array('id' => $id ) );
 	}

 	public function destroy ( $id )
 	{
 		return $this->db->delete( 'servicios_contrato', array('id' => $id) );
 	}
 }  