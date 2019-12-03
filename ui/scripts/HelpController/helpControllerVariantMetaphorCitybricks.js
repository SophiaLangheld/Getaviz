var helpControllerVariantMetaphorCitybricks =(function(){

    function helpControllerVarianthelpPopupUl(){
            var helpPopupUl = `
             <ul class='helpPopupUl helpController'>
                 <li>
                    <div>
                        <img src='scripts/HelpController/images/category.png'>
                         <div class='helpPopup_Ul_div helpController'>Legend</div>
                     </div>
                 </li>
                <li>
                     <div>
                         <img src='scripts/HelpController/images/group_work.png'>
                         <div class='helpPopup_Ul_div helpController'>Relationships</div>
                     </div>
                 </li>
                 <li>
                     <div>
                         <img src='scripts/HelpController/images/mouse.png'>
                         <div class='helpPopup_Ul_div helpController'>Navigation</div>
                     </div>
                 </li>
             </ul>`;
         return helpPopupUl;     
    };        
    function helpControllerVariantnavigation_x3dom(){
              var navigation_x3dom = `
            <div class='jqxTabs_Div helpController'>
                <div class='navigation_Describe helpController'>
                    <h2>Rotate</h2>
                    <img src='scripts/Legend/images/left.png'>
                    <p>Hold down the left mouse button and move the mouse to rotate the visualization.</p>
                </div>
                <div class='navigation_Describe helpController'>
                    <h2>Center</h2>
                    <img src='scripts/Legend/images/double.png'>
                    <p>Double-click on any location to center it.</p>
                </div>
                <div class='navigation_Describe helpController'>
                    <h2>Move</h2>
                    <img src='scripts/Legend/images/middle.png' >
                    <p>Hold down the middle mouse button and move the mouse to move the visualization.</p>
                </div>
                <div class='navigation_Describe helpController'>
                    <h2>Zoom</h2>
                    <img src='scripts/Legend/images/scrolling.png'>
                    <p>Use the scroll wheel to zoom in and out.</p>
                </div>
            </div>`;
            return navigation_x3dom;  
    }; 
            
    function helpControllerVariantnavigation_Aframe(){   
            var navigation_Aframe = `
             <div class='jqxTabs_Div helpController'>
                 <div class='navigation_Describe helpController'>
                     <h2>Rotate</h2>
                     <img src='scripts/Legend/images/left.png'>
                     <p>Hold down the left mouse button and move the mouse to rotate the visualization.</p>
                 </div>
                 <div class='navigation_Describe helpController'>
                     <h2>Move</h2>
                     <img src='scripts/Legend/images/middle.png' >
                     <p>Hold down the middle mouse button and move the mouse to move the visualization.</p>
                 </div>
                 <div class='navigation_Describe helpController'>
                     <h2>Zoom</h2>
                     <img src='scripts/Legend/images/scrolling.png'>
                     <p>Use the scroll wheel to zoom in and out.</p>
                 </div>
             </div>`;
               return navigation_Aframe;  
    }; 
             
    function helpControllerVariantlegend_Citybricks(){            
            var legend_Citybricks = `
            <div class='legend_Div jqxTabs_Div helpController'>
                <p>
                The city metaphor is a 3 dimensional real-world metaphor, aimed at creating a better understanding of the visualized system through a natural environment. The city consists of districts and buildings. The buildings are arranged so that the district area is as small and square as possible.
                </p>
                <img src='scripts/HelpController/images/citybricks.PNG'>
                <div class='legend_Describe helpController'>
                    <h2>District</h2>
                    <img src='scripts/HelpController/images/cityoriginal_package.png' >
                    <p>Districts represent <span class='legend_Represent helpController'>packages</span>. The districts and building in the district represent the components of the package, i.e., sub packages and types. The area of a district depends on the size of districts and buildings inside.</p>
                </div>
                <div class='legend_Describe helpController'>
                    <h2>Building base</h2>
                    <img src='scripts/HelpController/images/bricks_Buildingbase.png' >
                    <p>Buildings consists of a building base and bricks. The building base represents <span class='legend_Represent helpController'>types</span>, bricks the corresponding methods and fields.</p>
                </div>
                <div class='legend_Describe helpController'>
                    <h2>Brick</h2>
                    <img src='scripts/HelpController/images/bricks_Purple.png' >
                    <p>The city metaphor is a 3 dimensional real-world metaphor, aimed at creating a better understanding of the visualized system through a natural environment.</p>
                </div>
                <div class='legend_Describe helpController'>
                    <img src='scripts/HelpController/images/bricks_Voilet.png' >
                    <p>The city metaphor is a 3 dimensional real-world metaphor, aimed at creating a better understanding of the visualized system through a natural environment.</p>
                </div>
                <div class='legend_Describe helpController'>
                    <img src='scripts/HelpController/images/bricks_Mint.png' >
                    <p>The city metaphor is a 3 dimensional real-world metaphor, aimed at creating a better understanding of the visualized system through a natural environment.</p>
                </div>
                <div class='legend_Describe helpController'>
                    <img src='scripts/HelpController/images/bricks_Sunyellow.png' >
                    <p>The city metaphor is a 3 dimensional real-world metaphor, aimed at creating a better understanding of the visualized system through a natural environment.</p>
                </div>
                <div class='legend_Describe helpController'>
                    <img src='scripts/HelpController/images/bricks_Pink.png' >
                    <p>The city metaphor is a 3 dimensional real-world metaphor, aimed at creating a better understanding of the visualized system through a natural environment.</p>
                </div>
                <div class='legend_Describe helpController'>
                    <img src='scripts/HelpController/images/bricks_Lightblue.png' >
                    <p>The city metaphor is a 3 dimensional real-world metaphor, aimed at creating a better understanding of the visualized system through a natural environment.</p>
                </div>
                <div class='legend_Describe helpController'>
                    <img src='scripts/HelpController/images/bricks_Yellow.png' >
                    <p>The city metaphor is a 3 dimensional real-world metaphor, aimed at creating a better understanding of the visualized system through a natural environment.</p>
                </div>
                <div class='legend_Describe helpController'>
                    <img src='scripts/HelpController/images/bricks_Lime.png' >
                    <p>The city metaphor is a 3 dimensional real-world metaphor, aimed at creating a better understanding of the visualized system through a natural environment.</p>
                </div>
            </div>`;
            
            return legend_Citybricks; 
    }; 
            
    function helpControllerVariantrelationships_Citybricks(){         
            var relationships_Citybricks= `
            <div class='relationships_Citybricks_Div relationships_Div helpController'>
                <h2>Field accesses</h2>
                <p>Click on a field to show connections to accessing methods.</p>
                <p>Click on a method to show connections to accessed field.</p>
                <img src='scripts/HelpController/images/citybricks_void.png' >
                <h2>Method calls</h2>
                <p>Click on a method to show in- and outgoing method calls.</p>
                <img src='scripts/HelpController/images/citybricks_credits.png'>
            </div>`;
            return relationships_Citybricks; 
    }; 
            
    return {
 		helpControllerVariantrelationships_Citybricks:helpControllerVariantrelationships_Citybricks,
 		helpControllerVariantlegend_Citybricks: helpControllerVariantlegend_Citybricks,
 		helpControllerVariantnavigation_Aframe:helpControllerVariantnavigation_Aframe,
 		helpControllerVarianthelpPopupUl:helpControllerVarianthelpPopupUl,
 		helpControllerVariantnavigation_x3dom: helpControllerVariantnavigation_x3dom
 	};
})();