export default function Image({ image }: { image: string }) {
  return (
    <img
      src={image}
      width="200"
      height="300"
      alt="cardNotWorking"
      className="cards"
    />
  );
}
