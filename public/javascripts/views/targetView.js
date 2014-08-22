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
 * view on a page of target paginated collection
 */
define([
  'underscore',
  'backbone',
  //'collections/targets',
  'text!templates/target.html'
  ], function(_, Backbone, targetTemplate){
  
	 var TargetView = Backbone.View.extend({
	 	  
	 	  tagName : 'tr',
	 	  events: {
	 	  	'click .target-del': 'removeTarget',
	 	  },
	 	  
	 	  template: _.template(targetTemplate),
	 	  
	 	  initialize: function(options) {
		    this.model = options.model;
		    this.listenTo(this.model, 'remove', this.remove);
		    this.listenTo(this.model, 'change', this.render);
		  },
	 	  
	      render: function (options) {
	      	//if render called with change to access
	      	//actual options you need the second parameter
	      	if(arguments.length == 2) {
	      		options = arguments[1];
	      	}
      	 	this.$el.html(this.template({
            	target: this.model,
            	targetCnt: options.targetCnt,
            	targetOffset: options.targetOffset,
            	wizard: options.wizard,
            	test: options.test
            }));
     		
     		this.$el.attr("id", this.model.get("uri"));
     		this.$el.addClass("highlight");
     		
	        return this;
	      },
	      
	      removeTarget: function () {
	      	this.model.destroy();
	      }
	      	      
	  });
	  
	  return TargetView;
 });
 
