export const nodes = [
  { id: "abc",
    imageSrc : "https://konvajs.org/assets/yoda.jpg",
    x:390,
    y:265,
    type-media: 'image'
  },
  { id: "xyz",
    imageSrc : "https://news.artnet.com/app/news-upload/2014/10/Sothebys-Warhol-Debbie-Harry-256x256.jpg",
    x:390,
    y:700,
    type-media: 'image'
  }
];

export const edges = [
    {from:'abc',   to:'xyz', point-from:[250,250],point-to:[550,550]}
];
