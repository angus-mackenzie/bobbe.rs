import type { ImageMetadata } from 'astro';
import jumping from '../assets/jumping.jpg';
import group from '../assets/group.jpg';
import friends from '../assets/friends.jpg';
import sunrise from '../assets/sunrise.jpg';

export interface ClubPhoto {
  image: ImageMetadata;
  alt: string;
  caption?: string;
}

export const hero: ClubPhoto = {
  image: jumping,
  alt: 'A group of swimmers jumping into the ocean from a rock, photographed from the water.',
};

export const gallery: ClubPhoto[] = [
  { image: group, alt: 'Beach Bobbers gathered together in the ocean beside coastal rocks.', caption: 'Heritage Day Bob' },
  { image: friends, alt: 'Three friends smiling with their heads just above the calm ocean water.', caption: 'Talking Heads Fans' },
  { image: sunrise, alt: 'An orange sky above the ocean and the silhouette of a coastal rock.', caption: 'We do sunset bobs sometimes' },
];
