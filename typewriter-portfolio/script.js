const delayBetweenLetters = 70;

function wait(milliseconds) {
	return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function pauseAfterTypingThisManyLetters(letterCount, shortestPauseMs = 0) {
	const howLongTheLineTookToType = letterCount * delayBetweenLetters;
	return Math.max(
		shortestPauseMs,
		Math.round(howLongTheLineTookToType * 0.38),
	);
}

async function typeOut(target, text) {
	for (let i = 0; i < text.length; i++) {
		target.appendChild(document.createTextNode(text[i]));
		await wait(delayBetweenLetters);
	}
}

async function addLinkAndTypeLabel(whereToPutIt, url, linkLabel) {
	const link = document.createElement('a');
	link.href = url;
	link.target = '_blank';
	link.rel = 'noopener noreferrer';
	whereToPutIt.appendChild(link);
	await typeOut(link, linkLabel);
}

function daysSinceBirth(birthDay, birthMonth, birthYear) {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const birthday = new Date(birthYear, birthMonth - 1, birthDay);
	birthday.setHours(0, 0, 0, 0);
	const msPerDay = 1000 * 60 * 60 * 24;
	return Math.floor((today - birthday) / msPerDay) + 1;
}

function displayDOB() {
	const birthDay = 1;
	const birthMonth = 12;
	const birthYear = 1999;
	const dayNumber = daysSinceBirth(birthDay, birthMonth, birthYear);
	document.getElementById('earthTime').textContent = `on Day #${dayNumber}`;
}

async function displayHeading() {
	await typeOut(document.getElementById('writeName'), 'YOUR NAME');
}

let theVisitorAlreadyClickedMore = false;

async function whenTheyClickMoreRevealTheRest() {
	if (theVisitorAlreadyClickedMore) {
		return;
	}
	theVisitorAlreadyClickedMore = true;

	const neverPauseLessThanThisBetweenProjects = Math.round(delayBetweenLetters * 0.55);

	const sentencesAndLinksToType = [
		{ type: 'text', value: ' Currently, I am studying Computer Science at ' },
		{
			type: 'link',
			href: 'https://github.com/MurrayBuchanan',
			label: 'University of GitHub',
		},
		{ type: 'text', value: ' and for work, I contribute to ' },
		{ type: 'link', href: 'https://www.example.com', label: 'Example Org' },
		{ type: 'text', value: '.' },
	];

	const headingAboveProjectList = 'Recent Projects';
	const nameOfEachProject = ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5'];

	document.querySelector('.readMore').style.display = 'none';

	const keepTypingInThisPartOfTheParagraph = document.getElementById('typedInline');
	keepTypingInThisPartOfTheParagraph.style.display = 'inline';

	for (const chunk of sentencesAndLinksToType) {
		if (chunk.type === 'text') {
			await typeOut(keepTypingInThisPartOfTheParagraph, chunk.value);
		} else if (chunk.type === 'link') {
			await addLinkAndTypeLabel(
				keepTypingInThisPartOfTheParagraph,
				chunk.href,
				chunk.label,
			);
		}
	}

	const projectsBox = document.getElementById('projectsBlock');
	const projectsHeadingElement = document.getElementById('projectsTitle');
	const projectsListElement = document.getElementById('projectsList');

	projectsBox.style.display = 'block';
	await typeOut(projectsHeadingElement, headingAboveProjectList);
	await wait(
		pauseAfterTypingThisManyLetters(headingAboveProjectList.length),
	);

	for (const oneProjectName of nameOfEachProject) {
		const listItem = document.createElement('li');
		projectsListElement.appendChild(listItem);
		await typeOut(listItem, oneProjectName);
		await wait(
			pauseAfterTypingThisManyLetters(
				oneProjectName.length,
				neverPauseLessThanThisBetweenProjects,
			),
		);
	}
}

displayDOB();
displayHeading();

document.querySelector('.readMore').addEventListener('click', (event) => {
	event.preventDefault();
	whenTheyClickMoreRevealTheRest();
});