---
date: '2024-01-04'
title: 'Noblr Car Insurance'
tags: ['usaa', 'noblr', 'ux']
slug: noblr-ux
featuredImage: noblr.jpg
author: James A. Hernandez
status: portfolio
showTOC: true
prismThemes: ['prism-coldark-dark', 'prism-ghcolors']
description: 'Noblr is a subsidary of USAA. They offer an insurance product that was unique to USAA and the industry at the time: paying only for the time you drive your car.'
---

import H2ThemeWrapper from 'wrappers/H2ThemeWrapper';
import BetterImageModal from 'components/BetterImageModal';
import RefinedImageModal from 'components/RefinedImageModal';
import BioFlow from './biometrics-flow.png';
import BioFlow2 from './bio-metrics2.jpg';
import BioImage1 from './bio1.png';
import BioImage2 from './bio2.jpg';
import CovEndosRes from './cov-endo-research.jpg';
import CarEndosFlow from './car-endos-flow.png';
import UpdateCars from './update-cars.jpg';
import CarEndos1 from './car-endos1.jpg';
import CovEndos1 from './cov-endos1.jpg';
import LiaModals from './lia-modals.jpg';
import CovEndos2 from './cov-endos2.jpg';
import CovFlow1 from './cov-flow1.png';
import CovFlow2 from './cov-flow2.jpg';
import Game1 from './game1.jpg';
import Game2 from './game2.jpg';
import IOSIcon from './ios-icon.png';
import Onboard1 from './onboard1.jpg';
import AndroidIcon from './android-icon.png';
import Onboard2 from './onboard2.png';
import Faqs from './faqs.jpg';

<H2ThemeWrapper>Adding Biometrics</H2ThemeWrapper>

Noblr needed to adopt basic biometric security including facial and fingerprint recognition for both iOS and Android. This required an extensive flow diagram to present to executives and developers when and where users would be presented with these options. 

<BetterImageModal 
imageUrlFromFolder={BioFlow}
title="Biometrics Flow"
initialSize="40rem"
frameStyles="p-3"
modalSize='xl'
border
modalImageSize="xlargeImageModal"
/>

<BetterImageModal 
imageUrlFromFolder={BioImage1}
title="Biometrics Flow"
initialSize="40rem"
frameStyles="p-3"
border
modalImageSize="xlargeImageModal"
/>

There are a lot of potential screens that can be viewed depending on error handling, or personal preferences. All of these had to be accounted for. The user had to be able to decide to switch from using FaceID to TouchID or a Passcode, and have the options presented in Security Settings. 

<BetterImageModal 
imageUrlFromFolder={BioImage2}
title="Biometrics Flow"
initialSize="40rem"
frameStyles="p-3"
border
modalImageSize="largeImageModal"
/>
While the initial flow diagram presented a good starting point, eventually it had to be more comprehensive for developers and architects.
<BetterImageModal 
imageUrlFromFolder={BioFlow2}
title="Biometrics Flow"
initialSize="40rem"
frameStyles="p-3"
border
modalImageSize="xlargeImageModal"
/>

<H2ThemeWrapper>Cars Endorsements</H2ThemeWrapper>

Cars Endorsements is the process by which policy holders add or remove a car from their policy. Significant modifications were made to our mobile app to expand on this capability.


<BetterImageModal 
imageUrlFromFolder={CarEndosFlow}
title="Car Endorsements Flow Diagram"
initialSize="40rem"
frameStyles="p-3"
border
modalImageSize="xlargeImageModal"
/>

<BetterImageModal 
imageUrlFromFolder={CarEndos1}
title="Car Endorsements"
initialSize="40rem"
frameStyles="p-3"
border
modalImageSize="xlargeImageModal"
/>


<BetterImageModal 
imageUrlFromFolder={UpdateCars}
title="Add / Remove Cars"
initialSize="40rem"
frameStyles="p-3"
border
modalImageSize="xlargeImageModal"
/>


<BetterImageModal 
imageUrlFromFolder={LiaModals}
title="Liability Modals"
initialSize="40rem"
frameStyles="p-3"
border
modalImageSize="xlargeImageModal"
/>


<H2ThemeWrapper>Coverage Endorsements</H2ThemeWrapper>

Coverage Endorsements is the process by which policy holders adds, deletes, excludes or changes insurance coverage.

Among the first steps is to research and consider how the competition may have implemented this feature:

<BetterImageModal 
imageUrlFromFolder={CovEndosRes}
title="Competitor Research"
initialSize="40rem"
frameStyles="p-3"
border
modalImageSize="xlargeImageModal"
/>

If we understand the requirements, we can already dive into creating an initial flow diagram prior to creating any screens.

<BetterImageModal 
imageUrlFromFolder={CovFlow1}
title="Coverage Endorsements"
initialSize="40rem"
frameStyles="p-3"
border
modalImageSize="xlargeImageModal"
/>

We can create some initial screens that are applicable in all states and situations. 

<BetterImageModal 
imageUrlFromFolder={CovEndos1}
title="Coverage Endorsements"
initialSize="40rem"
frameStyles="p-3"
border
modalImageSize="xlargeImageModal"
/>

However, as it is with auto insurance, each state has its own specific definitions and requirements. 


<BetterImageModal 
imageUrlFromFolder={CovEndos2}
title="Coverage Endorsements"
initialSize="40rem"
frameStyles="p-3"
border
modalImageSize="largeImageModal"
/>

Each state and situation is eventually accounted for. As with most designs, there are some that are just explained in requirement documents, diagrams, and discussions. Often determining which composites to create is an understanding between project managers, developers, and designers. 
<BetterImageModal 
imageUrlFromFolder={CovFlow2}
title="Coverage Flow"
initialSize="40rem"
frameStyles="p-3"
border
modalImageSize="xlargeImageModal"
/>

<H2ThemeWrapper>Gamification Concept</H2ThemeWrapper>

Management considered some options for gamifying driving habits. These options were to engage users to open their application more and interact.


<BetterImageModal 
imageUrlFromFolder={Game1}
title="Gamification"
initialSize="40rem"
frameStyles="p-3"
border
modalImageSize="xlargeImageModal"
/>

Some of these ideas involved users competing with members of their family or customers in their state to see how they compare.

<BetterImageModal 
imageUrlFromFolder={Game2}
title="Gamification"
initialSize="40rem"
frameStyles="p-3"
border
modalImageSize="xlargeImageModal"
/>

<H2ThemeWrapper>Onboarding New Users</H2ThemeWrapper>

From our research, we determined users were having some struggles getting acquainted with the application. Our onboarding screens sought to remedy this. We needed to let users know some of the mobile features to reduce calls to customer service. Also, the easier a user was able to roll on, the more likely they were to get fewer interruptions to their service and see more savings. 

<img src={IOSIcon} alt="for iOS" className="imgw-3" />
<BetterImageModal 
imageUrlFromFolder={Onboard1}
title="iOS Onboarding"
initialSize="40rem"
frameStyles="p-3"
border
modalImageSize="xlargeImageModal"
/>

We researched Android settings and vendor differences to create different onboarding for Android users. 

<img src={AndroidIcon} alt="for Android" className="imgw-3" />

<BetterImageModal 
imageUrlFromFolder={Onboard2}
title="Android Onboarding"
initialSize="40rem"
frameStyles="p-3"
border
modalImageSize="xlargeImageModal"
/>

FAQs:

<BetterImageModal 
imageUrlFromFolder={Faqs}
title="FAQs"
initialSize="40rem"
frameStyles="p-3"
border
modalImageSize="xlargeImageModal"
/>