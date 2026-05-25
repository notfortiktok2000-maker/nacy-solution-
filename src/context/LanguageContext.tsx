import React, { createContext, useContext, useState, useEffect } from "react";

export type LanguageType = "EN" | "FR";

interface LanguageContextProps {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  toggleLanguage: () => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const dictionary: Record<LanguageType, Record<string, string>> = {
  EN: {
    // Nav & Common
    "nav.services": "Services",
    "nav.whyUs": "Why Us",
    "nav.pricing": "Pricing",
    "nav.contact": "Contact",
    "nav.freeQuote": "Free Quote",
    "nav.diagnostic": "— Premium Diagnostics",
    "nav.quoteSubtitle": "Get Your Free Quote",
    "nav.quoteDescription": "Describe your project goal below. We will analyze your specification and model a dedicated proposal under 24 hours.",
    "nav.quoteComplete": "Briefing Pack Complete!",
    "nav.quoteSuccessMsg": "We are launching a live chat on WhatsApp to immediately process your proposal parameters.",
    "nav.fullName": "Full Name",
    "nav.fullNamePlaceholder": "e.g. Adam Smith",
    "nav.emailAddress": "Email Address",
    "nav.emailAddressPlaceholder": "e.g. adam@company.com",
    "nav.preferredService": "Preferred Service",
    "nav.serviceWeb": "Digital Website Creation",
    "nav.servicePhoto": "Studio-Quality AI Photo Shooting",
    "nav.serviceVideo": "Viral Short-Form Video Production",
    "nav.serviceCustom": "Other Bespoke Collaboration",
    "nav.projectDetails": "Project Details",
    "nav.detailsPlaceholder": "Tell us what you would like to achieve, target launch, etc...",
    "nav.sendRequest": "Send Request (Open WhatsApp)",

    // Home Page
    "home.metaTitle": "NACY ST — High-Performance Digital & Creative Agency",
    "home.metaDesc": "NACY Solutions (NACY ST) builds zero-template custom websites, realistic AI photo shoots, and viral social media videos with absolute precision in Tangier.",
    "home.metaOgTitle": "NACY ST — Specialized Digital Craftsmen",
    "home.metaOgDesc": "Custom software engineering and professional creative services with immediate delivery timelines in Tangier, Morocco.",
    "home.badge": "TANGIER, MOROCCO",
    "home.titlePart1": "WE BUILD",
    "home.titlePart2": "WHAT OTHERS",
    "home.titlePart3": "ONLY PROMISE.",
    "home.subtitle": "Beautiful hand-coded websites. Realistic studio product photography. High-conversion TikTok & Reels editing. Built with absolute integrity.",
    "home.btnStart": "Start a Project",
    "home.btnServices": "Explore Services",
    "home.expertBadge": "Certified & Verified by Experts",
    "home.gCertified": "Google Cloud Certified",
    "home.eCertified": "Ecosystem Certified",
    "home.vIntegration": "Verified Integration",
    "home.statsProjects": "Projects Delivered",
    "home.statsConcept": "First Concept",
    "home.statsSatisfaction": "Customer Satisfaction",
    "home.statsOfferings": "Core Offerings",

    // Marquee
    "marquee.website": "Website Engineering",
    "marquee.photo": "Studio Product AI Photography",
    "marquee.video": "Viral TikTok & Reels Production",
    "marquee.delivery": "Fast Global Delivery",
    "marquee.tangier": "Tangier Morocco Specialists",
    "marquee.zeroTemplates": "Zero Sluggish Templates",

    // Home values Section
    "home.valuesBadge": "Our Production Values",
    "home.valuesHeading": "How we guarantee elite deliverables.",
    "home.p1Title": "1. Clear-cut Handcoding",
    "home.p1Desc": "No sitebuilders, no generic templates. Every script, element, style, and interface layout we produce is hand-coded to match the highest modern efficiency standards.",
    "home.p2Title": "2. AI Production Velocity",
    "home.p2Desc": "By integrating specialized generative models directly within our graphic pipeline, we bypass the need for expensive equipment while delivering higher realism in record time.",
    "home.p3Title": "3. Realtime WhatsApp Briefings",
    "home.p3Desc": "Say goodbye to cold, sluggish support lines. We maintain direct, highly active communication on WhatsApp so you can review concepts in real time.",
    "home.p4Title": "4. Complete Transparency",
    "home.p4Desc": "No complex contracts, no surprise hidden fees. You select from our explicit billing matrices and receive premium assets with complete commercial copyright ownership.",

    // Home Testimonials
    "home.testimonialsBadge": "— Verified Praise",
    "home.testimonialsHeading": "What creative partners say about NACY ST",
    "home.t1Text": "\"The hand-coded website delivered by NACY ST instantly doubled our inbound property leads in Tangier. The technical coding and WhatsApp response velocity is truly outstanding!\"",
    "home.t1Author": "Anass M.",
    "home.t1Role": "Real Estate Director",
    "home.t2Text": "\"Their realistic studio AI photo shoots are mind-blowing. We uploaded simple mobile captures and received 45 high-end product photos in less than 48 hours.\"",
    "home.t2Author": "Sofia B.",
    "home.t2Role": "Jewelry Atelier Founder",
    "home.t3Text": "\"Exceptional short-form video montage skills. Our product Reels went viral instantly, generating over 100K impressions in 3 days. Recommend their degressive bulk packs!\"",
    "home.t3Author": "Khalid H.",
    "home.t3Role": "E-Commerce Merchant",

    // Why Us Page
    "why.metaTitle": "Why Us | NACY ST — Why Smart Brands Choose Us",
    "why.metaDesc": "Why modern businesses choose NACY Solutions over traditional agencies. Instant WhatsApp communications, hand-coded performance, and stellar artificial intelligence workflows.",
    "why.badge": "— Beyond Standard Agencies",
    "why.heading": "We build what others only promise.",
    "why.sub": "NACY Solutions (NACY ST) isn't a traditional creative agency. We are an tech-forward squad building lightning-fast websites, hyper-realistic AI visuals, and viral social media assets.",
    "why.card1Title": "Smarter Tools, Sharper Results",
    "why.card1Desc": "By integrating specialized generative workflows into our design stack, we slash standard production time without cutting quality. You get top-tier assets in days, not months.",
    "why.card2Title": "Zero Template Hand-coding",
    "why.card2Desc": "Most agencies reuse identical WordPress templates. We compile clean, custom codes optimized to index instantly in Tangier or globally, ensuring absolute platform immunity and fast loading times.",
    "why.card3Title": "Direct WhatsApp Communication",
    "why.card3Desc": "No slow, corporate emails or ticketing delays. Chat in real-time with engineers and creators who actually execute your edits. Full transparency with immediate WhatsApp responses.",
    "why.card4Title": "No Hidden Fees & Multi-Currency",
    "why.card4Desc": "Transparent multi-currency pricing models. Select your base currency and pay exactly what has been displayed. No surprise fees, no unexpected overages.",
    "why.quote": "\"Working with NACY ST felt like adding an elite technology department to our real estate firm overnight. They shipped an optimized website and produced 45 product photos within 72 hours.\"",
    "why.quoteAuthor": "— Anass Benjelloun, Tangier Real Estate Director",
    "why.btn": "Begin Your Journey",

    // Pricing Page
    "price.metaTitle": "Pricing | NACY ST — Full Value Transparency",
    "price.metaDesc": "Calculate and review transparent rates for digital developments, photo-shooting, and viral social assets. Fast global payment settlement in MAD, EUR or USD.",
    "price.badge": "— Transparent Pricing",
    "price.heading": "Pay for exquisite results, not for agency layers.",
    "price.sub": "Choose your preferred billing currency to visualize fixed calculations. Instant checkout, Zero setup costs.",
    "price.switchMad": "MAD (Morocco)",
    "price.switchEur": "EUR (Europe)",
    "price.switchUsd": "USD (USA)",
    "price.save": "Save {amount}",
    "price.singleProject": "Single Project",
    "price.commercialAssets": "Commercial Assets",
    "price.degressiveBilling": "Degressive Billing",
    "price.selectVidBatch": "Select Video Batch",
    "price.vidSuffix": "Vid.",
    "price.mostPopular": "Most Popular",
    "price.webSub": "All inclusive, live within 10 days",
    "price.photoSub": "Digital delivery within 48 to 72 hours",
    "price.webF1": "Custom responsive interactive prototype",
    "price.webF2": "Tangier, regional and global SEO setup",
    "price.webF3": "Instant indexing trigger (Google Search Console)",
    "price.webF4": "Mobile performance rendering score of 95%+",
    "price.webBtn": "Get Started with Web",
    "price.photoF1": "45 Professional High-Res visual assets",
    "price.photoF2": "Advanced stable light retouches",
    "price.photoF3": "High-end corporate, product or lifestyle backdrops",
    "price.photoF4": "Full worldwide copyright usage",
    "price.photoBtn": "Get Shooting Pack",
    "price.videoF1": "Sleek vertical optimized Reels layout",
    "price.videoF2": "Dynamic motion graphics, font subtitles",
    "price.videoF3": "Swift delivery: 48H per crafted short",
    "price.videoBtn": "Order {count} Videos",
    "price.videoBtnSingle": "Order {count} Video",

    // Services Page
    "services.metaTitle": "Services | NACY ST — Premium Digital Solutions",
    "services.metaDesc": "Explore our primary high-conversion services: custom website engineering, professional AI photo shooting, and attention-grabbing product video editing in Tangier.",
    "services.badge": "— Specialized Services",
    "services.heading": "High-performance digital assets built for conversion.",
    "services.sub": "We merge professional software engineering with deep algorithmic creativity. No sluggish templates, no bloated processes. Only refined high-tier deliverables.",
    "services.s01": "SERVICE 01",
    "services.s02": "SERVICE 02",
    "services.s03": "SERVICE 03",
    "services.webDesc": "Hand-coded, optimized websites designed to win on Google. Lightning-fast response times, bespoke graphics, and clean design patterns tailored specifically to your conversion funnel.",
    "services.webF1": "Custom bespoke design, strictly zero templates",
    "services.webF2": "Comprehensive SEO integration & semantic tags",
    "services.webF3": "Fluid ultra-responsive framework performance",
    "services.webF4": "30 days of complimentary engineering updates",
    "services.photoDesc": "Studio-grade high definition commercial product pictures at a fraction of standard cost. We use deep stable model layers to engineer professional lighting, perfect models, and customized global scenery.",
    "services.photoF1": "Complete package of 45 high definition visuals",
    "services.photoF2": "Fully localized ambient light & backdrops",
    "services.photoF3": "Stable, ultra-realistic model generation",
    "services.photoF4": "Complete global commercial usage license",
    "services.videoDesc": "Aggressive thumb-stopping video edits carefully scripted and cut for Reels, TikTok, and YouTube Shorts. Built on psychological engagement hooks to keep users locked in from state zero.",
    "services.videoF1": "Vertical optimized TikTok/Reels framework",
    "services.videoF2": "Highly dynamic pace, text motion & audio synthesis",
    "services.videoF3": "Professional organic voiceovers optional",
    "services.startingFrom": "Starting From",
    "services.totalPackage": "Total Package",
    "services.totalCost": "Total Cost",
    "services.orderNow": "Order Now",
    "services.bookShoot": "Book Shoot",
    "services.orderVideos": "Order Videos",
    "services.customHeading": "Need a completely customized setup?",
    "services.customSub": "We specialize in bespoke systems, complete brand design, and long-term retainer scopes. Contact us right now on WhatsApp for a quick discussion.",
    "services.customBtn": "Discuss Custom Project",

    // Contact Page
    "contact.metaTitle": "Contact Us | NACY ST — Free Project Discovery",
    "contact.metaDesc": "Reach out to NACY Solutions in Tangier. Fill in basic criteria to request an official cost projection estimate on our direct WhatsApp line.",
    "contact.badge": "— Connect with us",
    "contact.heading": "Let's craft your next digital breakthrough.",
    "contact.sub": "Submit basic information about your current goals. Once submitted, your inquiry package will be finalized and we will open a direct chat on our Tangier WhatsApp helpline.",
    "contact.office": "Our Office",
    "contact.officeLoc": "Tangier, Morocco",
    "contact.email": "Email Support",
    "contact.waLive": "WhatsApp Live Help",
    "contact.successTitle": "Inquiry Sent!",
    "contact.successP": "Your briefing is compiled and ready. We are transitioning you to WhatsApp to start your instant session briefing.",
    "contact.submitAnother": "Submit Another Message",
    "contact.firstName": "First Name",
    "contact.firstNamePlaceholder": "e.g. Adam",
    "contact.lastName": "Last Name",
    "contact.lastNamePlaceholder": "e.g. Tazi",
    "contact.waNumber": "WhatsApp Number",
    "contact.waPlaceholder": "e.g. +212612345678",
    "contact.interestedService": "Interested Service",
    "contact.projectOverview": "Project Overview",
    "contact.projectPlaceholder": "Tell us about your brand, requirements, and budget targets...",
    "contact.btnSend": "Open WhatsApp Briefing",
    "contact.processing": "Processing...",

    // Checkout Page
    "checkout.metaTitle": "Finalize Your Selection | NACY ST Checkout",
    "checkout.emptyTitle": "Your order bag is empty",
    "checkout.emptyDesc": "Please select one of our premium services (Website Creation, AI Photo Shooting or Video Production) from our services directory first.",
    "checkout.goServices": "Go to Services",
    "checkout.backServices": "Back to Services",
    "checkout.orderSummary": "— ORDER SUMMARY",
    "checkout.heading": "Finalize Your Project",
    "checkout.pkgDetails": "Package Details",
    "checkout.basePrestation": "Base Package Prestation",
    "checkout.postLaunch": "Post-launch support",
    "checkout.included": "Included / Free",
    "checkout.processingFees": "Processing fees",
    "checkout.totalDue": "Total Due",
    "checkout.quoteNote": 'Once confirmed, we\'ll reach out within 24 hours to get started.',
    "checkout.billingHeading": "Billing & Contact Details",
    "checkout.firstNameLabel": "First Name *",
    "checkout.lastNameLabel": "Last Name *",
    "checkout.waPhoneLabel": "WhatsApp Phone Number *",
    "checkout.billingAddrLabel": "Full Billing Address *",
    "checkout.streetPlaceholder": "Street, District, App Number",
    "checkout.cityLabel": "City *",
    "checkout.cityPlaceholder": "e.g. Tangier",
    "checkout.zipLabel": "Postal / ZIP Code *",
    "checkout.zipPlaceholder": "e.g. 90000",
    "checkout.confirmBtn": "Confirm Project & Open WhatsApp",
    "checkout.confirming": "Finalizing Order...",
    "checkout.secure": "Secure Instant Briefing",
    "checkout.assistLine": "Direct Tangier, Morocco Assistance Line",
    "checkout.formError": "Please fill in all the required form fields.",
    "checkout.sessionError": "No selected product was found in your session.",

    // Footer
    "footer.desc": "NACY Solutions designs websites, premium AI photo shoots, and high-performance videos for modern businesses. Where strategy meets intelligence.",
    "footer.quickLinks": "Quick Links",
    "footer.services": "Our Services",
    "footer.creative": "Creative Studio",
    "footer.location": "Location",
    "footer.locationName": "Tangier, Morocco",
    "footer.allRights": "All rights reserved."
  },
  FR: {
    // Nav & Common
    "nav.services": "Services",
    "nav.whyUs": "Pourquoi Nous",
    "nav.pricing": "Tarifs",
    "nav.contact": "Contact",
    "nav.freeQuote": "Devis Gratuit",
    "nav.diagnostic": "— Diagnostics Premium",
    "nav.quoteSubtitle": "Obtenez Votre Devis Gratuit",
    "nav.quoteDescription": "Décrivez l'objectif de votre projet ci-dessous. Nous analyserons votre cahier des charges et modéliserons une proposition dédiée sous 24 heures.",
    "nav.quoteComplete": "Dossier de Briefing Complet !",
    "nav.quoteSuccessMsg": "Nous lançons une discussion en direct sur WhatsApp pour traiter immédiatement les paramètres de votre proposition.",
    "nav.fullName": "Nom Complet",
    "nav.fullNamePlaceholder": "ex. Adam Smith",
    "nav.emailAddress": "Adresse E-mail",
    "nav.emailAddressPlaceholder": "ex. adam@entreprise.com",
    "nav.preferredService": "Service Souhaité",
    "nav.serviceWeb": "Création de Site Web Digital",
    "nav.servicePhoto": "Séance Photo IA Qualité Studio",
    "nav.serviceVideo": "Production Vidéo Courte Virale",
    "nav.serviceCustom": "Autre Collaboration Sur Mesure",
    "nav.projectDetails": "Détails du Projet",
    "nav.detailsPlaceholder": "Dites-nous ce que vous aimeriez réaliser, la date cible de lancement, etc...",
    "nav.sendRequest": "Envoyer la Demande (Ouvrir WhatsApp)",

    // Home Page
    "home.metaTitle": "NACY ST — Agence Créative & Digitale de Haute Performance",
    "home.metaDesc": "NACY Solutions (NACY ST) conçoit des sites web personnalisés sans modèle, des séances photos IA réalistes et des vidéos virales à Tanger.",
    "home.metaOgTitle": "NACY ST — Artisans Digitaux Spécialisés",
    "home.metaOgDesc": "Ingénierie logicielle sur mesure et services créatifs professionnels à Tanger, Maroc.",
    "home.badge": "TANGER, MAROC",
    "home.titlePart1": "NOUS CRÉONS",
    "home.titlePart2": "CE QUE LES AUTRES",
    "home.titlePart3": "PROMETTENT SEULEMENT.",
    "home.subtitle": "Des sites web magnifiques codés à la main. Des photographies de produits IA ultra-réalistes. Des montages à fort taux de conversion pour TikTok et Reels.",
    "home.btnStart": "Démarrer un Projet",
    "home.btnServices": "Découvrir les Services",
    "home.expertBadge": "Certifié et Vérifié par des Experts",
    "home.gCertified": "Certifié Google Cloud",
    "home.eCertified": "Certifié Écosystème",
    "home.vIntegration": "Intégration Vérifiée",
    "home.statsProjects": "Projets Livrés",
    "home.statsConcept": "Premier Concept",
    "home.statsSatisfaction": "Satisfaction Client",
    "home.statsOfferings": "Offres Clés",

    // Marquee
    "marquee.website": "Ingénierie de Sites Web",
    "marquee.photo": "Séance Photo IA Produits Studio",
    "marquee.video": "Production TikTok & Reels Virale",
    "marquee.delivery": "Livraison Globale Rapide",
    "marquee.tangier": "Spécialistes Tanger Maroc",
    "marquee.zeroTemplates": "Zéro Modèle Lourd",

    // Home values Section
    "home.valuesBadge": "Nos Valeurs de Production",
    "home.valuesHeading": "Comment nous garantissons des livrables d'élite.",
    "home.p1Title": "1. Codage à la main Précis",
    "home.p1Desc": "Pas de constructeurs de sites, pas de modèles génériques. Chaque script, élément, style et disposition d'interface est codé à la main pour répondre aux normes modernes d'efficacité les plus élevées.",
    "home.p2Title": "2. Production IA Haute Vélocité",
    "home.p2Desc": "En intégrant des modèles génératifs spécialisés directement dans notre pipeline graphique, nous éliminons le besoin d'équipements coûteux tout en offrant un réalisme accru en un temps record.",
    "home.p3Title": "3. Briefings WhatsApp en Temps Réel",
    "home.p3Desc": "Dites adieu aux lignes d'assistance froides et lentes. Nous maintenons une communication directe et très active sur WhatsApp afin que vous puissiez examiner les concepts en temps réel.",
    "home.p4Title": "4. Transparence Totale",
    "home.p4Desc": "Pas de contrats complexes, pas de frais cachés surprises. Vous choisissez parmi nos barèmes de facturation explicites et recevez des actifs haut de gamme avec une entière propriété des droits d'auteur commerciaux.",

    // Home Testimonials
    "home.testimonialsBadge": "— Avis Vérifiés",
    "home.testimonialsHeading": "Ce que nos partenaires créatifs disent de NACY ST",
    "home.t1Text": "\"Le site web codé à la main livré par NACY ST a instantanément doublé nos prospects immobiliers à Tanger. Le codage technique et la réactivité sur WhatsApp sont exceptionnels !\"",
    "home.t1Author": "Anass M.",
    "home.t1Role": "Directeur Immobilier",
    "home.t2Text": "\"Leurs séances de photos IA de qualité studio sont époustouflantes. Nous avons envoyé de simples captures mobiles et avons reçu 45 photos de produits haut de gamme en moins de 48 heures.\"",
    "home.t2Author": "Sofia B.",
    "home.t2Role": "Fondatrice d'Atelier de Bijoux",
    "home.t3Text": "\"Compétences exceptionnelles en montage vidéo court. Nos Reels de produits sont devenus viraux instantanément, générant plus de 100K impressions en 3 jours. Je recommande vivement leurs packs dégressifs !\"",
    "home.t3Author": "Khalid H.",
    "home.t3Role": "Commerçant E-Commerce",

    // Why Us Page
    "why.metaTitle": "Pourquoi Nous | NACY ST — Pourquoi les Marques Intelligentes Nous Choissisent",
    "why.metaDesc": "Pourquoi les entreprises modernes choisissent NACY Solutions par rapport aux agences traditionnelles. Communications WhatsApp instantanées, performances de codage manuel et workflows IA exceptionnels.",
    "why.badge": "— Au-delà des Agences Standard",
    "why.heading": "Nous construisons ce que d'autres ne font que promettre.",
    "why.sub": "NACY Solutions (NACY ST) n'est pas une agence créative traditionnelle. Nous sommes une équipe tournée vers la technologie, concevant des sites web ultra-rapides, des visuels IA hyperréalistes et des contenus viraux pour les réseaux sociaux.",
    "why.card1Title": "Des Outils Plus Intelligents, des Résultats Plus Précis",
    "why.card1Desc": "En intégrant des flux de travail génératifs spécialisés dans notre processus de création, nous réduisons considérablement le temps de production standard sans compromis sur la qualité. Vous obtenez des actifs de pointe en quelques jours, pas en plusieurs mois.",
    "why.card2Title": "Codage à la Main Sans Modèle",
    "why.card2Desc": "La plupart des agences réutilisent des modèles WordPress identiques. Nous compilons des codes propres et sur mesure, optimisés pour un référencement instantané à Tanger ou mondialement, garantissant une immunité totale de la plate-forme et des lancements ultra-rapides.",
    "why.card3Title": "Communication WhatsApp Directe",
    "why.card3Desc": "Pas d'e-mails professionnels lents ou de délais d'assistance. Discutez en temps réel avec les ingénieurs et créateurs qui exécutent vos modifications. Transparence totale et réponses WhatsApp immédiates.",
    "why.card4Title": "Pas de Frais Cachés & Multi-Devises",
    "why.card4Desc": "Modèles de tarification multi-devises transparents. Sélectionnez votre devise de base et payez exactement ce qui y est affiché. Pas de frais surprises, pas de dépassements inattendus.",
    "why.quote": "\"Travailler avec NACY ST a donné l'impression d'ajouter instantanément un département technologique d'élite à notre firme immobilière. Ils ont livré un site web optimisé et produit 45 photos de produits en 72 heures.\"",
    "why.quoteAuthor": "— Anass Benjelloun, Directeur de l'Agence Immobilière de Tanger",
    "why.btn": "Commencez Votre Parcours",

    // Pricing Page
    "price.metaTitle": "Tarifs | NACY ST — Transparence Totale de Valeur",
    "price.metaDesc": "Calculez et consultez des tarifs transparents pour les développements digitaux, les shooting photo et les actifs vidéos viraux. Règlements multidevises rapides en MAD, EUR ou USD.",
    "price.badge": "— Tarifs Transparents",
    "price.heading": "Payez pour des résultats exquis, pas pour les intermédiaires de l'agence.",
    "price.sub": "Choisissez votre devise de facturation préférée pour visualiser les calculs fixes. Paiement instantané, zéro coût de configuration.",
    "price.switchMad": "MAD (Maroc)",
    "price.switchEur": "EUR (Europe)",
    "price.switchUsd": "USD (États-Unis)",
    "price.save": "Économisez {amount}",
    "price.singleProject": "Projet Unique",
    "price.commercialAssets": "Actifs Commerciaux",
    "price.degressiveBilling": "Facturation Dégressive",
    "price.selectVidBatch": "Sélectionner le Lot de Vidéos",
    "price.vidSuffix": "Vid.",
    "price.mostPopular": "Le Plus Populaire",
    "price.webSub": "Tout inclus, en ligne en 10 jours",
    "price.photoSub": "Livraison numérique sous 48 à 72 heures",
    "price.webF1": "Prototype interactif responsive sur mesure",
    "price.webF2": "Optimisation SEO globale, régionale et pour Tanger",
    "price.webF3": "Déclencheur d'indexation instantané (Google Search Console)",
    "price.webF4": "Score de performance mobile supérieur à 95%+",
    "price.webBtn": "Commencer avec le Web",
    "price.photoF1": "45 photos haute résolution professionnelles",
    "price.photoF2": "Retouches de lumière stables et avancées",
    "price.photoF3": "Décors professionnels ou lifestyle haut de gamme",
    "price.photoF4": "Licence complète d'usage mondial des droits d'auteur",
    "price.photoBtn": "Prendre le Pack Photo",
    "price.videoF1": "Layout vertical fluide optimisé pour Reels",
    "price.videoF2": "Graphismes animés dynamiques, sous-titres stylisés",
    "price.videoF3": "Livraison rapide : 48H par vidéo conçue",
    "price.videoBtn": "Commander {count} Vidéos",
    "price.videoBtnSingle": "Commander {count} Vidéo",

    // Services Page
    "services.metaTitle": "Services | NACY ST — Solutions Digitales Premium",
    "services.metaDesc": "Découvrez nos offres à haute conversion : ingénierie de site web sur mesure, shooting photo IA de studio et montages vidéo accrocheurs de produits à Tanger.",
    "services.badge": "— Services Spécialisés",
    "services.heading": "Des atouts numériques haute performance conçus pour la conversion.",
    "services.sub": "Nous fusionnons l'ingénierie logicielle professionnelle avec une créativité algorithmique profonde. Pas de modèles lents, pas de processus lourds. Uniquement des livrables de premier ordre.",
    "services.s01": "SERVICE 01",
    "services.s02": "SERVICE 02",
    "services.s03": "SERVICE 03",
    "services.webDesc": "Des sites web codés à la main et optimisés pour s'imposer sur Google. Temps de réponse ultra-rapides, graphismes sur mesure et design épuré adaptés à votre entonnoir de conversion.",
    "services.webF1": "Conception unique sur mesure, strictement sans modèles",
    "services.webF2": "Intégration d'un SEO global & balises sémantiques",
    "services.webF3": "Performances de framework fluides et ultra-réactives",
    "services.webF4": "30 jours de mises à jour techniques de courtoisie",
    "services.photoDesc": "Photos de produits de qualité studio HD à une fraction du coût habituel. Nous exploitons des technologies IA avancées pour créer des éclairages de studio, des modèles parfaits et des décors sur mesure.",
    "services.photoF1": "Package complet de 45 photos haute définition",
    "services.photoF2": "Éclairage d'ambiance et arrière-plans localisés",
    "services.photoF3": "Génération de mannequins stables et ultra-réalistes",
    "services.photoF4": "Licence complète d'utilisation commerciale mondiale",
    "services.videoDesc": "Montages vidéo engageants spécialement écrits et coupés pour vos Reels, TikTok et YouTube Shorts. Conçus sur des leviers psychologiques forts pour capter l'attention dès la première seconde.",
    "services.videoF1": "Format vertical optimisé pour TikTok et Reels",
    "services.videoF2": "Rythme très dynamique, textes animés & synthèse sonore",
    "services.videoF3": "Voix off organiques professionnelles en option",
    "services.startingFrom": "À partir de",
    "services.totalPackage": "Pack Complet",
    "services.totalCost": "Coût Total",
    "services.orderNow": "Commander",
    "services.bookShoot": "Réserver le Shoot",
    "services.orderVideos": "Commander les Vidéos",
    "services.customHeading": "Besoin d'une configuration entièrement personnalisée ?",
    "services.customSub": "Nous sommes spécialisés dans les systèmes sur mesure, l'identité visuelle de marque et les collaborations à long terme. Contactez-nous maintenant sur WhatsApp.",
    "services.customBtn": "Discuter du Projet",

    // Contact Page
    "contact.metaTitle": "Assistance | NACY ST — Analyse Exclusive de Projet",
    "contact.metaDesc": "Discutez avec NACY Solutions à Tanger. Soumettez votre besoin pour obtenir une projection budgétaire et démarrer sur WhatsApp.",
    "contact.badge": "— Contactez-nous",
    "contact.heading": "Concevons votre prochaine percée numérique.",
    "contact.sub": "Entrez les informations de base de vos objectifs actuels. Une fois envoyées, votre dossier de demande sera finalisé et nous ouvrirons un chat direct sur notre assistance WhatsApp.",
    "contact.office": "Notre Bureau",
    "contact.officeLoc": "Tanger, Maroc",
    "contact.email": "Assistance E-mail",
    "contact.waLive": "WhatsApp Direct 24/7",
    "contact.successTitle": "Demande Envoyée !",
    "contact.successP": "Votre briefing est compilé et prêt. Nous vous redirigeons vers WhatsApp pour démarrer votre briefing instantané.",
    "contact.submitAnother": "Envoyer un autre message",
    "contact.firstName": "Prénom",
    "contact.firstNamePlaceholder": "ex. Adam",
    "contact.lastName": "Nom",
    "contact.lastNamePlaceholder": "ex. Tazi",
    "contact.waNumber": "Numéro WhatsApp",
    "contact.waPlaceholder": "ex. +212612345678",
    "contact.interestedService": "Service Intéressé",
    "contact.projectOverview": "Aperçu du Projet",
    "contact.projectPlaceholder": "Parlez-nous de votre marque, de vos besoins et de vos objectifs budgétaires...",
    "contact.btnSend": "Ouvrir le Briefing WhatsApp",
    "contact.processing": "Traitement en cours...",

    // Checkout Page
    "checkout.metaTitle": "Finalisation de Votre Dossier | NACY ST",
    "checkout.emptyTitle": "Votre panier est vide",
    "checkout.emptyDesc": "Veuillez d'abord sélectionner l'un de nos services premium (Création de Site Web, Séance Photo IA ou Production Vidéo) depuis notre annuaire.",
    "checkout.goServices": "Aller aux Services",
    "checkout.backServices": "Retour aux Services",
    "checkout.orderSummary": "— RÉSUMÉ DE LA COMMANDE",
    "checkout.heading": "Finalisez Votre Projet",
    "checkout.pkgDetails": "Détails du Package",
    "checkout.basePrestation": "Prestation de base du package",
    "checkout.postLaunch": "Accompagnement après-lancement",
    "checkout.included": "Inclus / Gratuit",
    "checkout.processingFees": "Frais de dossier",
    "checkout.totalDue": "Total Dû",
    "checkout.quoteNote": "Une fois confirmé, nous reviendrons vers vous sous 24 heures pour démarrer le projet.",
    "checkout.billingHeading": "Facturation & Coordonnées",
    "checkout.firstNameLabel": "Prénom *",
    "checkout.lastNameLabel": "Nom de famille *",
    "checkout.waPhoneLabel": "Numéro de téléphone WhatsApp *",
    "checkout.billingAddrLabel": "Adresse de facturation complète *",
    "checkout.streetPlaceholder": "Rue, Quartier, Numéro de bureau/appartement",
    "checkout.cityLabel": "Ville *",
    "checkout.cityPlaceholder": "ex. Tanger",
    "checkout.zipLabel": "Code Postal / ZIP *",
    "checkout.zipPlaceholder": "ex. 90000",
    "checkout.confirmBtn": "Valider le Projet & Ouvrir WhatsApp",
    "checkout.confirming": "Finalisation de la commande...",
    "checkout.secure": "Briefing Instantané Sécurisé",
    "checkout.assistLine": "Ligne d'assistance directe Tanger, Maroc",
    "checkout.formError": "Veuillez remplir tous les champs obligatoires du formulaire.",
    "checkout.sessionError": "Aucun produit sélectionné n'a été trouvé dans votre session.",

    // Footer
    "footer.desc": "NACY Solutions conçoit des sites web personnalisés, des shootings photo premium par IA et des montages vidéo courts de haute performance. Là où la créativité rencontre l'intelligence.",
    "footer.quickLinks": "Liens Rapides",
    "footer.services": "Nos Services",
    "footer.creative": "Studio Créatif",
    "footer.location": "Localisation",
    "footer.locationName": "Tanger, Maroc",
    "footer.allRights": "Tous droits réservés."
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageType>(() => {
    const saved = localStorage.getItem("nacy_language");
    return (saved === "EN" || saved === "FR") ? (saved as LanguageType) : "EN";
  });

  const setLanguage = (lang: LanguageType) => {
    setLanguageState(lang);
    localStorage.setItem("nacy_language", lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === "EN" ? "FR" : "EN");
  };

  const t = (key: string, replacements?: Record<string, string | number>): string => {
    const langDict = dictionary[language];
    let template = langDict[key] || dictionary["EN"][key] || key;

    if (replacements) {
      Object.entries(replacements).forEach(([k, v]) => {
        template = template.replace(new RegExp(`{${k}}`, "g"), String(v));
      });
    }

    return template;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
};
