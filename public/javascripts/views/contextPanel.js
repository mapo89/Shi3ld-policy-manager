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
 * view to manage the context definition
 * has references to accessCond and PolicyText view
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'views/tabbedTextGui',
  'views/accessCond',
  'views/policyText',
  'models/context',
  'flinteditor',
  'text!templates/policyPanel.html'
  ], function($, _, Backbone, TabbedTextGuiView, AccessCondView, PolicyTextView, ContextModel, FlintEditor, policyPanelTemplate) {

  var ContextPanelView = TabbedTextGuiView.extend({
	events: {
      'click #editTab, #designTab': 'toggleView',
    },
    
    toggleView: function(e) {
    
    	console.log("appView.toggleView");
    	if(this.currTab == "design"){
    		this.currTab = "text";
    		if(this.viewGui){
    			this.model.get("context").trigger('update');
    			this.model.get("context").trigger('close');	
    			this.model.toTurtleGraph({serialization: true});
    			this.viewTxt.generatePolicyText({preventTextChangeEv: true});
    		}
    		return;
    	}
    	
    	this.currTab = "design";
    	try {
			this.model.parse(this.flintEd.getEditor().getCodeEditor().getValue());
		} catch (err) {
			this.showMsg(this.htmlSyntaxErr(err.message));
    		this.currTab = "text";
			//to prevent next events (support of IE from v.9)
			e.stopPropagation();
			return;
		}
		this.model.get("context").trigger('open');
    },
    
    render: function() {
    	this.$el.html( this.template({type: "context"}) );
		return this;
    },
    
    initTabs: function (options) {
    	
    	this.model = options.model;
    	
    	this.viewGui = new AccessCondView({
	      	model: this.model.get("context"),
	      	keywordsUsr: this.parentView.usrVocPropCollection,
	  		keywordsDev: this.parentView.devVocPropCollection,
	  		keywordsEnv: this.parentView.envVocPropCollection,
	    });
	    this.viewGui.parentView = this;
	    
	    this.$designTab.append(
	      	this.viewGui.render({
	      		cnt: 0,
	      		notDel: 1,
	      		ctx: true
	      	}).el      
	    );
	    this.viewGui.$dimView = $('#dim-view0');
	    this.viewGui.showDrivenFreeText();
	    
	    $("[data-toggle-dim='tooltip']").tooltip({placement: 'bottom'});
	    
	    this.viewTxt = new PolicyTextView({model: this.model});
		this.viewTxt.parentView = this;
		this.viewTxt.generatePolicyText();
    }
	
  });
  
  return ContextPanelView;
  
});
