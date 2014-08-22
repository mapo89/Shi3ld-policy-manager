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
 * wizard model
 * cache wizard info in order to create a policy model (and view) only if
 * finish button pressed (ie if creation actually confirmed)
 * Model the choise done by user in wizard so that policy will be created according to it
 */
 
 define(['underscore', 'backbone'], function(_, Backbone) {
  var WizardModel = Backbone.Model.extend({
		
    // Remove this model from *localStorage* and delete its view.
    clear: function() {
      this.destroy();
      //this.view.remove();
    }

  });
  
  return WizardModel;

});
