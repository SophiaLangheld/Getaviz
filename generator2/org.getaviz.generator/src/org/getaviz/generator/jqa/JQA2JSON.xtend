package org.getaviz.generator.jqa

import java.io.Writer
import java.io.FileWriter
import org.getaviz.lib.database.Database
import org.neo4j.graphdb.Node
import java.io.IOException
import java.util.List
import org.getaviz.lib.database.Rels
import org.neo4j.graphdb.Direction
import org.apache.commons.lang3.StringUtils
import static org.apache.commons.text.StringEscapeUtils.escapeHtml4
import org.getaviz.lib.database.Labels
import org.getaviz.generator.SettingsConfiguration
import org.apache.commons.logging.LogFactory

class JQA2JSON {
	val graph = Database::instance
	val config = SettingsConfiguration.instance
	val log = LogFactory::getLog(class)

	new () {
		log.info("JQA2JSON has started.")
		val elements = newArrayList
		graph.execute("MATCH (n)<-[:VISUALIZES]-() RETURN n").forEach[elements.add(get("n") as Node)]
		val tx = graph.beginTx
		var Writer fw = null
		try {
			val path = config.outputPath + "metaData.json"
			fw = new FileWriter(path)
			fw.write(elements.toJSON)
			tx.success
		} catch (IOException e) {
			System.err.println(e);
		} finally {
			if (fw !== null)
				try {
					fw.close;
				} catch (IOException e) {
					e.printStackTrace;
				}
			tx.close
		}
		log.info("JQA2JSON has finished.")
	}	
	
	private def String toJSON (List<Node> list)  '''
		«FOR el : list BEFORE "[{" SEPARATOR "\n},{" AFTER "}]"»
			«IF el.hasLabel(Labels.Package)»
			«toMetaDataNamespace(el)»
			«ENDIF»
			«IF el.hasLabel(Labels.Class) || el.hasLabel(Labels.Interface)»
			«toMetaDataClass(el)»
			«ENDIF»		
			«IF el.hasLabel(Labels.Type) && el.hasLabel(Labels.Annotation)»
			«toMetaDataAnnotation(el)»
			«ENDIF»		
			«IF el.hasLabel(Labels.Type) && el.hasLabel(Labels.Enum)»
			«toMetaDataEnum(el)»
			«ENDIF»				
			«IF el.hasLabel(Labels.Method)»
			«toMetaDataMethod(el)»
			«ENDIF»		
			«IF el.hasLabel(Labels.Field) && !el.hasLabel(Labels.Enum)»
			«toMetaDataAttribute(el)»
			«ENDIF»		
			«IF el.hasLabel(Labels.Field) && el.hasLabel(Labels.Enum)»
			«toMetaDataEnumValue(el)»
			«ENDIF»								
		«ENDFOR»
	'''	
	
	private def toMetaDataNamespace(Node namespace) {
		val parent = namespace.getRelationships(Rels.CONTAINS, Direction.INCOMING).filter[startNode.hasLabel(Labels.Package)].head
		var belongsTo = "root"
		if(parent !== null) {
			belongsTo = parent.startNode.getProperty("hash") as String
		}
		val result = '''
		"id":            "«namespace.getProperty("hash")»",
		"qualifiedName": "«namespace.getProperty("fqn")»",
		"name":          "«namespace.getProperty("name")»",
		"type":          "FAMIX.Namespace",
		"belongsTo":     "«belongsTo»"
	'''	
		return result
	}
	
	def private toMetaDataClass(Node c) {
		var belongsTo = ""
		var parent = c.getRelationships(Rels.DECLARES, Direction.INCOMING).filter[startNode.hasLabel(Labels.Type)].head
		if(parent !== null) {
			belongsTo = parent.startNode.getProperty("hash", "XXX") as String
		} else {
			parent = c.getRelationships(Rels.CONTAINS, Direction.INCOMING).filter[startNode.hasLabel(Labels.Package)].head
			belongsTo = parent.startNode.getProperty("hash", "YYY") as String
		}
		val result = '''
		"id":            "«c.getProperty("hash")»",
		"qualifiedName": "«c.getProperty("fqn")»",
		"name":          "«c.getProperty("name")»",
		"type":          "FAMIX.Class",
		"modifiers":     "«c.modifiers»",
		"subClassOf":    "«c.superClasses»",
		"superClassOf":  "«c.subClasses»",
		"belongsTo":     "«belongsTo»"
	'''	
		return result
	}
	
