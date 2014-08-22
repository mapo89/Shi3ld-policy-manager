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
 * Text view of a contex or a policy
 */
define([
  'jquery',
  'underscore',
  'backbone'
  ], function($, _, Backbone){
	
	var PolicyTextView = Backbone.View.extend({
		el: '#tab2',

	    initialize: function(options) {
	     	this.model = options.model;
	     	this.listenTo(Backbone, 'textChanged', this.signalModelChange);
	    	this.preventTextChangeEv = true;
	    },
	
	    render: function() {
		 $(window).resize();
		 $(".flint-editor-tab-selected").trigger("click");
	    },
	    
	    generatePolicyText: function(options) {
	    	console.log("policyText.generatePolicyText");
	    	//this.initialText = this.model.getText();
	    	this.parentView.flintEd.getEditor().getCodeEditor().setValue(this.model.getText());
	    	if ((options) && (options.preventTextChangeEv == true)) {
	    		this.preventTextChangeEv = true;
	    	}
	    },
	    
	    signalModelChange: function(){
	    	console.log("model.getText");
	    	console.log(this.model.getText());
	    	console.log("editor.getValue");
	    	console.log(this.parentView.flintEd.getEditor().getCodeEditor().getValue());
	    	if((this.$el.hasClass('active')) 
	    		&& (this.preventTextChangeEv == false)) {
	    		
	    		//textChange event on editor not due to loading text from model
	    		this.model.set({modified: true});
	    		
	    	}
	    	this.preventTextChangeEv = false;	
	    },
	    
	    close: function () {
	    	this.remove();
	    }
		
  });

  return PolicyTextView;

});
