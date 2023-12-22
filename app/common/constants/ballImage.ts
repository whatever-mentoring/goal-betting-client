export interface BallImage {
  onImgSrc: string;
  offImgSrc: string;
  text: string;
  id: number;
}

export const ballImages: BallImage[] = [
  {
    onImgSrc: '/images/balls/ball_on_1.png',
    offImgSrc: '/images/balls/ball_off_1.png',
    text: '하루',
    id: 1,
  },
  {
    onImgSrc: '/images/balls/ball_on_2.png',
    offImgSrc: '/images/balls/ball_off_2.png',
    text: '이틀',
    id: 2,
  },
  {
    onImgSrc: '/images/balls/ball_on_3.png',
    offImgSrc: '/images/balls/ball_off_3.png',
    text: '사흘',
    id: 3,
  },
  {
    onImgSrc: '/images/balls/ball_on_4.png',
    offImgSrc: '/images/balls/ball_off_4.png',
    text: '나흘',
    id: 4,
  },
  {
    onImgSrc: '/images/balls/ball_on_5.png',
    offImgSrc: '/images/balls/ball_off_5.png',
    text: '닷새',
    id: 5,
  },
  {
    onImgSrc: '/images/balls/ball_on_6.png',
    offImgSrc: '/images/balls/ball_off_6.png',
    text: '엿새',
    id: 6,
  },
  {
    onImgSrc: '/images/balls/ball_on_7.png',
    offImgSrc: '/images/balls/ball_off_7.png',
    text: '이레',
    id: 7,
  },
] as const;
