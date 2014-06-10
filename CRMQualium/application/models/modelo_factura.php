 <?php
    /**
    * Operaciones en la base de datos con los contactos
    */
    class Modelo_factura extends CI_Model
    {          
        function insert_fact()
        {
          // var_dump($_FILES); die();
            if(!empty($_FILES))
            {
               if(array_key_exists('factura', $_FILES)&&$_FILES['factura']['name']!="")
               {
                   $carpeta="facturas/";
                   opendir($carpeta);
                   $destino=$carpeta.$_FILES['factura']['name'];  
                   if(copy($_FILES['factura']['tmp_name'], $destino))
                   {
                       
                      $data['archivo'] = $_FILES['factura']['name'];
                      $xml = file_get_contents("facturas/".$_FILES['factura']['name']);
                      $xml = simplexml_load_string($xml);
                      $data['contenido']= json_encode($xml);
                      // $djson = json_decode($json, true);
                      // echo $djson['message'];
                      return $data;
                      // exit;
                   }
                } 
             
            }
           
           return false;
        } # Fin del metodo insert_mcontact()...

        function get_mult($id)
        {
                   	
        } # Fin del metodo get_cotizacion()...

        function patch_mult($id, $put)
        {
            
        }

        function update_mult()
        {
        	
        }
        private function delete_mult($id)
        {

        }

    } # Fin de la clase...