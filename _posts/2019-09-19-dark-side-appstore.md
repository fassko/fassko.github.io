---
layout: post
title: ! "Dark Side of the AppStore"
categories: [swift, websockets, xcode11, ios13]
tags: [swift, apple, websockets, ios, xcode]
---

I am an Apple fanboy and I can admit that. But one of the most frustrating things being app developer is dealing with the App Store review and compliance teams. This time I would like to share my experience with these problems.

Even Apple’s former app approval chief has [said](https://www.theverge.com/2019/5/29/18643868/apple-app-store-approval-process-antitrust-phillip-shoemaker-interview) that he is ‘really worried’ about company’s anticompetitive behavior.

<!--more-->

## App Store review rejections

Quite recently I jumped on a project which promotes vegan diet food places in Riga, Latvia. All these spots are validated by project managers and have to have at least three proper vegan options. I thought it would be a great idea to make an app for that, because on the go it is always easier to to use it from your phone. [App](https://apps.apple.com/ee/app/augi-draugi/id1475145259) adds extra features like navigation, full searchable list and more which is not availble on the [website](https://augidraugi.lv/).

So far this app has been released with 5 version updates each time adding extra features to it. People love and use it a lot. Even data shows that app retention, ratings and feedback from social media is very good.

image with rejected

But sadly Apple App Store review team thinks differently. They have reject last update for iOS 13 which introduces dark mode and other updates because of *minimum functionality*.

> **Guideline 4.2 - Design - Minimum Functionality**
> We found that the usefulness of your app is limited by the minimal amount of content or features it includes.

App is free and isn’t tricking with any adds or such. It uses only iOS standard UI elements. From one side App Store is full of scams and very bad apps, but treating an app which complies to all user interface guidelines, supports new iOS 13 and more like that is not understandable to me. Not mentioning that this project tries to solve environmental and animal rights issues which is big issue in our society. 

## App Store Scams

For quite a while I have been working on a [project](https://apps.apple.com/ee/app/dodies-lv/id1080800199) which lists hiking paths in Baltic states. Most of them have been reviewed by the project team and have great pictures. App has been out sourced in [Github](https://github.com/fassko/Dodies.lv) and everyone can participate to it. Recently I found that someone has copied it and released even in App Store with the same name. I understand it is public in Github, but how App Store team did let it go trough the review process?

IMAGE with scam

I have filed a complaint on August 12 and right now it has been more than one month. There has been email conversation, but Apple can’t reach out this copycat or take this app down. It is obviously that even screenshots have been copied.

## App Store Payments and Revenue Cut

In my own company [Qminder](https://www.qminder.com/) I have had numerous issues with App Store review team about app revenue sharing. In short, our clients pay subscription fee for access to the system. They can opt in to use iOS apps, but it is absolutely not a need at all.

App Store guidelines state that if you process any payments trough App Store you need to use Apple’s provided payment system and you get only 70%. Rest 30% goes to Apple supporting publishing apps, processing payment cards and more. That is completely understandable, but what if customers don’t use apps from App Store right now and opt in future? Or use the app now and stop using after a while?

I have been talking with App Store review team a few times and solution is to not have any marks of registration or links in your apps. Or you loose 30% of your revenue to have same prices everywhere on the App Store and outside of it. There have been [news](https://www.theverge.com/2018/12/28/18159373/netflix-in-app-subscriptions-iphone-ipad-ios-apple) that because of this issue Netflix has stopped to process new sign ups via App Store. Amazon has only sign-in form in their apps without any information how to sign up and now an introducing [credits system](https://twitter.com/stevemoser/status/1174408011965747201). The list goes one and on.

## TL;DR;

App Store review process is one of the most painful part of iOS development. It is done by real humans and that means it can be inconsistent and error prone.

Another part where App Store team at Apple isn’t supportive to the developers is revenue sharing. 30% of all payments processed trough App Store go to Apple supporting the app publishing and processing payments. It is a huge percentage especially if your service can be used without apps.

On the good note app review process has been improved in recent years, but there is still a long road to go to make it fair, consistent and fair to everyone.
