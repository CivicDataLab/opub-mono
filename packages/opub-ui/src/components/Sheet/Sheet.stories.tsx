import { Box } from "../Box";
import { Button } from "../Button";
import { Sheet } from "./Sheet";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

/**
 * Sheet is a panel that slides in from the side of the screen.
 */
const meta = {
  title: "Components/Sheet",
  component: Sheet.Content,
} satisfies Meta<typeof Sheet.Content>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    console.log(open);

    return (
      <Box
        flex
        width="90vw"
        minHeight="90vh"
        alignItems="center"
        justifyContent="center"
      >
        <Sheet>
          <Sheet.Trigger>
            <Button>Open Sheet</Button>
          </Sheet.Trigger>
          <Sheet.Content>Sheet Content</Sheet.Content>
        </Sheet>
      </Box>
    );
  },
  args: {},
};

export const Sides: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [side, setSide] = React.useState<any>("");

    // React.useEffect(() => {
    //   if (side) setOpen((val) => !val);
    // }, [side]);

    function handleOpenChange(side: string) {
      setSide(side);
    }

    return (
      <Box
        flex
        minHeight="90vh"
        alignItems="center"
        justifyContent="center"
        gap="2"
        direction="column"
        wrap="wrap"
      >
        <Sheet>
          <Sheet.Trigger>
            <Button onClick={() => handleOpenChange("top")}>From Top</Button>
          </Sheet.Trigger>
          <Sheet.Content side={side}>Sheet Content</Sheet.Content>
        </Sheet>

        <Box
          flex
          gap="2"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Sheet>
            <Sheet.Trigger>
              <Button onClick={() => handleOpenChange("left")}>
                From Left
              </Button>
            </Sheet.Trigger>
            <Sheet.Content side={side}>Sheet Content</Sheet.Content>
          </Sheet>
          <Sheet>
            <Sheet.Trigger>
              <Button onClick={() => handleOpenChange("right")}>
                From Right
              </Button>
            </Sheet.Trigger>
            <Sheet.Content side={side}>Sheet Content</Sheet.Content>
          </Sheet>
        </Box>

        <Sheet>
          <Sheet.Trigger>
            <Button onClick={() => handleOpenChange("bottom")}>
              From Bottom
            </Button>
          </Sheet.Trigger>
          <Sheet.Content side={side}>Sheet Content</Sheet.Content>
        </Sheet>
      </Box>
    );
  },
  args: {},
};

type sizes = "narrow" | "medium" | "wide" | "extended" | "full";
const sizeArr = ["narrow", "medium", "wide", "extended", "full"];
export const Sizes: Story = {
  render: () => {
    const [size, setSize] = React.useState<sizes | undefined>(undefined);

    return (
      <Box
        flex
        gap="2"
        minHeight="90vh"
        alignItems="center"
        justifyContent="center"
        direction="column"
        wrap="wrap"
      >
        <Sheet>
          <Sheet.Trigger>
            <Button>Open Sheet</Button>
          </Sheet.Trigger>
          <Sheet.Content size={size}>
            <Box
              flex
              gap="2"
              wrap="wrap"
              alignItems="center"
              width="100%"
              minHeight="100%"
            >
              {sizeArr.map((size: any) => (
                <Button key={size} onClick={() => setSize(size)}>
                  {size}
                </Button>
              ))}
            </Box>
          </Sheet.Content>
        </Sheet>
      </Box>
    );
  },
  args: {},
};
