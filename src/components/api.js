// api.js
import image1 from './image/bruce.jpg';
import image2 from './image/instrument.jpg';
import image3 from './image/healthy.png';
import image4 from './image/recipes.jpg';
import image5 from './image/new-year.jpg';
import image6 from './image/yoga.jpg';

export const cardDataArray = [
  {
    id: 1, // Unique identifier
    image: image1,
    title: 'Woman stretching',
    description: "For many people, stretching exercises probably fall on the “things I should do but don't” list...",
    author: 'Eric',
    date: 'Nov 01',
  },
  {
    id: 2, // Unique identifier
    image: image2,
    title: 'Learn to Play an Instrument',
    description: "Whether you want to join your school's band, learning to play an instrument is a rewarding and stimulating activity...",
    author: 'John',
    date: 'Nov 02',
  },
  {
    id: 3, // Unique identifier
    image: image3,
    title: 'Healthy & Tasty',
    description: "You've gotta dance like there's nobody watching, love like you'll never be hurt...",
    author: 'Alice',
    date: 'Nov 03',
  }
];


export const VerticalDataArray = [
    {
        id:1,
      title: 'Neutral Recipes',
      image:image4,
      description: "For many people, stretching exercises probably fall on the 'things I should do but don't' list...",
      author: 'Eric',
      date: 'Nov 01',
    },
    {
        id:2,
      title: 'One Happy Year',
      image:image5,
      description: "Whether you want to join your school's band, learning to play an instrument...",
      author: 'John',
      date: 'Nov 02',
    },
    {
        id:3,
      title: 'Yoga Changed It All & Tasty',
      image:image6,
      description: "For many people, stretching exercises probably fall on the 'things I should do but don't' list...",
      author: 'Alice',
      date: 'Nov 03',
    }
  ];
