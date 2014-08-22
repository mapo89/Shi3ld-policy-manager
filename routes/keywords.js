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
 * keyword route
 */
exports.list = function(req, res){
  eval(fs.readFileSync('resources/keywords.js', encoding="ascii"));
  
  console.log("url of the req: " + req.originalUrl);
  
  if (req.originalUrl == '/vocabularies/user-dim') {
  	res.send(keywords.user);
  	return;
  }
  if (req.originalUrl == '/vocabularies/env-dim') {
  	res.send(keywords.env);
  	return;
  }
  res.send(keywords.dev);
};
