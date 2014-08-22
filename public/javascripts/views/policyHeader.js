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
 * view for a single policy header
 */
define([
  'underscore',
  'backbone',
  'text!templates/policyHeader.html'
  ], function(_, Backbone, policyHeaderTemplate){
  
	 var PolicyHeaderView = Backbone.View.extend({
	 	  events: {
	 	  	'click .icoblue-waste': 'deletePolicy',
	 	  	'click .icoblue-checked': 'testPolicy' 
	 	  },
	 	  //el: '#targetPage',
	 	  tagName : 'tr',
	 	  
	 	  template: _.template(policyHeaderTemplate),
	 	  
	 	  initialize: function(options) {
		    this.model = options.model;
		    this.listenTo(this.model, 'remove', this.remove);
		    this.listenTo(this.model, 'change', this.render)
		    this.listenTo(this.model, 'destroy', this.remove);
		    this.listenTo(this.model, 'selectPolicy', this.selectPolicy);
		  },
	 	  
	      render: function (options) {
	      	if(options.policyHeaderCnt !== undefined) {
	      		this.policyHeaderCnt = options.policyHeaderCnt;
	      	}
	      	if(options.policyHeaderOffset !== undefined) {
	      		this.policyHeaderOffset = options.policyHeaderOffset;
	      	}
	      	if(options.backend) {
	      		this.backend = options.backend;
	      	}
      	 	this.$el.html(this.template({
            	policyHeader: this.model,
            	policyHeaderCnt: this.policyHeaderCnt,
            	policyHeaderOffset: this.policyHeaderOffset,
            	backend: this.backend,
            	type: options.type
            }));
     		
     		this.$el.attr("id", this.model.get("uri"));
     		this.$el.addClass("highlight");
     		
	        return this;
	      },
	      
	      deletePolicy: function () {
	      	this.model.collection.trigger('saveAlert', {
				//cancelWizard: true,
				model: this.model,
				type: 'confirmPolicyDeletion',
			});
	      	//avoid propagation of click event on table row 
	      	//(avoid to open the policy if deletion button was pressed)
	      	return false;
	      },
	      
	      testPolicy: function (e) {
	      	var policiesToTest = new Array(this.model.get("uri"));
	      	
	      	this.model.collection.trigger('policyTest', {policiesToTest: policiesToTest});
	      	return false;
	      },
	      
	      selectPolicy: function () {
	      	this.$el.find($('input')).attr('checked', true);
	      }
	      	      
	  });
	  
	  return PolicyHeaderView;
 });
