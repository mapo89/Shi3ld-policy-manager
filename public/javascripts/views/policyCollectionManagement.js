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
 * Abstract view to be extended
 * Contains general function to manage policy collection
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'views/policyHeaders',
  'text!templates/policyCollectionManagement.html',
  'bootstrap'
  ], function(
  	$,
  	_, 
  	Backbone, 
  	PolicyHeadersView,
  	policyCollectionManagementTemplate 
  ) {
  	
  var PolicyCollectionManagementView = Backbone.View.extend({
  	
  	template: _.template(policyCollectionManagementTemplate),
  	
  	render: function () {
		this.$el.html(this.template({type: this.type}));
		return this;
	},
	
	initPolicyCollection: function (options) {
	
		this.policyCollection = options.collection;
		this.listenTo(this.policyCollection, 'error',this.notifyError);
		this.policyListView = new PolicyHeadersView({
			backend: this.backend,
			MSG_TIMEOUT: this.MSG_TIMEOUT,
			type: this.type
		});
		
		this.$policyList = $('#policyList');		
		this.$policyList.html(this.policyListView.render().el);
		this.policyListView.initPagination({policyHeaders: this.policyCollection})
		
		if (this.type == 'workspace') {
			this.$policyPanel = $('#policyPanel');
			this.listenTo(this.policyCollection, 'showWizard', this.showWizard);
			this.listenTo(this.policyCollection, 'openPolicy', this.openPolicy);
			this.listenTo(this.policyCollection, 'closePolicy', this.closePolicy);
			this.listenTo(this.policyCollection, 'remove', this.deletePolicy);
			
			this.listenTo(this.policyCollection, 'sync', function () { 
				this.$spinner.modal('hide');
			});
			
			this.listenTo(this.policyCollection, 'saveAlert', this.showAlert);
		} else {
			this.listenToOnce(this.policyCollection, 'sync', function () {
				if (this.policiesToTest.length > 0) {
					this.policyCollection.findWhere({uri: this.policiesToTest[0]}).trigger('selectPolicy');
				}
			});
		}
	},
  
  });
  
  return PolicyCollectionManagementView;
  
});
