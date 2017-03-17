"use strict";
import { CronJob } from 'cron';

export class fbAccount {
	constructor() {
		this.author = "antiweb <admin@hepstar.kr>";
		this.userID = "userID"; // Your facebook account id
		this.userPW = "userPW"; // Your facebook account pw
		this.pageURL = "https://m.facebook.com/%ED%95%9C%EC%84%B8%EC%82%AC%EC%9D%B4%EB%B2%84%EB%B3%B4%EC%95%88%EA%B3%A0%EB%93%B1%ED%95%99%EA%B5%90-%EA%B8%89%EC%8B%9D%EC%B6%A9-550582661814416/"; // Your facebook page url
		this.user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"; // User-agent setting
	}
}