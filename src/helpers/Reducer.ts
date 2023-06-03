export default function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "flipCard":
      return [...state].map((item) =>
        item.mappingID === payload.mappingID
          ? { ...item, flipped: false }
          : { ...item }
      );
    case "checkIfCardsAreSame":
      const { image1, image2 } = payload;
      return [...state].map((item) =>
        item.image === image1 || item.image === image2
          ? { ...item, flipped: true }
          : { ...item }
      );
    case "resetCard":
      return [...state].map((item) =>
        item.mappingID === payload ? { ...item, flipped: false } : { ...item }
      );
  }
}
