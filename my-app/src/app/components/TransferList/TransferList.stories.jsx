import TransferList from "./TransferList";

export default {
  title: "Components/TransferList",
  component: TransferList,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    leftDefaults: { control: "array" },
    rightDefaults: { control: "array" },
  },
};

// Default transfer list with programming languages
export const Default = {
  args: {
    leftDefaults: ["HTML", "JavaScript", "CSS", "TypeScript"],
    rightDefaults: ["React", "Angular", "Vue", "Svelte"],
  },
};
