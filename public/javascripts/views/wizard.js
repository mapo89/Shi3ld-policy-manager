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
 * Abstract view to collect method to be inherithed by all wizard views
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap'
  ], function($, _, Backbone){
	
	var WizardView = Backbone.View.extend({
		
		closeOnEsc: function (e) {
			//esc pressed
			if (e.keyCode == 27) {
				this.model.trigger('saveAlert', {
					cancelWizard: true,
					type: 'confirmCancel',
				});
			}
			//tab pressed
			/*if (e.keyCode == 9) {
				this.tabindex = (this.tabindex + 1) % 10;
				this.tabindex range [0-9], tabindex attr range [1-10]
				$('[tabindex=' + (this.tabindex + 1) + ']').trigger('focus');
				alert($('[tabindex=' + (this.tabindex + 1) + ']').attr('id'));
			}*/
		},
		
		cancelPolicy: function() {
		  this.$modal.modal('hide');
	      this.model.destroy();
	    },
	    
    	prevView: function(e){
    		var move;
    		if ((e.target.id == "timeModalPrev") || (e.target.id == "outdoorModalPrev")){
				this.updateWizardModel();
				move = true
			} else {
				move = this.updateWizardModel();
			}
			if (move) {
				this.$modal.modal('hide');
				this.parentView.showModal();
			}
		},
			
		showModal: function() {
			if (this.$modal) {
				this.$modal.modal();
				return;
			}
			//owerwrite modal make it lose proper DOM element on this.$modal so find with jquery
			//because hidden and showed later (ie moved on DOM because is the way bootstrap managed modals)
			$('#newPolicy').modal();
		},
						
	});

	return WizardView;

});
 
