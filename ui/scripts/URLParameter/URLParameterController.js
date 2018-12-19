var urlParameterController = (function() {
    
    function initialize(){

		/*$(document).ready(function () {
			if(!window["state"]){
				console.log("No state definition found!");
				return;
			}
		  $.getJSON( metaStateJsonUrl, initializeApplication);
		});

		function initializeApplication(state){
			//create entity state
	        console.log(state);
		}*/
     
		
    }
	
	function activate() {
		//console.log(initState);


		//URL-button                            
		var codeWindowButton2 = document.createElement("BUTTON");
		codeWindowButton2.type = "button";
		codeWindowButton2.style = "width: 10%;height: 25px;margin: 2px 0px -2px 2px;";
		codeWindowButton2.addEventListener("click", openWindow2, false);
		
		var fullScreenImage2 = document.createElement("IMG");
		fullScreenImage2.src = "scripts/SourceCode/images/idlink.png";
		fullScreenImage2.style = "width: 25px; height: 20px;";
						
		codeWindowButton2.appendChild(fullScreenImage2);
		$("ul.jqx-menu-ul")[0].appendChild(codeWindowButton2);


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
            /*//stateSelected 27.11.18
			var entity = model.getEntityById(stateSelected);

			if (entity) {

				var applicationEvent = {			
					sender: urlParameterController,
					entities: [entity]
				};
				
				events.selected.on.publish(applicationEvent);
			}
			let state = stateSelected;
			json.stringify(state).hashcode;*/
			
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

	}
	
			
			String.prototype.hashCode = function() {
				var hash = 0, i, chr;
				if (this.length === 0) return hash;
				for (i = 0; i < this.length; i++) {
				  chr   = this.charCodeAt(i);
				  hash  = ((hash << 5) - hash) + chr;
				  hash = hash & hash; // Convert to 32bit integer
				}
				
				return hash;
				
			};
			

			  

   // openWindow2 
   function openWindow2(){
	var url = "localhost/getaviz/ui/index.php?setup=web/rd bank&model=rd bank";

	// TODO: ids
	//url = url + "&marked=" + events.marked.getEntities() + "The full URL of this page is:<br>" + window.location.href;
    url =myHashwert +"<br>" + url + "&state=" + myHashwert + "<br>The full URL of this page is:<br>" + window.location.href +"<br>" + myString;
	/*codeWindow2 = window.open(url, "");
	// lade Quellcode, des zuletzt betrachteten Objekts
	codeWindow2.addEventListener('load', displayCodeChild, true);*/

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




		//die JSON-Datei auf dem Server gespeichert werden =====> nach den Code funktioniert nicht 
		

		
		var state =
				[
					{"selected": [
									"ID_c98d43c27394ae1dc762cf3737e9866aac17994e",
									"ID_c98d43c27394ae1dc762cf3737e9866aac17994e",
									"ID_b105434ea3463bc25fba32b684b5e86fd35ee57c"
								]
								//s[...events.selected.getEntities().keys()]
					},
					{"marked": [
									"ID_c98d43c27394ae1dc762cf3737e9866aac17994e",
									"ID_c98d43c27394ae1dc762cf3737e9866aac17994e",
									"ID_b105434ea3463bc25fba32b684b5e86fd35ee57c"
								]
					},
					{"filtered": [
									"ID_c98d43c27394ae1dc762cf3737e9866aac17994e",
									"ID_c98d43c27394ae1dc762cf3737e9866aac17994e",
									"ID_b105434ea3463bc25fba32b684b5e86fd35ee57c"
								]
					}
		];
		var myString=JSON.stringify(state);
		var myHashwert=JSON.stringify(state).hashCode();
		console.log(myHashwert);

		var xhr = new XMLHttpRequest();
		var url = "state.php";
        xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
		 
				 console.log("es ist ok");
			}
		};
		xhr.send(JSON.stringify({
			hash: myHashwert,
			state: state,
		}));// 为什么 ohne  xhr.onreadystatechange = function () { ... 括号里有东西就会错误呢
                              // 只允许send 一个吗
		window.alert("ich bin here");
		// xhr.send(state);  // wieso  state geht nicht 
	
	}


    return {
        initialize: initialize,
		activate: activate
    };    
})();