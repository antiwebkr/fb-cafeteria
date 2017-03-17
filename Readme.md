# Facebook Cafeteria
Facebook Page today's meal auto posting

##Installation
```sh
$ sudo npm install -g
```

## Excute
```sh
$ npm run fb
```

## File Detail
| Filename | Description |
| ------ | ------ |
| package.json | Repository Detail |
| fbAccount.js | Facebook Account Setting File |
| fbCafeteria.js | Facebook Auto Post File (mon-fri am 6) |

### Setup

`fbAccount.js` Facebook Account Setting

```sh
this.userID = "userID"; // Your facebook account id
this.userPW = "userPW"; // Your facebook account pw
this.pageURL = "facebookURL"; // Your facebook page url
this.user_agent = "userAgent"; // user-agent setting
```

`fbCafeteria.js` Cron Setting

```sh
new CronJob("00 00 06 * * 1-5", () => this.getPage(), null, true, "Asia/Seoul"); // mon-fri 06:00 cron start
```

### License
MIT
