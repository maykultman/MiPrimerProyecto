<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

include 'api.php';
class  Perfil extends Api {

    public function __construct() 
    {
        parent::__construct();
        $this->load->model('Modelo_perfil', 'perfil');             
    }

    public function api() 
    {
        $metodo = $this->request();
        $this->$metodo();
    }
    
    private function create(){

        $query = $this->perfil->create($this->ipost());
        # $query regresa true o false y con esto enviamos un codigo de respuesta al cliente...
        $this->pre_response($query, 'create');                  
    }

    private function get()
    {
        $query = $this->perfil->get($this->id());                        
        $this->pre_response($query, 'get'); 
    }

    private function update()
    {
        $query = $this->perfil->save($this->id(), $this->put());
        $this->pre_response($query, 'update');         
    }

    private function delete()
    {
        $query = $this->perfil->destroy($this->id());        
        $this->pre_response($query, 'delete'); 
    }

} # Fin de la Clase Api_cliente