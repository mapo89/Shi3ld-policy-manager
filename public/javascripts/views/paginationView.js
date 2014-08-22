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
 * pagination view
 */

define([
  'underscore',
  'backbone',
  //'collections/targets',
  'text!templates/pagination.html'
  ], function(_, Backbone,/* TargetCollection, */paginationTemplate){
  	PaginationView = Backbone.View.extend({
		
		//el: '#pagination',
		
	    events: {
	      'click a.servernext': 'nextResultPage',
	      'click a.serverprevious': 'previousResultPage',
	      //'click a.orderUpdate': 'updateSortBy',
	      'click a.serverlast': 'gotoLast',
	      'click a.page': 'gotoPage',
	      'click a.serverfirst': 'gotoFirst',
	      'click a.serverpage': 'gotoPage'
	      //'click .serverhowmany a': 'changeCount'
	
	    },
	
	    tagName: 'aside',
	
	    template: _.template(paginationTemplate),
	
	    initialize: function (options) {
		
		  this.collection = options.collection;
	      this.collection.on('reset', this.render, this);
	      this.collection.on('newPage', this.render, this);
	      this.collection.on('sync', function (){
	      	this.render('sync');
	      	Backbone.trigger('loadingEnd');
	      }, this);
	      
		  this.$el.appendTo(options.paginated);
		  //function to manage error
		  this.errorInPageLoading = options.errorInPageLoading
	
	    },
	
	    render: function (e) {
	      if (this.collection.info().totalRecords == 0) {
	      	return;
	      }
	      var html = this.template(this.collection.info());
	      console.log("targets.info: " + JSON.stringify(this.collection.info()));
	      this.$el.html(html);
	    },
	
	    /*updateSortBy: function (e) {
	      e.preventDefault();
	      var currentSort = $('#sortByField').val();
	      this.collection.updateOrder(currentSort);
	    },*/
	
	    nextResultPage: function (e) {
	      e.preventDefault();
	      Backbone.trigger('loading');
    	  //this.collection.trigger('loading');
	      this.collection.requestNextPage({
	      	error: this.errorInPageLoading
	      });
	    },
	
	    previousResultPage: function (e) {
	      e.preventDefault();
	      //this.collection.trigger('loading');
	      this.collection.requestPreviousPage({
	      	error: this.errorInPageLoading
	      });
	    },
	
	    gotoFirst: function (e) {
	      e.preventDefault();
	      Backbone.trigger('loading');
	      //this.collection.trigger('loading');
	      this.collection.goTo(this.collection.information.firstPage, {
	      	error: this.errorInPageLoading
	      });
	    },
	
	    gotoLast: function (e) {
	      e.preventDefault();
	      Backbone.trigger('loading');
	      //this.collection.trigger('loading');
	      this.collection.goTo(this.collection.information.lastPage, {
	      	error: this.errorInPageLoading
	      });
	    },
	
	    gotoPage: function (e) {
	      e.preventDefault();
	      Backbone.trigger('loading');
	      //this.collection.trigger('loading');
	      var page = $(e.target).text();
	      this.collection.goTo(page, {
	      	error: this.errorInPageLoading
	      });
	    }
	
	    /*changeCount: function (e) {
	      e.preventDefault();
	      var per = $(e.target).text();
	      this.collection.howManyPer(per);
	    }*/
	
	  });
  
  return PaginationView;
 });
