---
layout: default
title: Download
permalink: /download/
---

<!---
I apologize for abusing Jekyll in this way. This makes the release data here dynamic so I don't have to change it again.
-->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script
			  src="https://code.jquery.com/jquery-3.5.1.min.js"
			  integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
			  crossorigin="anonymous"></script>
<script>
	axios.get('https://api.github.com/repos/nrcrast/DbdPerkTool/releases/latest').then((resp) => {
		console.log(resp.data.name);
		$('#dbd-download-instructions')[0].innerHTML = `Download the latest release (v${resp.data.name}) <a href="https://files.dbdicontoolbox.com/file/dbd-icon-toolbox/Dead-By-Daylight-Icon-Toolbox-Latest.msi">here</a>. If you have trouble with the .msi, you can try using the alternative .exe installer <a href="https://files.dbdicontoolbox.com/file/dbd-icon-toolbox/Dead-By-Daylight-Icon-Toolbox-Latest.exe">here</a>.`;
		const changes = resp.data.body.split(/\r?\n/).map((change) => {
			let trimmedChange = change.trim();
			if(trimmedChange.startsWith('*')) {
				return trimmedChange.slice(1).trim();
			} else {
				return trimmedChange;
			}
		});

		let changeListHtml = '<ul>';

		changeListHtml += changes.map((change) => {
			return `<li>${change}</li>`;
		}).join('');

		changeListHtml += '</ul>';
		$('#dbd-download-changelog')[0].innerHTML = changeListHtml;
		console.log($('#dbd-download-changelog')[0].innerHTML);
	});
</script>

## Instructions

<p id="dbd-download-instructions">
Loading...
</p>

## Changelog

<div id="dbd-download-changelog">
Loading...
</div>

## Why is Windows complaining?

The license to sign a Windows desktop application costs \$400 a year. If the community is willing to front the money, I'll pay for it. Otherwise I've made the repo open source so you can be sure I'm not up to any funny business.

![Bypassing SmartScreen](../images/windows-smartscreen.png)
