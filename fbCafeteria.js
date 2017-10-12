"use strict";
const request = require("request");
const cheerio = require("cheerio");
const { parse } = require("cookie");
const { CronJob } = require("cron");
const fbAccount = require("./fbAccount");
const Cafeteria = require("hansei-cafeteria");
const fs = require("fs");

new class fbCafeteria extends fbAccount {
	constructor() {
		super();
		new CronJob("00 00 06 * * 1-5", () => this.getPage(), null, true, "Asia/Seoul"); // mon-fri 06:00 cron start!
	}
	fbLogin() {
		return new Promise((resolve, reject) => {
			request.post({
				url: 'https://m.facebook.com/login/async/?refsrc=https%3A%2F%2Fm.facebook.com%2F&lwv=100',
				headers: {
					'User-Agent': this.user_agent
				},
				form: {"lsd":"AVrFWJdY", "charset_test":"%E2%82%AC%2C%C2%B4%2C%E2%82%AC%2C%C2%B4%2C%E6%B0%B4%2C%D0%94%2C%D0%84", "version":"1", "ajax":"0", "width":"0", "pxr":"0", "gps":"0", "dimensions":"0", "m_ts":"1473180063", "li":"n_HOV9XhZhfb3-7FJk6sm0ZG", "email": this.userID, "pass": this.userPW}
			}, (err, res, body) => {
				resolve(res.headers);
			});
		});
	}
	getPage() {
		this.fbLogin()
			.then((headers) => {
				this.cookie = headers['set-cookie'];
				request.get({
					url: this.pageURL,
					headers: {
						'Cookie': this.cookie,
						'User-Agent': this.user_agent
					}
				}, (err, res, body) => {
					// Cafeteria arguments your school code!
					new Cafeteria("B100000662").parseCafeteria()
						.then((cafeteria) => {
							this.pagePost(body, "[한세사이버보안고등학교 급식정보]\n\n" + cafeteria + "\n\nPosted by antiweb<antiweb@noe.systems>")
							.then(() => {
								console.log("Facebook Page Post Success!");
							})
							.catch((err) => console.error(err));
						});
				});
			});
	}
	pagePost(body, content) {
		return new Promise(async(resolve, reject) => {
			let $ = cheerio.load(body);
			let fb_dtsg = $("input[name='fb_dtsg']").val();
			let pageID = body.match(/"pageID":([0-9]){15,}/g)[0].substr(9);
			let c_user = parse(this.cookie[5])['c_user'];
			
			request.post({
				url: 'https://m.facebook.com/a/home.php?av=' + pageID,
				headers: {
					'Cookie': this.cookie,
					'User-Agent': this.user_agent
				},
				form: {"charset_test":"€,´,€,´,水,Д,Є", "rating":"0", "status": content, "r2a":"true", "page_publisher":"true", "target": pageID, "xhpc_timeline":"true", "finch":"1", "album_fbid":"0", "waterfall_id":"bc8226628a3bbb2ef618b12e0f9bfc15", "source_loc":"composer_pages_feed", "is_slideshow":"0", "format":"photo", "privacyx":"300645083384735", "csid":"60308c9a-d026-4be8-a20b-75388a3979f6", "waterfall_source":"composer_pages_feed", "fb_dtsg":fb_dtsg, "__dyn":"1KQdAm1uzUjxC2uAeGh28qUqgN28qAxq5EaU98nwCxx0QwFzohxO3O2G2a1mwYxm48swywjUlCy85GUsx23y4olwYwFCG7okBzo", "__req":"6c", "__ajax__": "AYlN49xq1eKhLdCmKtCDwa6xtdW9_i4eVp_m5Oi_2VDEd_Z-6D2HQA7WUCodWyvMrOeXaud8zpwcqNRFOCrg4_7h2EhkK95hRtYpiC-3NkMMgQ", "__user": c_user}
			}, (err, res, body) => {
				if(err) reject(err);
				else resolve(body);
			});
		});
	}
}
