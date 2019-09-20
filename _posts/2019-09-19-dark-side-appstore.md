---
layout: post
title: ! "Dark Side of the AppStore"
categories: [swift, websockets, xcode11, ios13]
tags: [swift, apple, websockets, ios, xcode]
---

I am an Apple fanboy I can admit, but one of the most frustrating things being app developer is dealing with App Store review and compliance teams. I would like to share my experience dealing with these issues and point out that everything is only my own opinion.

Even Apple’s former app approval chief has [said](https://www.theverge.com/2019/5/29/18643868/apple-app-store-approval-process-antitrust-phillip-shoemaker-interview) that he is ‘really worried’ about company’s anticompetitive behavior.

<!--more-->

## App Store rejections

Quite recently I jumped in one project which promotes vegan diet food places in Riga, Latvia. All these food places are validated by this project managers and have to have at least three proper food options. I thought it would be a great idea to make web site in an app, because on the go it is always easier to find places to eat from your phone. [App](https://apps.apple.com/ee/app/augi-draugi/id1475145259) adds extra features like navigation and full searchable which is more like in [website](https://augidraugi.lv/).

image with rejected

Now this app has been released with 5 version updates each time adding extra features. People are liking it. Data backs it up with very good app retention, ratings and feedback from social media.

But sadly Apple App Store review team thinks differently. They have reject last update for iOS 13 with dark mode and more because of minimum functionality.

> **Guideline 4.2 - Design - Minimum Functionality**
> We found that the usefulness of your app is limited by the minimal amount of content or features it includes.

I am using only iOS standard UI elements. App is free and isn’t tricking with any adds or such. App Store is full of scams and bad apps, but treating project which complies to all user interface guidelines, supports new iOS 13 and more like that is not understandable to me. Not mentioning that this project tries to solves environmental and animal rights issues in our society. 

## App Scams

Quite a while I am working on [project](https://apps.apple.com/ee/app/dodies-lv/id1080800199) which lists hiking paths in Baltic states. Most of them have been reviewed and have great pictures. Project has been out sourced in [Github](https://github.com/fassko/Dodies.lv). Recently I found that someone has copied it and released even in App Store. I understand it is out in Github, but how App Store team did let it go trough the review process?

IMAGE with scam

I have filed a complaint on August 12 and right now it has been more than one month while they can’t reach out this copycat or take this app down. It is obviously visible that even screenshots have been faked.

## App Store payments and revenue cut

In my own company [Qminder](https://www.qminder.com/) biggest issues with App Store review team has been with revenue sharing. In short, our clients pay us subscription fee for access to the system. They can opt in to use iOS apps, there is no need to strictly them.

App Store guidelines explain that if you process any payments trough App Store apps you need to use Apple provided payment system and you get only 70% and rest of 30% goes to Apple. That is completely understandable, but what if customers don’t use apps from App Store now, but would opt in future or even stop using them, but continue to use the system itself?

I have been dealing with App Store review team and end solution is to not have any marks of registration or links in your apps. Or you can agree to loose 30% of your revenue to have same prices everywhere even customers don’t buy from App Store. There have been [news](https://www.theverge.com/2018/12/28/18159373/netflix-in-app-subscriptions-iphone-ipad-ios-apple) that because of this Netflix stopped to process new sign ups via App Store. Amazon has only sign-in form in their apps without any information how to sign up and now an introducing [credits system](https://twitter.com/stevemoser/status/1174408011965747201).

## TL;DR;

App Store review process can be one of the most painful parts of iOS development. As it is done by real humans there is big chance that it is not consistent and error prone.

Another part where App Store isn’t coming forward to many of developers is revenue sharing. It means that 30% of all payments trough App Store goes to Apple supporting the store and platform itself. It is a huge percent especially your service can be used without apps.

## Links

* interview with apple former employee
* netflix article
* spotify sues Apple


* dealing with App Rejections
    * Augi&Draugi app usefullness
* App scams
    * Dodies.lv scam and Apple unable to remove it from the store
* Dealing with payments/ revenue share
    * Qminder case, can’t show registration link,
    * Spotify law suite and competition with Apple Music
    * Amazon credits, ridicilous

links:
* Spotify suite in EU
* Interview app review process interview
