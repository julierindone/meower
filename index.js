import { tweetsData } from "./data.js";

const tweetInput = document.getElementById("tweet-input")
const tweetBtn = document.getElementById("tweet-btn")
const feed = document.getElementById("feed")

tweetBtn.addEventListener('click', function () {
	console.log(tweetInput.value);
	tweetInput.value = ''
})

function getFeedHtml(tweetsData) {
	let feedHtml = ``
	tweetsData.forEach(tweet => {
		feedHtml += `
			<div class="tweet">
				<div class="tweet-inner">
					<img class="profile-pic" alt="Profile Pic" src="${tweet.profilePic}">
				<div class="tweet-content">
						<p class="handle">${tweet.handle}</p>
						<p class="tweet-text">${tweet.tweetText}</p>
						<div class="tweet-details">
							<span class="tweet-detail">
								<i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
								${tweet.replies.length}
							</span>
							<span class="tweet-detail">
								<i class="fa-regular fa-heart" data-like="${tweet.uuid}"></i>
								${tweet.likes}
							</span>
							<span class="tweet-detail">
								<i class="fa-solid fa-retweet" data-retweet="${tweet.uuid}"></i>
								${tweet.retweets}
							</span>
						</div>
						</div>
				</div>
			</div>`

	});
	return feedHtml
}

function render() {
	document.getElementById('feed').innerHTML = getFeedHtml(tweetsData);
}

render()