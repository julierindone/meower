import { tweetsData } from "./data.js";

const tweetInput = document.getElementById("tweet-input")
const tweetBtn = document.getElementById("tweet-btn")
const feed = document.getElementById("feed")

tweetBtn.addEventListener('click', function () {
	console.log(tweetInput.value);
	tweetInput.value = ''
})

function getFeedHtml(tweetsData) {
	let tweetHtml = ``

	tweetsData.forEach(tweet => {
		tweetHtml += `
			<div class="tweet">
				<div class="tweet-inner">
					<img class="profile-pic" alt="Profile Pic" src="${tweet.profilePic}">
					<div>
						<p class="handle">${tweet.handle}</p>
						<p class="tweet-text">${tweet.tweetText}</p>
						<div class="tweet-details">
						<p class="tweet-detail">${tweet.replies.length}</p>
							<p class="tweet-detail">${tweet.likes}</p>
							<p class="tweet-detail">${tweet.retweets}</p>
						</div>
				</div>
			</div>`

			console.log(tweet.handle + " has " + tweet.replies.length + " replies.");
			feed.innerHTML = tweetHtml;
	});



}

function render(tweetsData) {
	getFeedHtml(tweetsData)
}
render(tweetsData)