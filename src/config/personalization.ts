// -------------------------------------------------------------
// ROMANTIC PERSONALIZATION DATA CONFIGURATION
// Centralized configuration for Vicky & Afzal's Universe
// -------------------------------------------------------------

export interface MemoryPhoto {
  id: string;
  url: string;
  caption: string;
  subCaption: string;
  objectPosition?: string;
}

export interface LoveReason {
  id: number;
  title: string;
  description: string;
  emoji: string;
  highlight: string;
}

export interface SequentialChapter {
  id: number;
  badge: string;
  title: string;
  quote: string;
  photoUrl: string;
  objectPosition?: string;
}

export const PERSONALIZATION = {
  herName: "Vicky",
  herNickname: "My Bujji / My Queen",
  myName: "Afzal",
  myNickname: "Your Bava / Forever Yours",
  birthdayDate: "20 November 2005",
  centralTheme: "The Midnight Express To Eternity • Vicky & Afzal",

  // 1. Magical Opening
  entrance: {
    greeting: "Hey, My Bujji Vicky ❤️",
    tagline: "Welcome aboard our Midnight Express to Eternity.",
    line1: "Somewhere between swaying train coaches and late-night station lights...",
    line2: "There's one soul who stole your Bava's heart and turned every simple journey into my whole world.",
    revealName: "VICKY ❤️",
    subtext: "20 November 2005 • The day heaven sent an angel to earth, born to be your Bava's forever.",
    ctaButtonText: "BOARD OUR MIDNIGHT SURPRISE 🚆❤️",
  },

  // 2. Birthday Celebration
  birthday: {
    heading: "HAPPY BIRTHDAY, MY ANGEL VICKY! 🎂✨",
    subheading: "20 November 2005 • The Day An Angel Was Born On Earth 🕊️✨",
    blowCandlePrompt: "Make a secret wish and tap the flame... 🕯️",
    blownCandleSuccess: "Your wish is forever sealed into the night sky with my heart! ✨",
    letterMessage: [
      "Happy Birthday, my angelic Vicky! 🎂✨",
      "On 20 November 2005, the heavens opened and sent the purest angel down to this earth—born to bring light into my world and steal your Bava's heart forever.",
      "From sharing whispers on the train berth to holding hands on swaying tracks, every second with you is my greatest blessing.",
      "You are not just a passenger in my life, Bujji; you are my favorite destination across all universes and all lifetimes.",
    ],
    authorSign: "With all my love & soul,\nYour Bava, Afzal ❤️",
    nextButtonText: "Board The Midnight Express 🚆❤️",
  },

  // 3. Friendship Memories (Photo Gallery)
  memories: {
    title: "Our Train & Sacred Memories",
    subtitle: "Swaying tracks, tangled fingers on the train floor, and pure love.",
    photos: [
      {
        id: "p1",
        url: "/assets/photos/photo1.jpg",
        caption: "Our Midnight Berth",
        subCaption: "Resting close as the train swayed into the night. Time completely stopped in our coupe.",
        objectPosition: "object-[center_20%]",
      },
      {
        id: "p2",
        url: "/assets/photos/photo2.jpg",
        caption: "Hands Clasped on the Train Floor",
        subCaption: "Our secret train moments—fingers intertwined tight with pure devotion.",
        objectPosition: "object-center",
      },
      {
        id: "p3",
        url: "/assets/photos/photo4.jpg",
        caption: "Porch Memories in Blue Saree",
        subCaption: "Sitting with effortless grace, taking my breath away with every glance.",
        objectPosition: "object-[center_35%]",
      },
      {
        id: "p4",
        url: "/assets/photos/photo5.jpg",
        caption: "The Queen of My Heart",
        subCaption: "That gentle, radiant smile that lights up my darkest midnight journeys.",
        objectPosition: "object-[center_25%]",
      },
      {
        id: "p5",
        url: "/assets/photos/photo6.jpg",
        caption: "My Royal Queen",
        subCaption: "Traditional beauty, pure elegance, and the soul I choose across every lifetime.",
        objectPosition: "object-top",
      },
    ],
  },

  // 4. How Friendship Became Love (The 5 sequential chapters)
  friendshipToLove: {
    title: "From Train Passengers to Soulmates",
    subtitle: "How our journey on the rails turned into an unbreakable bond of love.",
    chapters: [
      {
        id: 1,
        badge: "Station 01: The Beginning",
        title: "Two Travelers on the Same Train",
        quote: "We started as two friends sharing laughs and glances across the berth, never knowing destiny had booked us on the same lifetime express.",
        photoUrl: "/assets/photos/photo1.jpg",
        objectPosition: "object-[center_20%]",
      },
      {
        id: 2,
        badge: "Station 02: The Midnight Express",
        title: "Hands Clasped on Swaying Tracks",
        quote: "As the train rushed through the dark, our endless whispers made every station blur away. Holding hands on the train floor, two souls became one.",
        photoUrl: "/assets/photos/photo2.jpg",
        objectPosition: "object-center",
      },
      {
        id: 3,
        badge: "Station 03: The Turning Point",
        title: "When Friendship Felt Like Forever",
        quote: "Resting close to you as the world passed by, every guard I ever held simply melted away. I realized I was hopelessly and purely in love with you.",
        photoUrl: "/assets/photos/photo4.jpg",
        objectPosition: "object-[center_35%]",
      },
      {
        id: 4,
        badge: "Station 04: The Devotion",
        title: "The Smile That Stole My Soul",
        quote: "Watching station lights illuminate your angelic smile, my heart made its eternal vow. You are my only stop, Bujji.",
        photoUrl: "/assets/photos/photo5.jpg",
        objectPosition: "object-[center_25%]",
      },
      {
        id: 5,
        badge: "Final Station: Forever",
        title: "My Royal Queen & Lifetime Soulmate",
        quote: "Traditional grace, unmatched beauty. You take my breath away every single time, Bujji. No matter where the tracks lead, you will always be your Bava's queen and forever.",
        photoUrl: "/assets/photos/photo6.jpg",
        objectPosition: "object-top",
      },
    ],
    nextButtonText: "Step Into Our Story 🚆❤️",
  },

  // 5. Relationship Story Overview
  story: {
    title: "Our Midnight Train To Forever",
    subtitle: "A love story written along rhythmic tracks, dark corridors, and starry skies.",
    highlights: [
      {
        title: "The Journey Began On The Tracks",
        description: "No grand reservations, just two hearts boarding the same train and discovering an ancient, magnetic bond.",
      },
      {
        title: "Midnight Whispers & Swaying Coaches",
        description: "Hours melted away as station lights flashed past our window. We never ran out of words, smiles, and stolen glances.",
      },
      {
        title: "Hands Locked on the Train Floor",
        description: "When the train rocked through the dark, our fingers locked tight—a silent, sacred vow that your Bava will never let Bujji go.",
      },
      {
        title: "A One-Way Ticket to Eternity",
        description: "Celebrating your birthday today, knowing that having you as my co-passenger is the greatest blessing of my existence.",
      },
    ],
    nextButtonText: "Read Why My Heart Aches For You ❤️",
  },

  // 6. Reasons I Love You
  reasons: {
    title: "Reasons Why My Soul Chooses You",
    subtitle: "Touch each card to unlock the dark, passionate reasons you own me.",
    items: [
      {
        id: 1,
        title: "Your mesmerizing eyes",
        description: "Dark pools of tenderness where I lose my mind and find my peace every single time.",
        emoji: "✨",
        highlight: "Hypnotic & Deep",
      },
      {
        id: 2,
        title: "The warmth of your touch",
        description: "Whenever your fingers brush against mine on the train floor, an electric current rushes through my entire soul.",
        emoji: "🔥",
        highlight: "Electric & Real",
      },
      {
        id: 3,
        title: "Your innocent yet captivating smile",
        description: "A weapon of pure sweetness that disarms every defense I have ever had.",
        emoji: "🌸",
        highlight: "My Weakness",
      },
      {
        id: 4,
        title: "Watching you sleep on train rides",
        description: "The sweet peace on your face as the train sways, feeling your soft breathing beside me—my favorite view in the universe.",
        emoji: "🚆",
        highlight: "Pure Peace",
      },
      {
        id: 5,
        title: "The way you softly call me 'Bava'",
        description: "Whenever you whisper 'Bava'... my whole world stops. The sweetest melody in the universe, filled with tender love, playful warmth, and our eternal promise.",
        emoji: "💬",
        highlight: "Favorite Melody",
      },
      {
        id: 6,
        title: "Your beautiful, gentle soul",
        description: "Behind your fiery spirit lies the purest, most compassionate heart in this entire world.",
        emoji: "💖",
        highlight: "Pure Gold",
      },
      {
        id: 7,
        title: "Our late-night silence",
        description: "Listening to the rhythmic hum of the tracks together without saying a word, knowing our hearts speak fluently.",
        emoji: "🌙",
        highlight: "Sacred Silence",
      },
      {
        id: 8,
        title: "Simply because you're Vicky",
        description: "No conditions, no rules. You own every chamber of my heart just by existing as you are.",
        emoji: "👑",
        highlight: "My Only Queen",
      },
      {
        id: 9,
        title: "Our train floor moments",
        description: "Sitting together, laughing over silly jokes, hands locked tight with pink hearts between us.",
        emoji: "🥰",
        highlight: "Irreplaceable",
      },
      {
        id: 10,
        title: "The sanctuary of your hugs",
        description: "When you wrap your arms around me, the chaotic world dissolves into nothingness.",
        emoji: "🫂",
        highlight: "My Safe Haven",
      },
      {
        id: 11,
        title: "Your fierce loyalty",
        description: "Standing by me with unwavering belief, making me feel like the strongest man alive.",
        emoji: "🤝",
        highlight: "Unshakeable Trust",
      },
      {
        id: 12,
        title: "Our destined tomorrow",
        description: "Because my life is only complete with you walking—and traveling—beside me until our very last breath.",
        emoji: "🌟",
        highlight: "Our Eternity",
      },
    ],
    nextButtonText: "Open My Dark Love Letter ❤️🔥",
  },

  // 7. Dark Romance Love Letter
  darkLetter: {
    envelopeTitle: "A Dark Romance Epistle From Your Bava...",
    envelopeSubtitle: "Written in the shadows of our midnight train, sealed with burning devotion.",
    openButtonText: "BREAK THE SEAL & READ ❤️🔥",
    recipient: "My Dearest Bujji Vicky,",
    paragraphs: [
      "If the universe collapsed into eternal darkness, I would still recognize the rhythm of your heartbeat blindfolded.",
      "On 20th November 2005, an angel came down to this earth. Long before we ever locked eyes across that train berth, destiny had already engraved your name on my soul.",
      "I will never forget our midnight train journeys together. The cool night air through the train window, the rhythmic hum of the rails beneath us, and the way your eyes sparkled under the dim compartment lights.",
      "The train rushed through the dark at a hundred miles an hour, but sitting beside you, the entire world stood perfectly still.",
      "You didn't just walk into my life; you took root deep inside my soul. Before you, my heart was a quiet, guarded fortress. With one smile on that train berth, you made me surrender everything.",
      "I love you with an intensity that is fierce, passionate, and utterly unconditional. You are not a temporary station in my life—you are my final destination, my gravity, and my home.",
      "When you held my hand on the train floor, all the restless noise inside my mind dissolved into peace. When I look at you, I don't just see a beautiful girl; I see my destiny, my purpose, and my sanctuary.",
      "I promise to stand between you and every sorrow. I promise to shield you, worship you, protect you, and cherish you through every storm.",
      "Happy Birthday, My Bujji. You are the poetry God wrote with His most delicate touch, born on that magical 20th of November to rule your Bava's heart.",
      "Never forget: You belong to my heart, and I am irrevocably, eternally yours—forever your Bava.",
    ],
    signOff: "With a heart that bleeds love only for you,",
    senderName: "Afzal (Forever Your Bava)\nYour Lover & Your Protector. ❤️🔥",
    closingLine: "Some souls are tied by thread. Ours are bound by the steel rails of destiny.",
    nextButtonText: "MY FINAL QUESTION FOR YOU 🚆❤️",
  },

  // 8. Romantic Final Question Preamble
  questionPreamble: {
    line1: "Vicky, my Bujji...",
    line2: "There is a question burning within my soul.",
    line3: "A promise that will echo across lifetimes.",
    nextButtonText: "Ask Me, Bava ❤️",
  },

  // 9. Final Proposal & Celebration
  proposal: {
    question: "Vicky, my beautiful Bujji... will you be my lifetime co-passenger, holding my hand through every station, every storm, and every sunset on our journey to forever?",
    yesButtonText: "YES, ALWAYS MY BAVA! 🚆❤️",
    hugButtonText: "PULL ME CLOSE IN OUR COUPÉ, BAVA 🥺❤️",
    acceptance: {
      title: "TICKET TO ETERNITY CONFIRMED! 🚆❤️🔥",
      message: "Vicky, here's to our midnight train journeys, our sacred bond, and every lifetime we will conquer together.",
      birthdayCheer: "Happy Birthday to the angel born on 20 Nov 2005 • My Queen Vicky 🎂✨",
      signature: "Forever Your Bava, Afzal ❤️",
      finalPhotoUrl: "/assets/photos/photo3.jpg",
      finalPhotoCaption: "From train passengers to soulmates forever.",
    },
    hugResponse: {
      title: "Wrapped tight in our sleeper coupé! Holding you close, my Bujji! 🥺❤️",
      message: "Listening to the rhythm of the tracks together, holding you tight against my chest. Your Bava is yours today, tomorrow, and for all eternity.",
      returnButtonText: "Back to My Question ❤️",
    },
  },

  // Audio Config
  music: {
    audioPath: "/assets/music/lover-bgm.mp3",
    title: "LOVER BGM",
    artist: "Afzal & Vicky's Theme",
  },
};
