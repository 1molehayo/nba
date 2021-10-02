import HeroImage1 from '../assets/images/home/hero-image1.png';
import HeroImage2 from '../assets/images/home/hero-image2.png';
import HeroImage3 from '../assets/images/home/hero-image3.png';

// Lawyers
import Avatar from '../assets/images/avatar.png';
import Abijo from '../assets/images/about/adeyemi-abijo.jpeg';
import Ada from '../assets/images/about/ada-ahubelem.jpeg';
import Ademilola from '../assets/images/lawyers/ademilola.jpeg';
import Adeola from '../assets/images/about/adeola-folarin.jpeg';
import Adesola from '../assets/images/about/adesola-adekunbi.jpeg';
import Bartholomew from '../assets/images/about/bartholomew-aguegbodo.jpeg';
import Ezekiel from '../assets/images/about/ezekiel-olugbenga.jpeg';
import Marvin from '../assets/images/about/marvin-ogah.jpeg';
import Omozusi from '../assets/images/about/omozusi-omokhafe.jpeg';

// news
import NewsImage1 from '../assets/images/news/news1.png';
import NewsImage2 from '../assets/images/news/news2.png';
import NewsImage3 from '../assets/images/news/news3.png';

// events
import EventsImage1 from '../assets/images/events/event1.png';
import EventsImage2 from '../assets/images/events/event2.png';
import EventsImage3 from '../assets/images/events/event3.png';
import EventsImage4 from '../assets/images/events/event4.png';

export const MEDIA_MENU = [
  {
    name: 'News',
    url: '/news'
  },
  {
    name: 'Events',
    url: '/events'
  }
];

export const PROFILE_MENU = [
  {
    name: 'View profile',
    url: '/profile'
  },
  {
    name: 'Log out',
    url: '/logout'
  }
];

export const HERO_SLIDES = [
  {
    id: 1,
    title: `FAWEHIMI I <br /> SM 2019`,
    desc: 'Moments captured at the 17th FAWEHIM II SM',
    image: HeroImage1.src,
    url: ''
  },
  {
    id: 2,
    title: `FAWEHIMI II <br /> SM 2020`,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    image: HeroImage2.src,
    url: ''
  },
  {
    id: 3,
    title: `FAWEHIMI III <br /> SM 2021`,
    desc: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    image: HeroImage3.src,
    url: ''
  }
];

export const LAWYERS = [
  {
    id: 'lawyer-1',
    name: 'F.A. Abijo, ESQ',
    bio: 'perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo',
    image: Abijo,
    job: 'Snr Associate',
    social_media: {
      email: '#',
      linkedin: '#',
      phone: '#'
    }
  },
  {
    id: 'lawyer-2',
    name: 'Ademilola Adeola',
    bio: 'perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo',
    image: Ademilola,
    job: 'Associate',
    social_media: {
      email: '#',
      linkedin: '#',
      phone: '#'
    }
  },
  {
    id: 'lawyer-3',
    name: 'Adeola Q. Folarin',
    bio: 'perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo',
    image: Adeola,
    job: 'Associate',
    social_media: {
      email: '#',
      linkedin: '#',
      phone: '#'
    }
  },
  {
    id: 'lawyer-4',
    name: 'Adesola Adekumbi Bello',
    bio: 'perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo',
    image: Adesola,
    job: 'Associate',
    social_media: {
      email: '#',
      linkedin: '#',
      phone: '#'
    }
  },
  {
    id: 'lawyer-5',
    name: 'Bartholomew Aguegbodo, ESQ',
    bio: 'perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo',
    image: Bartholomew,
    job: 'Managing Partner',
    social_media: {
      email: '#',
      linkedin: '',
      phone: ''
    }
  },
  {
    id: 'lawyer-6',
    name: 'Ezekiel Olugbenga Bodunde, ESQ.',
    bio: 'perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo',
    image: Ezekiel,
    job: 'Snr Associate',
    social_media: {
      email: '#',
      linkedin: '#',
      phone: '#'
    }
  },
  {
    id: 'lawyer-7',
    name: 'John Doe',
    bio: 'perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo',
    image: Avatar,
    job: 'Associate',
    social_media: {
      email: '#',
      linkedin: '#',
      phone: '#'
    }
  },
  {
    id: 'lawyer-8',
    name: 'Jane Doe',
    bio: 'perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo',
    image: Avatar,
    job: 'Associate',
    social_media: {
      email: '#',
      linkedin: '#',
      phone: '#'
    }
  }
];

