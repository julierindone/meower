import { tweetsData } from "./data.js";

const tweetInput = document.getElementById("tweet-input")
const tweetBtn = document.getElementById("tweet-btn")

document.addEventListener('click', function (e) {
	if (e.target === tweetBtn) {
		console.log(`tweetbtn clicked`);
		console.log(tweetInput.value);
		tweetInput.value = ''

	}
	else if (e.target.dataset.reply) {
		handleReplyClick(e.target.dataset.reply)
	}
	else if (e.target.dataset.like) {
		handleLikeClick(e.target.dataset.like)
	}
	else if (e.target.dataset.retweet) {
		handleRetweetClick(e.target.dataset.like)
	}
})

function handleReplyClick(tweetId) {
	console.log(`reply handled here. ${tweetId}`);
}
function handleLikeClick(tweetId) {
	const targetTweetObj =
		tweetsData.filter((tweet) => {
			return tweet.uuid === tweetId
		})[0]

	targetTweetObj.likes++
	render()	
}
function handleRetweetClick(tweetId) {
	console.log(`Retweet handled here`);
}





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