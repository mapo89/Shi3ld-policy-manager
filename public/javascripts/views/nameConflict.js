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
 * view to manage user modal dialog when name conflict is detected in saving a policy
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/nameConflict.html'
  ], function($, _, Backbone, policyNameConflictTemplate){

  var nameConflictView = Backbone.View.extend({
 
    events: {
      'click #nameConflictAlertYes, #nameConflictAlertNo, #saveAlertCancel': 'dismissAlert',
      'click #saveAlertYes, #saveAlertNo': 'closePolicy',
      'click .close': 'dismissAlert',
      'click #saveAlertCancel': 'selectOldPolicy' 
    },
    
    template: _.template(policyNameConflictTemplate),
    
    initialize: function(options) {
    	this.$modal = $('#nameConflictModal');
    	this.nextEvent = options.nextEvent;
    	this.model = options.model;
    	this.toOpen = options.toOpen;
    	this.type = options.type;	
    	this.closeOnSuccess = options.closeOnSuccess;
    	this.hide = options.hide;
    	this.policiesToTest= options.policiesToTest;
	},
    
    render: function(options) {
        console.log("nameConflictView.render")
		
      	this.$el.html(this.template({type: options.type}));
     	return this;
    },
    
    dismissAlert: function (e) {
    	    	
    	this.$modal.modal('hide');
    	
    	if ((this.type != "nameConflictTarget") && (this.type != 'confirmCancel')) {
    		//problem on modal backdrop not removed
    		//only when saveAlert then overwrite alert
    		// backdrop removed explicitly: but avoid if targets (because
    		//you'ld loose all the backdrop also if other modals still opened)
    		$('.modal-backdrop').remove();
    	}
    	
    	if( e.target.id == "nameConflictAlertYes") {
    		if (this.type == "nameConflictTarget") {
    			this.model.trigger('overWriteTarget');
    		}else if (this.type == 'confirmCancel') {
    			this.model.trigger('closeWizard');
    		} else if (this.type == 'confirmPolicyDeletion') {
    			//trigger remove explicitily to pass parameter in order to avoid
	      		//to delete also when page change (paginator raise remove event)
    			this.model.destroy({deletePolicy: true});
    		} else {
    			console.log("overwriting policy...");
    			//this.parentView.overwritePolicy();
    			this.model.trigger('overWritePolicy', {nextEvent: this.nextEvent});
    		}
    	}
    	
    	if (this.type != "nameConflictTarget") {
			this.model.trigger('rename');
		}
		
		this.remove();
    	
    },
    
    closePolicy: function (e) {
    	var save = false;
    	this.$modal.modal('hide');	
    	$('.modal-backdrop').remove();
    	
    	if (e.target.id == "saveAlertYes") {
    		console.log("saving policy...");
    		this.model.trigger('savePolicy', {
    			nextEvent: this.nextEvent,
    			toOpen: this.toOpen,
    			closeOnSuccess: this.closeOnSuccess,
    			hide: this.hide,
    			policiesToTest: policiesToTest
    		});
    	} else {
    		//close the policy without saving and raise next event 
    		//(newPolicy ie open wizard or openPolicy ie open a policy from the list)
    		if (e.target.id == "saveAlertNo") {
    			this.model.trigger('closePolicy', {
	    	    	policyClosed: true,
	    	    	hide: this.hide,
	    	    	policiesToTest: this.policiesToTest  	    
	    	    });	
    		}
    		this.model.trigger(this.nextEvent, {
    	    	policyClosed: true,
    	    	toOpen: this.toOpen,
    	    	hide: this.hide,
    	    	policiesToTest: this.policiesToTest    	    
    	    });
    	}
    	
    	this.remove(); 	
    },
    
    selectOldPolicy: function () {
    	this.model.trigger('selectOldPolicy');
    }
    
     
	
  });
  
  return nameConflictView;
  
});
