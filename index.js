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
	const options = {}
	const reqData = {}
	const headers = {
		'Authorization': 'ApiKey ' + APIKey
	}
	options['headers'] = headers;
	let res;
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
		if (committer_email.length != 0)
			reqData['committer_email'] = committer_email
		if (async.length != 0)
			reqData['async'] = async
		if (save_results_to_account.length != 0)
			reqData['save_results_to_account'] = save_results_to_account
		if (policy_name.length != 0)
			reqData['policy_name'] = policy_name
		if (scan_id.length != 0)
			reqData['scan_id'] = scan_id
		console.log(reqData);
		options['params'] = reqData
		axios.put(baseUrl + 'api/v1/iac/scan', null, options)
			.then(function (response) {
				res = response
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	else if (operation.toLowerCase() == 'status') {
		if (scan_id.length != 0)
			reqData['scan_id'] = scan_id
		console.log(reqData);
		options['params'] = reqData
		axios.get(baseUrl + 'api/v1/iac/status', null, options)
			.then(function (response) {
				res = response
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	else if (operation.toLowerCase() == 'report') {
		if (scan_id.length != 0)
			reqData['scan_id'] = scan_id
		console.log(reqData);
		options['params'] = reqData
		axios.get(baseUrl + 'api/v1/iac/detailedReport', null, options)
			.then(function (response) {
				res = response
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	}


	core.setOutput("response_status", res.status);
	core.setOutput("response_data", res.data)
} catch (error) {
	core.setFailed(error.message);
}