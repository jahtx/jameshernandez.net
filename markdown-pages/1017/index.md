---
date: '2024-02-06'
title: 'Hosting a Static Site on AWS'
tags: ['cloud', 'aws', 'gatsby', 'deployment', 'certificate', 'main']
slug: aws-s3-deploy
featuredImage: aws-centered.jpg
author: James A. Hernandez
status: published
showTOC: true
prismThemes: ['prism-coldark-dark', 'prism-ghcolors']
description: 'I have long tried to replace some of my host-providers with AWS with the hopes of avoiding a charge anywhere from $5 to $15 a month. With some online help, it took me awhile to get a GatsbyJS site fully deployed with SSL, since some of the tutorials are incomplete. So alas, I will post my roadmap.'
---

import H2ThemeWrapper from 'wrappers/H2ThemeWrapper';
import CodeSection from 'components/CodeSection';
import BetterImageModal from 'components/BetterImageModal';
import hostedZones from './hosted-zones.jpg';
import records from './records.jpg';
import nameservers from './nameservers.jpg';
import s3 from './s3.jpg';
import publicAccess from './public-access.jpg';
import defaultEncrypt from './default-encrypt.jpg';
import staticHosting from './static-hosting.jpg';
import objectOwnership from './object-ownership.jpg';
import requestPublic from './request-public-cert.jpg';
import exportRecords from './export-records.jpg';
import createDistribution from './create-distribution.jpg';
import viewer from './viewer.jpg';
import webApp from './web-app-firewall.jpg';
import selectCert from './select-ssl-cert.jpg';
import costUsage from './cost-and-usage.jpg';
import cloudfrontOrigin from './cloudfront-origin.jpg';
import createRecord from './create-record.jpg';

<H2ThemeWrapper>Set up your domain name and AWS Route 53</H2ThemeWrapper>

Before you can set up DNS listing with your domain provider, you need to create the DNS listings in Amazon Route 53 Dashboard. Got to 'AWS > Route 53 Dashboard > Hosted Zones'. Select 'Create hosted zone'.
<BetterImageModal 
imageUrlFromFolder={hostedZones}
title="Hosted Zones"
initialSize="20rem"
frameStyles="p-3"
border
modalImageSize="mediumImageModal"
/>


Enter the Domain name, then select 'Create Hosted Zone' below.

As soon as you do this, you will see NS (nameservers) records for your domain. Take down this information, because you will use it for your DNS settings at your registrar.

<BetterImageModal 
imageUrlFromFolder={records}
title="Records"
initialSize="20rem"
modalImageSize="mediumImageModal"
frameStyles="p-3"
border
noDarkModal
/>

Once you receive the Nameservers records, go to your domain registrar. Select you want to use custom Nameservers. Enter the NS info you got from Amazon S3.

<BetterImageModal 
imageUrlFromFolder={nameservers}
title="Registrar"
initialSize="20rem"
modalImageSize="mediumImageModal"
frameStyles="p-3"
border
/>

<H2ThemeWrapper>Create S3 Bucket</H2ThemeWrapper>

Go to Amazon S3 and select 'Create bucket'.

<BetterImageModal 
imageUrlFromFolder={s3}
title="Create Bucket"
initialSize="20rem"
modalImageSize="mediumImageModal"
frameStyles="p-3"
border
/>

Select an AWS Region closest to you or in your time zone.

Name your bucket the URL of your website, like mywebsite.com.

Deselect 'Block all public access' and click acknowledgement below.

<BetterImageModal 
imageUrlFromFolder={publicAccess}
title="Public Access"
initialSize="20rem"
modalImageSize="mediumImageModal"
frameStyles="p-3"
border
/>


Leave Bucket Versioning off

Keep Default encryption settings

<BetterImageModal 
imageUrlFromFolder={defaultEncrypt}
title="Default Encryption"
initialSize="20rem"
modalImageSize="mediumImageModal"
frameStyles="p-3"
border
/>

Click 'Create bucket'.

Click on your bucket and go to 'Properties' tab.

Click to Edit Static website hosting, click Enable, for Index document make sure it says index.html, and 
leave all other defaults the same, and Save changes.

<BetterImageModal 
imageUrlFromFolder={staticHosting}
title="Static Website Hosting"
initialSize="20rem"
modalImageSize="mediumImageModal"
frameStyles="p-3"
border
/>

Go to Permissions > Bucket Policy.

Select Bucket policy, and use this template for a Policy:

<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```json
{
    "Version": "2012-10-17",
    "Id": "Policy1701746151503",
    "Statement": [
        {
            "Sid": "Stmt1701746147603",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::yourdomain.com/*"
        }
    ]
}
```
</CodeSection>

Edit Object Ownership, select ACS enabled, click the acknowledgement, and keep Bucket owner preferred. Save Changes.

<BetterImageModal 
imageUrlFromFolder={objectOwnership}
title="Object Ownership"
initialSize="20rem"
modalImageSize="mediumImageModal"
frameStyles="p-3"
border
/>

At this point your bucket should appear Public.

<H2ThemeWrapper>Push Static Site to S3</H2ThemeWrapper>

