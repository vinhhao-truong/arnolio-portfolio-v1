const getThumbnailImg = (
  width: number | string = 900,
  height: number | string = 600
): string => {
  const defaultThumbnails: string[] = [
    `https://images.pexels.com/photos/6991346/pexels-photo-6991346.jpeg?auto=compress&cs=tinysrgb&w=${width}&h=${height}&dpr=1`,
    `https://images.pexels.com/photos/323645/pexels-photo-323645.jpeg?auto=compress&cs=tinysrgb&w=${width}&h=${height}&dpr=1`,
  ];

  //get random
  //Math.floor(Math.random() * (max - min + 1)) + min
  return defaultThumbnails[
    Math.floor(Math.random() * (defaultThumbnails.length + 1))
  ];
};

export default getThumbnailImg;
