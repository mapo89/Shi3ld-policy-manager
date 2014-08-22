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
 * policy header model
 * summirize some info about a policy
 * to present in initial collection
 * in order to lazy download the actual policy content
 * only if needed (same idea of mail header in a mailbox)
 *
 * of course contain the policy uri (used to GET the policy
 * from server) other info (eg target) ok in sparql endpoint but in ldp
 * depends on web api.
 */
 
 define(['underscore', 'backbone'], function(_, Backbone) {
	var PolicyHeader = Backbone.Model.extend({
	      //urlRoot: '/policies'//diff uri than policy model but same root may cause problems?
	      url: function() {
	      	return '/policies/?policy=' + encodeURIComponent(this.attributes.uri);
	      }
	});
	    
	return PolicyHeader;

});
