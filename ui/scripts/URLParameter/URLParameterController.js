var urlParameterController = (function() {
    
    function initialize(){
		$(document).ready(function () {
			$.getJSON( metaStateJsonUrl, initializeApplicationTimeout);
		});

		function initializeApplicationTimeout(metaStateJson){
			setTimeout(() => initializeApplication(metaStateJson), 2000);
		}

		function initializeApplication(metaStateJson){
			//create entity state
			let entities = [];
			metaStateJson.selected.forEach(function(element){
				var entity = model.getEntityById(element);
				if (entity) {
					entities.push(entity);
				}
			});
			// let entities = metaStateJson.selected.map(element => model.getEntityById(element)).filter(element => element != null)
			var applicationEvent = {			
				sender: urlParameterController,
				entities: entities
			};
			events.selected.on.publish(applicationEvent);

			// TODO: liste sammeln und alles markieren
			metaStateJson.marked.forEach(function(element){
				var entity = model.getEntityById(element);
				if (entity) {

					var applicationEvent = {			
						sender: urlParameterController,
						entities: [entity]
					};
				
					events.marked.on.publish(applicationEvent);
				}
			});
			metaStateJson.filtered.forEach(function(element){
				var entity = model.getEntityById(element);
				if (entity) {

					var applicationEvent = {			
						sender: urlParameterController,
						entities: [entity]
					};
				
					events.filtered.on.publish(applicationEvent);
				}
			});

			//state.initialize(metaStateJson);
	        //console.log(metaStateJson);
		}
    }
	
	function activate(){
		console.log("idVariable: "+ idVariable);

		//URL-button                            
		var codeWindowButton2 = document.createElement("BUTTON");
		codeWindowButton2.type = "button";
		codeWindowButton2.style = "width: 10%;height: 25px;margin: 2px 0px -2px 2px;";
		codeWindowButton2.addEventListener("click", openWindow2, false);
		
		var fullScreenImage2 = document.createElement("IMG");
		fullScreenImage2.src = "scripts/URLparameter/images/idlink.png";
		fullScreenImage2.style = "width: 25px; height: 20px;";
						
		codeWindowButton2.appendChild(fullScreenImage2);
		$("ul.jqx-menu-ul")[0].appendChild(codeWindowButton2);

/*
		setTimeout(function() {
			
		//idVariable
		var entity = model.getEntityById(idVariable);

		if (entity) {

			var applicationEvent = {			
				sender: urlParameterController,
				entities: [entity]
			};
			
			events.selected.on.publish(applicationEvent);
		}


		
		//idliste
		if (!Array.isArray(idListe)) return;

		var  markedEntities = idListe.map(model.getEntityById); //model.getEntityById(idListe[0]);

		if (!markedEntities) return;

		var applicationEvent = {			
			sender: urlParameterController,
			entities: markedEntities
		};
		
		events.marked.on.publish(applicationEvent);


 

		}, 2000);
*/		
	}


	String.prototype.hashCode = function() {
		var hash = 0, i, chr;
		if (this.length === 0) return hash;
		for (i = 0; i < this.length; i++) {
		  chr   = this.charCodeAt(i);
		  hash  = ((hash << 5) - hash) + chr;
		  hash |= hash; // Convert to 32bit integer
		}
		
		return hash;
		
	};
	
	function openWindow2(){
		
		var state = {
			"selected": [
							// "ID_c98d43c27394ae1dc762cf3737e9866aac17994e",
							// "ID_c98d43c27394ae1dc762cf3737e9866aac17994e",
							// "ID_b105434ea3463bc25fba32b684b5e86fd35ee57c"
						]
						//[...events.selected.getEntities().keys()]
			,
			"marked": [
							// "ID_c98d43c27394ae1dc762cf3737e9866aac17994e",
							// "ID_c98d43c27394ae1dc762cf3737e9866aac17994e",
							// "ID_b105434ea3463bc25fba32b684b5e86fd35ee57c"
						]
						//[...events.marked.getEntities().keys()]
			,
			"filtered": [
							// "ID_c98d43c27394ae1dc762cf3737e9866aac17994e",
							// "ID_c98d43c27394ae1dc762cf3737e9866aac17994e",
							// "ID_b105434ea3463bc25fba32b684b5e86fd35ee57c"
						]//[...events.filtered.getEntities().keys()]
		};
		
		var selectedEntities = events.selected.getEntities();
		state.selected = new Array();
		selectedEntities.forEach(function(element){
			state.selected.push(element.id);
		});
		var markedEntities = events.marked.getEntities();
		state.marked = new Array();
		markedEntities.forEach(function(element){
			state.marked.push(element.id);
		});
		var filteredEntities = events.filtered.getEntities();
		state.filtered = new Array();
		filteredEntities.forEach(function(element){
			state.filtered.push(element.id);
		});

		var myString=JSON.stringify(state);
        var myHashwert=JSON.stringify(state).hashCode();
        console.log("myHashwert: "+myHashwert);
		// TODO: ids
		//url = url ;
		var url = "localhost/getaviz-mo/ui/index.php?setup=web/rd bank&model=rd bank";
		//url =myHashwert +"<br>" + url + "&state=" + myHashwert +"<br>";
		url =myHashwert +"<br>" + url + "&state=" + myHashwert +"<br>" + myString;
		/*codeWindow2 = window.open(url, "");
		// lade Quellcode, des zuletzt betrachteten Objekts
		codeWindow2.addEventListener('load', displayCodeChild, true);*/

		$("#DisplayWindow").remove();
		var loadPopup = application.createPopup("url",  
		url, "DisplayWindow");
		document.body.appendChild(loadPopup);
		$("#DisplayWindow").css("display", "block").jqxWindow({
				theme: "metro",
				width: 700,
				height: 500,
				isModal: true,
				autoOpen: true,
				resizable: false
		});

        var xhr = new XMLHttpRequest();
        var url = "state.php";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
	        if (xhr.readyState === 4 && xhr.status === 200) {
 
		      console.log("successfull");
	        }
        }; 
        xhr.send(JSON.stringify({
	        hash: myHashwert,
	        state: myString,
        }));
	}




    return {
        initialize: initialize,
		activate: activate
    };    
})();