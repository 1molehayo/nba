import Avatar from '../../assets/images/avatar.png';
import Abijo from '../../assets/images/about/adeyemi-abijo.jpeg';
import Ademilola from '../../assets/images/lawyers/ademilola.jpeg';
import Adeola from '../../assets/images/about/adeola-folarin.jpeg';
import Adesola from '../../assets/images/about/adesola-adekunbi.jpeg';
import Bartholomew from '../../assets/images/about/bartholomew-aguegbodo.jpeg';
import Ezekiel from '../../assets/images/about/ezekiel-olugbenga.jpeg';

import BookAvatar from '../../assets/images/book-avatar.png';

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
  'Start Time'
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

export const BOOKS = [
  {
    id: 'book-01',
    title: 'The Night Profecy',
    author: 'John Doe',
    publisher: 'lawyer-1',
    image: BookAvatar.src,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non sapien at arcu sodales pellentesque. Etiam semper velit ant e'
  },
  {
    id: 'book-01',
    title: 'The Night Profecy',
    author: 'John Doe',
    publisher: 'lawyer-1',
    image: BookAvatar.src,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non sapien at arcu sodales pellentesque. Etiam semper velit ant e'
  },
  {
    id: 'book-02',
    title: 'The Night Profecy',
    author: 'John Doe',
    publisher: 'lawyer-1',
    image: BookAvatar.src,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non sapien at arcu sodales pellentesque. Etiam semper velit ant e'
  },
  {
    id: 'book-03',
    title: 'The Night Profecy',
    author: 'John Doe',
    publisher: 'lawyer-1',
    image: BookAvatar.src,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non sapien at arcu sodales pellentesque. Etiam semper velit ant e'
  },
  {
    id: 'book-04',
    title: 'The Night Profecy',
    author: 'John Doe',
    publisher: 'lawyer-1',
    image: BookAvatar.src,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non sapien at arcu sodales pellentesque. Etiam semper velit ant e'
  },
  {
    id: 'book-05',
    title: 'The Night Profecy',
    author: 'John Doe',
    publisher: 'lawyer-1',
    image: BookAvatar.src,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non sapien at arcu sodales pellentesque. Etiam semper velit ant e'
  }
];

export const MEETINGS = [
  {
    id: 'meeting-01',
    title: 'Meeting with the president ',
    description: 'This is a description',
    date: '02/05/2022',
    time: '10:00am',
    url: ''
  },
  {
    id: 'meeting-02',
    title: 'Meeting with the president ',
    description: 'This is a description',
    date: '02/05/2022',
    time: '10:00am',
    url: ''
  },
  {
    id: 'meeting-03',
    title: 'Meeting with the president ',
    description: 'This is a description',
    date: '02/05/2022',
    time: '10:00am',
    url: ''
  },
  {
    id: 'meeting-04',
    title: 'Meeting with the president ',
    description: 'This is a description',
    date: '02/05/2022',
    time: '10:00am',
    url: ''
  }
];

export const PAYMENT_DETAILS = [
  {
    id: 'payment-01',
    status: 'success',
    date: '10/08/2019',
    title: 'Annual dues'
  },
  {
    id: 'payment-02',
    status: 'fail',
    date: '10/08/2020',
    title: 'Annual dues'
  },
  {
    id: 'payment-03',
    status: 'success',
    date: '10/08/2020',
    title: 'Annual dues'
  },
  {
    id: 'payment-04',
    status: 'fail',
    date: '10/08/2021',
    title: 'Annual dues'
  },
  {
    id: 'payment-05',
    status: 'success',
    date: '10/08/2021',
    title: 'Annual dues'
  }
];