	def private toMetaDataAttribute(Node attribute) {
		var belongsTo = ""
		var declaredType = ""
		val parent = attribute.getRelationships(Direction.INCOMING, Rels.CONTAINS, Rels.DECLARES).head
		if(parent !== null) {
			belongsTo = parent.startNode.getProperty("hash") as String
		}		
		val type = attribute.getSingleRelationship(Rels.OF_TYPE, Direction.OUTGOING)
		if(type !== null) {
			declaredType = type.startNode.getProperty("name") as String
		}				
		val result = '''
		"id":            "«attribute.getProperty("hash")»",
		"qualifiedName": "«attribute.getProperty("fqn")»",
		"name":          "«attribute.getProperty("name")»",
		"type":          "FAMIX.Attribute",
		"modifiers":     "«attribute.getModifiers»",
		"declaredType":  "«declaredType»",
		"accessedBy":	 "«attribute.getAccessedBy»",
		"belongsTo":     "«belongsTo»"
	'''
		return result
	}
	
	def private toMetaDataMethod(Node method) {
		var belongsTo = ""
		val parent = method.getSingleRelationship(Rels.DECLARES, Direction.INCOMING)
		if(parent !== null) {
			belongsTo = parent.startNode.getProperty("hash") as String
		}		
		var signature = method.getProperty("signature") as String
		if(signature.contains(".")) {
			val lBraceIndex = signature.indexOf("(")
			signature = signature.substring(0,lBraceIndex + 1) + method.getParameters + ")"
		}
		val result = '''
		"id":            "«method.getProperty("hash")»",
		"qualifiedName": "«escapeHtml4(method.getProperty("fqn") as String)»",
		"name":          "«method.getProperty("name")»",
		"type":          "FAMIX.Method",
		"modifiers":     "«method.modifiers»",
		"signature":  	 "«signature»",
		"calls":		 "«method.getCalls»",
		"calledBy":		 "«method.getCalledBy»",
		"accesses":	 	 "«method.getAccesses»",
		"belongsTo":     "«belongsTo»"
	'''
		return result
	}
	
	def private toMetaDataEnum(Node e) {
		var belongsTo = ""
		val parent = e.getSingleRelationship(Rels.DECLARES, Direction.INCOMING)
		if(parent !== null) {
			belongsTo = parent.startNode.getProperty("hash") as String
		}			
		val result = '''
		"id":            "«e.getProperty("hash")»",
		"qualifiedName": "«e.getProperty("fqn")»",
		"name":          "«e.getProperty("name")»",
		"type":          "FAMIX.Enum",
		"modifiers":     "«e.modifiers»",
		"belongsTo":     "«belongsTo»"
	'''
		return result
	}
	
	def private toMetaDataEnumValue(Node ev) {
		var belongsTo = ""
		val parent = ev.getSingleRelationship(Rels.DECLARES, Direction.INCOMING)
		if(parent !== null) {
			belongsTo = parent.startNode.getProperty("hash") as String
		}	
		val result = '''	
		"id":            "«ev.getProperty("hash")»",
		"qualifiedName": "«ev.getProperty("fqn")»",
		"name":          "«ev.getProperty("name")»",
		"type":          "FAMIX.EnumValue",
		"belongsTo":     "«belongsTo»"
	'''
		return result
	}
	
