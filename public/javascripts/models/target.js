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
 * target model
 */
 define(['underscore', 'backbone'], function(_, Backbone) {
	var Target = Backbone.Model.extend({
	      url: function () { return '/targets/?target=' + encodeURIComponent(this.attributes.uri);},
	      
	      isNew: function () {
	        if (this.has("newModel")) {
	    		return this.get("newModel");
	    	}
	    	//if newModel not set considered new
	    	return true;
	      },
	});
	    
	return Target;

});
