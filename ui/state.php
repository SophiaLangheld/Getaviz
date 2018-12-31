<?php

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    //print_r($data);
    
    $state = $data["state"];
    $myHashwert = $data["hash"];
    echo "$myHashwert";
    echo "\n$state";
    // $folder = "./hash_values/";
    // Datei öffnen: ./data/{HASH}
    // alternative dirname(__FILE__) . '/data/' . $hash 
    // in Datei schreiben: json_encode($state) 
    //Abfrage, ob hash schonmal gespeichert wurde, wenn nicht neu speichern //wichtig
    echo "\nopen file\n";
    if (!file_exists('./state_data')) {
        mkdir('./state_data', 0777, true);
    }
    $datei = fopen("./state_data/" . $data["hash"], "x");

    if (!$datei) die("Datei existiert bereits.");

	echo "write file\n";
	fwrite($datei, $data["state"]);
	
	echo "close file\n";
	fclose($datei);
	
	echo "end of php\n";
} else {

	if (isset($_GET["hash"])) {
		// prüfen: existiert ./data/ . $_GET["hash"]
        // wenn ja: $state = Datei-inhalt
        // echo $state;
        $filename="./state_data/" . $_GET["hash"];
        $data = file_get_contents($filename);
        echo "$data";
	}

}

	
?>