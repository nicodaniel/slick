var Diagram = require('mongoose').model('Diagram');

exports.saveDiagram = function(req, res) {
 var diagram = req.body;
 diagram = new Diagram(req.body);
 diagram.save(function(err) {
	if (!err) {
	 res.json(true);
	} else {
	 console.log(err);
	 handleError(err);
	 res.json(false);
	}
 });
 // res.send({result : "OK"});
};

exports.getSchema = function(req, res) {
 Diagram.find({}, function(err, diagram) {
	if (!err) {
	 if (diagram) {
		res.json({ result : diagram, status : true });
	 } else {
		res.json({ diagram : false });
	 }
	} else {
	 console.log(err);
	}
 });
};

exports.getSchemaByName = function(req, res) {
 var name = req.params.name;
 if (name) {
	Diagram.find({ "details.workspaceName" : name }, function(err, diagram) {
	 if (!err) {
		if (diagram) {
		 res.json({ result : diagram, status : true });
		} else {
		 res.json({ diagram : false });
		}
	 } else {
		console.log(err);
	 }
	});
 }
};


exports.delete = function (req, res) {
 var id = req.params.id;
 if (id) {
	Diagram.findById(id, function (err, diagram) {
	 diagram.remove(function (err) {
       if (!err) {
         res.json(true);
       } else {
         console.log(err);
         res.json(false)
       }
     });
   });
 }
};