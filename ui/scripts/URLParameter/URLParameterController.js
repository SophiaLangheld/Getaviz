var urlParameterController = (function() {
    
    function initialize(){
    }
	
	function activate(){
		console.log(idVariable);

		setTimeout(function() {
			
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
}


    return {
        initialize: initialize,
		activate: activate
    };    
})();