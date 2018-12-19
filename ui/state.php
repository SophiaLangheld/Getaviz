<?php

// print_r($_POST);


?>
<?php

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    //print_r($data);
    
    //$myHashwet = fopen($_POST["myHashwert"]);
    
    $state = $data["state"];
    $myHashwert = $data["hash"];
    echo "$myHashwert";
	$myArray = json_decode($state);
    echo "$myArray";
    
    // Datei öffnen: ./data/{HASH}
    // alternative dirname(__FILE__) . '/data/' . $hash 
    // in Datei schreiben: json_encode($state)    
} else {

	if (isset($_GET["hash"])) {
		// prüfen: existiert ./data/ . $_GET["hash"]
        // wenn ja: $state = Datei-inhalt
        // echo $state;
	}

}

if (isset($_GET["hash"])) {
    echo $_GET["hash"];
    //datei öffnen
    //state speichern
}
else{
    $data = json_decode(file_get_contents('php://input'), true);
    //print_r($data);
    
    $state = $data["state"];
    $myHashwert = $data["hash"];
    echo "$myHashwert";
    echo "\n$state";

    //Abfrage, ob hash schonmal gespeichert wurde, wenn nicht neu speichern //wichtig
	echo "\nopen file\n";
    $datei = fopen($data["hash"], "a");

	echo "write file\n";
	fwrite($datei, $data["state"]);
	
	echo "close file\n";
	fclose($datei);
	
	echo "end of php\n";
    
    // Datei öffnen: ./data/{HASH}
    // alternative dirname(__FILE__) . '/data/' . $hash 
    // in Datei schreiben: json_encode($state)    

}

	
?>


