---
date: 2019-09-25 00:00
title: Dark Side of the App Store
tags: appstore, apple, ios
description: I am an Apple fanboy and I admit that. But one of the most frustrating things in being an app developer is dealing with the App Store review and compliance teams. This time I would like to share my experience with these problems.
---

I am an Apple fanboy and I admit that. But one of the most frustrating things in being an app developer is dealing with the App Store review and compliance teams. This time I would like to share my experience with these problems.

Even Apple’s former app approval chief has [said](https://www.theverge.com/2019/5/29/18643868/apple-app-store-approval-process-antitrust-phillip-shoemaker-interview) that he is ‘really worried’ about company’s anticompetitive behavior.


## App Store review rejections

Quite recently I jumped on a project which promotes vegan food places in Latvia. All these food spots are validated by the project manager and have to have at least three proper vegan meal options. I thought it would be a great idea to make an app for that, because on the go it is always easier to use it from your phone. [App](https://apps.apple.com/lv/app/augi-draugi/id1475145259) adds extra features like navigation, searchable list and more features that are not available on the [website](https://augidraugi.lv/).

So far this app has been released with 5 version updates each time adding extra features to it. People love and use it a lot. Even data shows that app retention, ratings and feedback from social media is very good.

![Reject app](/assets/img/dark-side-appstore/rejected-app-appstoreconnect.png)

But sadly Apple App Store review team thinks differently. They have rejected last update due to *minimum functionality*. I had a call with Apple representative and they even explained that approving this app has been a mistake by them.

> **[Guideline 4.2 - Design - Minimum Functionality](https://developer.apple.com/app-store/review/guidelines/#4.2)**
> We found that the usefulness of your app is limited by the minimal amount of content or features it includes.

App is free and it does not include any adds. It uses only iOS standard UI elements. App Store has plenty of scams and very bad apps so treating an app which complies to all user interface guidelines, supports new iOS 13 and is widely used is not understandable to me. Not to mention that this project tries to solve environmental and animal rights issues which is a big topic right now.

## App Store Scams

![Copycat](/assets/img/dark-side-appstore/copycat-search.png)

For quite a while I have been working on a [project](https://apps.apple.com/lv/app/dodies-lv/id1080800199) which lists hiking paths in the Baltic states. Most of them have been reviewed by the project team and have great pictures. App has been opensourced in [Github](https://github.com/fassko/Dodies.lv) and everyone can participate to it. Recently I found that someone has copied this whole app and released it in App Store with the same name. I understand it is public in Github, but how could App Store team let it go trough the review process?

![Copycat](/assets/img/dark-side-appstore/copycat.png)

I filed a complaint on August 12 - it has been more than a month now. There was an email conversation, but Apple can’t reach out to this copycat or take that app down. It is such an obvious copycat that even my screenshots have been copied.

## App Store Payments and Revenue Cut

In my own company [Qminder](https://www.qminder.com/) I have had numerous issues with App Store review team about app revenue sharing. In short, our clients pay subscription fee for accessing the system. They can opt in to use iOS apps, but it is not mandatory at all.

App Store guidelines state that if you process any payments trough App Store you need to use Apple’s provided payment system and you get only 70%. Rest 30% goes to Apple supporting publishing apps, processing payment cards and more. That is completely understandable, but what if customers don’t use apps from App Store right now and opt in future? Or use the app now and stop using after a while?

I have been talking with App Store review team a few times: the solution is to not have any marks of registration or links in your apps. Otherwise you lose 30% of your revenue since you have the same pricing on the App Store and outside of it. There have been [news](https://www.theverge.com/2018/12/28/18159373/netflix-in-app-subscriptions-iphone-ipad-ios-apple) that because of this issue Netflix has stopped to process new sign ups via App Store. Amazon only has a sign-in form in their apps without any information how to sign up and are now introducing [credits system](https://twitter.com/stevemoser/status/1174408011965747201). The list goes on and on.

Apple is trying to [defend themselves](https://www.theverge.com/2019/5/29/18644045/apple-defends-app-store-policies-antitrust-eu-spotify) by creating a new page about [App Store principles and practices](https://www.apple.com/ios/app-store/principles-practices/). Some people like how they speak openly, but others pointed that they have failed to address any of real issues what developers are facing.

## TL;DR;

App Store review process is one of the most painful parts of iOS development. It is done by real humans and that means it can be inconsistent and error prone.

Another part where App Store team at Apple isn’t supportive to the developers is revenue sharing. 30% of all payments processed trough App Store go to Apple supporting the app publishing and processing payments. It is a huge percentage especially if your service can be used without apps.

On the good note app review process has been improved in recent years, but there is still a long way to go to make it smooth, consistent and fair for everyone.
