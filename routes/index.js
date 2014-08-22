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
/*
 * GET home page.
 */
var sparqlClient = require('../lib/sparqlClient');


exports.index = function(req, res){

   var oneDayInMillisec = 24 * 60 * 60 * 1000;
   var backend, acCnt;
   
   //to distinguish sparql endpoint (sparlq or gsp) vs ldp
   if ((settings.RDFInterface == 'sparql') || (settings.RDFInterface == 'gsp'))  {
   	backend = 'sparql';
   	policyListParagraph = language.policyListSparql;
   } else {
   	backend = 'ldp';
   	policyListParagraph = language.policyListLdp;
   }
   res.cookie('backend', backend, {maxAge: oneDayInMillisec})
   //in case of http scenario with ldp and internal sparql access condition is still expressed in sparql
   res.cookie('accessConditionType', settings.accessConditionType, {maxAge: oneDayInMillisec});
   res.cookie('dateFormat', settings.dateFormat, {maxAge: oneDayInMillisec});
   res.cookie('timeFormat', settings.timeFormat, {maxAge: oneDayInMillisec});
   res.cookie('defaultPrefix', settings.defaultPrefix, {maxAge: oneDayInMillisec});
   res.cookie('defaultBase', settings.defaultBase, {maxAge: oneDayInMillisec});
   //Now assumed in file: consider if put in triple store (eg a triples in policy graphs)
   //or if a more proper storage possible
   res.cookie('acCnt', storage.acCnt, {maxAge: oneDayInMillisec});
   
   res.render('index', { 
    usr: settings.user,
   	newPolicyTooltip: language.newPolicyTooltip,
   	openPolicyTooltip: language.openPolicyTooltip,
   	savePolicyTooltip: language.savePolicyTooltip,
   	testPoliciesTooltip: language.testPoliciesTooltip,
   	policyWorkspaceTooltip: language.policyWorkspaceTooltip,
   	//policyWorkspace: language.policyWorkspace,
   	//policyEditor: language.policyEditor
   	policyPanelMsg: language.policyPanelMsg,
   	policyListParagraph: policyListParagraph
   });
   
};
