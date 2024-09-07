import { tweetsData } from "./data.js";

const tweetInput = document.getElementById("tweet-input")
const tweetBtn = document.getElementById("tweet-btn")

document.addEventListener('click', function (e) {
	if (e.target === tweetBtn) {
		tweetInput.value = ''
	}
	else if (e.target.dataset.reply) {
		handleReplyClick(e.target.dataset.reply)
	}
	else if (e.target.dataset.like) {
		handleLikeClick(e.target.dataset.like)
	}
	else if (e.target.dataset.retweet) {
		handleRetweetClick(e.target.dataset.retweet)
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

	// if the tweet wasn't already liked, increment the value.
	if (!targetTweetObj.isLiked) {
		targetTweetObj.likes++
	}
	// if the tweet wasn't already liked, decrement the value.
	else {
		targetTweetObj.likes--
	}

	// toggle the value of isliked.
	targetTweetObj.isLiked = !targetTweetObj.isLiked

	render()
}

function handleRetweetClick(tweetId) {
	const targetTweetObj =
		tweetsData.filter((tweet) => {
			return tweet.uuid === tweetId
		})[0]

	if (!targetTweetObj.isRetweeted) {
		targetTweetObj.retweets++
	}
	else {
		targetTweetObj.retweets--
	}
	targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted

	render()
}


function getFeedHtml() {
	let feedHtml = ``
	let likedIconClass = ''
	let retweetedIconClass = ''

	tweetsData.forEach(tweet => {

		if (tweet.isLiked) {
			likedIconClass = 'liked'
		}
		else {
			likedIconClass = ''
		}

		if (tweet.isRetweeted) {
			retweetedIconClass = 'retweeted'
		}
		else {
			retweetIconClass = ''
		}
		let repliesHtml = ``

		if (tweet.replies.length > 0) {
			console.log(tweet.uuid);

			tweet.replies.forEach(reply => {
				repliesHtml += `
					<div class="tweet-reply">
						<div class="tweet-inner">
							<img class="profile-pic" alt="Profile Pic" src="${reply.profilePic}">
								<div>
									<p class="handle">${reply.handle}</p>
									<p class="tweet-text">${reply.tweetText}</p>
								</div>
						</div>
					</div>`
			})
		}

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
								<i class="fa-solid fa-heart ${likedIconClass}" data-like="${tweet.uuid}"></i>
								${tweet.likes}
							</span>
							<span class="tweet-detail">
								<i class="fa-solid fa-retweet ${retweetedIconClass}" data-retweet="${tweet.uuid}"></i>
								${tweet.retweets}
							</span>
						</div>
					</div>
				</div>
				<div id="replies-${tweet.uuid}">${repliesHtml}</div>
			</div>`

	});
	return feedHtml
}

function render() {
	document.getElementById('feed').innerHTML = getFeedHtml();
}

render()