	def private toMetaDataAnnotation(Node annotation) {
		var belongsTo = ""
		val parent = annotation.getRelationships(Direction.INCOMING, Rels.CONTAINS, Rels.DECLARES).filter[hasProperty("Package")].head
		if(parent !== null) {
			belongsTo = parent.startNode.getProperty("hash") as String
		}			
		val result = '''
		"id":            "«annotation.getProperty("hash")»",
		"qualifiedName": "«annotation.getProperty("fqn")»",
		"name":          "«annotation.getProperty("name")»",
		"type":          "FAMIX.AnnotationType",
		"modifiers":     "«annotation.modifiers»",
		"subClassOf":    "",
		"superClassOf":  "",
		"belongsTo":     "«belongsTo»"
	'''
		return result
	}
					
	def private getSuperClasses(Node element) {
		val superClasses = element.getRelationships(Rels.EXTENDS, Direction.OUTGOING)
		val tmp = newArrayList
		superClasses.forEach[
			if(endNode.hasProperty("hash")) {
				tmp += endNode.getProperty("hash") as String
			}
		]
		return tmp.removeBrackets
	}	
	
	def private getSubClasses(Node element) {
		val subClasses = element.getRelationships(Rels.EXTENDS, Direction.INCOMING)
		val tmp = newArrayList
		subClasses.forEach[
			if(startNode.hasProperty("hash")) {
				tmp += startNode.getProperty("hash") as String
			}
		]
		return tmp.removeBrackets
	}		
	
	def private getAccessedBy(Node element) {
		val accesses = element.getRelationships(Direction.INCOMING, Rels.WRITES, Rels.READS)
		val tmp = newArrayList
		accesses.forEach[
			if(startNode.hasProperty("hash")) {
				tmp += startNode.getProperty("hash") as String
			}
		]
		return tmp.removeBrackets
	}		
	
	def private getAccesses(Node element) {
		val accesses = element.getRelationships(Direction.OUTGOING, Rels.WRITES, Rels.READS)
		val tmp = newArrayList
		accesses.forEach[
			if(endNode.hasProperty("hash")) {
				tmp += endNode.getProperty("hash") as String
			}				
		]
		return tmp.removeBrackets
	}		
		
	def private getCalls(Node element) {
		val calls = element.getRelationships(Direction.OUTGOING, Rels.INVOKES)
		val tmp = newArrayList
		calls.forEach[
			if(endNode.hasProperty("hash")) {
				tmp += endNode.getProperty("hash") as String
			}			
		]
		return tmp.removeBrackets
	}		
	
	def private getCalledBy(Node element) {
		val calls = element.getRelationships(Direction.INCOMING, Rels.INVOKES)
		val tmp = newArrayList
		calls.forEach[
			if(startNode.hasProperty("hash")) {
				tmp += startNode.getProperty("hash") as String
			}			
		]
		return tmp.removeBrackets
	}		
				
	def private getModifiers(Node element) {
		val tmp = newArrayList
		if (element.hasProperty("visibility")) {
			tmp += element.getProperty("visibility") as String
		}
		if (element.hasProperty("final")) {
			if (element.getProperty("final") === true) {
				tmp += "final"
			}
		}
		if (element.hasProperty("abstract")) {
			if (element.getProperty("abstract") === true) {
				tmp += "abstract"
			}
		}
		if (element.hasProperty("static")) {
			tmp += "static"
		}
		return tmp.removeBrackets
	}
	
	def private getParameters(Node method) {
		val parameterList = newArrayList
		val list = method.getRelationships(Rels.HAS, Direction.OUTGOING).map[endNode];
		list.filter[hasLabel(Labels.Parameter)].sortBy[p|p.getProperty("index", 0) as Integer].forEach[p|
			try {
				parameterList += p.getSingleRelationship(Rels.OF_TYPE, Direction.OUTGOING).endNode.getProperty("name") as String
			} catch (NullPointerException e) {
				
			}
		]
		return parameterList.removeBrackets
	}
	
	def removeBrackets(String[] array) {
		return removeBrackets(array.toString)
	}
	
	def removeBrackets(String string) {
		return StringUtils::remove(StringUtils::remove(string, "["), "]")
	}	
}