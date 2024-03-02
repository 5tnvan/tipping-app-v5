export const fetchLocalImages = () => {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : `http://localhost:${process.env.PORT}`;
  const imageUrl = `${baseUrl}/thumbnail.jpg`;
  const heartIconUrl = `${baseUrl}/heart-giga.png`;
};
