package org.svis.generator

import java.text.SimpleDateFormat
import java.util.Date
import org.svis.generator.SettingsConfiguration.Variant
import org.svis.generator.SettingsConfiguration.BuildingType
import org.eclipse.xtext.generator.IFileSystemAccess2
import java.io.File
import org.apache.commons.io.FileUtils

class X3DUtils {
	val config = SettingsConfiguration.instance

	def String toX3DHead() '''
		<?xml version="1.0" encoding="UTF-8"?>
		<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D 3.3//EN" "http://www.web3d.org/specifications/x3d-3.3.dtd">
		<X3D profile='Immersive' version='3.3' xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance' xsd:noNamespaceSchemaLocation='http://www.web3d.org/specifications/x3d-3.3.xsd'>
		    <head>
		        <meta content='model.x3d' name='title'/>
		        <meta content='SVIS-Generator' name='creator'/>
			</head>
		    <ContextSetup zWriteTrans='false'/>
		<Scene>
	'''

	def String toX3DTail() '''
			<Background DEF="_Background" groundColor='1.0000000 1.0000000 1.0000000' skyColor='1.0000000 1.0000000 1.0000000'/>
			</Scene>
		</X3D>
	'''

	def String getTimeStamp() {
		val formatter = new SimpleDateFormat("YYYY-MM-dd/HH:mm:ss")
		return formatter.format(new Date)
	}

	def toX3DOMHead() '''
		<html> 
		<head> 
		<title>X3DOM-SVIS</title> 			
		<script type='text/javascript' src='http://x3dom.org/release/x3dom-full.js'> </script> 
		<link rel='stylesheet' type='text/css' href='http://www.x3dom.org/download/x3dom.css'></link> 
		«IF (config.variant == Variant::DYNAMIC || config.buildingType == BuildingType::CITY_DYNAMIC)»
			<script src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
			<script type='text/javascript' src='./anifra-minified.js'> </script>
		«ENDIF»
		<style>
		#x3droot {
		width: 100%;
		height: 100%;
		}
		</style>
		</head> 
		<body> 	
		 <x3d showLog='false' id='x3droot'> 
		 <scene id="scene"> 
	'''

	def String toX3DScaleHead(int absoluteLength) '''
		<Transform translation='0 0 «absoluteLength/2»' scale='1 1 «absoluteLength»'> 
	'''

	def String toX3DScaleTail() '''
		</Transform> 
	'''

	def toX3DOMTail() '''
		</scene> 
		</x3d> 
		</body> 
		</html>    
	'''

	def toAFrameHead() '''
		<!DOCTYPE html>
		<html>
		  <head>
		    <meta charset="utf-8">
		    <title>Ring</title>
		    <meta name="description" content="Getaviz">
		  </head>
		  <body>
		    <a-scene id="aframe-canvas"
		    	light="defaultLightsEnabled: false"
		    	cursor="rayOrigin: mouse"
		    	embedded="true"
		    >
		    <a-entity
		    	id="camera"
		    	camera="fov: 80; zoom: 1;"
		    	position="44.0 20.0 44.0"
		    	rotation="0 -90 0"
		    	orbit-camera="
		        	target: 15.0 1.5 15.0;
		            enableDamping: true;
		            dampingFactor: 0.25;
		            rotateSpeed: 0.25;
		            panSpeed: 0.25;
		            invertZoom: true;
		            logPosition: false;
		            minDistance:0;
		            maxDistance:1000;
		            "
		    	mouse-cursor=""
		    	>
		    	</a-entity>
	'''

	def toAFrameTail() '''
			</a-scene>
		  </body>
		</html>
	'''

	def toAnimationFramework() '''
		«IF (config.variant == Variant::DYNAMIC || config.buildingType == BuildingType::CITY_DYNAMIC)»
			«toAnimationFramework("events.js")»
		«ENDIF»
	'''

	def toAnimationFramework(String eventsFileName) '''
		<AnimationFramework id="framework" eventsUrl="./«eventsFileName»">
			  <NodeEventHandler></NodeEventHandler>
			  <EdgeEventHandler></EdgeEventHandler>
			  <NodePropertyChangeHandler></NodePropertyChangeHandler>
			  <MoveNodeHandler></MoveNodeHandler>
			  <LabelEventHandler></LabelEventHandler>
			</AnimationFramework>
	'''
	
	def toD3Head()'''
	import React, { Component } from 'react';
	import './App.css';
	import { InteractiveForceGraph, ForceGraphNode, ForceGraphLink, ForceGraphArrowLink } from 'react-vis-force';
	
	class App extends Component {
	  render() {
	    return (
	      <div className="App">
	
	        <p className="App-intro">
	          Prototype 1:  <a href="https://github.com/uber/react-vis-force">react-vis-force</a>
	        </p>
			<div>
			<InteractiveForceGraph
				simulationOptions={{ height: 600, width: 800 }}
				labelAttr="label"
				onSelectNode={(node) => console.log(node)}
				highlightDependencies="true"
				zoom="true"
			>
	'''
	
	def toD3Tail() '''
			</InteractiveForceGraph>
			</div>
	      </div>
	
	    );
	  }
	}
	
	export default App;
	'''
	
	def convertToMultipart(IFileSystemAccess2 fsa) {
		val processBuilder = new ProcessBuilder("./aopt-idmap-sapd.bat")
		val script = new File(fsa.getURI("aopt-idmap-sapd.bat").path)
		script.executable = true
 		val directory = new File(fsa.getURI("aopt-idmap-sapd.bat").path.replace("%20", " ")).parentFile
 		val binGeo = new File(directory.path + "/binGeo")
 		if(binGeo.exists) {
 			FileUtils::cleanDirectory(binGeo)
 		}
 		processBuilder.directory (directory)
		processBuilder.start
	}
}
