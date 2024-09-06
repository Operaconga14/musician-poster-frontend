import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContributorsService {

  contributors_image = [
    `https://res.cloudinary.com/defmlxshw/image/upload/atwole_cst6en.jpg`,
    `https://res.cloudinary.com/defmlxshw/image/upload/austin_swbrya.png`,
    `https://res.cloudinary.com/defmlxshw/image/upload/teePrime_svad0l.jpg`,
    `https://res.cloudinary.com/defmlxshw/image/upload/pclassic_pgjkvc.jpg`,
    `https://res.cloudinary.com/defmlxshw/image/upload/Tjones_xqzevg.jpg`
  ]

  contributors = [
    {
      name: "Jones Osele",
      nickname: "Tim Jones",
      profession: [
        "Data Professional",
        " Data Analyst",
        " Business Intelligence Analyst",
        ' Pianist'],
      imageUrl: "https://res.cloudinary.com/defmlxshw/image/upload/Tjones_xqzevg.jpg",
      socialHandles: {
        facebook: "https://www.facebook.com/osele.jones",
        instagram: "https://www.instagram.com/pianistician",
        twitter: "https://x.com/timi_jaykeyz",
        linkedin: "https://www.linkedin.com/in/osele-jones",
        youtube: null,
        tiktok: null
      }

    },
    {
      name: "Makinde Pelumi",
      nickname: "p.classic",
      profession: ['Drummer'],
      imageUrl: "https://res.cloudinary.com/defmlxshw/image/upload/pclassic_pgjkvc.jpg",
      socialHandles: {
        facebook: "https://www.facebook.com/profile.php?id=61553918004773",
        instagram: null,
        twitter: null,
        linkedin: null,
        youtube: null,
        tiktok: "https://www.tiktok.com/@p.classic_",
      }

    },
    {
      name: "Ndukwe Augustine",
      nickname: "Dir. Austin",
      profession: ['Cinematographer'],
      imageUrl: "https://res.cloudinary.com/defmlxshw/image/upload/austin_swbrya.png",
      socialHandles: {
        facebook: "https://www.facebook.com/profile.php?id=100094673947476&mibextid=ZbWKwL",
        instagram: "https://www.instagram.com/eagles_visual?igsh=YjFwNTFsbm9iMmF6",
        twitter: null,
        linkedin: null,
        youtube: null,
        tiktok: null,
      }

    },
    {
      name: "Adesoun Kolawole",
      nickname: "Atwole",
      profession: ['Musician', ' Blogger', ' Sound operator'],
      imageUrl: "https://res.cloudinary.com/defmlxshw/image/upload/atwole_cst6en.jpg",
      socialHandles: {
        facebook: "https://www.facebook.com/atwoleblog247/",
        instagram: "https://www.instagram.com/atwoleblog247/",
        twitter: null,
        linkedin: null,
        youtube: null,
        tiktok: "https://www.tiktok.com/@atwoleblog2474",
      }

    },
    {
      name: "Olatunde Tobiloba",
      nickname: "TeePrime Ayo",
      profession: ['Web Designer', '  Graphics Designer', ' Music Instructor', ' Guitarist'],
      imageUrl: "https://res.cloudinary.com/defmlxshw/image/upload/teePrime_svad0l.jpg",
      socialHandles: {
        facebook: "https://www.facebook.com/profile.php?id=100017047276156",
        instagram: "https://www.instagram.com/teeprime_ayoguita/",
        twitter: "https://x.com/TeePrime_Ayo",
        linkedin: null,
        youtube: null,
        tiktok: null,
      }

    },
    {
      name: "Amire Jsoeph",
      nickname: "Operaconga",
      profession: ['Fullstack Developer ', '  Bassist'],
      imageUrl: "",
      socialHandles: {
        facebook: "https://www.facebook.com",
        instagram: "https://www.instagram.com",
        twitter: "https://www.twitter.com",
        linkedin: "https://www.linkedin.com",
        youtube: "https://www.youtube.com",
        tiktok: "https://www.titok.com",
      }

    }
  ]
}