This is where you have a few options to push your static site. For this article, we are going to use the AWS command line to sync your static directory to the S3 bucket.


<CodeSection height='20' darkTheme="prism-coldark-dark" lightTheme="prism-ghcolors">
```shell
aws s3 sync dist s3://yourdomain.com --delete
```
</CodeSection>

<H2ThemeWrapper>Certificate Manager</H2ThemeWrapper>

We're going to need a an SSL/TLS Certificate. Go to Certificate Manager and hit 'Request'.

Select 'Request Public Certificate' and hit 'Next'. 

Add `yourdomain.com` and `www.yourdomain.com` as fully qualified domain names.

<BetterImageModal 
imageUrlFromFolder={requestPublic}
title="Request Public Certificate"
initialSize="20rem"
modalImageSize="mediumImageModal"
frameStyles="p-3"
border
/>

Keep all the other defaults. Finally select the 'Request' button at the bottom right.

You'll be presented with a list of your certificates, except the one you just created! Don't panic. There should be a notification at the top and you should click the option 'View the Certificate'. Initially the CNAMEs may be blank. Just refresh a few times and they should appear.

This part is important. Select 'Create records in Route 53'. (You can insert them yourself, but it's very easy to make an error. Better to let AWS just do this for you.)

<BetterImageModal 
imageUrlFromFolder={exportRecords}
title="Export Records"
initialSize="20rem"
modalImageSize="mediumImageModal"
frameStyles="p-3"
border
/>

You'll get a confirmation screen. Select 'Create records'.

Once you have done this you can go back to your list of certificates. (If your certificate doesn't appear, make sure you have selected the right region, which is at the top right by your name. )

You're going to need to wait until the status of your certificate is 'Issued'. Be patient. This may take up to 30 minutes. (In my experience, if it takes longer then something has gone wrong, and you should begin troubleshooting.)

<H2ThemeWrapper>Setting up Cloudfront</H2ThemeWrapper>

Once the status of the Certificate is listed as 'Issued', you will need to create a Cloudfront distribution. This is the only way we are going to be able to use an SSL certificate with Route 53. 

Go to AWS > CloudFront.

Select 'Create distribution'.

For the option 'Origin domain', select the appropriate S3 bucket. If everything has gone correctly, you should see it in the dropdown list.

<BetterImageModal 
imageUrlFromFolder={createDistribution}
title="Create Distribution"
initialSize="20rem"
modalImageSize="mediumImageModal"
frameStyles="p-3"
border
/>

This part is very important. When you have selected your bucket, you will be presented with an option to 'Use website endpoint'. Click it!

<BetterImageModal 
imageUrlFromFolder={cloudfrontOrigin}
title="Use website endpoint"
initialSize="20rem"
modalImageSize="mediumImageModal"
frameStyles="p-3"
border
/>

Keep all the other options default, until you get to 'Viewer protocol policy'. Select 'Redirect HTTP to HTTPS'.

Keep 'GET, HEAD methods'.

<BetterImageModal 
imageUrlFromFolder={viewer}
title="Viewer"
initialSize="20rem"
modalImageSize="mediumImageModal"
frameStyles="p-3"
border
/>

Keep all of the defaults.

For 'Web Application Firewall', this is important because this can be the most expensive part. Make sure to click 'Do not enable security protections'. 

<BetterImageModal 
imageUrlFromFolder={webApp}
title="Web App Firewall"
initialSize="20rem"
modalImageSize="mediumImageModal"
frameStyles="p-3"
/>

If you keep WAF on, it can significantly add to your monthly costs.😱

<BetterImageModal 
imageUrlFromFolder={costUsage}
title="Cost and Usage"
initialSize="20rem"
modalImageSize="mediumImageModal"
frameStyles="p-3"
border
/>


For Custom SSL certicate, select the certificate you just created.

<BetterImageModal 
imageUrlFromFolder={selectCert}
title="Select SSL Certificate"
initialSize="20rem"
modalImageSize="mediumImageModal"
frameStyles="p-3"
border
/>


For Supported HTTP versions select 'HTTP/2 and HTTP/3'.

Select 'Create distribution'.

<H2ThemeWrapper>Last Step — Route 53 Again!</H2ThemeWrapper>

Now you're on your last step. Go to Route 53 > Hosted zones > yourdomain.com.

You should have 4 records, including the two CNAME records you created earlier. You're going to create two more.

Click 'Create record'.

'Record name' should have subdomain blank and 'Record type' should remain 'A'.

Turn the 'Alias' option to on.

For the option 'Route traffic to' select 'Alias to Cloudfront distribution'.

For the distribution, you should see the cloudfront distribution associated with your domain name. If you do not, something has gone wrong, and you should troubleshoot.

<BetterImageModal 
imageUrlFromFolder={createRecord}
title="Create Record"
initialSize="20rem"
modalImageSize="mediumImageModal"
frameStyles="p-3"
border
/>


Keep the Routing policy default and select 'Create records'.

Create one more record just like it, except for the Record name, enter 'www'. This is to ensure users who type yourdomain.com and www.yourdomain.com are routed to the same site.

Good luck!