import Avatar from '../../assets/images/avatar.png';
import Abijo from '../../assets/images/about/adeyemi-abijo.jpeg';
import Ademilola from '../../assets/images/lawyers/ademilola.jpeg';
import Adeola from '../../assets/images/about/adeola-folarin.jpeg';
import Adesola from '../../assets/images/about/adesola-adekunbi.jpeg';
import Bartholomew from '../../assets/images/about/bartholomew-aguegbodo.jpeg';
import Ezekiel from '../../assets/images/about/ezekiel-olugbenga.jpeg';

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

export const PAYMENT_HEADERS = [
  'S/N',
  'Date',
  'Payment details',
  'Amount',
  'Status'
];

export const MEETING_HEADERS = [
  'S/N',
  'Title',
  'Description',
  'Date',
  'Time (24hrs)'
];

export const MEMBERS_HEADERS = [
  'S/N',
  'Name',
  'Court Number',
  'Status',
  'Action'
];

// delete later
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

export const TEXT_RESTRICTIONS = {
  short_text: 80,
  medium_text: 100,
  long_text: 250
};

export const DATE_FORMAT = 'YYYY-MM-DD';

export const DATE_FORMAT_VIEW = 'DD-MM-YYYY';
