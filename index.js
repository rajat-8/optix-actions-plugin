const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

try {

	// Get all inputs from workflow main file
	const operation = core.getInput('operation');
	const APIKey = core.getInput('APIKey');
	const files = core.getInput('files');
	const repo_url = core.getInput('repo_url');
	const branch = core.getInput('branch');
	const committer_name = core.getInput('committer_name');
	const committer_email = core.getInput('committer_email');
	const async = core.getInput('async');
	const save_results_to_account = core.getInput('save_results_to_account');
	const policy_name = core.getInput('policy_name');
	const scan_id = core.getInput('scan_id');

	const baseUrl = 'https://optix.sophos.com/'
	const reqData = {
		'APIKey': APIKey
	}
	console.log(reqData);
	if (operation.toLowerCase() == 'scan') {
		console.log('Scan operation');
		if (files.length != 0)
			reqData['files'] = files
		if (repo_url.length != 0)
			reqData['repo_url'] = repo_url
		if (branch.length != 0)
			reqData['branch'] = branch
		if (committer_name.length != 0)
			reqData['committer_name'] = committer_name
		
		axios.put(baseUrl + 'api/v1/iac/scan', reqData)
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});	
	}
	

	const time = (new Date()).toTimeString();
	core.setOutput("response_status", time);
	// Get the JSON webhook payload for the event that triggered the workflow

	const payload = JSON.stringify(github.context.payload, undefined, 2)
	core.setOutput("response_data", payload)
} catch (error) {
	core.setFailed(error.message);
}