export const NEWS = [
  {
    id: 'news-1',
    date: 'Aug 5, 2021',
    title: 'Moment captured at the 17th FAWEHIM II SM ',
    desc: 'perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae ',
    image: NewsImage1.src
  },
  {
    id: 'news-2',
    date: 'Aug 6, 2021',
    title: 'Moment captured at the 17th FAWEHIM II SM ',
    desc: 'perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae ',
    image: NewsImage2.src
  },
  {
    id: 'news-3',
    date: 'Aug 7, 2021',
    title: 'Moment captured at the 17th FAWEHIM II SM ',
    desc: 'perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae ',
    image: NewsImage3.src
  }
];

export const EVENTS = [
  {
    id: 'event-1',
    date: 'Aug 5, 2021',
    time: '10:00am',
    title: 'FAWEHIM II SM 2021',
    desc: 'The Nigerian Bar Association (NBA) held her 1st National Executive Committee (NEC) meeting of 2021 on March 18, 2021 at the Emerald Event Centre, Uyo, Akwa Ibom State...',
    image: EventsImage1.src,
    venue: 'Lagos, Nigeria'
  },
  {
    id: 'event-2',
    date: 'Aug 6, 2021',
    time: '11:00am',
    title: 'FAWEHIM II SM 2021',
    desc: 'The Nigerian Bar Association (NBA) held her 1st National Executive Committee (NEC) meeting of 2021 on March 18, 2021 at the Emerald Event Centre, Uyo, Akwa Ibom State...',
    image: EventsImage2.src,
    venue: 'Lagos, Nigeria'
  },
  {
    id: 'event-3',
    date: 'Aug 7, 2021',
    time: '10:00am',
    title: 'FAWEHIM II SM 2021',
    desc: 'The Nigerian Bar Association (NBA) held her 1st National Executive Committee (NEC) meeting of 2021 on March 18, 2021 at the Emerald Event Centre, Uyo, Akwa Ibom State...',
    image: EventsImage3.src,
    venue: 'Lagos, Nigeria'
  },
  {
    id: 'event-4',
    date: 'Aug 7, 2021',
    time: '12:00am',
    title: 'FAWEHIM II SM 2021',
    desc: 'The Nigerian Bar Association (NBA) held her 1st National Executive Committee (NEC) meeting of 2021 on March 18, 2021 at the Emerald Event Centre, Uyo, Akwa Ibom State...',
    image: EventsImage4.src,
    venue: 'Lagos, Nigeria'
  }
];

export const PEOPLE_DATA = [
  {
    id: 'people-01',
    name: 'Bartholomew Aguegbodo',
    job: 'chairman',
    image: Bartholomew.src
  },
  {
    id: 'people-02',
    name: 'Adeyemi Abijo',
    job: 'general secretary',
    image: Abijo.src
  },
  {
    id: 'people-03',
    name: 'Adedoyin Shobiye',
    job: 'vice chairman',
    image: Avatar.src
  },
  {
    id: 'people-04',
    name: 'Ade Ahubelem',
    job: 'treasurer',
    image: Ada.src
  },
  {
    id: 'people-05',
    name: 'Ademilola Demilade',
    job: 'financial secretary',
    image: Avatar.src
  },
  {
    id: 'people-06',
    name: 'Adesola O. Bello',
    job: 'social secretary',
    image: Adesola.src
  },
  {
    id: 'people-07',
    name: 'Adeola Folarin',
    job: 'welfare secretary ',
    image: Adeola.src
  },
  {
    id: 'people-08',
    name: 'Marvin Ibem',
    job: 'publicity secretary',
    image: Marvin.src
  },
  {
    id: 'people-09',
    name: 'Ezekiel O. Bodunde',
    job: 'assistant general sec.',
    image: Ezekiel.src
  },
  {
    id: 'people-10',
    name: 'Tracy Ugboaku',
    job: 'legal advisor',
    image: Avatar.src
  },
  {
    id: 'people-11',
    name: 'Omozusi Omokhaje',
    job: 'provost',
    image: Omozusi.src
  }
];

export const VIDEO_PLAYER_SETTINGS = {
  width: '100%',
  height: '100%',
  config: {
    youtube: {
      playerVars: { disablekb: 1 },
      showinfo: 0
    }
  }
};
