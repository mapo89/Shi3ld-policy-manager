/** 
	* Shi3ld Access Policy Manager for creating and editing access policies
	* through a user interface.
	* 
	* Copyright (C) 2013 Iacopo Vagliano, Luca Costabello, Serena Villata, 
	* Fabien Gandon - v1.0 
	* * 
	* This program is free software; you can redistribute it and/or modify it 
	* under the terms of the GNU General Public License as published by the 
	* Free Software Foundation; either version 2 of the License, or (at your 
	* option) any later version. 
	* 
	* This program is distributed in the hope that it will be useful, but 
	* WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
	* or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License 
	* for more details. 
	* 
	* You should have received a copy of the GNU General Public License along 
	* with this program; if not, see <http://www.gnu.org/licenses/>. 
	*/

/**
 * policy panel view to manage a single policy
 * has references to policyGui and PolicyText view
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'flinteditor',
  'text!templates/policyPanel.html'
  ], function($, _, Backbone, FlintEditor, policyPanelTemplate){

  var TabbedTextGuiView = Backbone.View.extend({

    currTab: "design",
    
    template: _.template(policyPanelTemplate),
    
    initialize: function(options) {
    	
		//this.initialQuery = "@prefix : <http://example.org/shi3ld/>.";
		this.HTML_SAVE_SUCCESS = "<div class=\"alert alert-success fade in\">" +
			             				"<button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>" +
			             				"<strong>Policy saved</strong>" +
			            			"</div>";
		this.HTML_SAVE_ERR = "<div class=\"alert alert-error fade in\">" +
			             		"<button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>" +
			             		"<strong>An error occured while saving the policy.</strong> Retry later" +
			            	"</div>";
		this.HTML_INIT_DATASET_ERR = "<div class=\"alert alert-error fade in\">" +
			             				"<button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>" +
			             				"<strong>An error occured while initializing the dataset.</strong> Retry later" +
			            			"</div>";
		this.MSG_TIMEOUT = options.MSG_TIMEOUT;
		//context of showMsg function fixed 
		//(called also from jquery when on success and error after model save)
		_.bind(this.showMsg, this);
	},
    
    initFlint: function (options) {
    	var flintConfig = {
			"interface" : {
				"toolbar" : true,
				"menu" : true
			},
			"namespaces" : [
			]
		
		}			
		this.$flintTab = $("#editTab");
		this.$flintTab.bind('shown', function () {
			$(window).trigger('resize', 'flint-test');
		});
		this.flintEd = new FlintEditor("flint-test", "sparql/images", flintConfig);
		this.$el.find($(".CodeMirror")).height('650px');
		
		//activate bootstrap tooltip
		$("[data-toggle='tooltip']").tooltip();
				
		this.$name = $('#policyNameGui');
		this.$nameConflict = $('#nameConflictAlert');
		this.$designTab = $('#tab1');
    },
    
    showAlert: function (options) {
		this.model.trigger('saveAlert', options);
    },
    
    close: function () {
 		this.viewTxt.close();
 		this.viewGui.close();
 		this.remove();
    },
    
    showMsg: function (html) {
    	this.$el.prepend(html);
		$(".alert").alert();
		setTimeout(function () {
			$(".alert-error").alert('close');
			$(".alert-success").alert('close');
		}, this.MSG_TIMEOUT);
    },
    
    htmlSyntaxErr: function (err) { return "<div class=\"alert alert-error fade in\">" +
			             		"<button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>" +
			             		"<strong>Syntax error in the policy.</strong> " + err +
			            	"</div>"
    },
	
  });
  
  return TabbedTextGuiView;
  
});
