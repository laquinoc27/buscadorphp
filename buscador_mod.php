<?php
  function procesarDatos($data, $c_key, $c_val){
		$i = 0;
		$response = $data;
		foreach($data as $key => $value){
			if($c_key !== $value->$c_val){
				array_splice($response, $i, 1);
				$i--;
			}
			$i++;
		}
		return $response;
	}

	if(isset($_POST['mostrarTodo'])){
		if(isset($_POST['ciudad']) && isset($_POST['tipo']) && isset($_POST['precio'])){
			$ciudad = $_POST['ciudad'];
			$tipo = $_POST['tipo'];
			$precio = explode(';' ,$_POST['precio']);
			$precio[0] = str_replace(',', '', $precio[0]);
			$precio[1] = str_replace(',', '', $precio[1]);
			//echo $ciudad;
		}

		// Cargar base de datos json
		$file = fopen('./data/data-1.json', 'r');
  	$data = json_decode(fread($file, filesize('./data/data-1.json')));

		// Respuesta
  		$response = $data;

  		if(!$_POST['mostrarTodo']){
  			if($ciudad){$response = procesarDatos($response, $ciudad, 'Ciudad');}
			if($tipo){$response = procesarDatos($response, $tipo, 'Tipo');}

			$i = 0;
			$c_response = $response;
			foreach($c_response as $index => $val){
				// Limpiar la cadena
				$elem_precio = str_replace(',', '', $val->Precio);
				$elem_precio = str_replace('$', '', $elem_precio);

				// Comparar con los valores minimo y maximo de precio
				if($elem_precio < $precio[0] || $elem_precio > $precio[1]){
					array_splice($response, $i, 1);
					$i--;
				}
				$i++;
			}
  		}
  		echo json_encode($response);
	}
?>
