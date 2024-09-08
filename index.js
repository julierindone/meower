import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

document.addEventListener('click', function (e) {
	if (e.target.id === 'tweet-btn') {
		handleTweetBtnClick()
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

function handleTweetBtnClick() {
	const tweetInput = document.getElementById("tweet-input")
	
	if (!(tweetInput.value.trim() === '')) {
		let newTweet = {
			// build a new tweet object.
			handle: `AudreyHorneCooper`,
			profilePic: `images/cooper.jpg`,
			likes: 0,
			retweets: 0,
			tweetText: tweetInput.value,
			replies: [],
			isLiked: false,
			isRetweeted: false,
			uuid: uuidv4()
		}
		tweetsData.unshift(newTweet)
		tweetInput.value = ''
		render()
	}
}

function handleLikeClick(tweetId) {
	// get the uuid of the tweet that matches the current tweetId
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

function handleReplyClick(replyId) {
	// Note to self: there's no need for filtering because in response to this click, the icon is just the target. The action here is actually on the replies div.

	// toggle the class list (which just has the hidden class) when clicked.
	document.getElementById(`replies-${replyId}`).classList.toggle("hidden")
}

function getFeedHtml() {
	let feedHtml = ``

	tweetsData.forEach(tweet => {
		let retweetIconClass = ''
		let likeIconClass = ''

		if (tweet.isLiked) {
			likeIconClass = 'liked'
		}
		else {
			likeIconClass = ''
		}

		if (tweet.isRetweeted) {
			retweetIconClass = 'retweeted'
		}
		else {
			retweetIconClass = ''
		}

		let repliesHtml = ``
		if (tweet.replies.length > 0) {
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
								<i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
								${tweet.likes}
							</span>
							<span class="tweet-detail">
								<i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
								${tweet.retweets}
							</span>
						</div>
					</div>
				</div>
				<div class="hidden" id="replies-${tweet.uuid}">${repliesHtml}</div>
			</div>`
	});
	return feedHtml
}

function render() {
	document.getElementById('feed').innerHTML = getFeedHtml();
}

render()