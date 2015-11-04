var mongoose = require('mongoose');




//Schema Definition
var diagramSchema = mongoose.Schema({
  connectors:[{label: String, sourceId: String, targetId: String, id :String}],
  diagram :[{ $$hashKey: String, description: String, element_id : String,
  title : String, manager: String, workspace_id :Number, x :Number, y : Number, jsPlumb_id : String }],
  details : {workspaceName : String, author : String, description : String, shape : String, color : String}
});



var Diagram = mongoose.model('Diagram', diagramSchema);