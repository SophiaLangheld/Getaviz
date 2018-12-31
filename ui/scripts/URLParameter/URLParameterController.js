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
			
			/*let entities = [];
			metaStateJson.selected.forEach(function(element){
				var entity = model.getEntityById(element);
				if (entity) {
					entities.push(entity);
				}
			}); */
			let entities = metaStateJson.selected.map(element => model.getEntityById(element)).filter(element => element != null);
			var applicationEvent = {			
				sender: urlParameterController,
				entities: entities
			};
			events.selected.on.publish(applicationEvent);

			// TODO: liste sammeln und alles markieren 31.01.2018
			
			metaStateJson.marked.forEach(function(element){
				var entity = model.getEntityById(element);
				if (entity) {
					entities.push(entity);
					
				}
			});
			//let entities = metaStateJson.marked.map(element => model.getEntityById(element)).filter(element => element != null);
			var applicationEvent = {			
				sender: urlParameterController,
				entities: entities
			};
			events.marked.on.publish(applicationEvent);


			metaStateJson.filtered.forEach(function(element){
				var entity = model.getEntityById(element);
				if (entity) {
					entities.push(entity);
				}
			});
			//let entities = metaStateJson.filtered.map(element => model.getEntityById(element)).filter(element => element != null);
			var applicationEvent = {			
				sender: urlParameterController,
				entities: entities
			};
			events.filtered.on.publish(applicationEvent);

			
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
			"selected": []
						//[...events.selected.getEntities().keys()]
			,
			"marked": []
						//[...events.marked.getEntities().keys()]
			,
			"filtered": []//[...events.filtered.getEntities().keys()]
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

		var url = window.location.toString();

		url =myHashwert +"<br>" + url + "&state=" + myHashwert +"<br>" + myString;


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