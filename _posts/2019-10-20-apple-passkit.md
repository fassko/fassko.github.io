---
layout: post
title: ! "What is PassKit and how to use it?"
categories: [passkit, apple]
tags: [passkit, apple, ios, wallet]
---

Apple [PassKit](https://developer.apple.com/documentation/passkit) framework is responsible for Apple Pay and managing user passes in Wallet app.

This time let’s talk about passes, how to create and distribute them. Wallet app allows iOS users to organize boarding passes, tickets or gifts, business and loyalty cards. In short, passes are digital representations of information that usually is printed on paper or used as plastic cards.

<!--more-->

## Pass building blocks

Passes are created as packages (or bundles) with extension `.pass` and consists of:

* 	`pass.json` - file that defines the pass, image assets, and other metadata;
* 	`manifest.json` - file that describes files inside the pass and has SHA1 checksums of each of the files
* 	image assets
	* 	background of the pass
	* 	logo - the logo in the pass header
	* 	icon - small icon for the pass
	* 	strip - image strip background behind the primary fields

![Pass in Wallet app](/assets/img/passkit/pass-in-wallet-app.jpg)

### Required fields creating a pass

When creating a pass you need to provide the [pass type identifier](https://developer.apple.com/documentation/passkit/pkpass/1618783-passtypeidentifier) and [serial number](https://developer.apple.com/documentation/passkit/pkpass/1618788-serialnumber). Type identifier is a String value using reverse DNS style - for example, `pass.com.example.loyalty-card`. Serial number is a string value that has a unique value in the scope of the pass type, like a membership number or a ticket identifier.

Other mandatory fields are:

* format version - file format version, usually need to use 1 (number)
* team identifier - unique 10-character identifier provided by Apple which you can find out from developer.apple.com portal
* organization name - displayed on the lock screen
* description - helps to make the pass accessible by VoiceOver

### Different flavors of the pass

Passes can have different visual appearance:

* `boardingPass` - pass for a flight, train, bus or any other type of transit
* `coupon` - coupons, special offers or discounts
* 	`eventTicket` - pass to enter any kind of event
* 	`storeCard` - loyalty card style
* 	`generic` - style appropriate for any pass

Wallet app is using different layout to each of these styles. It is much easier for your users to distinguish passes and find the right one faster.

## Creating passes

Creating a pass is the first step of the pass lifecycle. It happens on the server side and should be cryptographically signed and compressed. Signing process requires several steps and Apple has a [manual](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/Creating.html#//apple_ref/doc/uid/TP40012195-CH4-SW1) or you can use a third party library and provide necessary certificates. By signing your passes your users can be sure that the pass is correct and not fake.

When you debug passes in iOS Simulator Wallet app you can see any errors in the system log which you can view in Console app.

## Distributing passes

After creating, signing and compressing a pass into a bundle you can distribute it in several ways:

* sending with an email;
* using file sharing options like iCloud or AirDrop;
* using Add to Wallet button [provided](https://developer.apple.com/documentation/passkit/pkaddpassbutton) by Apple.

## Using passes

Now you can provide not only barcode information but NFC data as well. When using NFC your users can simply hold the authorized device near the NFC reader and authorize the pass regardless - whether it's a flight boarding, student ID, gym membership or even a ticket for the [WWDC](https://kristaps.me/wwdc-2019/).

![Using pass from Apple Watch](/assets/img/passkit/scanning-pass-apple-watch.jpg)
 
## TL;DR

Apple PassKit framework helps to create, distribute and manage passes that usually are printed on paper or plastic.

It is a secure way to provide a more modern way to your users using Wallet app on their iPhones or Apple Watches.

## Links

* [PassKit documentation](https://developer.apple.com/documentation/passkit)
* [Archived Wallet Developer Guide](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/index.html#//apple_ref/doc/uid/TP40012195-CH1-SW1)
* [Wallet Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/wallet/overview/pass-design/)
* [Video how to create passes](https://www.youtube.com/watch?v=g5KRJgO7yJE)
* Outdated but still relevant tutorial, [Part 1](https://www.raywenderlich.com/2855-beginning-passbook-in-ios-6-part-1-2) and [Part 2](https://www.raywenderlich.com/2853-beginning-passbook-in-ios-6-part-2-2)