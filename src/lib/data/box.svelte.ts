import type BoxI from "../base/box";

const boxes: { value: BoxI[] } = $state({
  value: [
    {
      id: 0,
      application: "terminal",
      x: 80,
      y: 30,
      width: 400,
      height: 400,
      hidden: false,
    },
  ],
});

export default boxes;
