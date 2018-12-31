var canvasManipulator = (function () {

    var colors = {
        darkred: "darkred",
        red: "red",
        black: "black",
        orange: "orange",
        darkorange: "darkorange"
    };

    var scene = {};
    var threeJSScene = {};

    var camera;
    var initialCameraView;

    var testEntity;

    function initialize() {

        scene = document.querySelector("a-scene");
        threeJSScene = scene.object3D;
        camera = document.getElementById("camera");

    }

    function reset() {

    }

    //  working - save old transparency in case it is not 0?
    function changeTransparencyOfEntities(entities, value) {
        entities.forEach(function (entity2) {
            //  getting the entity again here, because without it the check if originalTransparency is defined fails sometimes
            let entity = model.getEntityById(entity2.id);
            let component = document.getElementById(entity.id);
            if (component == undefined) {
                events.log.error.publish({text: "CanvasManipualtor - changeTransparencyOfEntities - components for entityIds not found"});
                return;
            }
            if (entity.originalTransparency === undefined) {
                entity.originalTransparency = {};
                entity.currentTransparency = {};
                if(component.getAttribute("material").opacity) {
                    entity.originalTransparency = 1 - component.getAttribute("material").opacity;
                }
            }
            entity.currentTransparency = value;
            setTransparency(component, value);
        });
    }

    //  working
    function resetTransparencyOfEntities(entities) {
        entities.forEach(function (entity) {
            let component = document.getElementById(entity.id);
            if (component == undefined) {
                events.log.error.publish({text: "CanvasManipualtor - resetTransparencyOfEntities - components for entityIds not found"});
                return;
            }
            if (!(entity.originalTransparency == undefined)) {
                entity.currentTransparency = entity.originalTransparency;
                setTransparency(component, entity.originalTransparency);
            }
        });
    }


    //	working
    function changeColorOfEntities(entities, color) {
        entities.forEach(function (entity) {
                //	in x3dom this function would get entities of the model to change the color of the related object
                //	for reference in canvasHoverController.js: var entity = model.getEntityById(multipartEvent.partID);
                //	this entity gets handed over to the ActionController.js as part of an ApplicationEvent
                if (!(entity == undefined)) {
                    var component = document.getElementById(entity.id);
                }
                if (component == undefined) {
                    events.log.error.publish({text: "CanvasManipualtor - changeColorOfEntities - components for entityIds not found"});
                    return;
                }
                if (entity.originalColor == undefined) {
                    entity.originalColor = component.getAttribute("color");
                }
                entity.currentColor = color;
                setColor(component, color);
            }
        );
    }

//	working
    function resetColorOfEntities(entities) {
        entities.forEach(function (entity) {
            let component = document.getElementById(entity.id);
            if (component == undefined) {
                events.log.error.publish({text: "CanvasManipualtor - resetColorOfEntities - components for entityIds not found"});
                return;
            }
            if (entity.originalColor) {
                entity.currentColor = entity.originalColor;
                setColor(component, entity.originalColor);
            }
        });
    }

    function setColor(object, color) {
        color == colors.darkred ? color = colors.red : color = color;
        let colorValues = color.split(" ");
        if (colorValues.length == 3) {
            color = "#" + parseInt(colorValues[0]).toString(16) + "" + parseInt(colorValues[1]).toString(16) + "" + parseInt(colorValues[2]).toString(16);
        }
        object.setAttribute("color", color);
    }

//  working
    function hideEntities(entities) {
        entities.forEach(function (entity) {
            let component = document.getElementById(entity.id);
            if (component == undefined) {
                events.log.error.publish({text: "CanvasManipualtor - hideEntities - components for entityIds not found"});
                return;
            }
            setVisibility(component, false)
        });
    }

//  working
    function showEntities(entities) {
        entities.forEach(function (entity) {
            let component = document.getElementById(entity.id);
            if (component == undefined) {
                events.log.error.publish({text: "CanvasManipualtor - showEntities - components for entityIds not found"});
                return;
            }
            setVisibility(component, true)
        });
    }

    function highlightEntities(entities, color) {
        entities.forEach(function (entity2) {
            //  getting the entity again here, because without it the check if originalTransparency is defined fails sometimes
            let entity = model.getEntityById(entity2.id);
            let component = document.getElementById(entity.id);
            if (component == undefined) {
                events.log.error.publish({text: "CanvasManipualtor - highlightEntities - components for entityIds not found"});
                return;
            }
            if (entity.originalColor == undefined) {
                entity.originalColor = component.getAttribute("color");
                entity.currentColor = entity.originalColor;
            }
            if (entity["originalTransparency"] === undefined) {
                // in case "material".opacity is undefined originalTransparency gets set to 0 which would be the default value anyways
                entity.originalTransparency = {};
                entity.currentTransparency = {};
                if(component.getAttribute("material").opacity) {
                    entity.originalTransparency = 1 - component.getAttribute("material").opacity;
                } else entity.originalTransparency = 0;
                entity.currentTransparency = entity.originalTransparency;
            }
            setColor(component, color);
            setTransparency(component, 0);
        });
    }

    function unhighlightEntities(entities) {
        entities.forEach(function (entity) {
            let component = document.getElementById(entity.id);
            if (component == undefined) {
                events.log.error.publish({text: "CanvasManipualtor - unhighlightEntities - components for entityIds not found"});
                return;
            }
            setTransparency(component, entity.currentTransparency);
            setColor(component, entity.currentColor);
        });
    }

//  after clicking an entity fit the camera to show this entity (angle stays the same)
//  not working
    function flyToEntity(entity) {
        /*document.querySelector("#camera").object3D.position = {x: 1, y: 2, z: 3};
        console.debug(document.querySelector("#camera").object3D.position);*/
    }

    function addElement(element) {
        var addedElements = document.getElementById("addedElements");
        addedElements.appendChild(element);
    }

    function removeElement(element) {
        element.parentNode.removeChild(element);
    }


//  not working yet
//  gets called from Mark- and SelectController if specified in the config
    function setCenterOfRotation(entity, setFocus) {
        var centerOfPart = getCenterOfEntity(entity);

        viewpoint.setCenterOfRotation(centerOfPart);

        if (setFocus) {
            var mat = viewarea.getViewMatrix().inverse();

            var from = mat.e3();
            var at = viewarea._pick;
            var up = mat.e1();

            var norm = mat.e0().cross(up).normalize();
            // get distance between look-at point and viewing plane
            var dist = norm.dot(viewarea._pick.subtract(from));

            from = at.addScaled(norm, -dist);
            mat = x3dom.fields.SFMatrix4f.lookAt(from, at, up);

            viewarea.animateTo(mat.inverse(), viewpoint);
        }
    }

    function getCenterOfEntity(entity) {
        var center = new THREE.Vector3();
        var object = document.getElementById(entity.id).object3DMap.mesh;
        center.x = object.geometry.boundingSphere.center["x"];
        center.y = object.geometry.boundingSphere.center["y"];
        center.z = object.geometry.boundingSphere.center["z"];
        return object.localToWorld(center);
    }

    function setTransparency(object, value) {
        object.setAttribute('material', {
            opacity: 1 - value
        });
    }


    function setVisibility(object, visibility) {
        object.setAttribute("visible", visibility);
    }

    function getElementIds() {
        let sceneArray = Array.from(scene.children);
        sceneArray.shift(); // so camera entity needs to be first in model.html
        sceneArray.pop();  // last element is of class "a-canvas"
        let elementIds = [];
        sceneArray.forEach(function (object) {
            elementIds.push(object.id);
        });
        return elementIds;
    }

    return {
        initialize: initialize,
        reset: reset,
        colors: colors,

        changeTransparencyOfEntities: changeTransparencyOfEntities,
        resetTransparencyOfEntities: resetTransparencyOfEntities,

        changeColorOfEntities: changeColorOfEntities,
        resetColorOfEntities: resetColorOfEntities,

        hideEntities: hideEntities,
        showEntities: showEntities,

        highlightEntities: highlightEntities,
        unhighlightEntities: unhighlightEntities,

        flyToEntity: flyToEntity,

        addElement: addElement,
        removeElement: removeElement,


        setCenterOfRotation: setCenterOfRotation,
        getCenterOfEntity: getCenterOfEntity,

        getElementIds: getElementIds
    };

})
();